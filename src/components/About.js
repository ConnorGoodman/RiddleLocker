import React, { } from 'react'
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const Container = styled(Box)(({ theme }) => ({
    padding: '60px',
    marginTop: theme.spacing(4),
    fontSize: 20,
    backgroundColor: theme.palette.background.main,
  }));

function About(){
    return (
        <Container>
            <Box>
                <h1>About</h1>
                <Typography>
                    This website was made by Riddle Enthusiast Connor Goodman.
                </Typography>
                
            </Box>
                <Typography>
                One day, Connor decided he wanted to create a scavenger hunt for his friends. 
                However, there was no easy way to hide clues and links behind riddles. 
                He looked all over and could not find anything.
                </Typography>
            <Box>
                <Typography>
                    Connor thought a website should provide this capability to the masses.
                    Thus, Riddle Locker was born.
                </Typography>
            </Box>
        </Container>
    )
}

export default About;