// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type NoSSNPatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
  }


  export interface Entry {
    id: string;
    type: EntryType;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose["code"]>;
  }
  
  export enum EntryType {
    HealthCheck = "HealthCheck",
    OccupationalHealthCare = "OccupationalHealthcare",
    Hospital = "Hospital",
  }
  
  interface SickLeave {
    startDate: string;
    endDate: string;
  }
  
  export interface OccupationalHealthCareEntry extends Entry {
    type: EntryType.OccupationalHealthCare;
    employerName: string;
    sickLeave?: SickLeave;
  }
  
  interface Discharge {
    date: string;
    criteria: string;
  }
  
  export interface HospitalEntry extends Entry {
    type: EntryType.Hospital;
    discharge: Discharge;
  }