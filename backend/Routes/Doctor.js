const prismaClient = require("@prisma/client");
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {validateRegisterDoctor,validateLoginDoctor,validateUpdateDoctor} = require("../helpers/ValidateDoctor");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new prismaClient.PrismaClient()
