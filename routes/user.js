const express = require("express")
const router = express.Router()

const {login, signup} = require("../controllers/userController")
const {auth,isCandidate,isRecruiter}= require("../middlewares/auth")

router.post("/login",login)
router.post("/signup",signup)

router.get("/candidate",auth,isCandidate,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to protected route for candidate"
    })
})

router.get("/recruiter",auth,isRecruiter,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to protected route for recruiter"
    })
})

module.exports = router;