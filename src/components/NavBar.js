import { AppBar, Button, Toolbar, Typography, Box, InputBase, Hidden } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
}));

const NavBar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const getCurrentURL = () => {
    const { pathname, search } = window.location;
    console.log(pathname + ", " + search);
    return pathname;
  };

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
  

  function Submit(e) {
    e.preventDefault();
    if (!ValidationSearch() || !isValidQueryParameter(search)) {
      return;
    }

    console.log(search);
    navigate({
      pathname: '/viewriddle',
      search: '?locker=' + search,
    });

    if (getCurrentURL() === '/viewriddle') {
      window.location.reload();
    }
  }

  function ValidationSearch() {
    if (search === '' || search === null || search === undefined || search.length < 1) {
      return false;
    }
    return true;
  }

  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              variant="h6"
              noWrap
              component="div"
              onClick={() => navigate('/')}
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <StyledTypography>Riddle Locker</StyledTypography>
            </Button>
          </Box>
          <Hidden xsDown>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="h6"
                noWrap
                component="div"
                onClick={() => navigate('/createriddle')}
                sx={{ mr: 1 }}
              >
                <Typography style={{ textAlign: "center" }}>Create a Locker</Typography>
              </Button>
              <Button
                variant="h6"
                noWrap
                component="div"
                onClick={() => navigate('/about')}
                sx={{ mr: 1 }}
              >
                <Typography style={{ textAlign: "center" }}>About</Typography>
              </Button>
            </Box>
          </Hidden>
          <Box component="form" onSubmit={Submit}>
            <Search>
              <SearchIconWrapper></SearchIconWrapper>
              <StyledInputBase
                placeholder="Find a locker..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Search>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
