import { List, Typography } from "@mui/material";
import { Gender, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import AndroidIcon from "@mui/icons-material/Android";
import { EntryDetails } from "../../utils";
import CreateEntry from "./CreateEntry";

const DisplayPatient = ({ patient }: { patient: Patient | undefined }) => {
  if (patient === undefined) {
    return <Typography>The patient didn't match any id</Typography>;
  }
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
        <CreateEntry />
      </div>
      <div>
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
