import data from "../data/patients";
import { nonSensitivePatient, Patient, newPatient } from "../types";
import { v1 as uuid } from "uuid";

export const getNonSensitivePatientInfos = (): nonSensitivePatient[] => {
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

export const addNewPatient = (patient: newPatient): Patient => {
  const id: string = uuid();
  const patientWithId: Patient = { ...patient, id };
  data.push(patientWithId);
  return patientWithId;
};
