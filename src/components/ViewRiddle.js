import React, { useState, useEffect } from 'react';
import { FormControl, Button, Input, InputLabel, FormHelperText} from '@mui/material';

function ViewRiddle() {
    const [data, setData] = useState();
    const [answer, setAnswer] = useState();
    const [locker, setLocker] = useState();
    const [secret, setSecret] = useState();
    const [showIncorrect, setShowIncorrect] = useState(false);
    const [showSecret, setShowSecret] = useState(false);

    useEffect(() => {
      (async function () {

        const queryParams = new URLSearchParams(window.location.search);

        setLocker(queryParams.get('locker'))
        let text = await( await fetch(`api/GetLocker?` + new URLSearchParams({
          locker: queryParams.get('locker')
        }))).json();
          setData(text);
          console.log(text);
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
          {data ? 
          (<div>
            <span>{data.Riddle}</span>
            <FormControl>
                <InputLabel htmlFor="passcode-input">Answer</InputLabel>
                <Input id="passcode-input" aria-describedby="passcode-helper-text" onChange={ (e) => setAnswer(e.target.value) }/>
                <FormHelperText id="passcode-helper-text">Passkey to open the locker</FormHelperText>
            </FormControl>

            {!showSecret && 
            (<FormControl>
                <Button onClick={(e) => Submit() }>Submit</Button>
            </FormControl>)}
            

            {showIncorrect && (<div>
              Incorrect! Try again!
            </div>)}

            {showSecret && (<div>
              <span>Correct! Unveiling the secret:</span>
              <br/>
              <span>{secret}</span>
            </div>)}

            </div>) : 
          (<div>Loading Riddle</div>)}
        </div>
    )
    

    
}
export default ViewRiddle