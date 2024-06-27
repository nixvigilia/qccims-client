import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ThemeToggleButton from "./ThemeToggleButton";
import Avatar from "@mui/material/Avatar";

function Header() {
  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{boxShadow: 0, backgroundColor: "#c4cfe1"}}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "240px",
        }}
      >
        <Link href="#" sx={{textDecoration: "none"}}>
          Profile
        </Link>
        <Box sx={{flexGrow: 1}} />
        <ThemeToggleButton />
        <Avatar sx={{backgroundColor: "#3D619B"}}>AD</Avatar>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
