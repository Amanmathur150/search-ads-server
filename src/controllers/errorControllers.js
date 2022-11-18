// this error Controller handle all error according to production and development error

const sendErrorDev = (err,req,res)=>{
        // Api Error
        res.status(err.statusCode).json({
            message : err.message ,
            statusCode : err.statusCode ,
            status :  err.status ,
            error : err,
            stack : err.stack
        })
}

const sendErrorProd = (err,req,res)=>{
    // Operational Trusted Created by us 
    if(err.isOperational){
            res.status(err.statusCode).json({
                message : err.message ,
                status :  err.status
            })
    }else{
        // 1 LOG
        console.log("Production Error",err)
        // we dont share any abnormal error to our client so we directly show message
            res.status(500).json({
                status :  err.status,
                message : "Something went wrong!"
            })
    }
}



module.exports = (err,req,res,next)=>{
    err.message = err.message || "something Went wrong Please try again"
     err.statusCode  =  err.statusCode || 500
    err.status = err.status || "error"
    if(process.env.NODE_ENV === "development"){
        sendErrorDev(err,req,res)
    }else  if(process.env.NODE_ENV === "production"){
        sendErrorProd(err,req,res)
    }
}