import React from "react";
import {withRouter} from 'react-router-dom';
import classNames from "classnames";
import PropTypes from "prop-types";
import jweDecode from 'jwt-decode';
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";

// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import ChatIcon from '@material-ui/icons/Chat';

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";
//api
import {doubte_get} from "Function/DoubteChat.js";
import {support_chat_get} from "Function/SupportChat.js";
import {user_get} from "Function/User.js";

const useStyles = makeStyles(styles);

function HeaderLinks(props) {
  const [openNotification, setOpenNotification] = React.useState(null);
  const [NotificationList, setMNotificationList] = React.useState([]);
  const [supportChatList, setSupportChatList] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [userLevel, setUserLevel] = React.useState("")
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const [openSupportChat, setOpenSupportChat] = React.useState(null);
  const handleClickSupportChat = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenSupportChat(null);
    } else {
      setOpenSupportChat(event.currentTarget);
    }
  };
  const handleCloseSupportChat = () => {
    setOpenSupportChat(null);
  };
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const Logout = () => {
    setOpenProfile(null);
    localStorage.clear();
    window.location.href='/';
  }
  const DoubteList = () => {
    props.history.push('/admin/doubte_list');
  }
  const SupportChat = () => {
    props.history.push('/admin/support_chat_list');
  }
  const classes = useStyles();
  const { rtlActive } = props;
  
  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover, {
    [classes.dropdownItemRTL]: rtlActive
  });
  const wrapper = classNames({
    [classes.wrapperRTL]: rtlActive
  });
  const managerClasses = classNames({
    [classes.managerClasses]: true
  });
  setTimeout(function() {
    setLoad(!load);
  },60000)
  React.useEffect(() => {
    var user_data = jweDecode(localStorage.user_token);
    var data = {
      id: user_data._id
    }
    user_get(data).then(res => {
      setUserLevel(res.user_data.user_level)
      var data = {
        flg: "new",
        view: false,
        user_level: res.user_data.user_level,
        admin_id: res.user_data._id
      }
      doubte_get(data).then(res => {
        setMNotificationList(res);
      })
      .catch(err => {
        console.log(err);
      })
      data = {
        flg: "new",
        view: false,
        user_level: res.user_data.user_level,
        admin_id: res.user_data._id
      }
      support_chat_get(data).then(res => {
        setSupportChatList(res);
      })
      .catch(err => {
        console.log(err);
      })
    });
    
  }, [load])
  return (
    <div className={wrapper}>
      
      <div className={managerClasses}>
        <Button
          color="transparent"
          justIcon
          aria-label="Notifications"
          aria-owns={openNotification ? "notification-menu-list" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : ""
          }}
        >
          <Notifications
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          {NotificationList.length !== 0 && (
            <span className={classes.notifications}>{NotificationList.length}</span>
          )}
          <Hidden mdUp implementation="css">
            <span
              onClick={handleClickNotification}
              className={classes.linkText}
            >
              {rtlActive ? "إعلام" : "Notification"}
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openNotification,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    {NotificationList.map(function(item, i) {
                      return(
                        userLevel === 'supper' ? (
                          <MenuItem
                            onClick={() => {handleCloseNotification(); DoubteList();}}
                            className={dropdownItem}
                            key={i}
                          >
                            <strong>{item.user_name}</strong> created new doubte "<strong>{item.title}</strong>"
                          </MenuItem>
                        ) : (
                          <MenuItem
                            onClick={() => {handleCloseNotification(); DoubteList();}}
                            className={dropdownItem}
                            key={i}
                          >
                            The doubte(<strong>{item.title}</strong>) created by {item.user_name} is connected to you.
                          </MenuItem>
                        )
                        
                      )
                    })}
                    {NotificationList.length === 0 && (
                      <p style={{textAlign: 'center', borderTop: '1px solid #eaeaea', borderBottom: '1px solid #eaeaea', margin: '0px', padding: '10px 0px'}}>No notifications</p>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <div className={managerClasses}>
        <Button
          color="transparent"
          justIcon
          aria-label="Notifications"
          aria-owns={openSupportChat ? "notification-menu-list" : null}
          aria-haspopup="true"
          onClick={handleClickSupportChat}
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : ""
          }}
        >
          <ChatIcon
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          {supportChatList.length !== 0 && (
            <span className={classes.notifications}>{supportChatList.length}</span>
          )}
          <Hidden mdUp implementation="css">
            <span
              onClick={handleClickSupportChat}
              className={classes.linkText}
            >
              {rtlActive ? "إعلام" : "Notification"}
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openSupportChat)}
          anchorEl={openSupportChat}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openSupportChat,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseSupportChat}>
                  <MenuList role="menu">
                    {supportChatList.map(function(item, i) {
                      return(
                        userLevel === 'supper' ? (
                          <MenuItem
                            onClick={() => {handleCloseSupportChat(); SupportChat();}}
                            className={dropdownItem}
                            key={i}
                          >
                            <strong>{item.username}</strong> open new chat
                          </MenuItem>
                        ) : (
                          <MenuItem
                            onClick={() => {handleCloseSupportChat(); SupportChat();}}
                            className={dropdownItem}
                            key={i}
                          >
                            The doubte(<strong>{item.title}</strong>) created by {item.username} is connected to you.
                          </MenuItem>
                        )
                        
                      )
                    })}
                    {supportChatList.length === 0 && (
                      <p style={{textAlign: 'center', borderTop: '1px solid #eaeaea', borderBottom: '1px solid #eaeaea', margin: '0px', padding: '10px 0px'}}>No new chat</p>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <div className={managerClasses}>
        <Button
          color="transparent"
          aria-label="Person"
          justIcon
          aria-owns={openProfile ? "profile-menu-list" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : ""
          }}
        >
          <Person
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          <Hidden mdUp implementation="css">
            <span onClick={handleClickProfile} className={classes.linkText}>
              {rtlActive ? "الملف الشخصي" : "Profile"}
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openProfile,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      {rtlActive ? "الملف الشخصي" : "Profile"}
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      {rtlActive ? "الإعدادات" : "Settings"}
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={Logout}
                      className={dropdownItem}
                    >
                      {rtlActive ? "الخروج" : "Log out"}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

HeaderLinks.propTypes = {
  rtlActive: PropTypes.bool
};
export default withRouter(HeaderLinks);