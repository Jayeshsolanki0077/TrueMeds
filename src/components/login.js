import React, { useState, useEffect, useContext } from "react";
import { useStyles } from "./useStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Grid, Container, IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "./login.css";
import { login, handleSendOtp } from "../actions/authAction";
import { connect } from "react-redux";
import CountdownTimer from "../components/countdownTimer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OTP_REGEX = /^[0-9]{0,6}$/;
const MOBILE_REGEX = /^[6-9][0-9]{9}$/;

function LoginForm({ onLogin }) {
  const classes = useStyles();
  const [attempts, setAttempts] = useState(false);
  const [timer, setTimer] = useState();
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [passwordFlag, setPasswordFlag] = useState(true);
  const [disableLogin, setDisableLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const diffToast = (message) => {
    toast(message, {
      position: "top-right",
    });
  };

  useEffect(() => {
    let timeout = "";
    if (timer > 0 && attempts > 0)
      timeout = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    return () => clearTimeout(timeout);
  }, [timer, attempts]);

  const handleOtp = (event) => {
    const otpValue = event.target.value;
    if (otpValue.match(OTP_REGEX)) {
      setOtp(otpValue);
    }
  };
  const handleOTPLogin = () => {
    if (mobileNumber && otp.length === 4) {
      const params = {
        mobileNumber,
        otp,
      };
      onLogin(params).then((response) => {
        if (response?.isLogin) {
          diffToast(response?.message);
          setIsLoggedIn(true);
        } else {
          diffToast('Something went wrong! Please try again.')
        }
      });
    }
  };
  const handleSend = () => {
    diffToast();
    if (mobileNumber.match(MOBILE_REGEX)) {
      handleSendOtp(mobileNumber).then((response) => {
        if (response.status === 200) {
          setAttempts(true);
          diffToast(response.data[201]);
        } else if (response.status === 400) {
          diffToast(response.data[400]);
        } else {
          diffToast ('Something went wrong! Please try again');
        }
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    window.location.replace("/");
  };

  return (
    <Container>
      <ToastContainer />
      {isLoggedIn ? (
        <div className="app">
          <div className="logout">
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
          <div className="timer">
            <CountdownTimer initialMinute={1} initialSeconds={0} />
          </div>
        </div>
      ) : (
        <div className="child">
          <img
            src="https://www.truemeds.in/static/media/truemedslogosvg.f22ce210.svg"
            alt="logo"
          />
          <form
            className={classes.form}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="mobile"
              label="Mobile Number"
              name="mobile"
              autoComplete="mobile"
              autoFocus
              className="passwordField"
              value={mobileNumber}
              disabled={attempts}
              inputProps={{ maxLength: 10, pattern: "^[6-9][0-9]{9}$" }}
              onChange={(e) => {
                setMobileNumber(e.target.value);
              }}
            />
            {attempts && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="otp"
                label="OTP"
                type={passwordFlag ? "password" : "text"}
                id="otp"
                className="passwordField"
                autoComplete="current-otp"
                value={otp}
                inputProps={{ maxLength: 4, pattern: "^[0-9]{4}$" }}
                onChange={handleOtp}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      style={{ padding: "0 0 0 2%" }}
                      onClick={() => setPasswordFlag((prev) => !prev)}
                    >
                      {passwordFlag ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            ) }

            {attempts ? 
              (
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ color: "white" }}
                  className={classes.otpButton}
                  disabled={disableLogin}
                  onClick={() => {
                    handleOTPLogin();
                  }}>
                  Sign In
                </Button>
              )
               : (
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                style={{ color: "white" }}
                className={classes.otpButton}
                onClick={() => handleSend()}
              >
                Send OTP
              </Button>
            )}
          </form>
        </div>
      )}
    </Container>
  );
}
const mapDisptachToProps = (dispatch) => ({
  onLogin: (params, isOtpLogin) => {
    return dispatch(login(params, isOtpLogin));
  },
});
export default connect(null, mapDisptachToProps)(LoginForm);
