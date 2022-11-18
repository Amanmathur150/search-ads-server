const express = require("express")
const adsRouter = require("./src/routes/adsRouter")
const cors = require("cors")
let app = express()
const globalErrorHandler = require("./src/controllers/errorControllers")
const AppError = require("./src/utils/appError");
const rateLimit = require('express-rate-limit');
const compression = require('compression')


const limiter = rateLimit({
    // add api rate limiter up to 100 per min
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });

  
app.use('/api', limiter);
app.use(compression())

app.use(cors({
    origin:"http://localhost:3000"
}))

app.use(express.static("public"))


app.use("/api/ads" , adsRouter)

app.all("*",(req,res,next)=>{
    next(new AppError(`Can't find ${req.method} ${req.originalUrl} on this server`,500))
})

app.use(globalErrorHandler)

module.exports = app
