import React from "react";
import { Entry } from "./types";
import {
  HealthCheckEntryDisplay,
  OccupationalHealthcareEntryDisplay,
  HospitalEntryDisplay,
} from "./components/PatientView/DisplayEntry";

export const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDisplay entry={entry} />;
    case "Hospital":
      return <HospitalEntryDisplay entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDisplay entry={entry} />;
    default:
      return assertNever(entry);
  }
};

function assertNever(entry: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(entry)}`
  );
}
