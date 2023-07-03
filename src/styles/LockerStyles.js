import styled from '@mui/material/styles/styled';
 
export const PageContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.main,
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Avenir, sans-serif',
    padding: '1rem',
    paddingRight: '.5rem',
    paddingLeft: '.5rem',
  }));

  export const SectionContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.locker.background,
    borderRadius: '8px',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.4)',
    maxWidth: 'min(600px, 95%)',
  }));
  
  export const ImageContainer = styled('div')({
    marginTop: '1rem',
  });