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

router.put("/update-patient/:patientName",asyncHandler(async(req,res)=>{
    const patientName =  req.params.patientName
    const { name,   gender, maritalStatus  , birthDate,address, phoneNumber,bloodType,smoker ,alcohole } = req.body;

    await prisma.patient.update({
        where:{
            name:patientName
        },
        data:{
        name,   gender, maritalStatus  , birthDate,address, phoneNumber,bloodType,smoker ,alcohole
        }
    })
    res.status(200).json({message:"update Seccessfuly"});
}))

router.get("/search-patient/:name",asyncHandler(async(req,res)=>{ 
  const allPatient = await prisma.patient.findFirst({
    where:{
        name:req.params.name
    }
  })
  res.status(200).json(allPatient)
}))

router.get("/sort-patinet/asc", asyncHandler(async (req, res) => {
    const name = req.params.name;

     const ascendingResult = await prisma.test.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    res.status(200).json({ ascendingResult });
}));

router.get("/sort-patinet/desc", asyncHandler(async (req, res) => {
    const name = req.params.name;

    const descendingResult = await prisma.test.findMany({
        orderBy: {
            name: 'desc'
        }
    });

    res.status(200).json({ descendingResult });
}));

router.delete("/remove-patient/:name",asyncHandler(async(req,res)=>{
    const name = req.params.name;
    console.log(name)
    await prisma.patient.delete({
        where:{
            name:name
        }
    })
  res.status(200).json({message:"Done"})

}))

router.get("/all-patient",asyncHandler(async(req,res)=>{
    const allPatient = await prisma.patient.findMany()
    res.status(200).json(allPatient) 
}))

module.exports = router;