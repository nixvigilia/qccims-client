import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import ThemeToggleButton from "./ThemeToggleButton";

function MyAppBar({open, handleDrawerOpen}) {
  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{backgroundColor: "transparent", boxShadow: "none"}}
    >
      <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && {display: "none"}),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{flexGrow: 1}} />
        <ThemeToggleButton />
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
