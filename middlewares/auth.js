const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = (req,res,next)=>{
    try{
        //extract jwt token
        const token = req.cookies.token
        if(!token || token===undefined){
            return res.status(401).json({
                success:false,
                message: "No token provided"
            })
        }
        //verify token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload)
            req.user = payload //it's use is in line 38, 
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Token invalid"
            })
        }
        next()
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while verifying token"
        })
    }
}

exports.isCandidate =(req,res,next)=>{
    try{
        if(req.user.role !=="Candidate"){
            return res.status(403).json({
                success:false,
                message: "This is protected route for Candidate"
            })
        }
        next()
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"user role not matching"
            })
        
    }
}


exports.isRecruiter =(req,res,next)=>{
    try{
        if(req.user.role !=="Recruiter"){
            return res.status(403).json({
                success:false,
                message: "This is protected route for recruiter"
            })
        }
        next()
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"user role not matching"
            })
    }
}