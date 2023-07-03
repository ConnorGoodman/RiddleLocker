import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
  Drawer,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { styled, alpha, useTheme } from "@mui/material/styles";

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

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const handleMobileMenuOpen = () => {
    setIsMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (route) => {
    navigate(route);
    handleMobileMenuClose();
  };

  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: theme.palette.main }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Riddle Locker
          </Typography>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
              sx={{ marginRight: 2 }}
            >
              <MenuIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        variant={"temporary"}
      >
        <Box sx={{ width: 250 }} onClick={handleMobileMenuClose}>
          <List>
            <ListItem onClick={() => handleNavigation("/")}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem onClick={() => handleNavigation("/createriddle")}>
              <ListItemText primary="Create a Locker" />
            </ListItem>
            <ListItem onClick={() => handleNavigation("/about")}>
              <ListItemText primary="About" />
            </ListItem>
          </List>
        </Box>

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
      </Drawer>
    </Box>
  );
};

export default NavBar;
