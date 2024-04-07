import axios from "axios";
import { apiBaseUrl } from "../constants";
import { NewEntry } from "../types";

export const create = async (entry: NewEntry, diagnosisId: string) => {
  const response = await axios.post(
    `${apiBaseUrl}/patients/${diagnosisId}/entries`,
    entry
  );
  return response.data;
};
