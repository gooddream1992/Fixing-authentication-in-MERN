import React from "react";
import jweDecode from 'jwt-decode';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from 'material-table';
// @material-ui/icon components
import SmsIcon from '@material-ui/icons/Sms';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import RateReviewIcon from '@material-ui/icons/RateReview';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button1 from "components/CustomButtons/Button.js";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
// @material-ui/icon components
//react component
import Avatar from 'react-avatar';

// import {course_get} from "Function/Courses.js";
import {user_get, user_all_get} from "Function/User.js";
import {doubte_update, chatuser_add_room, other_admin, doubte_all_update} from 'Function/DoubteChat.js';
import {server_url} from "server_host.js";
//jss
import styles from "assets/jss/material-dashboard-pro-react/views/doubte.js";


const useStyles = makeStyles(styles);


export default function TableList(props) {
  const classes = useStyles();
  const tableRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [adminList, setAdminList] = React.useState([]);
  const [userData, setUserData] = React.useState({});
  const [doubteData, setDoubteData]  =React.useState({});
  const handleClickOpen = (data) => {
    setDoubteData(data);
    if(userData.user_level === 'supper') {
      setOpen(true);
    }
    else {
      window.location.href="/admin/chat/"+data.id+"/"+userData._id;
    }
  };
  const handleClose = () => {
    if(userData.user_level === 'supper') {
      setOpen(false);
    }
    else {
      window.location.href="/admin/chat/"+doubteData.id+"/"+userData._id;
    }
  }
  const ChatOpen = (data) => {
    window.location.href="/admin/chat/"+data.id+"/"+userData._id;
  }
  const ViewChat = (data) => {
    window.location.href="/admin/chat/"+data.id+"/"+data.admin_id;
  }
  // const selectAdmin = (item) => {
  //     var data = {
  //       id: doubteData.room_id,
  //       isPrivate: false
  //     }
  //     chatroom_update(data).then(res => {
        
  //         data = {
  //           roomId: doubteData.room_id,
  //           userIds: ['admin']
  //         }
  //         chatuser_remove_room(data).then(res => {
  //           data = {
  //             roomId: doubteData.room_id,
  //             userId: item._id,
  //             user_name: item.first_name+" "+item.last_name,
  //           }
  //           chatuser_add_room(data).then(res => {
  //             data = {
  //               id: doubteData.id,
  //               data: {
  //                 admin_id: item._id,
  //                 admin_name: item.first_name+" "+item.last_name,
  //                 chat_admin_id: item._id
  //               } 
  //             }
  //             doubte_update(data).then(res => {
  //               setOpen(false);
  //               if(item.user_level === "supper"){
  //                 window.location.href="/admin/chat/"+doubteData.id+"/"+item._id;                
  //               }
  //               else {
  //                 tableRef.current && tableRef.current.onQueryChange();
  //               }
  //             })

  //           })
  //         })
  //     })
  // };
  function sendMessage(item) {
    var data = {
      roomId: doubteData.id,
      userId: item._id,
      user_name: item.first_name+" "+item.last_name,
    }
    chatuser_add_room(data).then(res => {
      var user_data = {
        id: item._id,
        username: item.first_name+" "+item.last_name
      }
      data = {
        roomId: doubteData.id,
        userId: 'admin',
        text: JSON.stringify(user_data)
      }
      other_admin(data).then(res => {
      })
      .catch(err => {
        console.log(err);
      })
      data = {
        id: doubteData.id,
        data: {
          admin_id: item._id,
          admin_name: item.first_name+" "+item.last_name,
          chat_admin_id: item._id,
          admin_join_flg: true
        } 
      }
      doubte_update(data).then(res => {
        setOpen(false);
        if(item.user_level === "supper"){
          window.location.href="/admin/chat/"+doubteData.id+"/"+item._id;                
        }
        else {
          tableRef.current && tableRef.current.onQueryChange();
        }
      })

    })
  }
  function dateFormate(date) {
    var date1 = new Date(date);
    return date1.getFullYear()+"-"+(parseInt(date1.getMonth())+1)+"-"+date1.getDate();
  }
  React.useEffect(() => {
    user_all_get().then(res => {
      setAdminList(res);
    })
    var user_data = jweDecode(localStorage.user_token);
    var data = {
      id: user_data._id
    }
    user_get(data).then(res => {
      setUserData(res.user_data);
      var data = {};
      if(res.user_data.user_level === 'supper'){
        data = {
          admin_view_flg: true
        }
      }
      else {
        data = {
          view_flg: true
        }
      }
      doubte_all_update(data).then(res => {
      })
      tableRef.current && tableRef.current.onQueryChange();
    })
  }, []);
  return (
    <GridContainer>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Join Best Admin</DialogTitle>
        <List>
          {adminList.map(item => (
            <ListItem button onClick={() => sendMessage(item)} key={item._id}>
              <ListItemAvatar>
                <Avatar name={item.first_name+" "+item.last_name} src={server_url+"admin/user/img_get/"+item.image} size="50" round={true} className="avatar"/>
              </ListItemAvatar>
              <ListItemText primary={item.first_name+" "+item.last_name} />
            </ListItem>
          ))}
        </List>
      </Dialog>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Doubte Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <div className={classes.buttonPart}>
            </div>
            <MaterialTable
              title="Multiple Actions Preview"
              tableRef={tableRef}
              columns={[
                { 
                  title: 'User Name', 
                  field: 'user_name'
                },
                { title: 'Title', field: 'title' },
                { title: 'Description', field: 'description'},
                { 
                    title: 'Course Name', 
                    field: 'course_name'
                },
                {
                  title: 'Resolve', 
                  field: 'solve',
                  render: rowData => (
                    <div >
                      {rowData.solve && (
                        <span className={classes.Badeg+" solved"}>Solved</span>
                      )}
                      {!rowData.solve && (
                        <span className={classes.Badeg+" active"}>Active</span>
                      )}
                    </div>
                  ) 
                },
                { title: 'Created', field: 'create', render: rowData => (dateFormate(rowData.create)) },
                { 
                    title: 'Action', 
                    field: 'id',
                    render: rowData => (
                      <div>
                        {(!rowData.admin_join_flg) && (
                          <Button1  color="info" className={classes.marginRight} onClick={() => handleClickOpen(rowData)} disabled={rowData.admin_join_flg}>
                            <MeetingRoomIcon /> {'Join Now'}
                          </Button1>
                        )}
                        {(rowData.admin_join_flg && rowData.user_id === userData._id) && (
                          <Button1  color="rose" className={classes.marginRight} onClick={() => ChatOpen(rowData)}>
                            <SmsIcon /> Open Chat
                          </Button1>
                        )}
                        {(rowData.admin_join_flg && rowData.user_id !== userData._id) && (
                          rowData.join_flg ?(
                            <Button1  color="danger" className={classes.marginRight} onClick={() => ViewChat(rowData)}>
                              <RateReviewIcon /> View Chat
                            </Button1>
                          ) : (
                            <Button1  color="info" className={classes.marginRight} onClick={() => handleClickOpen(rowData)} disabled={rowData.admin_join_flg}>
                              <MeetingRoomIcon /> {"Pending..."}
                            </Button1>
                          )
                          
                        )}
                      </div>
                    ) 
                },
              ]}
              data={query =>
                new Promise((resolve, reject) => {
                  let url = server_url+'doubtchat/doubte_get_all/'
                  url += query.pageSize
                  url += '/' + (query.page)
                  if(query.search === ""){
                    url += '/0'
                  }
                  else {
                    url += '/'+query.search
                  }
                  url += '/'+userData.user_level+'/'+userData._id
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
