import express from "express";
import {
  addNewEntry,
  addNewPatient,
  getPatientById,
  getPatientInfos,
} from "../services/patients";
import { toNewEntry, toNewPatient } from "../utils";

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

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const entry = addNewEntry(req.params.id, newEntry);
    res.json(entry);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
    res.status(400).send("Something went wrong");
  }
});

export default router;
