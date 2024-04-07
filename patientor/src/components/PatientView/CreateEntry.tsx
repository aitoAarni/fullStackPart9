import { Button, ButtonGroup, TextField } from "@mui/material";
import { useState } from "react";
import { EntryType, NewEntry } from "../../types";

const CreateEntry = ({
  createEntry,
}: {
  createEntry: (entry: NewEntry) => void;
}) => {
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [rawDiagnosisCodes, setDiagnosisCodes] = useState<string>("");
  const [healthRating, setHealthRating] = useState<number>(1);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const assembleEntry = (): NewEntry => {
    const diagnosisCodes = rawDiagnosisCodes.split(" ");
    const entry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };
    switch (type) {
      case "HealthCheck":
        return {
          ...entry,
          healthCheckRating: healthRating,
          type: "HealthCheck",
        };

      case "OccupationalHealthcare":
        return {
          ...entry,
          sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd },
          employerName,
          type: "OccupationalHealthcare",
        };
      case "Hospital":
        return {
          ...entry,
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
          type: "Hospital",
        };
      default:
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(type)}`
        );
    }
  };

  return (
    <>
      <div>
        <ButtonGroup>
          <Button onClick={() => setType("HealthCheck")}>health check</Button>
          <Button onClick={() => setType("OccupationalHealthcare")}>
            occupational healthcare
          </Button>
          <Button onClick={() => setType("Hospital")}>hospital</Button>
        </ButtonGroup>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createEntry(assembleEntry());
        }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          label="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="yyyy-mm-dd"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <TextField
          label="Specialist"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          value={rawDiagnosisCodes}
          onChange={(event) => setDiagnosisCodes(event.target.value)}
        />

        {type === "HealthCheck" && (
          <HealthEntry rating={healthRating} setRating={setHealthRating} />
        )}
        {type === "OccupationalHealthcare" && (
          <OccupationalEntry
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeaveStart={sickLeaveStart}
            setSickLeaveStart={setSickLeaveStart}
            sickLeaveEnd={sickLeaveEnd}
            setSickLeaveEnd={setSickLeaveEnd}
          />
        )}
        {type === "Hospital" && (
          <HospitalEntry
            date={dischargeDate}
            setDate={setDischargeDate}
            criteria={dischargeCriteria}
            setCriteria={setDischargeCriteria}
          />
        )}
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

const HealthEntry = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <TextField
      label="Health check rating"
      value={rating}
      onChange={(event) => setRating(parseInt(event.target.value))}
    />
  );
};

const OccupationalEntry = ({
  employerName,
  setEmployerName,
  sickLeaveStart,
  sickLeaveEnd,
  setSickLeaveStart,
  setSickLeaveEnd,
}: {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeaveStart: string;
  setSickLeaveStart: React.Dispatch<React.SetStateAction<string>>;
  sickLeaveEnd: string;
  setSickLeaveEnd: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <TextField
        label="Employer name"
        value={employerName}
        onChange={(event) => setEmployerName(event.target.value)}
      />
      <TextField
        label="Sick leave"
        value={sickLeaveStart}
        onChange={(event) => setSickLeaveStart(event.target.value)}
      />
      <TextField
        label="Sick leave"
        value={sickLeaveEnd}
        onChange={(event) => setSickLeaveEnd(event.target.value)}
      />
    </>
  );
};

const HospitalEntry = ({
  date,
  setDate,
  criteria,
  setCriteria,
}: {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  criteria: string;
  setCriteria: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <TextField
        label="Discharge date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <TextField
        label="Discharge criteria"
        value={criteria}
        onChange={(eent) => setCriteria(eent.target.value)}
      />
    </>
  );
};

export default CreateEntry;
