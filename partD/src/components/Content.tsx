import React from "react";
import { Part } from "./Part";
import { CoursePart } from "../types";

export const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): React.JSX.Element => {
  return (
    <>
      {courseParts.map((parts) => (
        <Part coursePart={parts} />
      ))}
    </>
  );
};
