const express = require("express");
const { createCourse, getAllCourses, updateCourse, deleteCourse } = require("../controllers/coursesController");
const { auth, isRecruiter } = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth, isRecruiter, createCourse);
router.get("/", getAllCourses);
router.put("/:id", auth, isRecruiter, updateCourse);
router.delete("/:id", auth, isRecruiter, deleteCourse);

module.exports = router;
