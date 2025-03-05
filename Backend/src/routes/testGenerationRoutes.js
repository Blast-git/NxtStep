const express = require("express");
const router = express.Router();
const { auth, isRecruiter } = require("../middlewares/auth");
const { createTest, getAllTests, publishTest } = require("../controllers/testGenerationController");

router.get("/", getAllTests);
router.post("/create", auth, isRecruiter, createTest);
router.patch("/publish/:test_id", auth, isRecruiter, publishTest);

module.exports = router;
