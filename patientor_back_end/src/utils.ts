import {
  Diagnosis,
  Gender,
  HealthCheckRating,
  SickLeave,
  NewPatient,
  NewEntry,
  NewHealthCheckEntry,
  NewOccupationalHealthcareEntry,
  NewHostpitalEntry,
  NewBaseEntry,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text == "string";
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const isNumber = (num: unknown): num is number => {
  return typeof num === "number";
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const isSickLeave = (sickLeave: object): sickLeave is SickLeave => {
  return (
    "startDate" in sickLeave &&
    isString(sickLeave.startDate) &&
    isDate(sickLeave.startDate) &&
    "endDate" in sickLeave &&
    isString(sickLeave.endDate) &&
    isDate(sickLeave.endDate)
  );
};

function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || ssn.length != 11) {
    throw new Error("Invalid or missing ssn");
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Invalid or missing gender");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("invalid or missing occupation");
  }
  return occupation;
};

const parseDescription = (descrption: unknown): string => {
  if (descrption && isString(descrption)) {
    return descrption;
  }
  throw new Error("Invalid or missing description");
};

const parseSpecialist = (specialist: unknown): string => {
  if (specialist && isString(specialist)) {
    return specialist;
  }
  throw new Error("Invalid or missing specialist");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating && isNumber(rating) && isHealthCheckRating(rating)) {
    return rating;
  }
  throw new Error("Invalid or missing health check rating");
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (sickLeave && isObject(sickLeave) && isSickLeave(sickLeave)) {
    return sickLeave;
  }
  throw new Error("Invalid or undefined sick leave");
};

const parseDischarge = (
  discharge: unknown
): { date: string; criteria: string } => {
  if (
    discharge &&
    isObject(discharge) &&
    "date" in discharge &&
    isString(discharge.date) &&
    isDate(discharge.date) &&
    "criteria" in discharge &&
    isString(discharge.criteria)
  ) {
    return { date: discharge.date, criteria: discharge.criteria };
  }
  throw new Error("Invalid or undefined discharge");
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object != "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatientEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newPatientEntry;
  }
  throw new Error("Incorrect data. Some fields are missing");
};

const toNewBaseEntry = (entry: unknown): NewBaseEntry => {
  if (!entry || typeof entry != "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("description" in entry && "date" in entry && "specialist" in entry) {
    const newBaseEntry: NewBaseEntry = {
      description: parseDescription(entry.description),
      date: parseDate(entry.date),
      specialist: parseSpecialist(entry.specialist),
    };
    if ("diagnosisCodes" in entry) {
      newBaseEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
    }
    return newBaseEntry;
  }
  throw new Error("Incorrect data. Some fields are missing");
};

const toNewHealthCheckEntry = (entry: unknown): NewHealthCheckEntry => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Incorrect or missing data");
  }
  const newBaseEntry = toNewBaseEntry(entry);
  if ("healthCheckRating" in entry) {
    const newHealthCheckEntry: NewHealthCheckEntry = {
      ...newBaseEntry,
      healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      type: "HealthCheck",
    };
    return newHealthCheckEntry;
  }
  throw new Error("Incorrect data. Some fields are missing");
};

const toNewOccupationalHealthcareEntry = (
  entry: unknown
): NewOccupationalHealthcareEntry => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Incorrect or missing data");
  }
  const newBaseEntry = toNewBaseEntry(entry);
  if ("employerName" in entry) {
    const newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
      ...newBaseEntry,
      employerName: parseName(entry.employerName),
      type: "OccupationalHealthcare",
    };
    if ("sickLeave" in entry) {
      newOccupationalHealthcareEntry.sickLeave = parseSickLeave(
        entry.sickLeave
      );
    }
    return newOccupationalHealthcareEntry;
  }
  throw new Error("Incorrect data. Some fields are missing");
};

const toNewHospitalEntry = (entry: unknown): NewHostpitalEntry => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Incorrect or missing data");
  }
  const newBaseEntry = toNewBaseEntry(entry);
  if ("discharge" in entry) {
    const newHospitalEntry: NewHostpitalEntry = {
      ...newBaseEntry,
      discharge: parseDischarge(entry.discharge),
      type: "Hospital",
    };
    return newHospitalEntry;
  }
  throw new Error("Incorrect data. Some fields are missing");
};

export const toNewEntry = (entry: unknown): NewEntry => {
  if (!entry || typeof entry !== "object" || !("type" in entry)) {
    throw new Error("Incorrect or missing data");
  }
  switch (entry.type) {
    case "HealthCheck":
      return toNewHealthCheckEntry(entry);
    case "OccupationalHealthcare":
      return toNewOccupationalHealthcareEntry(entry);
    case "Hospital":
      return toNewHospitalEntry(entry);
    default:
      throw new Error(`Unidentified type: ${entry.type}`);
  }
};
