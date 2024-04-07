import { Alert, List, Typography } from "@mui/material";
import { Gender, NewEntry, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import AndroidIcon from "@mui/icons-material/Android";
import { EntryDetails } from "../../utils";
import CreateEntry from "./CreateEntry";
import { create } from "../../services/entries";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const DisplayPatient = ({
  getPatient,
}: {
  getPatient: () => Patient | undefined;
}) => {
  const patient = getPatient();
  const [displayError, setDisplayError] = useState<string | null>(null);
  console.log("entries-1: ", patient?.entries);
  const [entries, setEntries] = useState(patient?.entries);

  console.log("patient1: ", patient);
  console.log("entries0: ", patient?.entries);
  console.log("entries1: ", entries);
  useEffect(() => {
    setTimeout(() => {
      setDisplayError(null);
    }, 5000);
  }, [displayError]);

  const { id } = useParams();
  if (patient === undefined) {
    return <Typography>The patient didn't match any id</Typography>;
  }
  const createEntry = (newEntry: NewEntry) => {
    if (typeof id != "string") {
      setDisplayError("Invalid url for the diagnosis");
      return;
    }
    create(newEntry, id)
      .then((entry): void => {
        patient.entries.push(entry);
        setEntries(entries?.concat(entry));
      })
      .catch((error) => setDisplayError(error.response.data));
  };
  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      case Gender.Other:
        return <AndroidIcon />;
      default:
        return null;
    }
  };
  return (
    <>
      <div>
        <br />
        <Typography variant="h4" fontWeight="bold">
          {patient.name}&nbsp;{getGenderIcon(patient.gender)}
        </Typography>
        <br />
        <Typography variant="body1">ssn:&nbsp;{patient.ssn}</Typography>
        <Typography variant="body1">
          occupation:&nbsp;{patient.occupation}
        </Typography>
      </div>
      <div>
        <CreateEntry createEntry={createEntry} />
      </div>
      <div>
        <div>
          {displayError && <Alert severity="error">{displayError}</Alert>}
        </div>
        <br />
        <Typography variant="h5">entries</Typography>
        <br />
        <List>
          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </List>
      </div>
    </>
  );
};

export default DisplayPatient;
