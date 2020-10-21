import React from "react";
import jweDecode from 'jwt-decode';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from "@material-ui/core/InputAdornment";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Email from "@material-ui/icons/Email";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
//react component
import SweetAlert from "react-bootstrap-sweetalert";


import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";
import {user_all_get, user_delete} from "Function/User.js";
import {email_send} from "Function/Email.js";
const useStyles = makeStyles(styles);

export default function ExtendedTables(props) {
    
    const classes = useStyles();
    const [emailList, setEmailList] = React.useState([]);
    const [addAdminModal, setAddAdminModal] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [emailStatus, setEmailStatus] = React.useState('');
    const [emailSelect, setEmailSelect] = React.useState('');
    const [alert, setAlert] = React.useState(null);
    const [confirm, setConfirm] = React.useState(false);
    const [userList1, setUserList1] = React.useState([]);
    const [deleteFlg, setDeleteFlg] = React.useState(false);
    const verifyEmail = value => {
        var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(value)) {
          return true;
        }
        return false;
    };
    function emailConfirm(email) {
        var flg = false;
        for(var i = 0; i < emailList.length; i++){
            if(email === emailList[i]){
                flg = true;
                break;
            }
        }
        return flg
    }
    function adminModalChange(value) {
        setAddAdminModal(value);
    }
    function emailChange(e) {
        setEmail(e.target.value);
        setEmailStatus("");
        if(!verifyEmail(e.target.value)){
            setEmailStatus("Please enter a valid email address");
        }
        if(emailConfirm(e.target.value)){
            setEmailStatus("This email address is already in use.");
        }
    }
    function emailSend(value) {
        var data = {
            email: email,
            host: window.location.origin
        }
        email_send(data).then(res => {
            setAddAdminModal(value);
        })
    }
    function userDelete() {

        var data = {
            email: emailSelect
        }
        user_delete(data).then(res => {
            setConfirm(false);
            setAlert(<SweetAlert
                success
                style={{ display: "block", marginTop: "-100px" }}
                title="Admin Deleted!"
                onConfirm={() => hideAlert()}
                onCancel={() => hideAlert()}
                confirmBtnCssClass={classes.button + " " + classes.success}
            />)
        })
    }
    function hideAlert() {
        setAlert(null);
        setDeleteFlg(!deleteFlg)
    }
    function deleteConfirmChange(value){
        setConfirm(value);
    }
    React.useEffect(() => {
        user_all_get().then(res => {
            var email_list = [];
            for(var i = 0; i < res.length; i++){
                email_list.push(res[i].email);
            }
            setEmailList(email_list);
            setUserList1(res);
        })
    }, [classes, props, deleteFlg])
    return (
        <div>
            {alert}
        <GridContainer>
            <GridItem xs={12}>
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                        <Assignment />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Simple Table</h4>
                    </CardHeader>
                    <CardBody>
                        {userList1.length !== 0 && (<>
                            <Table
                                tableHead={[
                                    "#",
                                    "Name",
                                    "Level",
                                    "Email",
                                    "Phone",
                                    "Actions"
                                ]}
                                // tableData={
                                //     userList
                                // }
                                tableData={
                                    userList1.map(function(data, i) {
                                        return(
                                            [
                                                i+1,
                                                data.first_name+" "+data.last_name,
                                                data.user_level === 'supper' ? "Supper Admin" : "Normal Admin", 
                                                
                                                data.email, 
                                                data.phone_number,
                                                <div>
                                                    {jweDecode(localStorage.user_token)._id === data._id && (
                                                        <Button
                                                            round
                                                            color="success"
                                                            className={classes.actionButton + " " + classes.actionButtonRound}
                                                            onClick={() => {props.history.push('/admin/profile')}}
                                                        >
                                                            <Edit className={classes.icon} />
                                                        </Button>
                                                    )}
                                                    {(jweDecode(localStorage.user_token)._id !== data._id && jweDecode(localStorage.user_token).user_level === 'supper') && (
                                                        <Button
                                                            round
                                                            color="danger"
                                                            className={classes.actionButton + " " + classes.actionButtonRound}
                                                            onClick={() => {setConfirm(true); setEmailSelect(data.email)}}
                                                        >
                                                            <Close className={classes.icon} />
                                                        </Button>
                                                    )}
                                                </div>
                                                
                                            ]
                                        )
                                    })
                                }
                                customCellClasses={[classes.center, classes.right, classes.right]}
                                customClassesForCells={[0, 4, 5]}
                                customHeadCellClasses={[
                                    classes.center,
                                    classes.right,
                                    classes.right
                                ]}
                                customHeadClassesForCells={[0, 4, 5]}
                            /></>
                        )}
                        <Button color="rose" className={classes.updateProfileButton } style={{float: 'right'}} onClick={() => adminModalChange(true)}>
                            Add Admin
                        </Button>
                    </CardBody>
                    
                </Card>
            </GridItem>
        </GridContainer>
        <Dialog open={addAdminModal} onClose={() => adminModalChange(false)} aria-labelledby="form-dialog-title" maxWidth="xs">
            <DialogTitle id="form-dialog-title">Add Admin</DialogTitle>
            <DialogContent>
                <CustomInput
                    error={emailStatus === '' ? false : true}
                    helperText={emailStatus}
                    labelText="Email Address"
                    id="email"
                    formControlProps={{
                        fullWidth: true
                    }}
                    required
                    inputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                        ),
                        onChange: e => emailChange(e),
                        type: "email",
                        name: 'current',
                        value: email
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => adminModalChange(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => emailSend(false)} color="primary" disabled={(emailStatus === '' && email !== '') ? false : true}>
                    add
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={confirm} onClose={() => deleteConfirmChange(false)} aria-labelledby="form-dialog-title" maxWidth="xs">
            <DialogTitle id="form-dialog-title">Delecte Admin</DialogTitle>
            <DialogContent>
                <h3>Are you Sure?</h3>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => deleteConfirmChange(false)} color="primary">
                    No
                </Button>
                <Button onClick={() => userDelete()} color="primary">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
