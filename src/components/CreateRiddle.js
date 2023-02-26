import React, { useState, useEffect } from 'react';
import { FormControl, Button } from '@mui/material';

function CreateRiddle () {

    const [data, setData] = useState('');

    async function Submit(_user, _riddlename, _riddle, _answer, _secret) {
    
        const { text } = await( await fetch(`/api/AddRiddle?` + 
            new URLSearchParams({
                user: _user,
                riddle: _riddle,
                riddlename: _riddlename,
                answer: _answer,
                secret: _secret
                }),
            {method: "POST"}
        ));
        setData(text);
    };

    return (
      <div>
        This is where you create a riddle!
        <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>
        
      </div>
    )
  
}
export default CreateRiddle;