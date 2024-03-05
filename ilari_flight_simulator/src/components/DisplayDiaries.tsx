import { SensitiveDiaryEntry } from "../types";

const DisplayDiary = ({ diary }: { diary: SensitiveDiaryEntry }) => {
  return (
    <>
      <h2>{diary.date}</h2>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </>
  );
};

const DisplayDiaries = ({ diaries }: { diaries: SensitiveDiaryEntry[] }) => {
  return (
    <>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <DisplayDiary diary={diary} />
        </div>
      ))}
    </>
  );
};

export default DisplayDiaries;
