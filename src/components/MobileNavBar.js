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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#000724" }}>
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
              <ListItemText primary="Create a Riddle" />
            </ListItem>
            <ListItem onClick={() => handleNavigation("/about")}>
              <ListItemText primary="About" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default NavBar;
