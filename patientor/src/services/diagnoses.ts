import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

export const getAllDiagnoses = async (): Promise<Diagnosis[]> => {
  const response = await axios.get(`${apiBaseUrl}/diagnoses`);
  return response.data;
};
