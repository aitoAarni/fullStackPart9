import express from "express";
import { getDiagnoses } from "../services/diagnoses";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("diagnose routerissa");
  console.log(getDiagnoses());
  const diagnoses = getDiagnoses();
  res.send(diagnoses);
});

export default router;
