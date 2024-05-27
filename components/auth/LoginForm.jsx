"use client";
import {useState, useEffect} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useRouter} from "next/navigation";
import {signIn} from "@/lib/actions/auth";
import ThemeToggleButton from "../ThemeToggleButton";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Quality Container Corporation {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let hasErrors = false;

    if (!formData.email) {
      setErrors((prev) => ({
        ...prev,
        email: "This email field is required",
      }));
      hasErrors = true;
    }

    if (!formData.password) {
      setErrors((prev) => ({
        ...prev,
        password: "This password field is required",
      }));
      hasErrors = true;
    }

    if (hasErrors) return;

    const isAuthenticated = await signIn({formData, setIsLoading});

    if (isAuthenticated) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* <ThemeToggleButton /> */}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <Typography color="error" variant="body2">
              {errors.email}
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <Typography color="error" variant="body2">
              {errors.password}
            </Typography>
          )}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{mt: 8, mb: 4}} />
    </Container>
  );
}
