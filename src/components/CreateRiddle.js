import React, { useState} from 'react';
import { FormControl, Button, Input, InputLabel, FormHelperText} from '@mui/material';

function CreateRiddle () {

    const [user, setUser] = useState('RiddleLocker');
    const [riddle, setRiddle] = useState('');
    const [lockername, setLockername] = useState('');
    const [answer, setAnswer] = useState('');
    const [secret, setSecret] = useState('');
    const [data, setData] = useState('');

    async function Submit() {
    
        console.log(secret);
        const { response } = await( await fetch(`/api/AddRiddle?` + 
            new URLSearchParams({
                user: user,
                riddle: riddle,
                lockername: lockername,
                answer: answer,
                secret: secret
                }),
            {method: "POST"}
        ));
        setUser(user)
        setData(response)
        
    };

    return (
      <div>
        <span>This is where you create a riddle!</span>
        <br/>

        <div>
            <FormControl>
                <InputLabel htmlFor="locker-name-input">Locker Name</InputLabel>
                <Input id="locker-name-input" aria-describedby="locker-name-helper-text" onChange={ (e) => setLockername(e.target.value) }/>
                <FormHelperText id="locker-name-helper-text">Must be a unique name.</FormHelperText>
            </FormControl>
        </div>
        <br/>
        <div>
            <FormControl>
                <InputLabel htmlFor="riddle-input">Riddle</InputLabel>
                <Input id="riddle-input" aria-describedby="riddle-helper-text" onChange={ (e) => setRiddle(e.target.value) }/>
                <FormHelperText id="riddle-helper-text">What riddle will be on the locker?</FormHelperText>
            </FormControl>
        </div>
        <br/>
        <div>
            <FormControl>
                <InputLabel htmlFor="passcode-input">Passcode</InputLabel>
                <Input id="passcode-input" aria-describedby="passcode-helper-text" onChange={ (e) => setAnswer(e.target.value) }/>
                <FormHelperText id="passcode-helper-text">What phrase will open the locker?</FormHelperText>
            </FormControl>
        </div>
        <br/>
        <div>
            <FormControl>
                <InputLabel htmlFor="secret-input">Secret</InputLabel>
                <Input id="secret-input" aria-describedby="secret-helper-text" onChange={ (e) => setSecret(e.target.value) }/>
                <FormHelperText id="secret-helper-text">What is being stored in the locker?</FormHelperText>
            </FormControl>
        </div>
        <br/>
        <div>
            <FormControl>
                <Button onClick={(e) => Submit() }>Submit</Button>
            </FormControl>
        </div>
        <div>
            {data}
        </div>
      </div>
      
    )
  
}
export default CreateRiddle;