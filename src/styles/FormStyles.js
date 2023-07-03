import styled from '@mui/material/styles/styled';
import {
    Typography,
    Box,
  } from '@mui/material';
 
export const Container = styled(Box)(({ theme }) => ({
    padding: '60px',
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.background.main,
    maxWidth: '500px',
    margin: '0 auto',
  }));
  
  export const Heading = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  }));
  
  export const ErrorMessage = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
    marginTop: theme.spacing(2),
  }));