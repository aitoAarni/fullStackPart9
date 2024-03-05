import { Box, ListItem, ListItemText, Typography } from "@mui/material";
import {
  Entry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const HealthCheckEntryDisplay = ({
  entry,
}: {
  entry: HealthCheckEntry;
}) => {
  const color = { 0: "green", 1: "yellow", 2: "orange", 3: "red" };
  return (
    <ListItem
      sx={{
        border: "1px solid rgba(0, 0, 0, 0.8)",
        borderRadius: "8px",
        marginBottom: "8px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <ListItemText>
        <Typography variant="body1" component="div">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Box mr={1}>{entry.date}</Box>
            <Box mr={1}>
              <LocalHospitalIcon sx={{ color: "red" }} />
            </Box>{" "}
            <Box mr={1}>
              <FavoriteIcon sx={{ color: color[entry.healthCheckRating] }} />
            </Box>{" "}
          </div>
          <div>
            <Typography variant="body1">{entry.description}</Typography>{" "}
            <Typography variant="body1">
              Diagnosed by {entry.specialist}
            </Typography>{" "}
          </div>
        </Typography>
      </ListItemText>
    </ListItem>
  );
};

export const HospitalEntryDisplay = ({ entry }: { entry: Entry }) => {
  return (
    <ListItem
      sx={{
        border: "1px solid rgba(0, 0, 0, 0.8)",
        borderRadius: "8px",
        marginBottom: "8px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <ListItemText>
        <Typography variant="body1" component="div">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Box mr={1}>{entry.date}</Box>
            <Box mr={1}>
              <LocalHospitalIcon />
            </Box>{" "}
          </div>
          <div>
            <Typography variant="body1">{entry.description}</Typography>{" "}
            <Typography variant="body1">
              Diagnosed by {entry.specialist}
            </Typography>{" "}
          </div>
        </Typography>
      </ListItemText>
    </ListItem>
  );
};

export const OccupationalHealthcareEntryDisplay = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <ListItem
      sx={{
        border: "1px solid rgba(0, 0, 0, 0.8)",
        borderRadius: "8px",
        marginBottom: "8px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <ListItemText>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Box mr={1}>{entry.date}</Box>
          <Box mr={1}>
            <LocalHospitalIcon />
          </Box>
          <Box mr={1}>{entry.employerName}</Box>{" "}
        </div>
        <div>
          <Typography variant="body1">{entry.description}</Typography>{" "}
          <Typography variant="body1">
            Diagnosed by {entry.specialist}
          </Typography>{" "}
        </div>
      </ListItemText>
    </ListItem>
  );
};
