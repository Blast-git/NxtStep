const express = require("express");
const router = express.Router();
const { auth, isRecruiter } = require("../middlewares/auth");
const { createNews, getAllNews, deleteNews } = require("../controllers/newsController");

router.get("/", getAllNews);
router.post("/", auth, isRecruiter, createNews);
router.delete("/:news_id", auth, isRecruiter, deleteNews);

module.exports = router;
