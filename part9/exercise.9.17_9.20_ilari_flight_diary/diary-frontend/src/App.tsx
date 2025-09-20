import { useEffect, useState, type SetStateAction } from 'react';
import type { Diary } from './types';
import { createDiary, getAllDiaries } from './services/diaryService';


function App() {
  const [diary , setDiary] = useState<Diary[]>([ ]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const [weather, setSWeathert] = useState("");

  const handleWeatherChange =(event: { target: { value: SetStateAction<string>; }; })=> {
      setWeather(event.target.value);
  }
  const handleVisibilityChange =(event: {target: {value: SetStateAction<string>;};})=> {
    setVisibility(event.target.value)
  }
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
      setWeather("");
      setVisibility('');
    });
  };

  return (
    <>
      <h1>
        Add new entry
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date</label>
          <input type="date"  value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          visibility
            <label htmlFor="visibility">
              <input type="radio"
              name="visibility"
              value="great"
              checked={visibility === "great"} 
              onChange={handleVisibilityChange}/>
              great
            </label>
            <label htmlFor="visibility">
              <input type="radio"
              name="visibility"
              value="good"
              checked={visibility === "good"} 
              onChange={handleVisibilityChange}/>
              good
            </label>
            <label htmlFor="visibility">
              <input type="radio"
              name="visibility"
              value="ok"
              checked={visibility === "ok"} 
              onChange={handleVisibilityChange}/>
              ok
            </label>
            <label htmlFor="visibility">
              <input type="radio"
              name="visibility"
              value="poor"
              checked={visibility === "poor"} 
              onChange={handleVisibilityChange}/>
              poor
            </label>
          </div>
        <div>
          weather
          <label htmlFor="weather">
          <input
           type="radio"
           name="weather" 
           value="stormy"
           checked={weather === "stormy"}
           onChange={handleWeatherChange}
           /> 
           stormy
          </label>
          <label htmlFor="weather">
            <input
              type='radio'
              name="weather"
              value="sunny"
              checked={weather === "sunny"}
              onChange={handleWeatherChange}
              />
              sunny
        </label>
          <label htmlFor="weather">
            <input
             type="radio"
             name="weather"
             value="windy"
             checked={weather === "windy"}
             onChange={handleWeatherChange}
             />
             windy
          </label>
          <label htmlFor="weather">
            <input type="radio"
            name='weather'
            value="cloudy"
            checked={weather === "cloudy"}
            onChange={handleWeatherChange}
           />
           cloudy
          </label>
          <label htmlFor="weather">
            <input type="radio"
            name='weather'
            value="rainy"
            checked={weather === "rainy"}
            onChange={handleWeatherChange} />
            rainy
          </label>
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>
<div>
    <h1>
      Diary entries
    </h1>
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
</div>
    </>
  );
}

export default App;