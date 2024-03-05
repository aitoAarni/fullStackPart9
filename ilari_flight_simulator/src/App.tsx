import { useEffect, useState } from "react";
import CreateEntry from "./components/CreateEntry";
import { SensitiveDiaryEntry } from "./types";
import { getAllDiaries } from "./fetch_utils/diaries";
import DisplayDiaries from "./components/DisplayDiaries";

function App() {
  const [diaries, setDiaries] = useState<SensitiveDiaryEntry[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      return await getAllDiaries();
    };
    fetchData().then((newDiaries) => setDiaries(newDiaries));
  }, []);
  return (
    <>
      <CreateEntry diaries={diaries} setDiaries={setDiaries} />
      <h1>Diary Entries</h1>
      <DisplayDiaries diaries={diaries} />
    </>
  );
}

export default App;
