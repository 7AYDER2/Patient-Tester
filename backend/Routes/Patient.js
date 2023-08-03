const prismaClient = require("@prisma/client");
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const prisma = new prismaClient.PrismaClient();

router.post('/add-patient',asyncHandler(async(req,res)=>{
    const { name,   gender, maritalStatus  , birthDate,address, phoneNumber,bloodType,smoker ,alcohole } = req.body;
    await prisma.patient.create({
        data:{
            name,
            gender,
            maritalStatus,
            birthDate : new Date(birthDate),
            address,
            phoneNumber,
            bloodType,
            smoker ,
            alcohole
        }
    });

    res.status(200).json({message:"Done"});
}))

router.post("/update-patient",asyncHandler(async(req,res)=>{
    const { name,   gender, maritalStatus  , birthDate,address, phoneNumber,bloodType,smoker ,alcohole } = req.body;

    await prisma.patient.update({
        where:{
            name:req.body.name
        },
        data:{
        name,   gender, maritalStatus  , birthDate,address, phoneNumber,bloodType,smoker ,alcohole
        }
    })
    res.status(200).json({message:"update Seccessfuly"});
}))

router.post("/search-patient/name",asyncHandler(async(req,res)=>{
  
}))


module.exports = router;