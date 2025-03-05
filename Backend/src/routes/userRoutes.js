const express = require("express");
const { auth, isCandidate, isRecruiter } = require("../middlewares/auth");

const router = express.Router();

router.get("/candidate", auth, isCandidate, (req, res) => {
    res.json({ 
        success: true, 
        message: "Candidate route accessed" 
    })
})

router.get("/recruiter", auth, isRecruiter, (req, res) => {
    res.json({ 
        success: true, 
        message: "Recruiter route accessed" 
    })
})

module.exports = router;
