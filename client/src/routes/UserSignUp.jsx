import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let Navigate = useNavigate();
  const port =
    process.env.REACT_APP_PRODUCTION_PORT || process.env.REACT_APP_DEV_PORT;
  const REGISTER_ENDPOINT = "/bridegroom/register";
  const signUp = async (payload) => {
    try {
      const response = await axios.post(
        `${port}/bridegroom/register`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Navigate("/");
    } catch (error) {
      setErrMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields = [
      "brideName",
      "brideDOB",
      "bridegroomName",
      "bridegroomDOB",
      "brideFatherName",
      "brideMotherName",
      "bridegroomFatherName",
      "bridegroomMotherName",
      "brideEducation",
      "bridegroomEducation",
      "mobileNumber",
      "email",
      "password",
    ];

    if (!fields.every((field) => data.get(field))) {
      setErrMsg("Please fill all the fields.");
      return;
    }
    const formObject = Object.fromEntries(data);
    setErrMsg("");
    setIsLoading(true);
    signUp(formObject);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {errMsg && <p>{errMsg}</p>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  //   autoComplete="given-name"
                  name="brideName"
                  required
                  fullWidth
                  id="brideName"
                  label="Bride Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="brideDOB"
                  label="Bride DOB"
                  name="brideDOB"
                  //   autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="bridegroomName"
                  label="Bridegroom Name"
                  name="bridegroomName"
                  //   autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="bridegroomDOB"
                  label="Bridegroom DOB"
                  name="bridegroomDOB"
                  //   autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="brideFatherName"
                  label="Bride Fathername"
                  name="brideFatherName"
                  //   autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="brideMotherName"
                  label="Bride Mothername"
                  name="brideMotherName"
                  //   autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="bridegroomFatherName"
                  label="Bridegroom Fathername"
                  name="bridegroomFatherName"
                  //   autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="bridegroomMotherName"
                  label="Bridegroom Mothername"
                  name="bridegroomMotherName"
                  //   autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="brideEducation"
                  label="Bride Education"
                  name="brideEducation"
                  //   autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="bridegroomEducation"
                  label="Bridegroom Education"
                  name="bridegroomEducation"
                  //   autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobileNumber"
                  label="Mobile Number"
                  name="mobileNumber"
                  //   autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/user/signin"}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
