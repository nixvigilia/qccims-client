import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import ThemeToggleButton from "./ThemeToggleButton";

function Header() {
  return (
    <AppBar position="fixed" color="default" sx={{ boxShadow: 0, backgroundColor: '#c4cfe1' }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ flexGrow: 1 }} />
        <ThemeToggleButton />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
