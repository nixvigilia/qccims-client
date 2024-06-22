"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Header from "@/components/Header";
import { StoreProvider } from "@/utils/context/store";
import Sidebar from "@/components/Sidebar";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <StoreProvider>
      <Box sx={{ display: "flex" }}>
        <Header />
        <Sidebar
          handleDrawerOpen={handleDrawerOpen}
          drawerWidth={drawerWidth}
          openedMixin={openedMixin}
          closedMixin={closedMixin}
          open={open}
          theme={theme}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
          {children}
        </Box>
      </Box>
    </StoreProvider>
  );
}
