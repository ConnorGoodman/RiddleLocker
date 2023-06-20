import { AppBar, Button, Toolbar, Typography, Box, InputBase, MenuItem} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
//import RiddleLockerLogo from '../logo.svg'
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
      // vertical padding + font size from searchIcon
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

function NavBar(){

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    function Submit(e) {
        e.preventDefault();
        if (!ValidationSearch()) {
            return;
        }

        console.log(search);
        navigate('/viewriddle?riddle=' + search);
    }

    function ValidationSearch() {
        if (search === '' || search === null || search === undefined || search.length < 1) {
            return false;
        }
        return true;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              {/* <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton> */}
              <MenuItem
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                onClick={() => navigate('/')}
              >
                <Typography style={{fontWeight:"bold"}}>Riddle Locker</Typography>
              </MenuItem>
              <MenuItem
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 1} }}
                onClick={() => navigate('/createriddle')}
              >
                <Typography style={{textAlign:"center"}}>Create a Riddle</Typography>
                
              </MenuItem>
              <MenuItem
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 1} }}
                onClick={() => navigate('/createriddle')}
              >
                <Typography style={{textAlign:"center"}}>About</Typography>
                
              </MenuItem>
              <Box component="form" onSubmit={Submit}>
                <Search>
                    <SearchIconWrapper >
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Find a locker..."
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                </Search>
              </Box>
              <Typography><Button>Button</Button></Typography>
              </Toolbar>
          </AppBar>
        </Box>
      );
}

export default NavBar