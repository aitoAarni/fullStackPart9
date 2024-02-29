import React from "react";
import { CoursePart } from "../types";

export const Total = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): React.JSX.Element => {
  const total = courseParts.reduce(
    (total: number, course) => total + course.exerciseCount,
    0
  );
  return (
    <p>
      <br />
      Number of exercises {total}
    </p>
  );
};
