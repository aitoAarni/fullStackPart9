import { Button, ButtonGroup, TextField } from "@mui/material";
import { useState } from "react";

const CreateEntry = () => {
  const [type, setType] = useState("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");
  const [healthRating, setHealthRating] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const createEntry = () => {
    console.log(type);
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
        onSubmit={createEntry}
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
          value={diagnosisCodes}
          onChange={(event) => setDiagnosisCodes(event.target.value)}
        />

        {type === "HealthCheck" && (
          <HealthEntry rating={healthRating} setRating={setHealthRating} />
        )}
        {type === "OccupationalHealthcare" && (
          <OccupationalEntry
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
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
      </form>
    </>
  );
};

const HealthEntry = ({
  rating,
  setRating,
}: {
  rating: string;
  setRating: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <TextField
      label="Health check rating"
      value={rating}
      onChange={(event) => setRating(event.target.value)}
    />
  );
};

const OccupationalEntry = ({
  employerName,
  setEmployerName,
  sickLeave,
  setSickLeave,
}: {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeave: string;
  setSickLeave: React.Dispatch<React.SetStateAction<string>>;
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
        value={sickLeave}
        onChange={(event) => setSickLeave(event.target.value)}
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
