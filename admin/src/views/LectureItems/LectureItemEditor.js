import React from "react";
import PropTypes from "prop-types";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import NavPills from "components/NavPills/NavPills.js";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
// other component
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
//react component
import SweetAlert from "react-bootstrap-sweetalert";
//jss
import style from "assets/jss/material-dashboard-pro-react/views/lectureItem/create.js";
//api
import { course_get } from "Function/Courses.js";
import { lecture_get, lecture_update } from "Function/Lectures.js";
import {lectureitem_get, lectureitem_update, lectureitem_pdf_upload, item_from_course} from "Function/LectureItem.js";
import {server_url} from "server_host.js";


class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        pdffileLoad: true,
        pdfPreviewUrl: null,
        pdfName: '',
        title: "",
        titleState: "success",
        releaseDays: 0,
        deadline: 0,
        weight: 0,
        courseList: [],
        courseSelect: '',
        lectureSelect: '',
        lectureList: [],
        freeType: '',
        inputFormat: '',
        note: '',
        contain: '',
        hint: '',
        outputFormat: '',
        sampleInput: ['option', '0'],
        sampleOutput: ['0'],
        testInput: ['0', '0', '0', '0', '0', '0'],
        testOutput: ['0', '0', '0', '0', '0', '0'],
        checkInput: ['0', '0', '0'],
        checkOutput: ['0', '0', '0'],
        description: '',
        descriptionState: 'success',
        file: {
            python: {
                solution: ""
            },
            cpp: {
                main: "",
                solution: ""
            },
            java: {
                main: "",
                solution: ""
            }
        },
        sampleCode: {
            python: '',
            cpp: '',
            java: ''
        },
        url: '',
        score: 0,
        prevScore: 0,
        selectedValue: 'option'
    };
    this.handleSimple = this.handleSimple.bind(this);
    this.createLectureItem = this.createLectureItem.bind(this);
    this.lectureSelect = this.lectureSelect.bind(this);
    this.freeType = this.freeType.bind(this);
    this.sampleDataFieldAdd = this.sampleDataFieldAdd.bind(this);
    this.sampleDataChange = this.sampleDataChange.bind(this);
    this.sampleInputDataFieldAdd = this.sampleInputDataFieldAdd.bind(this);
    this.sampleOutputDataFieldAdd = this.sampleOutputDataFieldAdd.bind(this);
    this.courseSelect = this.courseSelect.bind(this);
    this.sampleDataFleidRemove = this.sampleDataFleidRemove.bind(this);
    this.sampleInputDataFleidRemove = this.sampleInputDataFleidRemove.bind(this);
    this.sampleOutputDataFleidRemove = this.sampleOutputDataFleidRemove.bind(this);
    this.codeChange = this.codeChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePDFChange = this.handlePDFChange.bind(this);
  }
  componentDidMount(){
    var data = {
        id: '0'
    }
    course_get(data).then(res => {
        this.setState({courseList: res});
    })
    .catch(err => {
      console.log(err);
    })
    data = {
        id: this.props.match.params.id
    };
    lectureitem_get(data).then(res => {
        var lecture_item = res;
        data = {
            id: lecture_item.course_id,
            course: 'from_course'
        }
        lecture_get(data).then(res => {
            this.setState({lectureList: res});
        });
        data = {
            id: res.lecture_id,
            course: 'other'
        }
        lecture_get(data).then(res => {
            this.setState({
                courseSelect: lecture_item.course_id,
                lectureSelect: JSON.stringify({id: lecture_item.lecture_id, title: lecture_item.lecture_name, total_score: res.total_score}),
                title: lecture_item.title,
                titleState: "success",
                freeType: lecture_item.type,
                inputFormat: lecture_item.in_format,
                note: lecture_item.notes,
                contain: lecture_item.contain,
                hint: lecture_item.hint,
                outputFormat: lecture_item.out_format,
                sampleInput: lecture_item.sample_input,
                sampleOutput: lecture_item.sample_output,
                testInput: lecture_item.test_input,
                testOutput: lecture_item.test_output,
                checkInput: lecture_item.check_input,
                checkOutput: lecture_item.check_output,
                description: lecture_item.description,
                descriptionState: 'success',
                file: lecture_item.filename,
                sampleCode: lecture_item.sample_code,
                url: lecture_item.url,
                score: lecture_item.score,
                prevScore: lecture_item.score,
                pdfName: lecture_item.filename,
                selectedValue: lecture_item.sample_input[0],
                orderNumber: res.order_number
            })
        });
    })
  }
  handleChange(event) {
    var sample_input = this.state.sampleInput;
    sample_input[0] = event.target.value;
    this.setState({selectedValue:event.target.value});
    this.setState({sampleInput: sample_input});
    if(event.target.value !== 'check') {
        this.setState({sampleOutput: [this.state.sampleOutput[0]]})
    }
};
  lectureSelect(event) {
    this.setState({lectureSelect: event.target.value});
    var data = {
        id: event.target.value._id
    }
    item_from_course(data).then(res => {
        this.setState({orderNumber: res.length+1})
    })
  }
  courseSelect(event) {
        this.setState({courseSelect: event.target.value});
        var data = {
            id: event.target.value,
            course: 'from_course'
        }
        lecture_get(data).then(res => {
            console.log(res);
            this.setState({lectureList: res});
            this.setState({lectureSelect: JSON.stringify({id: res[0]._id, title: res[0].title, total_score: res[0].total_score})});
            data = {
                id: res[0]._id
            }
            item_from_course(data).then(res => {
                this.setState({orderNumber: res.length+1})
            })
        });
  }
  freeType(event) {
      this.setState({freeType: event.target.value})
  }

  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  sampleDataFieldAdd() {
      var in_p = this.state.sampleInput;
      in_p[in_p.length] = "0";
      var out_p = this.state.sampleOutput;
      out_p[out_p.length] = "0";
      this.setState({
        sampleInput: in_p,
        sampleOutput: out_p
      })
  }
  sampleDataFleidRemove() {
    this.state.sampleInput.pop();
    this.state.sampleOutput.pop();
    this.setState({
        sampleInput: this.state.sampleInput,
        sampleOutput: this.state.sampleOutput
      })
  }
    sampleInputDataFieldAdd() {
        var in_p = this.state.sampleInput;
        in_p[in_p.length] = "0";
        this.setState({
            sampleInput: in_p,
        })
    }
    sampleInputDataFleidRemove() {
        this.state.sampleInput.pop();
        this.setState({
            sampleInput: this.state.sampleInput
        })
    }
    sampleOutputDataFieldAdd() {
        var out_p = this.state.sampleOutput;
        out_p[out_p.length] = "0";
        this.setState({
            sampleOutput: out_p
        })
    }
    sampleOutputDataFleidRemove() {
        this.state.sampleOutput.pop();
        this.setState({
            sampleOutput: this.state.sampleOutput
        })
    }
  sampleDataChange(e, i, stateName) {
      if(stateName === 'sampleInput') {
          var data = this.state.sampleInput;
      }
      else {
        data = this.state.sampleOutput;
      }
      data[i] = e.target.value;
    this.setState({[stateName]: data});
  }
  testDataChange(e, i, stateName) {
    if(stateName === 'testInput') {
        var data = this.state.testInput;
    }
    else {
      data = this.state.testOutput;
    }
    data[i] = e.target.value;
    this.setState({[stateName]: data});
  }
  checkDataChange(e, i, stateName) {
    if(stateName === 'checkInput') {
        var data = this.state.checkInput;
    }
    else {
      data = this.state.checkOutput;
    }
    data[i] = e.target.value;
    this.setState({[stateName]: data});
  }
  handleSimple(event, stateName) {
      this.setState({[stateName]: event.target.value});
  };
  codeChange(newcode, stateName, codeMode, fileName) {
    if(stateName === 'file') {
        var code = this.state.file;
        if(codeMode === 'python') {
            fileName === 'main' ? code.python.main = newcode : code.python.solution = newcode
        }
        if(codeMode === 'cpp') {
            fileName === 'main' ? code.cpp.main = newcode : code.cpp.solution = newcode
        }
        if(codeMode === 'java'){
            fileName === 'main' ? code.java.main = newcode : code.java.solution = newcode
        }
        this.setState({file: code});
    }
    else {
        var samplecode = this.state.sampleCode;
        if(codeMode === 'python') {
            samplecode.python = newcode
        }
        if(codeMode === 'cpp') {
            samplecode.cpp = newcode
        }
        if(codeMode === 'java'){
            samplecode.java = newcode
        }
        this.setState({sampleCode: samplecode});
    }
  }
  handlePDFChange (e) {
    e.preventDefault();
    this.setState({pdffileLoad: false});
    let reader = new FileReader();
    let newFile = e.target.files[0];
    reader.onloadend = () => {
        this.setState({pdfPreviewUrl: reader.result});
        const data = new FormData();
        data.append('file', newFile);
        var pdfData = {
            pdfData: data
        };
        lectureitem_pdf_upload(pdfData).then(res => {
            this.setState({pdfName: res.filename});
            this.setState({file: res.filename});
            this.setState({pdffileLoad: true});
        })
        .catch(err => {
            console.log(err);
        })
    };
    reader.readAsDataURL(newFile);

  };
  createLectureItem() {
    var data = {
        id: this.props.match.params.id,
        data: {
            lecture_id: JSON.parse(this.state.lectureSelect).id,
            lecture_name: JSON.parse(this.state.lectureSelect).title,
            course_id: this.state.courseSelect,
            sample_input: this.state.sampleInput,
            sample_output: this.state.sampleOutput,
            test_input: this.state.testInput,
            test_output: this.state.testOutput,
            check_input: this.state.checkInput,
            check_output: this.state.checkOutput,
            title: this.state.title,
            type: this.state.freeType,
            url: this.state.url,
            filename: this.state.file,
            description: this.state.description,
            in_format: this.state.inputFormat,
            out_format: this.state.outputFormat,
            notes: this.state.note,
            contain: this.state.contain,
            sample_code: this.state.sampleCode,
            score: this.state.score,
            hint: this.state.hint,
            order_number: this.state.orderNumber
        }
    }
    lectureitem_update(data).then(res => {
        const { classes } = this.props;
        if(res.success){
            data = {
                id: JSON.parse(this.state.lectureSelect).id,
                data: {
                    total_score: parseInt(JSON.parse(this.state.lectureSelect).total_score)-parseInt(this.state.prevScore)+parseInt(this.state.score)
                }
            }
            lecture_update(data).then(res => {
                this.setState({
                    alert: <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Lecture Content Edited!"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnCssClass={classes.button + " " + classes.success}
                />
                })
            })
            
        }
    })
  }
  hideAlert() {
    this.setState({alert: null})
  }
  render() {
    const { classes } = this.props;
    return (
        <div>
           {this.state.alert} 
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
            <CardBody>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12}>
                <h4 className={classes.infoText}>
                    Please set main item for course
                </h4>
                </GridItem>
                
                <GridItem xs={12} sm={4}>
                    <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                    >
                        <InputLabel
                            htmlFor="simple-select"
                            className={classes.selectLabel}
                        >
                            Lecture Type
                        </InputLabel>
                        <Select
                            MenuProps={{
                                className: classes.selectMenu
                            }}
                            classes={{
                                select: classes.select
                            }}
                            value={this.state.freeType}
                            onChange={this.freeType}
                            inputProps={{
                                name: "simpleSelect",
                                id: "simple-select"
                            }}
                            disabled
                        >
                            {['code', 'video', 'notes', 'puzzle'].map(function(item, i){
                                return(
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={item}
                                        key={i}
                                    >
                                        {item}
                                    </MenuItem>
                                )
                                
                            })}
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem xs={12} sm={4}>
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
                            value={this.state.courseSelect}
                            onChange={this.courseSelect}
                            inputProps={{
                                name: "simpleSelect",
                                id: "simple-select"
                            }}
                        >
                            {this.state.courseList.map(function(item, i){
                                return(
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={item._id}
                                        key={i}
                                    >
                                        {item.title}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem xs={12} sm={4}>
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
                            value={this.state.lectureSelect}
                            onChange={this.lectureSelect}
                            inputProps={{
                                name: "simpleSelect",
                                id: "simple-select"
                            }}
                        >
                            {this.state.lectureList.map(function(item, i){
                                return(
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={JSON.stringify({id: item._id, title: item.title, total_score: item.total_score})}
                                        key={i}
                                    >
                                        {item.title}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12}>
                    <CustomInput
                        success={this.state.titleState === "success"}
                        error={this.state.titleState === "error"}
                        labelText={
                        <span>
                            Title <small>(required)</small>
                        </span>
                        }
                        id="title"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => this.change(event, "title", "length", 3),
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <Face className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                            ),
                            value: this.state.title
                        }}
                    />
                </GridItem>
                {(this.state.freeType === 'code' || this.state.freeType === 'puzzle') && (
                    <GridItem xs={12} sm={12}>
                        <CustomInput
                            success={this.state.descriptionState === "success"}
                            error={this.state.descriptionState === "error"}
                            labelText={
                            <span>
                                Description <small>(required 30 >)</small>
                            </span>
                            }
                            id="preview"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                onChange: event => this.change(event, "description", "length", 30),
                                endAdornment: (
                                    <InputAdornment
                                        position="end"
                                        className={classes.inputAdornment}
                                    >
                                        <Face className={classes.inputAdornmentIcon} />
                                    </InputAdornment>
                                ),
                                multiline: true,
                                rows: 5,
                                value: this.state.description
                            }}
                        />
                    </GridItem>
                )}
                {this.state.freeType === 'code' && (<>
                <GridItem xs={12} sm={6}>
                    <CustomInput
                        labelText={
                        <span>
                            Input Formate
                        </span>
                        }
                        id="preview"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => this.change(event, "inputFormat", "length", 30),
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <Face className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                            ),
                            multiline: true,
                            value: this.state.inputFormat
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={6}>
                    <CustomInput
                        labelText={
                        <span>
                            Output Formate
                        </span>
                        }
                        id="preview"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => this.change(event, "outputFormat", "length", 30),
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <Face className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                            ),
                            multiline: true,
                            value: this.state.outputFormat
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={6}>
                    <CustomInput
                        labelText={
                        <span>
                            Note
                        </span>
                        }
                        id="preview"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => this.change(event, "note", "length", 5),
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <Face className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                            ),
                            multiline: true,
                            value: this.state.note
                        }}
                    />
                </GridItem>
                </>
                )}
                {(this.state.freeType === 'code' || this.state.freeType === 'puzzle') && (
                <GridItem xs={12} sm={6}>
                    <CustomInput
                        labelText={
                        <span>
                            Contain
                        </span>
                        }
                        id="preview"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => this.change(event, "contain", "length", 30),
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <Face className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                            ),
                            multiline: true,
                            value: this.state.contain
                        }}
                    />
                </GridItem>
                )}
                {this.state.freeType === 'video' && (
                <GridItem xs={12} sm={6}>
                    <CustomInput
                        labelText={
                        <span>
                            URL
                        </span>
                        }
                        id="preview"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => this.change(event, "url", "length", 30),
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <Face className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                            ),
                            multiline: true,
                            value: this.state.url
                        }}
                    />
                </GridItem>
                )}
                {(this.state.freeType === 'code' || this.state.freeType === 'puzzle') && (
                <GridItem xs={12} sm={6}>
                    <CustomInput
                        labelText={
                        <span>
                            Score
                        </span>
                        }
                        id="preview"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => this.change(event, "score", "length", 30),
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <Face className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                            ),
                            multiline: true,
                            value: this.state.score
                        }}
                    />
                </GridItem>
                )}
                {(this.state.freeType === 'code') && (
                <GridItem xs={12} sm={6}>
                    <CustomInput
                        labelText={
                        <span>
                            Hint Video ID
                        </span>
                        }
                        id="preview"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => this.change(event, "hint", "length", 30),
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <Face className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                            ),
                            multiline: true,
                            value: this.state.hint
                        }}
                    />
                </GridItem>
                )}
                <br />
                <br />
                {(this.state.freeType === 'code') && (
                <GridItem xs={12} sm={12}>
                    <div className={classes.sampleDataPard}>
                        <p>Sample Data</p>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12}>
                            <Button color="behance" onClick={this.sampleDataFieldAdd}>
                                <AddIcon />
                                Sample Data Add
                            </Button>
                            <Button color="danger" onClick={this.sampleDataFleidRemove}>
                                <DeleteIcon />
                                Sample Data Remove
                            </Button>
                        </GridItem>
                        <GridItem xs={12} sm={12}>
                            {this.state.sampleInput.map(function(item, i){
                                return(
                                    <GridContainer justify="center" key={i}>
                                    <GridItem xs={12} sm={6}>
                                        <CustomInput
                                            labelText={
                                            <span>
                                                Sample Input
                                            </span>
                                            }
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: event => this.sampleDataChange(event, i, 'sampleInput'),
                                                endAdornment: (
                                                    <InputAdornment
                                                        position="end"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Face className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                ),
                                                type: 'text',
                                                value: this.state.sampleInput[i],
                                                multiline: true
                                                
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={6}>
                                        <CustomInput
                                            labelText={
                                            <span>
                                                Sample Output 
                                            </span>
                                            }
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: event => this.sampleDataChange(event, i, 'sampleOutput'),
                                                endAdornment: (
                                                    <InputAdornment
                                                        position="end"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Face className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                ),
                                                type: 'text',
                                                value: this.state.sampleOutput[i],
                                                multiline: true
                                            }}

                                        />
                                    </GridItem>
                                </GridContainer>
                                )
                            }.bind(this))}
                        </GridItem>
                    </GridContainer>
                    </div>
                </GridItem>
                )}
                {(this.state.freeType === 'puzzle') && (
                <GridItem xs={12} sm={12}>
                    <div className={classes.sampleDataPard}>
                        <p>Sample Data</p>
                        <FormControlLabel
                            control={
                                <Radio
                                checked={this.state.selectedValue === "option"}
                                onChange={this.handleChange}
                                value="option"
                                name="radio button demo"
                                aria-label="A"
                                icon={
                                    <FiberManualRecord
                                    className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                    className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                                />
                            }
                            classes={{
                                label: classes.label,
                                root: classes.labelRoot
                            }}
                            label="Radio"
                        />
                        <FormControlLabel
                            control={
                                <Radio
                                checked={this.state.selectedValue === "check"}
                                onChange={this.handleChange}
                                value="check"
                                name="Check"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                    className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                    className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                                />
                            }
                            classes={{
                                label: classes.label,
                                root: classes.labelRoot
                            }}
                            label="Check"
                        />
                        <FormControlLabel
                            control={
                                <Radio
                                checked={this.state.selectedValue === "textfield"}
                                onChange={this.handleChange}
                                value="textfield"
                                name="Textfield"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                    className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                    className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                                />
                            }
                            classes={{
                                label: classes.label,
                                root: classes.labelRoot
                            }}
                            label="Textfield"
                        />
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={6}>
                            <Button color="behance" onClick={this.sampleInputDataFieldAdd}>
                                <AddIcon />
                                Sample Input Data Add
                            </Button>
                            <Button color="danger" onClick={this.sampleInputDataFleidRemove}>
                                <DeleteIcon />
                                Sample Input Data Remove
                            </Button>
                            {this.state.sampleInput.map(function(item, i){
                                return(
                                    i !== 0 && (<GridContainer justify="center" key={i}>
                                    <GridItem xs={12} sm={12}>
                                        <CustomInput
                                            labelText={
                                            <span>
                                                Sample Input <small>(After course is released )</small>
                                            </span>
                                            }
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: event => this.sampleDataChange(event, i, 'sampleInput'),
                                                endAdornment: (
                                                    <InputAdornment
                                                        position="end"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Face className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                ),
                                                type: 'text',
                                                value: this.state.sampleInput[i],
                                                multiline: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>)
                                )
                            }.bind(this))}
                        </GridItem>
                        <GridItem xs={12} sm={6}>
                            <Button color="behance" onClick={this.sampleOutputDataFieldAdd} disabled={this.state.sampleInput[0] === 'check' ? false : true}>
                                <AddIcon />
                                Sample Output Data Add
                            </Button>
                            <Button color="danger" onClick={this.sampleOutputDataFleidRemove} disabled={this.state.sampleInput[0] === 'check' ? false : true}>
                                <DeleteIcon />
                                Sample Output Data Remove
                            </Button>
                            {this.state.sampleOutput.map(function(item, i){
                                return(
                                    <GridContainer justify="center" key={i}>
                                    <GridItem xs={12} sm={12}>
                                        <CustomInput
                                            labelText={
                                            <span>
                                                Sample Output <small>(After lecture is released )</small>
                                            </span>
                                            }
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: event => this.sampleDataChange(event, i, 'sampleOutput'),
                                                endAdornment: (
                                                    <InputAdornment
                                                        position="end"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Face className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                ),
                                                type: 'text',
                                                value: this.state.sampleOutput[i],
                                                multiline: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                )
                            }.bind(this))}
                        </GridItem>
                    </GridContainer>
                    </div>
                </GridItem>
                )}
                {this.state.freeType === 'code' && (<>
                <GridItem xs={12} sm={12}>
                    <div className={classes.sampleDataPard}>
                        <p>Test Data</p>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12}>
                            {this.state.testInput.map(function(item, i){
                                return(
                                    <GridContainer justify="center" key={i}>
                                    <GridItem xs={12} sm={6}>
                                        <CustomInput
                                            labelText={
                                            <span>
                                                Test Input <small>(After course is released )</small>
                                            </span>
                                            }
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: event => this.testDataChange(event, i, 'testInput'),
                                                endAdornment: (
                                                    <InputAdornment
                                                        position="end"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Face className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                ),
                                                type: 'text',
                                                value: this.state.testInput[i],
                                                multiline: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={6}>
                                        <CustomInput
                                            labelText={
                                            <span>
                                                Test Output <small>(After lecture is released )</small>
                                            </span>
                                            }
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: event => this.testDataChange(event, i, 'testOutput'),
                                                endAdornment: (
                                                    <InputAdornment
                                                        position="end"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Face className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                ),
                                                type: 'text',
                                                value: this.state.testOutput[i],
                                                multiline: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                )
                            }.bind(this))}
                        </GridItem>
                    </GridContainer>
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12}>
                    <div className={classes.sampleDataPard}>
                        <p>Chekc Data</p>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12}>
                            {this.state.checkInput.map(function(item, i){
                                return(
                                    <GridContainer justify="center" key={i}>
                                    <GridItem xs={12} sm={6}>
                                        <CustomInput
                                            labelText={
                                            <span>
                                                Check Input <small>(After course is released )</small>
                                            </span>
                                            }
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: event => this.checkDataChange(event, i, "checkInput"),
                                                endAdornment: (
                                                    <InputAdornment
                                                        position="end"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Face className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                ),
                                                type: 'text',
                                                value: this.state.checkInput[i],
                                                multiline: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={6}>
                                        <CustomInput
                                            labelText={
                                            <span>
                                                Check Output <small>(After lecture is released )</small>
                                            </span>
                                            }
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: event => this.checkDataChange(event, i, "checkOutput"),
                                                endAdornment: (
                                                    <InputAdornment
                                                        position="end"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Face className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                ),
                                                type: 'text',
                                                value: this.state.checkOutput[i],
                                                multiline: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                )
                            }.bind(this))}
                        </GridItem>
                    </GridContainer>
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12}>
                    <hr />
                    <h3>Python Code</h3>
                    <GridContainer justify="center">
                        
                        <GridItem xs={12} sm={6}>
                            Code
                            <NavPills
                                color="warning"
                                tabs={[
                                {
                                    tabButton: "Main",
                                    tabContent: (
                                        <AceEditor
                                            mode='python'
                                            fontSize={14}
                                            theme='monokai'
                                            onChange={(newCode) => this.codeChange(newCode, 'file', 'python', 'main')}
                                            name="UNIQUE_ID_OF_DIV"
                                            width="100%"
                                            height='400px'
                                            editorProps={{ $blockScrolling: true }}
                                            value={this.state.file.python.main}
                                            className="full-screenable-node"
                                            setOptions={{
                                                enableBasicAutocompletion: true,
                                                enableLiveAutocompletion: true,
                                                enableSnippets: true,
                                                showLineNumbers: true,
                                                tabSize: 2
                                            }}
                                        />
                                    )
                                },
                                {
                                    tabButton: "Solution",
                                    tabContent: (
                                        <AceEditor
                                            mode='python'
                                            fontSize={14}
                                            theme='monokai'
                                            onChange={(newCode) => this.codeChange(newCode, 'file', 'python', 'solution')}
                                            name="UNIQUE_ID_OF_DIV"
                                            width="100%"
                                            height='400px'
                                            editorProps={{ $blockScrolling: true }}
                                            value={this.state.file.python.solution}
                                            className="full-screenable-node"
                                            setOptions={{
                                                enableBasicAutocompletion: true,
                                                enableLiveAutocompletion: true,
                                                enableSnippets: true,
                                                showLineNumbers: true,
                                                tabSize: 2
                                            }}
                                        />
                                    )
                                }
                                ]}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6}>
                            Sample Code
                            <NavPills
                                color="warning"
                                tabs={[
                                {
                                    tabButton: "Solution",
                                    tabContent: (
                                        <AceEditor
                                            mode='python'
                                            fontSize={14}
                                            theme='monokai'
                                            onChange={(newCode) => this.codeChange(newCode, 'sampleCode', 'python', 'solution')}
                                            name="UNIQUE_ID_OF_DIV"
                                            width="100%"
                                            height='400px'
                                            editorProps={{ $blockScrolling: true }}
                                            value={this.state.sampleCode.python}
                                            className="full-screenable-node"
                                            setOptions={{
                                                enableBasicAutocompletion: true,
                                                enableLiveAutocompletion: true,
                                                enableSnippets: true,
                                                showLineNumbers: true,
                                                tabSize: 2
                                            }}
                                        />
                                    )
                                }
                                ]}
                            />
                        </GridItem>
                    </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12}>
                    <hr />
                    <h3>C++ Code</h3>
                    <GridContainer justify="center">
                
                        <GridItem xs={12} sm={6}>
                            Code
                            <NavPills
                                color="warning"
                                tabs={[
                                    {
                                        tabButton: "Main",
                                        tabContent: (
                                            <AceEditor
                                                mode='c_cpp'
                                                fontSize={14}
                                                theme='monokai'
                                                onChange={(newCode) => this.codeChange(newCode, 'file', 'cpp', 'main')}
                                                name="UNIQUE_ID_OF_DIV"
                                                width="100%"
                                                height='400px'
                                                editorProps={{ $blockScrolling: true }}
                                                value={this.state.file.cpp.main}
                                                className="full-screenable-node"
                                                setOptions={{
                                                    enableBasicAutocompletion: true,
                                                    enableLiveAutocompletion: true,
                                                    enableSnippets: true,
                                                    showLineNumbers: true,
                                                    tabSize: 2
                                                }}
                                            />
                                        )
                                    },
                                    {
                                        tabButton: "Solution",
                                        tabContent: (
                                            <AceEditor
                                                mode='c_cpp'
                                                fontSize={14}
                                                theme='monokai'
                                                onChange={(newCode) => this.codeChange(newCode, 'file', 'cpp', 'solution')}
                                                name="UNIQUE_ID_OF_DIV"
                                                width="100%"
                                                height='400px'
                                                editorProps={{ $blockScrolling: true }}
                                                value={this.state.file.cpp.solution}
                                                className="full-screenable-node"
                                                setOptions={{
                                                    enableBasicAutocompletion: true,
                                                    enableLiveAutocompletion: true,
                                                    enableSnippets: true,
                                                    showLineNumbers: true,
                                                    tabSize: 2
                                                }}
                                            />
                                        )
                                    }
                                ]}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6}>
                            Sample Code
                            <NavPills
                                color="warning"
                                tabs={[
                                    {
                                        tabButton: "Solution",
                                        tabContent: (
                                            <AceEditor
                                                mode='c_cpp'
                                                fontSize={14}
                                                theme='monokai'
                                                onChange={(newCode) => this.codeChange(newCode, 'sampleCode', 'cpp', 'solution')}
                                                name="UNIQUE_ID_OF_DIV"
                                                width="100%"
                                                height='400px'
                                                editorProps={{ $blockScrolling: true }}
                                                value={this.state.sampleCode.cpp}
                                                className="full-screenable-node"
                                                setOptions={{
                                                    enableBasicAutocompletion: true,
                                                    enableLiveAutocompletion: true,
                                                    enableSnippets: true,
                                                    showLineNumbers: true,
                                                    tabSize: 2
                                                }}
                                            />
                                        )
                                    }
                                ]}
                            />
                        </GridItem>
                    </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12}>
                    <hr />
                    <h3>JAVA Code</h3>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={6}>
                            Code
                            <NavPills
                                color="warning"
                                tabs={[
                                    {
                                        tabButton: "Main",
                                        tabContent: (
                                            <AceEditor
                                                mode='java'
                                                fontSize={14}
                                                theme='monokai'
                                                onChange={(newCode) => this.codeChange(newCode, 'file', 'java', 'main')}
                                                name="UNIQUE_ID_OF_DIV"
                                                width="100%"
                                                height='400px'
                                                editorProps={{ $blockScrolling: true }}
                                                value={this.state.file.java.main}
                                                className="full-screenable-node"
                                                setOptions={{
                                                    enableBasicAutocompletion: true,
                                                    enableLiveAutocompletion: true,
                                                    enableSnippets: true,
                                                    showLineNumbers: true,
                                                    tabSize: 2
                                                }}
                                            />
                                        )
                                    },
                                    {
                                        tabButton: "Solution",
                                        tabContent: (
                                            <AceEditor
                                                mode='java'
                                                fontSize={14}
                                                theme='monokai'
                                                onChange={(newCode) => this.codeChange(newCode, 'file', 'java', 'solution')}
                                                name="UNIQUE_ID_OF_DIV"
                                                width="100%"
                                                height='400px'
                                                editorProps={{ $blockScrolling: true }}
                                                value={this.state.file.java.solution}
                                                className="full-screenable-node"
                                                setOptions={{
                                                    enableBasicAutocompletion: true,
                                                    enableLiveAutocompletion: true,
                                                    enableSnippets: true,
                                                    showLineNumbers: true,
                                                    tabSize: 2
                                                }}
                                            />
                                        )
                                    }
                                ]}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6}>
                            Sample Code
                            <NavPills
                                color="warning"
                                tabs={[
                                    {
                                        tabButton: "Solution",
                                        tabContent: (
                                            <AceEditor
                                                mode='java'
                                                fontSize={14}
                                                theme='monokai'
                                                onChange={(newCode) => this.codeChange(newCode, 'sampleCode', 'java', 'solution')}
                                                name="UNIQUE_ID_OF_DIV"
                                                width="100%"
                                                height='400px'
                                                editorProps={{ $blockScrolling: true }}
                                                value={this.state.sampleCode.java}
                                                className="full-screenable-node"
                                                setOptions={{
                                                    enableBasicAutocompletion: true,
                                                    enableLiveAutocompletion: true,
                                                    enableSnippets: true,
                                                    showLineNumbers: true,
                                                    tabSize: 2
                                                }}
                                            />
                                        )
                                    }
                                ]}
                            />
                        </GridItem>
                    </GridContainer>
                </GridItem>
                </>
                )}
                {(this.state.freeType === 'notes') && (
                    <GridItem xs={12} sm={12}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={3}>
                                <label htmlFor="pdf_file" className={classes.pdfFileUploadButton}><p>PDF File Upload</p></label>
                                <input type="file" id="pdf_file" style={{display: 'none'}} onChange={this.handlePDFChange} accept=".pdf"/>
                            </GridItem>
                            <GridItem xs={12} sm={9}>
                                <div style={{width: '100%', height: '300px'}}>
                                    {this.state.pdffileLoad && (
                                        <embed src={server_url+"lectureitem/pdf_get/"+this.state.pdfName} style={{width: "100%", height: "300px"}} ref={this.pdfRef} onChange={(e) => {console.log(e.target)}}/>
                                    )}
                                </div>
                                
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                )}
                
            </GridContainer>
            {(this.state.freeType === 'code' || this.state.freeType === 'puzzle') && (
                <Button 
                    color="rose" 
                    className={classes.marginRight}
                    disabled={(
                    this.state.titleState === 'success' &&
                    this.state.descriptionState === 'success'
                    ) ? false : true}
                    onClick={this.createLectureItem}
                >
                    Update Lecture Content
                </Button>
            )}
            {(this.state.freeType === 'video') && (
                <Button 
                    color="rose" 
                    className={classes.marginRight}
                    disabled={(
                    this.state.titleState === 'success' &&
                    this.state.url !== ""
                    ) ? false : true}
                    onClick={this.createLectureItem}
                >
                    Update Lecture Content
                </Button>
            )}
            {(this.state.freeType === 'notes') && (
                <Button 
                    color="rose" 
                    className={classes.marginRight}
                    disabled={(
                    this.state.titleState === 'success' &&
                    this.state.pdfName !== ""
                    ) ? false : true}
                    onClick={this.createLectureItem}
                >
                    Update Lecture Content
                    {console.log(this.state.titleState, this.state.pdfName)}
                </Button>
            )}
            </CardBody>
            
            </Card>
        </GridItem>
        </GridContainer>
        </div>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step1);
