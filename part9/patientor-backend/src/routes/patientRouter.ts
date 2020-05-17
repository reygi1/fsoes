import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, toNewEntry from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getNoSSNEntries());
});

patientRouter.post('/', (req, res) => {
 try{
    const newPatientEntry = toNewPatientEntry(req.body);
    const newPatient = patientService.addPatient(newPatientEntry);
    res.json(newPatient);
 }
 catch (e) {
    res.status(400).send(e.message); 
 }
});

patientRouter.get('/:id', (req, res) => {
   const patient= patientService.findById((req.params.id));
 
   if (patient) {
     res.send(patient);
   } else {
     res.sendStatus(404);
   }
 });

export default patientRouter;