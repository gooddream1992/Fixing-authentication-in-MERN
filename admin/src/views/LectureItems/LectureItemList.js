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
//api
import {course_get} from "Function/Courses.js";
import {lecture_get} from "Function/Lectures.js";
import {item_from_course, lectureitem_update, lectureitem_delete} from "Function/LectureItem.js";

//jss
import styles from "assets/jss/material-dashboard-pro-react/views/lectureItem/list.js";
import {server_url} from "server_host.js";


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
  const [lectureSelect, setLectureSelect] = React.useState({});
  const [tableListLoad, setTableListLoad] = React.useState(false);
  const [lectureListOpen, setLectureListOpen] = React.useState(false);
  const [lectureItemList, setLectureItemList] = React.useState([]);

  function lectureModalOpen(value) {
    setLectureListOpen(value)
  }
  function lectureItemUpdate() {
    var list = JSON.parse(localStorage.itemlist);
    for(var i = 0; i < list.length; i++){
      var data = {
        id: list[i]._id,
        data: {
          order_number: list[i].order_number
        }
      }
      lectureitem_update(data).then(res => {
        setLectureListOpen(false)
      })
    }
  }
  function createItem() {
    props.history.push('/admin/lectureitems-create/'+props.match.params.course_id+'/'+props.match.params.lecture_id);
  }
  function dateFormate(date) {
    var date1 = new Date(date);
    return date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();
  }
  function CourseView(id) {
    props.history.push('/admin/lectureitems-edit/'+id);
  }
  function courseSelectChange(event) {
    setCourseSelect(event.target.value);
    var data = {
      id: event.target.value._id,
      course: 'from_course'
    }
    lecture_get(data).then(res => {
      setLectureList(res);
      setLectureSelect(res[0]);
      tableRef.current && tableRef.current.onQueryChange();
    });
  }
  function lectureSelectChange(event) {
    setLectureSelect(event.target.value);
    setTableListLoad(!tableListLoad);
    tableRef.current && tableRef.current.onQueryChange();
  }
  function LectureItemDelete(id) {
    var data = {
      id: id
    }
    lectureitem_delete(data).then(res => {
      store.addNotification({
        content: <MyNotification title="Lecture Item Deleted"/>,
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
      var course = null;
      for(var i = 0; i < res.length; i++){
        if(props.match.params.course_id ===res[i]._id){
          setCourseSelect(res[i])
          course = res[i]
        }
      }
      data = {
        id: course._id,
        course: 'from_course'
      }
      lecture_get(data).then(res => {
        setLectureList(res);
        for(i = 0; i < res.length; i++){
          if(props.match.params.lecture_id === res[i]._id){
            setLectureSelect(res[i]);
          }
        }
        tableRef.current && tableRef.current.onQueryChange();
      });
    })
    .catch(err => {
      console.log(err);
    })
    data = {
      id: props.match.params.lecture_id
    }
    item_from_course(data).then(res => {
      setLectureItemList(res);
    })
  }, [props]);
  return (
    <div>
    <GridContainer>
      <ReactNotifications />
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Lecture Item Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={2}>
              <div className={classes.buttonPart}>
                <Button variant="contained" color="primary" className={classes.courseCreateButton} onClick={createItem}>
                  Create New Item
                </Button>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <div className={classes.buttonPart}>
                <Button variant="contained" color="primary" className={classes.courseCreateButton} onClick={() => lectureModalOpen(true)}>
                  Change Item Order
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
              <GridItem xs={12} sm={12} md={4}>
                <FormControl
                  fullWidth
                  className={classes.selectFormControl}
                >
                  <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}
                  >
                    Select Lecture
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                    classes={{
                      select: classes.select
                    }}
                    value={lectureSelect}
                    onChange={lectureSelectChange}
                    inputProps={{
                      name: "simpleSelect",
                      id: "simple-select"
                    }}
                  >
                      {lectureList.map(function(item, i){
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
            {(Object.keys(lectureSelect).length !== 0) && (
              <MaterialTable
                title="Multiple Actions Preview"
                // tableRef={React.createRef()}
                tableRef={tableRef}
                columns={[
                  
                  { title: 'Title', field: 'title', filtering: false },
                  { title: 'Lecture Name', field: 'lecture_name'},
                  { title: 'Content Type', field: 'content_type', filtering: false },
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
                          <Fab color="secondary" size="small" aria-label="delete" className={classes.actionButton}  onClick={() => LectureItemDelete(rowData.id)}>
                              <RestoreFromTrashIcon fontSize="small"/>
                          </Fab>
                        </div>
                      ) 
                  },
                ]}
                data={query =>
                  
                  new Promise((resolve, reject) => {
                    let url = server_url+'admin/lectureitem/lectureitem_get_all/'
                    if(lectureSelect === 'all'){
                      url += '0'
                    }
                    else {
                      url += lectureSelect._id
                    }
                    url += '/' + query.pageSize
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
            )}
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
      <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <OrderModal lectureitemlist={lectureItemList}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => lectureModalOpen(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => lectureItemUpdate()} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
}
