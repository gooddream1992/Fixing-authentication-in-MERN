import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OrderModal from "./OrderModal.js";
import ReactNotifications from 'react-notifications-component';

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import {course_get} from "Function/Courses.js";
import {lecture_get, lecture_update} from "Function/Lectures.js";
//jss
import styles from "assets/jss/material-dashboard-pro-react/views/courses/list.js"
import {server_url} from "server_host.js";
import {lecture_delete} from "Function/Lectures.js";

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
  const [courseList, setCourseList] = React.useState([]);
  const [courseSelect, setCourseSelect] = React.useState('all');
  const [lectureList, setLectureList] = React.useState([]);
  const [lectureListOpen, setLectureListOpen] = React.useState(false);
  // const [counter, setCounter] = React.useState(0);
  
  function lectureModalOpen(value) {
    setLectureListOpen(value)
  }
  function createLecture() {
    props.history.push('/admin/lectures-create/'+props.match.params.course_id);
  }
  function dateFormate(date) {
    var date1 = new Date(date);
    return date1.getFullYear()+"-"+date1.getMonth()+1+"-"+date1.getDate();
  }
  function CourseView(id) {
    props.history.push('/admin/lectures-edit/'+id);
  }
  function courseSelectChange(event) {
    setCourseSelect(event.target.value);
    tableRef.current && tableRef.current.onQueryChange()
  }
  function LectureItemListEnter(course_id, lecture_id){
    props.history.push('/admin/lectureitems-list/'+course_id+"/"+lecture_id);
  }
  function lectureUpdate() {
    var lecture_list = JSON.parse(localStorage.lecturelist);
    for(var i = 0; i < lecture_list.length; i++){
      var data = {
        id: lecture_list[i]._id,
        data: {
            level_number: lecture_list[i].level_number,
            order_number: lecture_list[i].order_number
        }
      }
      lecture_update(data).then(res => {
        setLectureListOpen(false)
      })
      .catch(err => {
          console.log(err);
      })
    }
  }
  function LectureDelete(id) {
    var data = {
      id: id
    }
    lecture_delete(data).then(res => {
      store.addNotification({
        content: <MyNotification title="Lecture Deleted"/>,
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
    var data = {
      id: '0'
    }
    course_get(data).then(res => {
      setCourseList(res);
      for(var i = 0; i < res.length; i++){
        if(res[i]._id === props.match.params.course_id) {
          setCourseSelect(res[i]);
          tableRef.current && tableRef.current.onQueryChange()
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
    data = {
      course: 'from_course',
      id: props.match.params.course_id
    }
    lecture_get(data).then(res => {
      setLectureList(res);
    })
  }, [props]);
  return (
    <div>
    <GridContainer>
      <ReactNotifications />
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Lectures Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <div className={classes.buttonPart}>
                <Button variant="contained" color="primary" className={classes.courseCreateButton} onClick={createLecture}>
                  Create New Lecture
                </Button>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <div className={classes.buttonPart}>
                <Button variant="contained" color="primary" className={classes.courseCreateButton} onClick={() => lectureModalOpen(true)} disabled={courseSelect === 'all' ? true : false}>
                  Change Lecture Order
                </Button>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <FormControl
                fullWidth
                className={classes.selectFormControl}
              >
                  <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}
                  >
                    Select Course
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                    classes={{
                      select: classes.select
                    }}
                    value={courseSelect}
                    onChange={courseSelectChange}
                    inputProps={{
                      name: "simpleSelect",
                      id: "simple-select"
                    }}
                  >
                    <MenuItem
                        classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                        }}
                        value='all'
                    >
                      All Course
                    </MenuItem>
                      {courseList.map(function(item, i){
                          return(
                              <MenuItem
                                  classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected
                                  }}
                                  value={item}
                                  key={i}
                              >
                                  {item.title}
                              </MenuItem>
                          )
                      })}
                  </Select>
              </FormControl>
              </GridItem>
            </GridContainer>
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
                      src={server_url+"lecture/img_get/"+rowData.logo}
                      alt="..."
                    />
                  ),
                  filtering: false
                },
                { 
                  title: 'Title', 
                  field: 'title', 
                  filtering: false,
                  render: rowData => (
                    <div className={classes.courseNameButton} onClick={() => {LectureItemListEnter(rowData.course_id, rowData.id)}}>{rowData.title}</div>
                  )
                },
                { title: 'Course Name', field: 'course_name'},
                { title: 'Weightage', field: 'weight', filtering: false },
                { title: 'Created', field: 'create', render: rowData => (dateFormate(rowData.create)), filtering: false },
                { 
                    title: 'Action', 
                    field: 'id',
                    filtering: false,
                    render: rowData => (
                      <div>
                        <Fab color="primary" size="small" aria-label="edit" className={classes.actionButton} onClick={() => CourseView(rowData.id)}>
                            <EditIcon fontSize="small"/>
                        </Fab>
                        <Fab color="secondary" size="small" aria-label="delete" className={classes.actionButton}  onClick={() => LectureDelete(rowData.id)}>
                            <RestoreFromTrashIcon fontSize="small"/>
                        </Fab>
                      </div>
                    ) 
                },
              ]}
              data={query =>
                
                new Promise((resolve, reject) => {
                  let url = server_url+'admin/lecture/lecture_get_all/'
                  if(courseSelect === 'all'){
                    url += '0'
                  }
                  else {
                    url += courseSelect._id
                  }
                  url += '/' + query.pageSize
                  url += '/' + (query.page)
                  if(query.search === ""){
                    url += '/0'
                  }
                  else {
                    url += '/'+query.search
                  }
                  // url += '/' + (query.)
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
                  selection: true,
                  search: true
              }}    
              onSelectionChange={(rows) => {}}
              onSearchChange={(r) => {console.log(r)}}
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
    <Dialog
      open={lectureListOpen}
      onClose={() => lectureModalOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={false}
    >
      <DialogTitle id="alert-dialog-title">{"Change Lecture's Order"}</DialogTitle>
      <DialogContent>
        <OrderModal lecturelist={lectureList} courselist={courseSelect} update={lectureUpdate}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => lectureModalOpen(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => lectureUpdate()} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
}
