import express from "express";
import {
  addNewPatient,
  getPatientById,
  getPatientInfos,
} from "../services/patients";
import { toNewPatient } from "../utils";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const router = express.Router();

router.get("/", (_req, res) => {
  console.log(getPatientInfos());
  res.send(getPatientInfos());
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

router.get("/:id", (req, res) => {
  try {
    const patient = getPatientById(req.params.id);
    res.json(patient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
    res.status(400).send("Something went wrong");
  }
});

export default router;
