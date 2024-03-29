import React, { useState, useEffect } from 'react';
import { FormControl, Button, Input, FormHelperText, Typography, useTheme, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import openlock from '../images/lock_open_white.svg';
import closedlock from '../images/lock_white.svg';
import { PageContainer, SectionContainer, ImageContainer, LineDivider } from '../styles/LockerStyles';

const Image = styled('img')({
  width: '7rem',
});

const StyledInput = styled(Input)(({ theme }) => ({
  color: theme.palette.locker.text,
  '&:before': {
    borderBottomColor: theme.palette.locker.text,
  },
  '&:after': {
    borderBottomColor: theme.palette.locker.text,
  },
  '&:hover:before': {
    borderBottomColor: theme.palette.locker.text,
  },
}));

const ViewRiddle = () => {
  const [data, setData] = useState();
  const [answer, setAnswer] = useState();
  const [locker, setLocker] = useState();
  const [secret, setSecret] = useState();
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        setIsLoading(false);
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

  const handleSubmit = () => {
    setIsLoading(true); // Start loading animation

    fetch(`api/TryGetSecret/?` +
      new URLSearchParams({
        locker: locker,
        answer: answer
      }),
      { method: "POST" })
      .then((response) => response.json())
      .then((r) => {
        console.log('Response:', r);
        if (r.isCorrect) {
          setSecret(r.Secret);
          setShowIncorrect(false);
          setShowSecret(true);
        } else {
          setShowIncorrect(true);
          setShowSecret(false);
        }
      })
      .catch((error) => {
        console.log('error: ' + error);
        return;
      })
      .finally(() => {
        setIsLoading(false); // Stop loading animation
      });
  };

  const theme = useTheme();

  return (
    <PageContainer>
      <SectionContainer>
        {data && (
          <div>
            <br/>
            <Typography variant="h4" fontSize='1.5rem' component="h1" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 'bold', color: theme.palette.locker.text, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', letterSpacing: '2px', maxWidth: 'min(600px, 95%)', whiteSpace: 'initial' }}>
              {locker.toUpperCase()}
            </Typography>
            <LineDivider />
            <Typography variant="h5" fontSize='1rem' component="h2" gutterBottom style={{ color: theme.palette.locker.text, fontWeight:'bold' }}>
              Answer this riddle:
            </Typography>
            <Typography variant="h5" fontSize='1rem' component="h2" gutterBottom style={{ color: theme.palette.locker.text }}>
              {data.Riddle}
            </Typography>
            <br />
            <FormControl>
              <StyledInput
                id="passcode-input"
                aria-describedby="passcode-helper-text"
                onChange={(e) => setAnswer(e.target.value)}
                autoComplete='off'
              />
              <FormHelperText id="passcode-helper-text" style={{ color: theme.palette.locker.text }}>
                Enter your guess
              </FormHelperText>
            </FormControl>

            {!showSecret && (
              <FormControl>
                <Button onClick={handleSubmit} variant='outlined' color='light_text' style={{borderColor:'white', margin:'1rem'}}>Submit</Button>
              </FormControl>
            )}

            <div>
              <ImageContainer>
                {showSecret ? 
                (<Image src={openlock} alt="locked padlock" />) : 
                (<Image src={closedlock} alt="locked padlock" />)}
              </ImageContainer>
            </div>
            

            {showIncorrect && (
              <Typography variant="h6" component="div" color="error">Incorrect! Try again!</Typography>
            )}

            {showSecret && (
              <div>
                <Typography fontSize='1.5rem' variant="h5" component="h2" gutterBottom style={{ color: theme.palette.locker.text, fontWeight:'bold' }}>
                  Correct! Let's see what was inside this locker:
                </Typography>
                <br />
                <Typography fontSize='1rem' variant="h6" component="div" style={{ color: theme.palette.locker.text, borderBlockColor: theme.palette.locker.text  }}>
                  {secret}
                </Typography>
              </div>
            )}
          </div>
        )}
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <CircularProgress color="light_text" />
          </div>
        )}
        {isError && (
          <Typography variant="h5" component="h2" color="error">
            {errorMessage}
          </Typography>
        )}
      </SectionContainer>
    </PageContainer>
  );
};

export default ViewRiddle;
