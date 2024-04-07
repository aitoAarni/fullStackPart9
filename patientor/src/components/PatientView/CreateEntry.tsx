import {
  Button,
  ButtonGroup,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
  const [rawDiagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
  const [healthRating, setHealthRating] = useState<number>(1);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const assembleEntry = (): NewEntry => {
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
  console.log(date);
  console.log(date);
  const diagnosisCodes = ["Z57.1", "N30.0", "L60.1"];
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
        <InputLabel>Description</InputLabel>
        <TextField
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel>Date</InputLabel>
        <Input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <InputLabel>Specialist</InputLabel>
        <TextField
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel>Diagnosis codes</InputLabel>
        <Select
          multiple
          value={rawDiagnosisCodes}
          onChange={(event) =>
            setDiagnosisCodes(
              typeof event.target.value === "string"
                ? event.target.value.split(",")
                : event.target.value
            )
          }
        >
          {diagnosisCodes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>

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
    <>
      <InputLabel>Health check rating</InputLabel>
      <Select
        value={rating}
        onChange={(event) =>
          setRating(
            typeof event.target.value == "string"
              ? parseInt(event.target.value)
              : event.target.value
          )
        }
      >
        {[1, 2, 3, 4].map((num) => (
          <MenuItem key={num} value={num}>
            {num}
          </MenuItem>
        ))}
      </Select>
    </>
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
      <InputLabel>Emplyer</InputLabel>
      <TextField
        value={employerName}
        onChange={(event) => setEmployerName(event.target.value)}
      />
      <InputLabel>Sick leave start</InputLabel>
      <Input
        type="date"
        value={sickLeaveStart}
        onChange={(event) => setSickLeaveStart(event.target.value)}
      />
      <InputLabel>Sick leave end</InputLabel>
      <Input
        type="date"
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
      <InputLabel>Discharge date</InputLabel>
      <Input
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <InputLabel>Discharge criteria</InputLabel>
      <TextField
        value={criteria}
        onChange={(eent) => setCriteria(eent.target.value)}
      />
    </>
  );
};

export default CreateEntry;
