import { AppBar, Button, Toolbar, Typography, Box, InputBase, MenuItem } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

  function Submit(e) {
    e.preventDefault();
    if (!ValidationSearch()) {
      return;
    }

    console.log(search);
    navigate('/viewriddle?locker=' + search);
  }

  function ValidationSearch() {
    if (search === '' || search === null || search === undefined || search.length < 1) {
      return false;
    }
    return true;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#000724' }}>
        <Toolbar>
          <MenuItem
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            onClick={() => navigate('/')}
          >
            <StyledTypography>Riddle Locker</StyledTypography>
          </MenuItem>
          <MenuItem
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' } }}
            onClick={() => navigate('/createriddle')}
          >
            <Typography style={{ textAlign: "center" }}>Create a Riddle</Typography>
          </MenuItem>
          <MenuItem
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' } }}
            onClick={() => navigate('/about')}
          >
            <Typography style={{ textAlign: "center" }}>About</Typography>
          </MenuItem>
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
          <Button>Button</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
