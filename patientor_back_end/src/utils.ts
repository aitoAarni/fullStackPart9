import {
  Diagnosis,
  Gender,
  HealthCheckRating,
  SickLeave,
  newPatient,
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

export const toNewPatient = (object: unknown): newPatient => {
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
    const newPatientEntry: newPatient = {
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
