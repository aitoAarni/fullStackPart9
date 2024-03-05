import { DiaryEntry, Visibility, Weather } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather)
    .map((i) => i.toString())
    .includes(param);
};

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility)
    .map((i) => i.toString())
    .includes(param);
};

const parseDate = (item: unknown): string => {
  if (item && isString(item) && isDate(item)) {
    return item;
  }
  throw new Error("Incorrect or missing date");
};

const parseWeather = (item: unknown): Weather => {
  if (item && isString(item) && isWeather(item)) {
    return item;
  }
  throw new Error("Incorrect or missing weather");
};

const parseVisibility = (item: unknown): Visibility => {
  if (item && isString(item) && isVisibility(item)) {
    return item;
  }
  throw new Error("Incorrect or missing visibility");
};

const parseComment = (item: unknown): string => {
  if (item && isString(item)) {
    return item;
  }
  throw new Error("Incorrect or missing comment");
};

export const toDiaryEntry = (object: unknown): DiaryEntry => {
  if (!object || typeof object != "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "date" in object &&
    "weather" in object &&
    "visibility" in object &&
    "comment" in object
  ) {
    return {
      date: parseDate(object.date),
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      comment: parseComment(object.comment),
    };
  }
  throw new Error("Incorrect data, some fields are missing");
};
