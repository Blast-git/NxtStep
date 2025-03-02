const express = require("express");
const router = express.Router();


const authRouter = require("./authRoutes")
const userRouter = require("./userRoutes");
const interviewRouter = require("./interviewRoutes")
const courseRouter = require("./courseRoutes")
const enrollmentRouter = require("./enrollmentRoutes")
const jobPostingRouter = require("./jobPostingRoutes")
const jobApplicationRouter = require("./jobApplicationRoutes")

router.use("/auth", authRouter)
router.use("/users", userRouter)
router.use("/interview", interviewRouter)
router.use("/courses", courseRouter)
router.use("/enrollments", enrollmentRouter)
router.use("/jobs",jobPostingRouter)
router.use("/job-applications", jobApplicationRouter)

module.exports = router;
