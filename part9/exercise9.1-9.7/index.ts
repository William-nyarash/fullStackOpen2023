import express, {Request, Response} from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());
app.use (express.urlencoded({extended: true}));


interface ExerciseBody {
  daily_exercise:number[],
  target:number[]
}
app.get('/hello', (_req, res)=>{
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);

    if(isNaN(weight) || isNaN(height)) res.status(400).send({error: "malformatted parameters"});
  
    const prognosis = calculateBmi(height, weight);
    res.send({
      weight,
      height,
      bmiResults: prognosis
    });
  });

  app.post('/exercises', (req,res )=> {
     const {daily_exercise, target} = req.body as ExerciseBody;

     if(!daily_exercise || target === undefined) {
       res.status(400).json({error: "parameters missing"});
     }
     

       if (!Array.isArray(daily_exercise) || !daily_exercise.every((h) => typeof h === 'number') || typeof target !== 'number') {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }
   
    const results =  calculateExercises(daily_exercise,target);
    res.send(results);
  });
const port = 3002;

app.listen(port, ()=>{
    console.log("server is running on ", port);
});