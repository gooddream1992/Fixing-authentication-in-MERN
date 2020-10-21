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
import EventNoteIcon from '@material-ui/icons/EventNote';
import ChatIcon from '@material-ui/icons/Chat';
import PeopleIcon from '@material-ui/icons/People';
// import CheckIcon from '@material-ui/icons/Check';
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
import Avatar from 'react-avatar';
// import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import {server_url} from "server_host.js";
//jss
import styles from "assets/jss/material-dashboard-pro-react/views/courses/list.js"


const useStyles = makeStyles(styles);
// function MyNotification(props) {
//   return (
//     <div style={{
//       display: 'flex',
//       backgroundColor: 'white',
//       borderRadius: 5,
//       padding: '15px',
//       width: '100%'
//     }}>
//       <div style={{width: '40px', height: '40px', borderRadius: '20px', background: 'linear-gradient(-32deg, rgb(28, 247, 45) 0px, rgb(205, 250, 97) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
//         <CheckIcon style={{color: 'white'}}/>
//       </div>
//       <div style={{marginTop: 10, marginLeft: 10}}>
//         <h5 style={{margin: 0}}>{props.title}</h5>
//       </div>
//     </div>
//   )
// }
export default function TableList(props) {
  const classes = useStyles();

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
  React.useEffect(() => {
    
  }, []);
  return (<>
    <ReactNotifications />
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="rose">
                <PeopleIcon />
            </CardIcon>
            <h4 className={classes.cardTitleWhite}>Users Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <MaterialTable
              title="Multiple Actions Preview"
              // tableRef={React.createRef()}
              columns={[
                { 
                  title: 'Image', 
                  field: 'image',
                  render: rowData => (
                    <Avatar name={rowData.username} src={rowData.image} size="50" round={true} className="avatar"/>
                  ),
                },
                { 
                  title: 'User Name',
                  field: 'username'
                },
                { 
                    title: 'Email Address', 
                    field: 'email'
                },
                { 
                    title: 'Batch Data', 
                    field: 'image',
                    render: rowData => (
                        <Button1  color="rose" className={classes.marginRight} onClick={() => handleClickOpen(rowData)} size="sm">
                            <PageviewIcon /> Batchs View
                        </Button1>
                    ),
                },
                { 
                    title: 'Event Data', 
                    field: 'image',
                    render: rowData => (
                        <Button1  color="warning" className={classes.marginRight} onClick={() => handleClickOpen(rowData)} size="sm">
                            <EventNoteIcon /> Events View
                        </Button1>
                    ),
                },
                { 
                    title: 'Doubt Data', 
                    field: 'image',
                    render: rowData => (
                        <Button1  color="success" className={classes.marginRight} onClick={() => handleClickOpen(rowData)} size="sm">
                            <ChatIcon /> Doubts View
                        </Button1>
                    ),
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
                        <Fab color="secondary" size="small" aria-label="delete" className={classes.actionButton}  onClick={() => console.log(123)}>
                            <RestoreFromTrashIcon fontSize="small"/>
                        </Fab>
                      </div>
                    ) 
                },
              ]}
              data={query =>
                new Promise((resolve, reject) => {
                  let url = server_url+'user/users_get_all/'
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
