const express = require("express");
const router = express.Router();


const authRouter = require("./authRoutes")
const userRouter = require("./userRoutes");
const interviewRouter = require("./interviewRoutes")
const courseRouter = require("./courseRoutes")
const enrollmentRouter = require("./enrollmentRoutes")
const jobPostingRouter = require("./jobPostingRoutes")
const jobApplicationRouter = require("./jobApplicationRoutes")
const certificateRoutes = require("./certificateRoutes")
const newsRoutes = require("./newsRoutes")
const skillAssessmentRoutes = require("./skillAssessmentRoutes")
const testGenerationRoutes = require("./testGenerationRoutes")
const userProfileRoutes = require("./userProfileRoutes")

router.use("/auth", authRouter)
router.use("/users", userRouter)
router.use("/interview", interviewRouter)
router.use("/courses", courseRouter)
router.use("/enrollments", enrollmentRouter)
router.use("/jobs",jobPostingRouter)
router.use("/job-applications", jobApplicationRouter)
router.use("/certificates", certificateRoutes)
router.use("/news", newsRoutes)
router.use("/assessments", skillAssessmentRoutes)
router.use("/tests", testGenerationRoutes)
router.use("/profile", userProfileRoutes)
module.exports = router;
