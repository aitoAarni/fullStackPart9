import express from "express";
import { Request, Response } from "express";
import diagnoseRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";
import cors from "cors";

const app = express();

const PORT: number = 3001;
app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req: Request, res: Response) => {
  console.log("heloooooojaa");
  res.send("hellooo");
});

app.use("/api/diagnoses", diagnoseRouter);

app.use("/api/patients", patientsRouter);

app.listen(PORT, () => console.log(`listening to ${PORT}`));
