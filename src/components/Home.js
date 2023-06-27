import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import lockerphoto from '../images/lockerstockphoto.jpg';
import logo from '../images/logo.svg';
import thinkphoto from '../images/think.jpg';

const Container = styled(Box)(({ theme }) => ({
  padding: '60px',
  marginTop: theme.spacing(4),
  fontSize: 20,
  backgroundColor: theme.palette.locker.main,
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const Image = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '500px',
  height: 'auto',
  marginBottom: theme.spacing(2),
}));

const Paragraph = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontSize: theme.breakpoints.down('sm') ? 16 : 20,
}));


const ListContainer = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontFamily: theme.typography.fontFamily,
}));

const ListItem = styled('li')(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    handleResize(); // Set initial mobile state
    window.addEventListener('resize', handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up event listener on component unmount
    };
  }, []);

  return (
    <Container>
      <Grid container spacing={2} rowGap={3}>
        <Grid item xs={12}>
          <Heading variant="h4">Riddle Locker</Heading>
        </Grid>
        <Grid item xs={12} sm={4} order={isMobile ? 2 : 1}>
          <Image src={logo} alt="riddle locker logo" />
        </Grid>
        <Grid item xs={12} sm={8} order={isMobile ? 1 : 2}>
          <div style={{ textAlign: 'left' }}>
            <Paragraph>
              Create engaging riddles to lock and protect your information. Whether it's passwords,
              secret messages, or confidential documents, Riddle Locker offers a fun and secure way
              to share sensitive information with trusted individuals.
            </Paragraph>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} order={isMobile ? 3 : 3}>
          <div style={{ textAlign: 'left' }}>
            <Paragraph>
              But that's not all! Riddle Locker is also perfect for team building, educational
              purposes, or challenging yourself and others with intricate puzzles. Join our community
              of puzzle enthusiasts, solve riddles, and share your creativity!
            </Paragraph>
          </div>
        </Grid>
        <Grid item xs={12} sm={4} order={isMobile ? 4 : 4}>
          <Image src={lockerphoto} alt="lockers in a row" />
        </Grid>
        <Grid item xs={12} sm={4} order={isMobile ? 6 : 3}>
          <Image src={thinkphoto} alt="man thinking" />
        </Grid>
        <Grid item xs={12} sm={8} order={isMobile ? 5 : 5}>
  <div style={{ textAlign: 'left' }}>
    <ListContainer>
      <Typography>Some of the possibilities:</Typography>
      <Typography component="ol">
        <ListItem>
          Team Building and Icebreakers: Riddles can be used as team-building exercises or icebreakers
          in various settings, such as corporate events, workshops, or educational settings.
          Participants can create and solve riddles to foster collaboration, problem-solving skills,
          and communication among team members.
        </ListItem>
        <ListItem>
          Educational Tool: Riddles can be utilized as an educational tool in classrooms or online
          learning platforms. Teachers can create riddles to reinforce learning concepts, encourage
          critical thinking, and engage students in a fun and interactive way.
        </ListItem>
        <ListItem>
          Treasure Hunts and Scavenger Hunts: Riddles can be incorporated into treasure hunts or
          scavenger hunts, where participants must solve riddles to uncover hidden clues or locations.
          This adds an element of mystery and excitement to the game and makes it more interactive.
        </ListItem>
      </Typography>
      <Typography>And more!</Typography>
    </ListContainer>
  </div>
</Grid>

         
      </Grid>
    </Container>
  );
}

export default Home;
