"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import { Montserrat } from "next/font/google";
import { EB_Garamond } from "next/font/google";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const garamond = EB_Garamond({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const lightTheme = createTheme({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '& .MuiInputBase-root': {
          border: 'none',
          borderRadius: 0,
        },
      },
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily + ', ' + garamond.style.fontFamily,
    h1: {
      fontFamily: garamond.style.fontFamily,
    },
    h2: {
      fontFamily: garamond.style.fontFamily,
    },
    h3: {
      fontFamily: garamond.style.fontFamily,
    },
    h4: {
      fontFamily: garamond.style.fontFamily,
    },
    h5: {
      fontFamily: garamond.style.fontFamily,
    },
    h6: {
      fontFamily: garamond.style.fontFamily,
    },
    h7: {
      fontFamily: garamond.style.fontFamily,
    },
  },
  palette: {
    primary: {
      main: '#3D619B', // Primary color
    },
    mode: "light",
    pending: {
      main: "rgba(255, 171, 0, 0.16)",
      contrastText: "rgb(183, 110, 0)",
    },
  },
  breakpoints: {
    values: {
      xs: 450,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  }
});

const darkTheme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily + ', ' + garamond.style.fontFamily,
    h1: {
      fontFamily: garamond.style.fontFamily,
    },
  },
  palette: {
    mode: "dark",
    pending: {
      main: "rgba(255, 171, 0, 0.16)",
      contrastText: "rgb(255, 214, 102)",
    },
  },
});

export { lightTheme, darkTheme };
