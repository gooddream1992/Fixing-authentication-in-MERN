import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
// @material-ui/icon components
import EditIcon from '@material-ui/icons/Edit';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import CheckIcon from '@material-ui/icons/Check';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ReactNotifications from 'react-notifications-component';

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

// import {course_get} from "Function/Courses.js";
import {event_delete} from "Function/Event.js";
import {server_url} from "server_host.js";
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
export default function TableList(props) {
  const classes = useStyles();
  const tableRef = React.useRef(null);

  function createCourse() {
    props.history.push('/admin/event-create');
  }
  function dateFormate(date) {
    var date1 = new Date(date);
    return date1.getFullYear()+"-"+date1.getMonth()+1+"-"+date1.getDate();
  }
  function CourseView(id) {
    props.history.push('event-edit/'+id);
  }
  function EventDelete(id) {
    var data = {
      id: id
    }
    event_delete(data).then(res => {
      store.addNotification({
        content: <MyNotification title="Event Deleted"/>,
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
  return (
    <GridContainer>
      <ReactNotifications />
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Event Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <div className={classes.buttonPart}>
              <Button variant="contained" color="primary" className={classes.courseCreateButton} onClick={createCourse}>
                Create New Event
              </Button>
            </div>
            <MaterialTable
              title="Multiple Actions Preview"
              tableRef={tableRef}
              columns={[
                { 
                  title: 'Background', 
                  field: 'logo',
                  render: rowData => (
                    <img
                      style={{ height: 50, borderRadius: '2px', border: '1px solid grey', background: '#4a4646' }}
                      src={server_url+"event/img_get/"+rowData.logo}
                      alt="..."
                    />
                  ),
                },
                { title: 'Title', field: 'title' },
                { title: 'Venue', field: 'venue' },
                { 
                    title: 'Video', 
                    field: 'video_url',
                    render: rowData => (
                      <span>{"https://vimeo/"+rowData.video_url}</span>
                    ) 
                },
                { 
                  title: 'Start Date', 
                  field: 'start_date'
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
                        <Fab color="secondary" size="small" aria-label="delete" className={classes.actionButton}  onClick={() => EventDelete(rowData.id)}>
                            <RestoreFromTrashIcon fontSize="small"/>
                        </Fab>
                      </div>
                    ) 
                },
              ]}
              data={query =>
                new Promise((resolve, reject) => {
                  let url = server_url+'admin/event/events_get_all/'
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
  );
}
