import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Typography from '@material-ui/core/Typography';

// material-ui icons
import Menu from "@material-ui/icons/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";

// core components
import AdminNavbarLinks from "./AdminNavbarLinks";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarStyle.js";
import {course_get} from "Function/Courses.js";
import {lecture_get} from "Function/Lectures.js";
import {lectureitem_get} from "Function/LectureItem.js";
const useStyles = makeStyles(styles);

export default function AdminNavbar(props) {
  const classes = useStyles();
  const { color, rtlActive, brandText } = props;
  const [breadColumn, setBreadColumn] = React.useState([]);
  // const [text, setText] = React.useState('');
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  const sidebarMinimize =
    classes.sidebarMinimize +
    " " +
    cx({
      [classes.sidebarMinimizeRTL]: rtlActive
    });
  React.useEffect(() => {
    var url_array = props.location.pathname.split("/");
    
    if(url_array[2] === 'lectureitems-list' || url_array[2] === 'lectureitems-create'){
      var bread = [];
      var data = {
        id: url_array[3]
      }
      course_get(data).then(res => {
        var list = {
          id: res._id,
          href: '/admin/lectures-list/'+res._id,
          name: res.title
        }
        bread.push(list);
        data = {
          course: 'other',
          id: url_array[4]
        }
        lecture_get(data).then(res => {
          list = {
            id: res._id,
            href: '/admin/lectureitems-list/'+res.course_id+'/'+res._id,
            name: res.title
          }
          bread.push(list);
          setBreadColumn(bread);
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
      })
      
    }
    if(url_array[2] === 'lectureitems-edit'){
      bread = [];
      data = {
        id: url_array[3]
      }
      lectureitem_get(data).then(res => {
        var course_id = res.course_id;
        var lecture_id = res.lecture_id;
        data = {
          id: course_id
        }
        course_get(data).then(res => {
          var list = {
            id: res._id,
            href: '/admin/lectures-list/'+res._id,
            name: res.title
          }
          bread.push(list);
          data = {
            course: 'other',
            id: lecture_id
          }
          lecture_get(data).then(res => {
            list = {
              id: res._id,
              href: '/admin/lectureitems-list/'+res.course_id+'/'+res._id,
              name: res.title
            }
            bread.push(list);
            setBreadColumn(bread);
          })
          .catch(err => {
            console.log(err);
          })
        })
        .catch(err => {
          console.log(err);
        })
      })
    }
    if(url_array[2] === 'lectures-list' || url_array[2] === 'lectures-create'){
      bread = [];
      data = {
        id: url_array[3]
      }
      course_get(data).then(res => {
        var list = {
          id: res._id,
          href: '/admin/lectures-list/'+res._id,
          name: res.title
        }
        bread.push(list);
        setBreadColumn(bread);
      })
      .catch(err => {
        console.log(err);
      })
      
    }
    if(url_array[2] === 'lectures-edit'){
      bread = [];
      data = {
        course: 'other',
        id: url_array[3]
      }
      lecture_get(data).then(res => {
        data = {
          id: res.course_id
        }
        course_get(data).then(res => {
          var list = {
            id: res._id,
            href: '/admin/lectures-list/'+res._id,
            name: res.title
          }
          bread.push(list);
          setBreadColumn(bread);
        })
        .catch(err => {
          console.log(err);
        })
      })
    }
    if(url_array[2] === 'courses-list' || url_array[2] === 'courses-create' || url_array[2] === 'courses-editor'){
      setBreadColumn([]);
    }
  }, [props])
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation="css">
          <div className={sidebarMinimize}>
            {props.miniActive ? (
              <Button
                justIcon
                round
                color="white"
                onClick={props.sidebarMinimize}
              >
                <ViewList className={classes.sidebarMiniIcon} />
              </Button>
            ) : (
              <Button
                justIcon
                round
                color="white"
                onClick={props.sidebarMinimize}
              >
                <MoreVert className={classes.sidebarMiniIcon} />
              </Button>
            )}
          </div>
        </Hidden>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" style={{marginLeft: '15px'}}>
            {breadColumn.map(function(item, i){
              return(
                <Link color="inherit" href={item.href} key={i}>
                  {item.name}
                </Link>
              )
            })}
            <Typography color="textPrimary">{brandText}</Typography>
          </Breadcrumbs>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks rtlActive={rtlActive} />
        </Hidden>
        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

AdminNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  brandText: PropTypes.string,
  miniActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  sidebarMinimize: PropTypes.func
};
