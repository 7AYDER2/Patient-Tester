const prismaClient = require("@prisma/client");
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {validateRegisterDoctor,validateLoginDoctor,validateUpdateDoctor} = require("../helpers/ValidateDoctor");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new prismaClient.PrismaClient()

router.post("/register",asyncHandler(async(req,res)=>{
    const {error} =  validateRegisterDoctor(req.body);

    if(error){
        return res.status(400).json({message:error.details[0].message})
    }

    let user = await prisma.doctor.findFirst({
        where:{
            email:req.body.email
        }
    })

    if(user){
        return res.status(400).json({message:"this user already exsist"})
    }

    const {name, email, password, image,patient} = req.body;
    
    let pass = bcrypt.hashSync(password,10)
    
    await prisma.doctor.create({
        data:{
            name, email, pass, image,patient
        }
    })
    res.status(200).json({message:"user add succssfly"})
}))

router.post("/login",asyncHandler(async(req,res)=>{
    const {error} = validateLoginDoctor(req.body)

    if(error) {
        return res.status(404).json({message:"acess dened"})
    }

    const {email,password} = req.body;

    let user = await prisma.doctor.findFirst({
        where:{email}
    })
  
    if(!user){
        return res.status(404).json({message:"unable to authenticate"})
    }
    
    // Verify password 
    const isCorrectPassword = bcrypt.compareSync(password,user.password)
    if(!isCorrectPassword){
        return res.status(404).json({message:"Unable to authenticate"})
    } 

    const token = jwt.sign({id:user.id},process.env.SECRETKEY)

    res.status(200).json({message:"Authentecated",token})
}))

