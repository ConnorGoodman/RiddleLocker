import { Typography, useTheme} from '@mui/material';
import { styled } from '@mui/system';
import logo from '../images/lock_white_24dp.svg';

const PageContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
  display: 'flex',
  justifyContent: 'center',
  fontFamily: 'Avenir, sans-serif',
  padding: '1rem',
  paddingRight: '.5rem',
  paddingLeft: '.5rem',
}));

const SectionContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.locker.background,
  borderRadius: '8px',
  padding: '1rem',
  textAlign: 'center',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.4)',
  maxWidth: 'min(600px, 95%)',
}));

const ImageContainer = styled('div')({
  marginTop: '1rem',
});

const Image = styled('img')({
  width: '7rem',
});

function Home2() {

  const theme = useTheme();

  return (
    <PageContainer>
        <SectionContainer>
            <ImageContainer>
                  <Image src={logo} alt="locked padlock" />
            </ImageContainer>
            <Typography variant="h4" component="h1" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 'bold', color: theme.palette.locker.text, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', letterSpacing: '2px', maxWidth: 'min(600px, 95%)' }}>
                Welcome to Riddle Locker!
            </Typography>
            <br/>
            <Typography variant="h5"  fontSize='1rem' component="h2" gutterBottom style={{ color: theme.palette.locker.text }}>
                Create engaging riddles to lock and protect your information. Whether it's passwords,
                secret messages, or links, Riddle Locker offers a fun and secure way
                to share information.
            </Typography>
            <br/>
            <Typography variant="h5" fontSize='1rem' component="h2" gutterBottom style={{ color: theme.palette.locker.text }}>
                Join our community
                of puzzle enthusiasts, solve riddles, and share your creativity!
            </Typography>
            <br/>
            <Typography variant="h5" fontSize='1rem' component="h2" gutterBottom style={{ color: theme.palette.locker.text }}>
                <a href='/createriddle'>Create a riddle</a> to get started!
            </Typography>
        </SectionContainer>
    </PageContainer>
  );
}

export default Home2;
