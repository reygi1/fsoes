import React from "react";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";

const PatientPage: React.FC = () => {
  const [{ patients }] = useStateValue();
  
  console.log(patients);

  const { id } = useParams<{ id: string }>();

  if(!patients){
      return <div>loading</div>;
  }
  else{
      for ( const i in patients){
          if(i === id)
          {
          return (<>
          <div>
              {patients[i].name}
          </div>
           <div>
                ssn:{patients[i].ssn}
            </div>
                <div>
                occupation: {patients[i].occupation}
            </div>
            <div>
            gender:{patients[i].gender}
        </div>
        </> );
          }
      }
  }


return null;
};
export default PatientPage;
