import axios from "axios";
import { DiaryEntry, SensitiveDiaryEntry } from "../types";

const baseURL = "http://localhost:3000/";

export const getAllDiaries = () => {
  const data = axios
    .get<SensitiveDiaryEntry[]>(`${baseURL}api/diaries`)
    .then((response) => {
      return response.data;
    });
  return data;
};

export const postNewDiary = async (
  diary: DiaryEntry
): Promise<SensitiveDiaryEntry> => {
  const response = await axios.post<SensitiveDiaryEntry>(
    `${baseURL}api/diaries`,
    {
      ...diary,
    }
  );
  return response.data;
};
