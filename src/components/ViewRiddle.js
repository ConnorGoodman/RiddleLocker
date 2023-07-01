import React, { useState, useEffect } from 'react';
import { FormControl, Button, Input, FormHelperText, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import openlock from '../images/unlocked.jpg';
import closedlock from '../images/locked.jpg';

const PageContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  fontFamily: 'Avenir, sans-serif',
  padding: '2rem',
}));

const SectionContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.locker.background,
  borderRadius: '8px',
  padding: '2rem',
  textAlign: 'center',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.4)',
  maxWidth: '600px',
}));

const EngravedText = styled('h1')(({ theme }) => ({
  fontFamily: 'Avenir, sans-serif',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: theme.palette.locker.text,
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  letterSpacing: '2px',
}));

const LineDivider = styled('hr')(({ theme }) => ({
  border: 0,
  borderTop: `1px solid ${theme.palette.text.main}`,
  margin: '2rem 0',
}));

const ImageContainer = styled('div')({
  marginTop: '2rem',
});

const Image = styled('img')({
  width: '200px',
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
  //const [data, setData] = useState({ Riddle: 'What is the answer to life, the universe, and everything? Also, what are your thoughts on blahahahahhahaahahwhdhawdhahdahdhw and stuff? Ok cool!', Secret: '42', Locker: '1'});
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
      });
  };

  const theme = useTheme();

  return (
    <PageContainer>
      <SectionContainer>
        {data && (
          <div>
            <EngravedText>{locker.toUpperCase()}</EngravedText>
            <LineDivider />
            <Typography variant="h5" component="h2" gutterBottom style={{ color: theme.palette.locker.text }}>
              The Riddle Is:
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom style={{ color: theme.palette.locker.text }}>
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
                <Button onClick={handleSubmit} style={{color:theme.palette.locker.text}}>Submit</Button>
              </FormControl>
            )}

            {!showSecret && (
              <div>
                <ImageContainer>
                  <Image src={closedlock} alt="locked padlock" />
                </ImageContainer>
              </div>
            )}

            {showIncorrect && (
              <Typography variant="h6" component="div" color="error">Incorrect! Try again!</Typography>
            )}

            {showSecret && (
              <div>
                <ImageContainer>
                  <Image src={openlock} alt="unlocked padlock" />
                </ImageContainer>
              </div>
            )}

            {showSecret && (
              <div>
                <Typography variant="h5" component="h2" gutterBottom style={{ color: theme.palette.locker.text }}>
                  Correct! Unveiling the secret:
                </Typography>
                <br />
                <Typography variant="h6" component="div" style={{ color: theme.palette.locker.text }}>
                  {secret}
                </Typography>
              </div>
            )}
          </div>
        )}
        {isLoading && (
          <Typography variant="h5" component="h2" style={{ color: theme.palette.locker.text }}>
            Loading Riddle
          </Typography>
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
