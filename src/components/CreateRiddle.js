import React, { useState, useEffect, useCallback } from 'react';
import {
  FormControl,
  Button,
  InputLabel,
  FormHelperText,
  Input,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Container, Heading, ErrorMessage } from '../styles/FormStyles';

function CreateRiddle() {
  const [riddle, setRiddle] = useState('');
  const [lockerName, setLockerName] = useState('');
  const [passcode, setPasscode] = useState('');
  const [secret, setSecret] = useState('');
  const [data, setData] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionSuccessful, setSubmissionSuccessful] = useState(false);

  const [validRiddle, setValidRiddle] = useState(true);
  const [validLockerName, setValidLockerName] = useState(true);
  const [validPasscode, setValidPasscode] = useState(true);
  const [validSecret, setValidSecret] = useState(true);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateLockerName = useCallback((lockerName) => {
    return lockerName.length >= 1 && lockerName.length <= 30 && !lockerName.includes(' ') && isValidQueryParameter(lockerName);
  }, []);

  const validateForm = useCallback(() => {
    setValidLockerName(validateLockerName(lockerName));
    setValidRiddle(validateRiddle(riddle));
    setValidPasscode(validatePasscode(passcode));
    setValidSecret(validateSecret(secret));
  }, [lockerName, riddle, passcode, secret, validateLockerName]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  function isValidQueryParameter(str) {
    if (!str) {
      return false;
    }
  
    const forbiddenChars = ['&', '=', '?', '#'];
    if (forbiddenChars.some(char => str.includes(char))) {
      return false;
    }
  
    const firstChar = str.charAt(0);
    if (!/[a-zA-Z_]/.test(firstChar)) {
      return false;
    }
  
    const allowedChars = /[a-zA-Z0-9\-_.~]/;
    for (let i = 1; i < str.length; i++) {
      if (!allowedChars.test(str.charAt(i))) {
        return false;
      }
    }
    return true;
  }

  async function Submit() {
    setFormSubmitted(true);
    validateForm();

    const formIsValid = isFormValid();
    if (formIsValid) {
      setIsError(false);
      fetch(`api/AddLocker/?` +
        new URLSearchParams({
          user: 'RiddleLocker',
          riddle: riddle,
          lockername: lockerName,
          answer: passcode,
          secret: secret,
        }), { method: 'POST' })
        .then((response) => {
          if (!response.ok && response.status !== 200) {
            throw new Error('Invalid response');
          }
          return response.json();
        })
        .then((r) => {
          console.log('Response:');
          console.log(r);
          setData(r.url);
          setSubmissionSuccessful(true);
          setIsError(false);
        })
        .catch((error) => {
          console.log('Error:');
          console.log(error);
          setIsError(true);
          setErrorMessage('Error connecting. Please try again later!');
        });
    } else {
      setIsError(true);
      setErrorMessage('Make sure the form is filled out correctly.');
    }
  }


  function handleLockerName(lockerName) {
    setValidLockerName(validateLockerName(lockerName));
    setLockerName(lockerName);
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
  
  function isFormValid() {
    return validLockerName && validPasscode && validRiddle && validSecret;
  }

  return (
    <Container>
      <Heading variant="h4">Create a locker!</Heading>
      <div>
        <FormControl fullWidth>
          <InputLabel required htmlFor="locker-name-input">
            Locker Name
          </InputLabel>
          <Input
            id="locker-name-input"
            aria-describedby="locker-name-helper-text"
            onChange={(e) => handleLockerName(e.target.value)}
            error={formSubmitted && !validLockerName}
            disabled={submissionSuccessful}
          />
          <FormHelperText id="locker-name-helper-text">
            Must be a unique name. Cannot include spaces. Up to 30 characters.
          </FormHelperText>
        </FormControl>
      </div>
      <br />
      <div>
        <FormControl fullWidth>
          <InputLabel required htmlFor="riddle-input">
            Riddle
          </InputLabel>
          <Input
            id="riddle-input"
            aria-describedby="riddle-helper-text"
            onChange={(e) => handleRiddle(e.target.value)}
            error={formSubmitted && !validRiddle}
            disabled={submissionSuccessful}
          />
          <FormHelperText id="riddle-helper-text">
            What riddle will be on the locker?
          </FormHelperText>
        </FormControl>
      </div>
      <br />
      <div>
        <FormControl fullWidth required>
          <InputLabel htmlFor="passcode-input">Passcode</InputLabel>
          <Input
            id="passcode-input"
            aria-describedby="passcode-helper-text"
            onChange={(e) => handlePasscode(e.target.value)}
            error={formSubmitted && !validPasscode}
            autoComplete='off'
            disabled={submissionSuccessful}
          />
          <FormHelperText id="passcode-helper-text">
            What phrase will open the locker?
          </FormHelperText>
        </FormControl>
      </div>
      <br />
      <div>
        <FormControl fullWidth>
          <InputLabel required htmlFor="secret-input">
            Secret
          </InputLabel>
          <Input
            required
            id="secret-input"
            aria-describedby="secret-helper-text"
            onChange={(e) => handleSecret(e.target.value)}
            error={formSubmitted && !validSecret}
            autoComplete='off'
            disabled={submissionSuccessful}
          />
          <FormHelperText id="secret-helper-text">
            What is being stored in the locker?
          </FormHelperText>
        </FormControl>
      </div>
      <br />
      <div>
        <FormControl fullWidth>
          <Button onClick={(e) => Submit()} variant="contained" disabled={submissionSuccessful}> 
            Submit
          </Button>
        </FormControl>
      </div>
      {isError && (
        <ErrorMessage variant="body2">{errorMessage}</ErrorMessage>
      )}
      {data && (
        <div>
          <Typography variant="body2">Locker successfully created!</Typography>
          <Button variant='outlined' color='text' style={{borderColor:'white'}} href={data}>
            See your locker
          </Button>
        </div>
      )}
    </Container>
  );
}

export default CreateRiddle;
