import diaries from "../../data/entries";
import { DiaryEntry, NonSensitiveDiaryEntry } from "../types";

const getEntries = ():DiaryEntry[] => {
  return diaries;
};
const getNonSensitiveDiaryEntries =():NonSensitiveDiaryEntry[] =>{
    return diaries.map(({id, weather, visibility, date}) =>({
        id,
        weather,
        date,
        visibility
    }));
};

const addDiary =()=> {
    return null;
};

export default {
    getEntries,
    addDiary,
    getNonSensitiveDiaryEntries
};
