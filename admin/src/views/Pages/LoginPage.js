import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import {user_login} from "Function/User.js";


import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);

export default function LoginPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState({flg: false, msg: ''});
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState({flg: false, msg: ''});

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  function onChange(e) {
    if(e.target.id === 'email') {
      setEmail(e.target.value);
      setEmailError({flg: false, msg: ''})
      if(e.target.value === ''){
        setEmailError({flg: true, msg: 'E-mail is required'})
      }
      else if(!verifyEmail(e.target.value)){
        setEmailError({flg: true, msg: 'Please enter a valid email address'})
      }
    }
    if(e.target.id === 'password') {
      setPassword(e.target.value);
      setPasswordError({flg: false, msg: ''})
      if(e.target.value === ''){
        setPasswordError({flg: true, msg: 'Password is required'})
      }
    }
  }
  const loginClick = () => {
    var data = {
      email: email,
      password: password
    }
    user_login(data).then(res => {
      if(!res.success){
        if(res.message === 'The user do not exit'){
          setEmailError({flg: true, msg: res.message})
        }
        else {
          setPasswordError({flg: true, msg: res.message});
        }
      }
      if(res.success){
        localStorage.user_token = res.message;
        window.location.href="/admin/courses-list";
      }
    })
    .catch(err => {
        console.log(err);
    })
  };
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
                <div className={classes.socialLine}>
                  {[
                    "fab fa-facebook-square",
                    "fab fa-twitter",
                    "fab fa-google-plus"
                  ].map((prop, key) => {
                    return (
                      <Button
                        color="transparent"
                        justIcon
                        key={key}
                        className={classes.customButtonClass}
                      >
                        <i className={prop} />
                      </Button>
                    );
                  })}
                </div>
              </CardHeader>
              <CardBody>
                <CustomInput
                  error={emailError.flg}
                  helperText={emailError.msg}
                  labelText="Email..."
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    onChange: e => onChange(e),
                    type: 'email',
                    value: email
                  }}
                />
                <CustomInput
                  error={passwordError.flg}
                  helperText={passwordError.msg}
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    onChange: e => onChange(e),
                    type: "password",
                    autoComplete: "off",
                    value: password
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button color="rose" simple size="lg" block onClick={loginClick}>
                  LOGIN
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
