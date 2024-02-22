import express from "express";
import {
  addNewPatient,
  getNonSensitivePatientInfos,
} from "../services/patients";
import { toNewPatient } from "../utils";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getNonSensitivePatientInfos());
});

router.post("/", (req, res) => {
  try {
    const patient = toNewPatient(req.body);
    const patientWithId = addNewPatient(patient);
    res.json(patientWithId);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
