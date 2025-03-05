const express = require("express");
const { enrollCourse, getUserEnrollments, updateProgress, unenrollCourse } = require("../controllers/courseenrollmentController");
const { auth, isCandidate } = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth, isCandidate, enrollCourse);
router.get("/user/:user_id", auth, isCandidate, getUserEnrollments);
router.patch("/:id/progress", updateProgress);
router.delete("/:id", auth, isCandidate, unenrollCourse);

module.exports = router;
