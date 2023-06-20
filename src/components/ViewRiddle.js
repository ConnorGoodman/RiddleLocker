import React, { useState, useEffect } from 'react';
import { FormControl, Button, Input, FormHelperText} from '@mui/material';
import openlock from '../images/unlocked.jpg'
import closedlock from '../images/locked.jpg'

function ViewRiddle() {
    const [data, setData] = useState();
    const [answer, setAnswer] = useState();
    const [locker, setLocker] = useState();
    const [secret, setSecret] = useState();
    const [showIncorrect, setShowIncorrect] = useState(false);
    const [showSecret, setShowSecret] = useState(false);

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      (async function () {
        const queryParams = new URLSearchParams(window.location.search);
    
        setLocker(queryParams.get('locker'));
        try {
          const response = await fetch(`api/GetLocker?` + new URLSearchParams({
            locker: queryParams.get('locker')
          }));
          
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error('Locker not found');
            } else {
              throw new Error("Can't connect to server");
            }
          }
          
          const text = await response.json();
          setData(text);
          console.log(text);
        } catch (error) {
          setIsLoading(false);
          setIsError(true);
          setErrorMessage(error.message);
          console.log('Error:', error);
        }
      })();
    }, []);

    async function Submit() {
        
      fetch(`api/TryGetSecret/?` + 
          new URLSearchParams({
          locker: locker,
          answer: answer
          }),
          {method: "POST"})
          .then((response) => response.json()).then((r) => {
              console.log('Response:', r)
              if (r.isCorrect) {
                setSecret(r.Secret);
                setShowIncorrect(false)
                setShowSecret(true)
              }
              else {
                setShowIncorrect(true)
                setShowSecret(false)
              }
              
           })
          .catch((error) => {
              console.log('error: ' + error);
              return;
          });

  };
    
    return (

        <div>
          {data && 
          (<div>
            <h1>Locker: {locker}</h1>
            <h2>The Riddle Is:</h2>
            <h2>{data.Riddle}</h2>
            <br/>
            <FormControl>
                <Input id="passcode-input" aria-describedby="passcode-helper-text" onChange={ (e) => setAnswer(e.target.value) }/>
                <FormHelperText id="passcode-helper-text">Enter your guess</FormHelperText>
            </FormControl>

            {!showSecret && 
            (<FormControl>
                <Button onClick={(e) => Submit() }>Submit</Button>
            </FormControl>)}
            
            {!showSecret && (
              <div>
                <br/>
                <img src={closedlock} alt="locked padlock"></img>
                <br/>
              </div>
            )}

            {showSecret && (
              <div>
                <br/>
                <img src={openlock} alt="unlocked padlock"></img>
                <br/>
              </div>
            )}

            {showIncorrect && (<div>
              Incorrect! Try again!
            </div>)}

            {showSecret && (<div>
              <h2>Correct! Unveiling the secret:</h2>
              <br/>
              <span>{secret}</span>
            </div>)}

            </div>)
          }
          {
            isLoading && (<h2>Loading Riddle</h2>)
          }
          {
            isError && (<h2>{errorMessage}</h2>)
          }
        </div>
    )
    

    
}
export default ViewRiddle;