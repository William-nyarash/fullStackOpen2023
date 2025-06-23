import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res)=>{
    res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);

    if(isNaN(weight) || isNaN(height)) res.status(400).send({error: "malformatted parameters"})
  
    const prognosis = calculateBmi(height, weight);
  
    res.send({
      weight,
      height,
      bmiResults: prognosis
    });
  });

const port = 3002;

app.listen(port, ()=>{
    console.log("server is running");
})