import { useEffect, useState, type SetStateAction } from 'react';
import type { Diary } from './types';
import { createDiary, getAllDiaries } from './services/diaryService';


function App() {
  const [diary , setDiary] = useState<Diary[]>([ ]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');


  useEffect(() => {
    getAllDiaries()
      .then( (data: SetStateAction<Diary[]>) => {
        setDiary(data);
      })
  })

    const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryObject = {
      date,
      comment,
      weather,
      visibility,
    };

    createDiary(diaryObject).then((data) => {
      setDiary(diary.concat(data)); 
      setDate('');
      setComment('');
      setWeather('');
      setVisibility('');
    });
  };

  return (
    <>
      <div>The Diary Application</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date</label>
          <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="visibility">Visibility</label>
          <input type="text" value={visibility} onChange={(e) => setVisibility(e.target.value)} />
        </div>
        <div>
          <label htmlFor="weather">Weather</label>
          <input type="text" value={weather} onChange={(e) => setWeather(e.target.value)} />
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">Record</button>
      </form>

      <ul>
        {diary.map((d) => (
          <p key={d.id}>
            <strong>{d.date}</strong>
            <br />
            Visibility: {d.visibility} <br />
            Weather: {d.weather}
          </p>
        ))}
      </ul>
    </>
  );
}

export default App;