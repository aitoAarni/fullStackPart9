import { Button, ButtonGroup, TextField } from "@mui/material";
import { useState } from "react";

const CreateEntry = () => {
  const [type, setType] = useState("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");

  const createEntry = () => {
    console.log(type);
  };
  return (
    <>
      <ButtonGroup>
        <Button onClick={() => setType("HealthCheck")}>health check</Button>
        <Button onClick={() => setType("OccupationalHealthcare")}>
          occupational healthcare
        </Button>
        <Button onClick={() => setType("Hospital")}>hospital</Button>
      </ButtonGroup>
      <form onSubmit={createEntry}>
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
      </form>
    </>
  );
};

export default CreateEntry;
