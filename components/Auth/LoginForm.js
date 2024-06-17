"use client";
import { useState, useEffect } from "react";
import { styled } from '@mui/system';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/actions/auth";
import Image from "next/image"
import logo from '@/public/logo.png';
function Copyright(props) {
  return (
    <Typography
      variant="h7"
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
function Powered(props) {
  return (
    <Typography
      variant="h7"
      color="text.secondary"
      align="center"
      {...props}
    >
      Powered by  <Link href="#" variant="h7">
        {"VAS IT PH"}
      </Link>
    </Typography>
  );
}
const ShadowBox = styled(Box)({
  boxShadow: '0px 4px 20px rgb(0 0 0 / 7%)',
});

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
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

    const isAuthenticated = await signIn({ formData, setIsLoading });

    if (isAuthenticated) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }
  };



  return (
    <Container component="main" style={{
      display: 'grid',
      gridTemplateRows: '1fr',
      height: '100vh',
      width: '100%',
      padding: 0
    }} maxWidth={false}
      className="login">
      {/* <ThemeToggleButton /> */}
      < ShadowBox sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        padding: 4,
        backgroundColor: '#fff'
      }}
        maxWidth="xs" >
        <Typography color="primary" variant="h3" sx={{ fontWeight: '600', mb: 2 }}>
          QCCIMS
        </Typography>
        <Typography color="primary" variant="body2">
          Please enter your credentials to sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate maxWidth="xs" >
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
            variant="outlined"
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
            variant="outlined"
          />
          {errors.password && (
            <Typography color="error" variant="body2">
              {errors.password}
            </Typography>
          )}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            sx={{ fontSize: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: '50px' }}
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
        <Copyright sx={{ mt: 8, mb: 4 }} />

      </ShadowBox >
      <Powered sx={{ mb: 4 }} />
    </Container >
  );
}
