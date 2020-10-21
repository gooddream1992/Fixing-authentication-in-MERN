import React from "react";
import jweDecode from 'jwt-decode';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import MuiPhoneNumber  from 'material-ui-phone-number';

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardAvatar from "components/Card/CardAvatar.js";
import Badge from "components/Badge/Badge.js";
//react component
import SweetAlert from "react-bootstrap-sweetalert";

import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";

//api
import {user_get, user_update, avatar_upload, changepassword} from "Function/User.js";
import {server_url} from "server_host.js";
const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const [userId, setUserId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNUmber] = React.useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState('');
  const [passwordDialog, setPasswordDialog] = React.useState(false);
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordSttatus, setPasswordStatus] = React.useState('');
  const [currentPasswordError, setCurrentPasswordError] = React.useState('');
  const [userLevel, setUserLevel] = React.useState('');
  const [alert, setAlert] = React.useState(null);


  function change(e) {
    if(e.target.name === 'username') {
      setUserName(e.target.value);
    }
    if(e.target.name === 'first') {
      setFirstName(e.target.value);
    }
    if(e.target.name === 'last') {
      setLastName(e.target.value);
    }
    if(e.target.name === 'email') {
      setEmail(e.target.value);
    }
  }
  function passwordChange(e) {
    if(e.target.name === 'current') {
      setCurrentPassword(e.target.value);
    }
    if(e.target.name === 'new') {
      setNewPassword(e.target.value);
    }
    if(e.target.name === 'confirm') {
      if(e.target.value !== newPassword){
        setPasswordStatus('New password and confirm password did not match.')
      }
      else {
        setPasswordStatus('')
      }
      setConfirmPassword(e.target.value);
    }
  }
  function phoneNumberChange(e){
    setPhoneNUmber(e)
  }
  function userUpdate() {
    var data = {
      id: userId,
      data: {
        username: userName,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber
      }
    }
    user_update(data).then(res => {
      window.location.href="/admin/profile"
    })
  }
  function handleImageChange (e) {
    e.preventDefault();
    let reader = new FileReader();
    let newFile = e.target.files[0];
    reader.onloadend = () => {
      const data = new FormData();
      data.append('file', newFile);
      var imgData = {
        imgData: data
      };
      avatar_upload(imgData).then(res => {
        var data = {
          id: userId,
          data: {
            image: res.filename
          }
        }
        user_update(data).then(res => {
          setImagePreviewUrl(reader.result);
        })
      })
      .catch(err => {
        console.log(err);
      })
      

    };
    reader.readAsDataURL(newFile);
  };
  function passwordModalChange(value){
    setPasswordDialog(value)
  }
  function passwordUpdate(value) {
    var data = {
      id: userId,
      current: currentPassword,
      password: newPassword
    }
    changepassword(data).then(res => {
      // console.log(res);
      if(res.success){
        setPasswordDialog(value);
        setAlert(<SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Password Changed!"
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classes.button + " " + classes.success}
      />)
      }
      else {
        setCurrentPasswordError("Current password is incorrect")
      }
    })
  }
  function hideAlert() {
    setAlert(null);
  }
  React.useEffect(() => {
    var user_data = jweDecode(localStorage.user_token);
    var data = {
      id: user_data._id
    }
    user_get(data).then(res => {
      setUserId(res.user_data._id);
      setUserName(res.user_data.username);
      setFirstName(res.user_data.first_name);
      setLastName(res.user_data.last_name);
      setEmail(res.user_data.email);
      setPhoneNUmber(res.user_data.phone_number)
      setImagePreviewUrl(server_url+'admin/user/img_get/'+res.user_data.image)
      setUserLevel(res.user_data.user_level);
    })
  }, [])
  return (
    <div>
      {alert}
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <PermIdentity />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Edit Profile - <small>Complete your profile</small>
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: 'username',
                      value: userName,
                      onChange: e => change(e)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: 'email',
                      value: email,
                      onChange: e => change(e)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <MuiPhoneNumber 
                    value={phoneNumber} 
                    defaultCountry={'in'} 
                    label="Contact Number" 
                    onChange={phoneNumberChange} 
                    countryCodeEditable={false}
                    className={classes.phoneNumber}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: 'first',
                      value: firstName,
                      onChange: e => change(e)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: 'last',
                      value: lastName,
                      onChange: e => change(e)
                    }}
                  />
                </GridItem>
              </GridContainer>
              <Button color="rose" className={classes.updateProfileButton} onClick={userUpdate}>
                Update Profile
              </Button>
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
                <label htmlFor="avatar">
                  <img src={imagePreviewUrl} alt="..." />
                </label>
                <input id="avatar" type="file" accept="image/jpeg, image/png" style={{display: 'none'}} onChange={handleImageChange}/>
            </CardAvatar>
            <CardBody profile>
              {userLevel === 'supper' ? (
                <Badge className={classes.cardCategory} color="success">Supper Admin</Badge>
              ) : (
                <Badge className={classes.cardCategory} color="warning">Admin</Badge>
              )}
              
              <h4 className={classes.cardTitle}>{firstName + " " + lastName}</h4>
              <Button color="rose" round onClick={() => passwordModalChange(true)}>
                Change Password
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <Dialog open={passwordDialog} onClose={() => passwordModalChange(false)} aria-labelledby="form-dialog-title" maxWidth="xs">
        <DialogTitle id="form-dialog-title">Password Change</DialogTitle>
        <DialogContent>
          <CustomInput
            error={currentPasswordError === '' ? false : true}
            helperText={currentPasswordError}
            labelText="Current Password"
            id="current-password"
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
              onChange: e => passwordChange(e),
              type: "password",
              name: 'current',
              value: currentPassword
            }}
          />
          <CustomInput
            error={passwordSttatus === '' ? false : true}
            helperText={passwordSttatus}
            labelText="New Password"
            id="new-password"
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
              onChange: e => passwordChange(e),
              type: "password",
              name: 'new',
              value: newPassword
            }}
          />
          <CustomInput
            error={passwordSttatus === '' ? false : true}
            helperText={passwordSttatus}
            labelText="Confirm Password"
            id="confirm-password"
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
              onChange: e => passwordChange(e),
              type: "password",
              name: 'confirm',
              value: confirmPassword
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => passwordModalChange(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => passwordUpdate(false)} color="primary" disabled={(currentPassword !== '' && newPassword !== '' && passwordSttatus === '') ? false : true}>
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
