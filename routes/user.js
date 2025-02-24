const express = require("express")
const router = express.Router()

const {login, signup} = require("../controllers/userController")
const {auth,isCandidate,isRecruiter}= require("../middlewares/auth")
const {startSimulation, endSimulation} = require("../controllers/interviewSimulatorController")

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


router.post("/start",startSimulation)
router.put("/end",endSimulation)

module.exports = router;