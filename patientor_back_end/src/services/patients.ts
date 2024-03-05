import data from "../data/patients";
import { NonSensitivePatient, Patient, newPatient } from "../types";
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

export const addNewPatient = (patient: newPatient): Patient => {
  const id: string = uuid();
  const patientWithId: Patient = { ...patient, id };
  data.push(patientWithId);
  return patientWithId;
};
