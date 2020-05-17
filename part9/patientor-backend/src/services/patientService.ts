import patientData from '../../data/patients.json';
import { Patient, NoSSNPatient, NewPatient, Entry } from '../types';
import {v4 as uuid } from "uuid";

const patients: Array<any> = patientData;

const getEntries = (): Patient[] => {
    return patients;
};

const getNoSSNEntries = (): NoSSNPatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, entries})=> ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addPatient = ( entry: NewPatient ): Patient => {
    const newPatientEntry = {
      id: uuid(), entries: [] as Entry[],
      ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
  };

const findById = (id: string): Patient | undefined => {
    const entry = patients.find(d => d.id === id);
    return  entry;
};

const addEntry = (patient: Patient, newEntry: NewPatient): Patient => {
    const entry: Entry = { ...newEntry, 
        id: uuid() };
    const patientWithE = { ...patient, 
        entries: patient.entries.push(entry) };
    patients.map((p) =>
      p.id === patientWithE.id ? patientWithE : p
    );
  
    return patientWithE;
  };

  
export default {
    getEntries,
    getNoSSNEntries,
    addPatient,
    findById,
    addEntry
};