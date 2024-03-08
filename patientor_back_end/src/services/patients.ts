import data from "../data/patients";
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types";
import { v1 as uuid } from "uuid";

export const getNonSensitivePatientInfos = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, ...rest }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender: rest.gender,
      occupation: rest.occupation,
    };
  });
};

export const getPatientInfos = (): Patient[] => {
  return data;
};

export const getPatientById = (id: string): Patient => {
  const patient = data.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error("Patient by that id was not found");
  }
  return patient;
};

export const addNewPatient = (patient: NewPatient): Patient => {
  const id: string = uuid();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const patientWithId: Patient = { ...patient, id };
  data.push(patientWithId);
  return patientWithId;
};

export const addNewEntry = (patientId: string, newEntry: NewEntry): Entry => {
  const id: string = uuid();
  const patient = getPatientById(patientId);
  const entry = { ...newEntry, id };
  patient.entries.push(entry);
  return entry;
};
