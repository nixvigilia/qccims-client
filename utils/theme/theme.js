"use client";
import {createTheme} from "@mui/material/styles";
import {Roboto} from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const lightTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: "light",
    pending: {
      main: "rgba(255, 171, 0, 0.16)",
      contrastText: "rgb(183, 110, 0)",
    },
  },
});

const darkTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: "dark",
    pending: {
      main: "rgba(255, 171, 0, 0.16)",
      contrastText: "rgb(255, 214, 102)",
    },
  },
});

export {lightTheme, darkTheme};
