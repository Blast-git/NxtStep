const express = require("express");
const { startSimulation, endSimulation } = require("../controllers/interviewSimulatorController");
const { auth, isCandidate } = require("../middlewares/auth");

const router = express.Router();

router.post("/start", auth, isCandidate, startSimulation);
router.put("/end/:id", auth, isCandidate, endSimulation);

module.exports = router;
