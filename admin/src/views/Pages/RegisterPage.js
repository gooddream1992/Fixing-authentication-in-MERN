import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MuiPhoneNumber  from 'material-ui-phone-number';
import InputAdornment from "@material-ui/core/InputAdornment";


// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Icon from "@material-ui/core/Icon";
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
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

import {user_add} from "Function/User.js";


import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [userName, setUserName] = React.useState('');
  const [userNameError, setUserNameError] = React.useState({flg: false, msg: ''})
  const [firstName, setFirstName] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState({flg: false, msg: ''});
  const [lastName, setLastName] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState({flg: false, msg: ''});
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState(props.match.params.email);
  const [emailError, setEmailError] = React.useState({flg: false, msg: ''});
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState({flg: false, msg: ''});

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  function phoneNumberChange(e){
    setPhone(e)
  }
  const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };

  function onChange(e) {
    if(e.target.id === 'user-name'){
      setUserName(e.target.value);
      setUserNameError({flg: false, msg: ''});
      if(e.target.value === ''){
        setUserNameError({flg: true, msg: 'Username is required'})
      }
    }
    if(e.target.id === 'first-name'){
      setFirstName(e.target.value);
      setFirstNameError({flg: false, msg: ''});
      if(e.target.value === ''){
        setFirstNameError({flg: true, msg: 'First name is required'})
      }
    }
    if(e.target.id === 'last-name'){
      setLastName(e.target.value);
      setLastNameError({flg: false, msg: ''});
      if(e.target.value === ''){
        setLastNameError({flg: true, msg: 'Last name is required'})
      }
    }
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
      user_name: userName,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      password: password
    }
    user_add(data).then(res => {
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
                <h4 className={classes.cardTitle}>Sign Up</h4>
                <div className={classes.socialLine}>
                  
                </div>
              </CardHeader>
              <CardBody>
                <CustomInput
                  error={userNameError.flg}
                  helperText={userNameError.msg}
                  labelText="UserName"
                  id="user-name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PersonIcon className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    onChange: e => onChange(e),
                    type: 'text',
                    value: userName
                  }}
                />
                <CustomInput
                  error={firstNameError.flg}
                  helperText={firstNameError.msg}
                  labelText="First Name"
                  id="first-name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PersonIcon className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    onChange: e => onChange(e),
                    type: 'text',
                    value: firstName
                  }}
                />
                <CustomInput
                  error={lastNameError.flg}
                  helperText={lastNameError.msg}
                  labelText="Last Name"
                  id="last-name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PersonIcon className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    onChange: e => onChange(e),
                    type: 'text',
                    value: lastName
                  }}
                />
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
                    value: email,
                    disabled: true
                  }}
                />
                <MuiPhoneNumber 
                  value={phone} 
                  defaultCountry={'in'} 
                  label="Contact Number" 
                  onChange={phoneNumberChange} 
                  countryCodeEditable={false}
                  className={classes.phoneNumber}
                />
                <PhoneIcon style={{float: 'right', position: 'relative', top: '-45px'}}/>
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
                <Button 
                  color="rose" 
                  simple 
                  size="lg" 
                  block 
                  onClick={loginClick}
                  disabled={(
                      userName !== '' &&
                      firstName !== '' &&
                      lastName !== '' &&
                      phone !== '' &&
                      email !== '' &&
                      !emailError.flg &&
                      password !== ''
                    ) ? false : true
                  }
                >
                  Sign up
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
