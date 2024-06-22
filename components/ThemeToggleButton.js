// ThemeToggleButton.js

"use client";
import { useEffect, useState } from "react";
import { useThemeContext } from "@/utils/theme/ThemeProviderWrapper";
import IconButton from "@mui/material/IconButton";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ThemeToggleButton(props) {
  const { onClick, sx, ...other } = props;
  const { darkMode, handleThemeChange } = useThemeContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton
        size="small"
        variant="outlined"
        color="default"
        {...other}
        sx={sx}
        disabled
      />
    );
  }

  return (
    <IconButton
      size="small"
      variant="outlined"
      color="default"
      {...other}
      onClick={(event) => {
        handleThemeChange();
        onClick?.(event);
      }}
    >
      {darkMode ? <LightModeIcon /> : <DarkModeRoundedIcon />}
    </IconButton>
  );
}
