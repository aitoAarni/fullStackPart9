import React, { useEffect, useState } from "react";
import { toDiaryEntry } from "../utils";
import { postNewDiary } from "../fetch_utils/diaries";
import { SensitiveDiaryEntry } from "../types";
import axios from "axios";

interface Props {
  diaries: SensitiveDiaryEntry[];
  setDiaries: React.Dispatch<React.SetStateAction<SensitiveDiaryEntry[]>>;
}

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

const Alert = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clear the timeout when the component unmounts or when message changes
    return () => clearTimeout(timeout);
  }, [message, onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "red",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        zIndex: "999", // Ensure the alert is above other content
      }}
    >
      {message}
    </div>
  );
};

const CreateEntry = ({ diaries, setDiaries }: Props): React.JSX.Element => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("poor");
  const [weather, setWeather] = useState("rainy");
  const [comment, setComment] = useState("spanking hot");
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const diaryEntry = toDiaryEntry({
        date,
        visibility,
        weather,
        comment,
      });
      const newDiary = await postNewDiary(diaryEntry);
      setDiaries(diaries.concat(newDiary));
      setErrorMessage(null);
      setVisibility("poor");
      setWeather("rainy");
      setComment("spanking");
    } catch (err) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(err)) {
        const message =
          err.response && typeof err.response.data === "string"
            ? err.response.data
            : "A server error occurred";
        setErrorMessage(message);
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };
  const closeAlert = () => {
    setErrorMessage(null);
  };
  return (
    <>
      {errorMessage && <Alert message={errorMessage} onClose={closeAlert} />}
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Visibility &nbsp;&nbsp;&nbsp; great
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("great")}
          />
          {" good"}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("good")}
          />
          {" ok"}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("ok")}
          />
          {" poor"}
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("poor")}
          />
        </label>
        <br />
        <label>
          Weather &nbsp;&nbsp;&nbsp;
          {["sunny", "rainy", "cloudy", "stormy", "windy"].map((val) => {
            return (
              <label key={val}>
                {val}
                <input
                  type="radio"
                  name="weather"
                  onChange={() => setWeather(val)}
                />
              </label>
            );
          })}
        </label>
        <br />
        <label>
          Comment:
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" />
      </form>
    </>
  );
};

export default CreateEntry;
