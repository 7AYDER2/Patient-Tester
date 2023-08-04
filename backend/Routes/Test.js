const prismaClient = require("@prisma/client")
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const prisma = new prismaClient.PrismaClient();

router.post('/add-test',asyncHandler(async(req,res)=>{
  const {name,price,unit,min,max} =req.body;
  await prisma.test.createMany({
    data:{
      name,price,unit,min,max
    }
  })

  res.status(200).json({message:"Done"})
}))

router.put('/edit-test/:testName',asyncHandler(async(req,res)=>{
  const testName = req.params.testName
  await prisma.test.update({
   where:{
     name:testName
   },
   data:{
    name:req.body.name,
    price:req.body.price,
    unit:req.body.unit,
    min:req.body.min,
    max:req.body.max
   }
  })

  res.status(200).json({message:"update-successfully"})
}))

router.delete('/delete-test/:testName',asyncHandler(async(req,res)=>{
  const testName = req.params.testName;
  await prisma.test.delete({
    where:{
      name:testName
    }
  })
  res.status(200).json({message:"delete Seccessfuly"})
}))

router.get("/search-test/:testName",asyncHandler(async(req,res)=>{
  const testName = await prisma.test.findFirst({
    where:{
      name:req.params.testName
    }
  })
  res.status(200).json(testName)
}))

router.get("/sort-test/asc", asyncHandler(async (req, res) => {
    const name = req.params.name;
     const ascendingResult = await prisma.test.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    res.status(200).json({ ascendingResult });
}));

router.get("/sort-test/asc", asyncHandler(async (req, res) => {
    const name = req.params.name;
     const ascendingResult = await prisma.test.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    res.status(200).json({ ascendingResult });
}));

router.get("/sort-test/desc", asyncHandler(async (req, res) => {
    const name = req.params.name;
    const descendingResult = await prisma.test.findMany({
        orderBy: {
            name: 'desc'
        }
    });

    res.status(200).json({ descendingResult });
}));

router.get("/all-data",asyncHandler(async(req,res)=>{
  const allData = await prisma.test.findMany();
  res.status(200).json(allData);
}))

module.exports = router;