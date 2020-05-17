import React from "react";
import { CoursePart, assertNever } from '../App';

const Part: React.FC<{part: CoursePart}>= ({part}) => {
    switch(part.name){
        case "Fundamentals":
            return(<div>
            {part.name} {part.exerciseCount} {part.description}
            </div>);
        case "Using props to pass data":
            return(<div>
               {part.name} {part.exerciseCount} {part.groupProjectCount} 
            </div>);
        case "Deeper type usage":
            return(<div>
                 {part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}
            </div>);
        case "part 4":
            return(<div>
                 {part.name} {part.exerciseCount} {part.description} {part.exerciseSubmit}
            </div>);
        default:
            return assertNever(part);
    }
};


export default Part;