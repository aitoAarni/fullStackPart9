import React from "react";
import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const Part = ({
  coursePart,
}: {
  coursePart: CoursePart;
}): React.JSX.Element => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <>
          <p>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
          </p>
          <p>
            <i>{coursePart.description}</i>
          </p>
        </>
      );
    case "group":
      return (
        <>
          <p>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
          </p>
          <p>Project exercises: {coursePart.groupProjectCount}</p>
        </>
      );
    case "background":
      return (
        <>
          <p>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
          </p>
          <p>
            <i>{coursePart.description}</i>
          </p>
          <p>{coursePart.backgroundMaterial}</p>
        </>
      );
    case "special":
      return (
        <>
          <p>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
          </p>
          <p>
            <i>{coursePart.description}</i>
          </p>
          <p>
            required skills:{" "}
            {coursePart.requirements.map((part) => part + ", ")}
          </p>
        </>
      );
    default:
      return assertNever(coursePart);
  }
};
