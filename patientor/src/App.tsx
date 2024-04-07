import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants"; // test for a commit

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import DisplayPatient from "./components/PatientView";
import { Patient } from "./types";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    patientService.getAll().then((patients) => {
      setPatients(patients);
    });
  }, []);

  const patientMatch = useMatch("/patient/:id");
  const getPatient = () => {
    console.log("patientssssss", patients);
    const patient = patientMatch
      ? patients.find((patient) => patient.id === patientMatch.params.id)
      : undefined;
    console.log("patienttiiii123: ", patient);
    return patient;
  };

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patient/:id"
            element={<DisplayPatient getPatient={getPatient} />}
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
