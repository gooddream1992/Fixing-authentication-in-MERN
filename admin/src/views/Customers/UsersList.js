import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
// @material-ui/icon components
import EditIcon from '@material-ui/icons/Edit';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import PageviewIcon from '@material-ui/icons/Pageview';
import CheckIcon from '@material-ui/icons/Check';
import Timeline from "@material-ui/icons/Timeline";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import Button1 from "components/CustomButtons/Button.js";
// react component
import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import {server_url} from "server_host.js";
import {course_delete} from "Function/Courses.js";
//jss
import styles from "assets/jss/material-dashboard-pro-react/views/courses/list.js"


const useStyles = makeStyles(styles);
function MyNotification(props) {
  return (
    <div style={{
      display: 'flex',
      backgroundColor: 'white',
      borderRadius: 5,
      padding: '15px',
      width: '100%'
    }}>
      <div style={{width: '40px', height: '40px', borderRadius: '20px', background: 'linear-gradient(-32deg, rgb(28, 247, 45) 0px, rgb(205, 250, 97) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <CheckIcon style={{color: 'white'}}/>
      </div>
      <div style={{marginTop: 10, marginLeft: 10}}>
        <h5 style={{margin: 0}}>{props.title}</h5>
      </div>
    </div>
  )
}
export default function UsersList(props) {
  const classes = useStyles();
  const tableRef = React.useRef(null);

  function createCourse() {
    props.history.push('/admin/courses-create');
  }
  function dateFormate(date) {
    var date1 = new Date(date);
    return date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();
  }
  function CourseView(id) {
    props.history.push('courses-editor/'+id);
  }
  function LectureListEnter(id) {
    props.history.push('lectures-list/'+id);
  }
  function handleClickOpen(data) {
    props.history.push('/admin/batch_table/'+data.id)
    // console.log(props);
  }
  function CourseDelete(id) {
    var data = {
      id: id
    }
    course_delete(data).then(res => {
      store.addNotification({
        content: <MyNotification title="Course Deleted"/>,
        container: 'top-center',
        animationIn: ["animated", "bounceIn"],
        animationOut: ["animated", "bounceOut"],
        dismiss: {
          duration: 3000
        },
        width: 300
      });
      var query = {
        page: 0
      }
      tableRef.current && tableRef.current.onQueryChange(query)
    })
  }
  React.useEffect(() => {
    
  }, []);
  return (<>
    <ReactNotifications />
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <CardIcon color="rose">
                <Timeline />
            </CardIcon>
            <h4 className={classes.cardTitleWhite}>Course Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <div className={classes.buttonPart}>
              <Button variant="contained" color="primary" className={classes.courseCreateButton} onClick={createCourse}>
                Create New Course
              </Button>
            </div>
            <MaterialTable
              title="Multiple Actions Preview"
              tableRef={tableRef}
              columns={[
                { 
                  title: 'Logo', 
                  field: 'logo',
                  render: rowData => (
                    <img
                      style={{ height: 50, borderRadius: '2px', border: '1px solid grey', background: '#4a4646' }}
                      src={server_url+"course/img_get/"+rowData.logo}
                      alt="..."
                    />
                  ),
                },
                { 
                  title: 'Title',
                  field: 'title',
                  render: rowData => (
                    <div className={classes.courseNameButton} onClick={() => {LectureListEnter(rowData.id)}}>{rowData.title}</div>
                  )
                },
                { 
                    title: 'Introduce Video', 
                    field: 'intro',
                    render: rowData => (
                      <span>{"https://vimeo/"+rowData.intro}</span>
                    ) 
                },
                { 
                  title: 'Review Video', 
                  field: 'review',
                  render: rowData => (
                    <span>{"https://vimeo/"+rowData.review}</span>
                  ) 
                },
                { 
                  title: 'Batch members', 
                  field: 'batch_members',
                  render: rowData => (
                    <Button1  color="info" className={classes.marginRight} onClick={() => handleClickOpen(rowData)} disabled={rowData.admin_join_flg}>
                      <PageviewIcon /> Batch View
                    </Button1>
                  ) 
                },
                { title: 'Created', field: 'create', render: rowData => (dateFormate(rowData.create)) },
                { 
                    title: 'Action', 
                    field: 'id',
                    render: rowData => (
                      <div>
                        <Fab color="primary" size="small" aria-label="edit" className={classes.actionButton} onClick={() => CourseView(rowData.id)}>
                            <EditIcon fontSize="small"/>
                        </Fab>
                        <Fab color="secondary" size="small" aria-label="delete" className={classes.actionButton}  onClick={() => CourseDelete(rowData.id)}>
                            <RestoreFromTrashIcon fontSize="small"/>
                        </Fab>
                      </div>
                    ) 
                },
              ]}
              data={query =>
                new Promise((resolve, reject) => {
                  let url = server_url+'admin/course/course_get_all/'
                  url += query.pageSize
                  url += '/' + (query.page)
                  if(query.search === ""){
                    url += '/0'
                  }
                  else {
                    url += '/'+query.search
                  }
                  fetch(url)
                    .then(response => response.json())
                    .then(result => {
                      resolve({
                        data: result.data,
                        page: parseInt(result.page),
                        totalCount: result.totalpage,
                      })
                    })
                })
              }
              options={{
                  selection: true
              }}    
              onSelectionChange={(rows) => {}}
              actions={[
              {
                tooltip: 'Remove All Selected Videos',
                icon: 'delete',
                onClick: (evt, data) => console.log(123)
              }
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}
