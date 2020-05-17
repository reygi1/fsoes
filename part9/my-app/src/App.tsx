import React from 'react';
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

interface CoursePartBaseDesc extends CoursePartBase{
    description: string;
}
interface CoursePartOne extends CoursePartBaseDesc {
    name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseDesc {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseDesc {
    name: "part 4";
    exerciseSubmit: string;
}

export const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const App: React.FC = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
          name: "Fundamentals",
          exerciseCount: 10,
          description: "This is an awesome course part"
        },
        {
          name: "Using props to pass data",
          exerciseCount: 7,
          groupProjectCount: 3
        },
        {
          name: "Deeper type usage",
          exerciseCount: 14,
          description: "Confusing description",
          exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
        },
        {
          name: "part 4",
          exerciseCount: 5,
          description: "Desc23",
          exerciseSubmit: "Submitted"
        }
      ];
  
    return (
      <div>
       <Header name={courseName}/>
       <Content courseParts={courseParts}/>
       <Total courseParts={courseParts}/>
      </div>
    );
  };

export default App;