const express = require("express");
const { uploadCertificate, getUserCertificates, deleteCertificate } = require("../controllers/certificateController");
const upload = require("../middlewares/multer");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth, upload.single("certificate"), uploadCertificate);
router.get("/:user_id", auth, getUserCertificates);
router.delete("/:id", auth, deleteCertificate);

module.exports = router;
