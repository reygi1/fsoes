const express = require('express');
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (res: any) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: any, res: any) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height,weight);
    
    if(bmi.includes('error'))
    {
        res.json({ error: "malformatted parameters"});
    }
    else {
    res.json({
        weight,
        height,
        bmi });
    }    
  });


app.post('/exercises', (req: any, res: any) => {
  const body = req.body;
  if(!body || !body.daily_exercises || !body.target)
    return res.json({ error: "parameters missing" });
  
  const exer = calculateExercises(body.daily_exercises, body.target);
  if(!exer.average) 
      return res.json({ error: "malformatted parameters"});
    else
      return res.json(exer);
  
});  

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});