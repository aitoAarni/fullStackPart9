export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface DiaryEntry {
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type SensitiveDiaryEntry = Omit<DiaryEntry, "comment"> & {
  id: string;
};
