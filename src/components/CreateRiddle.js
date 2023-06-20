import React, { useState, useEffect, useCallback} from 'react';
import { FormControl, Button, InputLabel, FormHelperText, Input} from '@mui/material';
import { Link } from 'react-router-dom';

function CreateRiddle () {

    //const [user, setUser] = useState('RiddleLocker');
    const [riddle, setRiddle] = useState('');
    const [lockerName, setLockerName] = useState('');
    const [passcode, setPasscode] = useState('');
    const [secret, setSecret] = useState('');
    const [data, setData] = useState('');

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [validRiddle, setValidRiddle] = useState(true);
    const [validLockerName, setValidLockerName] = useState(true);
    const [validPasscode, setValidPasscode] = useState(true);
    const [validSecret, setValidSecret] = useState(true);
    //const [validData, setValidData] = useState(true);

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    const validateForm = useCallback(() => {
        setValidLockerName(validateLockerName(lockerName));
        setValidRiddle(validateRiddle(riddle));
        setValidPasscode(validatePasscode(passcode));
        setValidSecret(validateSecret(secret));
    }, [lockerName, riddle, passcode, secret]);

    useEffect(() => {
        validateForm();
      }, [validateForm]);
    
    async function Submit() {
        setFormSubmitted(true);
        validateForm();

        const formIsValid = isFormValid();
        if (formIsValid) {
            setIsError(false)
            fetch(`api/AddLocker/?` + 
            new URLSearchParams({
            user: 'RiddleLocker',
            riddle: riddle,
            lockername: lockerName,
            answer: passcode,
            secret: secret
            }),
            {method: "POST"})
            .then((response) => {
                if (!response.ok && response.status !== 200) {
                    throw new Error('Invalid response');
                }
                return response.json();
            })
            .then((r) => {
                console.log('Response:')
                console.log(r)
                setData(r.url);
                setIsError(false);
            })
            .catch((error) => {
                console.log('Error:');
                console.log(error);
                setIsError(true);
                setErrorMessage("Error connecting. Please try again later!");
            });
        }
        else {
            setIsError(true);
            setErrorMessage("Make sure form is filled out correctly.")
        }
        
    };

    

    function isFormValid() {
        return validLockerName && validPasscode && validRiddle && validSecret;
    }   

    function handleLockerName(lockerName) {
        setValidLockerName(validateLockerName(lockerName));
        setLockerName(lockerName);
    }

    function validateLockerName(lockerName) {
        return lockerName.length >= 1 && !lockerName.includes(' ');
    }

    function handleRiddle(riddle) {
        setValidRiddle(validateRiddle(riddle));
        setRiddle(riddle);
    }

    function validateRiddle(riddle) {
        return riddle.length >= 1;
    }

    function handlePasscode(passcode) {
        setValidPasscode(validatePasscode(passcode));
        setPasscode(passcode);
    }

    function validatePasscode(passcode) {
        return passcode.length >= 1;
    }

    function handleSecret(secret) {
        setValidSecret(validateSecret(secret));
        setSecret(secret);
    }

    function validateSecret(secret) {
        return secret.length >= 1;
    }

    return (
      <div>
        <h2>This is where you create a locker!</h2>
        <div>
            <FormControl>
                <InputLabel required htmlFor="locker-name-input">Locker Name</InputLabel>
                <Input id="locker-name-input" aria-describedby="locker-name-helper-text" onChange={ (e) => handleLockerName(e.target.value) } error={formSubmitted && !validLockerName} />
                <FormHelperText id="locker-name-helper-text">Must be a unique name. Can not include spaces.</FormHelperText>
            </FormControl>
        </div>
        <br/>
        <div>
            <FormControl>
                <InputLabel required htmlFor="riddle-input">Riddle</InputLabel>
                <Input id="riddle-input" aria-describedby="riddle-helper-text" onChange={ (e) => handleRiddle(e.target.value) } error={formSubmitted && !validRiddle} />
                <FormHelperText id="riddle-helper-text">What riddle will be on the locker?</FormHelperText>
            </FormControl>
        </div>
        <br/>
        <div>
            <FormControl required>
                <InputLabel htmlFor="passcode-input">Passcode</InputLabel>
                <Input id="passcode-input" aria-describedby="passcode-helper-text" onChange={ (e) => handlePasscode(e.target.value) } error={formSubmitted && !validPasscode}/>
                <FormHelperText id="passcode-helper-text">What phrase will open the locker?</FormHelperText>
            </FormControl>
        </div>
        <br/>
        <div>
            <FormControl>
                <InputLabel required htmlFor="secret-input">Secret</InputLabel>
                <Input required id="secret-input" aria-describedby="secret-helper-text" onChange={ (e) => handleSecret(e.target.value) } error={formSubmitted && !validSecret}/>
                <FormHelperText id="secret-helper-text">What is being stored in the locker?</FormHelperText>
            </FormControl>
        </div>
        <br/>
        <div>
            <FormControl>
                <Button onClick={(e) => Submit() }>Submit</Button>
            </FormControl>
        </div>
        {isError &&
        <div>
            {errorMessage}
        </div>
        }
        {data &&
            <div>
                <Link to={data}>See your locker</Link>
            </div>
        }
      </div>
      
    )
  
}
export default CreateRiddle;