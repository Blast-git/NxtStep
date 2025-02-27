const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/userController");
const { auth, isCandidate, isRecruiter } = require("../middlewares/auth");
const { startSimulation, endSimulation } = require("../controllers/interviewSimulatorController");
const { createCourse, getAllCourses, updateCourse, deleteCourse} = require("../controllers/coursesController")

router.post("/login", login);
router.post("/signup", signup);

router.get("/candidate", auth, isCandidate, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to protected route for candidate"
    });
});

router.get("/recruiter", auth, isRecruiter, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to protected route for recruiter"
    });
});

router.post("/simulation/start", auth, isCandidate, startSimulation);
router.put("/simulation/end/:id", auth, isCandidate, endSimulation); 


router.post("/courses", auth, isRecruiter, createCourse);
router.get("/courses", getAllCourses);
router.put("/courses/:id", auth, isRecruiter, updateCourse);
router.delete("/courses/:id", auth, isRecruiter, deleteCourse);



module.exports = router;
