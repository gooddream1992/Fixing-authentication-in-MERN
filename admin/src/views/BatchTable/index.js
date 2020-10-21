import React from "react";
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// @material-ui/icon components
import EditIcon from '@material-ui/icons/Edit';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import BackupIcon from '@material-ui/icons/Backup';
import CheckIcon from '@material-ui/icons/Check';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// react component
import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';

import {course_batch_file, course_get, json_file_read, json_file_write, course_update} from "Function/Courses.js";
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
  const inputRef = React.useRef();
    const [courseList, setCourseList] = React.useState([]);
    const [jsonEditorOpen, setJsonEditorOpen] = React.useState(false);
    const [batchData, setBatchData] = React.useState({});
    const [jsonError, setJsonError] = React.useState(true);
    const [batchData1, setBatchData1] = React.useState({});
    const [fileName, setFileName] = React.useState('');
    const [inputKey, setInputKey] = React.useState('');
    const [createBatchModal, setCreateBatchModal] = React.useState(false);
    const [batchOrder, setBatchOrder] = React.useState(1);
    const [newBatchFile, setNewBatchFile] = React.useState(null);
    const [courseDate, setCourseData] = React.useState({});
    const [batchMonth, setBatchMonth] = React.useState('');
    const [batchFileUploadFlg, setBatchFileUploadFlg] = React.useState(false);
    // const [lastBatchDate, setLastBatchDate] = React.useState(new Date());
    const [load, setLoad] = React.useState(false);
  // function dateFormate(date) {
  //   var date1 = new Date(date);
  //   return date1.getFullYear()+"-"+date1.getMonth()+1+"-"+date1.getDate();
  // }
  var yesterday = Datetime.moment().subtract( 1, 'day' );
  var valid = function( current ){
    return current.isAfter( yesterday );
  };
  function ModalOpen(data1) {
    setFileName(data1.batch_json+".txt");
    var data = {
      filename: data1.batch_json+".txt"
    }
    json_file_read(data).then(res => {
      setBatchData(res);
      setBatchData1(res);
    })
    setJsonEditorOpen(true);
  }
  function ModalClose() {
    setJsonEditorOpen(false);
  }
  function CreateOpen() {
    setCreateBatchModal(true);
  }
  function CreateClose() {
    setCreateBatchModal(false);
  }
  function BatchOrderChange(e){
    setBatchOrder(e.target.value);
  }
  function BatchDataChange(e) {
    setBatchData1(e.json)
    if(!e.error) {
      setJsonError(false);
    }
    else {
      setJsonError(true);
    }
  }
  function BatchDataSave() {
    var data = {
      text: batchData1,
      filename: fileName,
    }
    json_file_write(data).then(res => {
      setJsonEditorOpen(false);
    })
  }
  function BatchIdChange(e) {
    setBatchMonth(new Date(e._d).getMonth()+1);
  }
  function NewBatchFile(e) {
    setNewBatchFile(e.target.files[0]);
    setBatchFileUploadFlg(true)
  }
  function deleteBatch(id) {
    var batch = courseDate.batch_members;
    batch = batch.filter(function(item) {
      return item.id !== id
    })
    var data1 = {
      id: props.match.params.id,
      data: {
        batch_members: batch
      }
    }
    course_update(data1).then(res => {
      store.addNotification({
        content: <MyNotification title="Batch has deleted"/>,
        container: 'top-center',
        animationIn: ["animated", "bounceIn"],
        animationOut: ["animated", "bounceOut"],
        dismiss: {
          duration: 3000
        },
        width: 300
      });
      setLoad(!load);
    })
  }
  function CreateBatch(){
    var flg = false;
    var batch_id = `batch_${batchMonth}_${batchOrder}`;
    var batch = courseDate.batch_members;
    var batch_list1 = courseList;
    for(var i = 0; i < batch.length; i++){
      if(batch[i].id === batch_id){
        flg = true
      }
    }
    if(flg){
        store.addNotification({
          content: <MyNotification title="You have already created the batch"/>,
          container: 'top-center',
          animationIn: ["animated", "bounceIn"],
          animationOut: ["animated", "bounceOut"],
          dismiss: {
            duration: 3000
          },
          width: 300
        });
    }
    else {
      const data = new FormData();
      data.append('file', newBatchFile);
      var jsonFile = {
        jsonFile: data,
        name: batch_id
      };
      course_batch_file(jsonFile).then(res => {
        var batch_obj = {
          id: batch_id,
          file: batch_id,
          members: []
        }
        batch.push(batch_obj)
        var data1 = {
          id: props.match.params.id,
          data: {
            batch_members: batch
          }
        }
        course_update(data1).then(res => {
          batch_list1[batch_list1.length] = {
            batch_id: batch_id,
            batch_member: 0,
            batch_json: batch_id
          }
          setCourseList(batch_list1)
          store.addNotification({
            content: <MyNotification title="New batch created"/>,
            container: 'top-center',
            animationIn: ["animated", "bounceIn"],
            animationOut: ["animated", "bounceOut"],
            dismiss: {
              duration: 3000
            },
            width: 300
          });
          setCreateBatchModal(false);
          setLoad(!load);
        })
      })
    }
    
  }
  function batchFileUpload(e, data1) {
    e.target.file = null;
    let randomString = Math.random().toString(36);
    setInputKey(randomString);
    e.preventDefault();
    let reader = new FileReader();
    let newFile = e.target.files[0];
    var start = parseInt(e.target.getAttribute('data-startbyte')) || 0;
    var stop = parseInt(e.target.getAttribute('data-endbyte')) || newFile.size - 1;
    reader.onloadend = (theFile) => {
      const data = new FormData();
      data.append('file', newFile);
      var jsonFile = {
        jsonFile: data,
        name: data1.batch_json
      };
      course_batch_file(jsonFile).then(res => {
        store.addNotification({
          content: <MyNotification title="Batch JSON file uploaded!"/>,
          container: 'top-center',
          animationIn: ["animated", "bounceIn"],
          animationOut: ["animated", "bounceOut"],
          dismiss: {
            duration: 3000
          },
          width: 300
        });
        inputRef.current.files = null;
      })
      .catch(err => {
        console.log(err);
      })
      // console.log(theFile.target.result)
    };
    var blob = newFile.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
  }
  React.useEffect(() => {
    var data = {
        id: props.match.params.id
    };
    course_get(data).then(res => {
      var batch_list = [];
      setCourseData(res);

      for(var i = 0; i < res.batch_members.length; i++){
          batch_list[i] = {
            batch_id: res.batch_members[i].id,
            batch_member: res.batch_members[i].members.length,
            batch_json: res.batch_members[i].file
          }
      }
      setCourseList(batch_list);
    })
  }, [props, load]);
  return (<>
    <ReactNotifications className={classes.notification}/>
    {/* {JSON Editor} */}
    <Dialog
      open={jsonEditorOpen}
      onClose={() => ModalClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={false}
    >
      <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <JSONInput
          id = 'a_unique_id'
          placeholder = { batchData }
          theme="dark_vscode_tribute"
          colors = {{
            string: "#DAA520" // overrides theme colors with whatever color value you want
          }}
          locale = { locale }
          height = '550px'
          onChange = {(e) => BatchDataChange(e)}
          confirmGood = {() => {console.log(123123)}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => ModalClose()} color="primary">
          Cancel
        </Button>
        <Button color="primary" autoFocus disabled={jsonError} onClick={BatchDataSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
    {/* {Create} */}
    <Dialog
      open={createBatchModal}
      onClose={() => CreateClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={false}
    >
      <DialogTitle id="alert-dialog-title">{"Create new batch"}</DialogTitle>
      <DialogContent style={{width: '300px', height: '300px'}}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Datetime
              timeFormat={false}
              dateFormat="YY/MM"
              inputProps={{ placeholder: "Select Batch Month" }}
              onChange={BatchIdChange}
              isValidDate={ valid }
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
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
                    value={batchOrder}
                    onChange={BatchOrderChange}
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
                        value={1}
                    >
                      1
                    </MenuItem>
                      <MenuItem
                          classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                          }}
                          value={2}
                      >
                          2
                      </MenuItem>
                  </Select>
              </FormControl>
          </GridItem>
        </GridContainer>
        <label 
          htmlFor="json-file1"
        >
          <p
            style={{
              background: '#3f51b5',
              boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
              textAlign: 'center',
              padding: '10px',
              fontWeight: 'bold',
              color: 'white',
              borderRadius: '5px',
              width: '100%',
              margin: '0px',
              cursor: 'pointer'
            }}
          >
            Upload Batch File
          </p>
        </label>
        <input id="json-file1" type="file" style={{display: 'none'}} accept=".txt" onChange={NewBatchFile}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => CreateClose()} color="primary">
          Cancel
        </Button>
        <Button color="primary" autoFocus onClick={CreateBatch} disabled={(batchFileUploadFlg && batchMonth !=="") ? false : true}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Batch Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Button variant="contained" color="primary" style={{marginBottom: '10px'}} onClick={CreateOpen}>Create New Batch</Button>
            <MaterialTable
              title="Multiple Actions Preview"
              // tableRef={React.createRef()}
              columns={[
                { 
                  title: 'Batch Id', 
                  field: 'batch_id'
                },
                { 
                  title: 'Batch Members',
                  field: 'batch_member'
                },
                { 
                  title: 'Batch File Upload', 
                  field: 'batch_id',
                  render: rowData => (
                    <Fab color="primary" size="small" aria-label="edit" className={classes.actionButton}>
                      <label htmlFor={"file"+rowData.batch_id}>
                        <BackupIcon fontSize="small" style={{cursor: 'pointer'}}/>
                      </label>
                      <input id={"file"+rowData.batch_id} type="file" accept=".txt" style={{display: 'none'}} onChange={(e) => {batchFileUpload(e, rowData)}} ref = {inputRef} key={inputKey}/>
                    </Fab>
                  ) 
                },
                { 
                    title: 'Action', 
                    field: 'batch_id',
                    render: rowData => (
                      <div>
                        <Fab color="primary" size="small" aria-label="edit" className={classes.actionButton} onClick={() => ModalOpen(rowData)}>
                          <EditIcon fontSize="small"/>
                        </Fab>
                        <Fab color="secondary" size="small" aria-label="delete" className={classes.actionButton}  onClick={() => deleteBatch(rowData.batch_id)}>
                            <RestoreFromTrashIcon fontSize="small"/>
                        </Fab>
                      </div>
                    ) 
                },
              ]}
              data={courseList}
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
