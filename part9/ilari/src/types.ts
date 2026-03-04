export type weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
id:number;
date:string;
weather:weather;
visibility: visibility;
comment?:string;
}
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;