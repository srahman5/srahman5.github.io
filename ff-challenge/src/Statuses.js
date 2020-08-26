import React, {useState} from 'react';
import './Statuses.css'

const apiNames = ['accounts', 'assets', 'customers', 'datapoints', 'devices',
  'documents', 'forms', 'invites', 'media', 'messages', 'namespaces', 'orders',
  'patients', 'relationships', 'rules', 'templates', 'users', 'workflows']

const initialState = {
  latestStatuses: ["test1", "test2", "test3"]
}

function Statuses(){
  const [latestStatuses, setStatuses] = useState(initialState.latestStatuses)

    // Request the health status of each API every 15 seconds
    setInterval(function(){
        getStatuses(apiNames)
    }, 15000)

  function getStatuses(apiNames){
    let responses = [];
    apiNames.forEach((apiName) => {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', 'https://api.factoryfour.com/' + apiName + '/health/status')
      xhr.send()
      console.log(xhr)//responseText property is not empty
      console.log(xhr.responseText)// Why is this empty?
      responses.push(xhr.responseText)
    });

    //Update the latestStatuses in state
    setStatuses(responses)
  }

  //Render a table of the latest statuses according to state
  return(
    <div className="statuses">
    {latestStatuses &&
      latestStatuses.map((status, index) => {
        return (
          <div className="status" key={index}>
            <h2>{status}</h2>
          </div>
        )

      })}
    </div>
  );
}

export default Statuses;
