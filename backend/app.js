const express = require("express")
const dotenv = require("dotenv")
const logger = require("./Middlewares/logger")
const {notFound,errorHandler} = require("./Middlewares/error")
const helmet = require("helmet");
const patient = require("./Routes/Patient")
const test = require("./Routes/Test")
dotenv.config()

// Init app
const app = express()

// Apply Middlewares
app.use(express.json())
app.use(helmet())

// Custom MIddlewares
app.use(logger)

// Error Handler Middlewares


// Routes
app.use("/patient",patient)
app.use("/test",test)

//Running to server 
const port = process.env.PORT || 8000
app.listen(5000,()=> console.log(`server is running in ${process.env.NODE_ENV} on port ${port}`));
