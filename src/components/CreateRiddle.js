import React, { useState, useEffect, useCallback } from 'react';
import {
  FormControl,
  Button,
  InputLabel,
  FormHelperText,
  Input,
  Typography,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const Container = styled(Box)(({ theme }) => ({
  padding: '60px',
  marginTop: theme.spacing(4),
  backgroundColor: '#eeeeee',
  maxWidth: '500px',
  margin: '0 auto',
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(2),
}));

function CreateRiddle() {
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

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
          />
          <FormHelperText id="locker-name-helper-text">
            Must be a unique name. Cannot include spaces.
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
          />
          <FormHelperText id="secret-helper-text">
            What is being stored in the locker?
          </FormHelperText>
        </FormControl>
      </div>
      <br />
      <div>
        <FormControl fullWidth>
          <Button onClick={(e) => Submit()} variant="contained">
            Submit
          </Button>
        </FormControl>
      </div>
      {isError && (
        <ErrorMessage variant="body2">{errorMessage}</ErrorMessage>
      )}
      {data && (
        <div>
          <Link to={data}>See your locker</Link>
        </div>
      )}
    </Container>
  );
}

export default CreateRiddle;
