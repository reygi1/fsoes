import { NewPatient, Gender} from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };


const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

const parseString = (text: any): string => {
    if(!text || !isString(text)){
        throw new Error('Invalid input:' + text);
    }   
    return text;
};
const parseGender = (gender: any): Gender => {
if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
} 
return gender;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };


const toNewPatientEntry = (object: any): NewPatient => {
    const newEntry: NewPatient = {
        name: parseString(object.name), 
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn), 
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: []
    };
    
    return newEntry;
  } ;

  
export default toNewPatientEntry;