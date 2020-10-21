import React from "react";
import PropTypes from "prop-types";
// @material-ui/icons
import MovieIcon from '@material-ui/icons/Movie';
import TitleIcon from '@material-ui/icons/Title';
import DescriptionIcon from '@material-ui/icons/Description';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PaymentIcon from '@material-ui/icons/Payment';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
//react component
import SweetAlert from "react-bootstrap-sweetalert";
// icon 

//image
import defaultImage from "assets/img/Preview-icon.png";
//jss
import style from "assets/jss/material-dashboard-pro-react/views/courses/create.js";
//api
import {course_logo_upload, course_add} from "Function/Courses.js";



class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        file: null,
        imagePreviewUrl: defaultImage,
        imageName: '',
        introVideoID: "",
        introVideoIDState: "",
        reviewVideoID: "",
        reviewVideoIDState: "",
        title: "",
        titleState: "",
        description: "",
        descriptionState: "",
        remain_days: 1,
        firstPrice: 0.0,
        secondPrice: 0.0,
        alert: null,
        levelNumber: 1
    };
    this.handleSimple = this.handleSimple.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.logoUpload = this.logoUpload.bind(this);
    this.createCourse = this.createCourse.bind(this);
    this.levelChange = this.levelChange.bind(this);
  }
  sendState() {
    return this.state;
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
  handleImageChange (e) {
    e.preventDefault();
    let reader = new FileReader();
    let newFile = e.target.files[0];
    reader.onloadend = () => {
        this.setState({file: newFile});
        this.setState({imagePreviewUrl: reader.result});
    };
    reader.readAsDataURL(newFile);
  };
  logoUpload() {
    const data = new FormData();
    data.append('file', this.state.file);
    var imgData = {
      imgData: data
    };
    course_logo_upload(imgData).then(res => {
      this.setState({imageName: res.filename})
    })
    .catch(err => {
      console.log(err);
    })
  }
  handleSimple(event, stateName) {
      this.setState({[stateName]: event.target.value});
  };
  createCourse() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      intro_video_id: this.state.introVideoID,
      reivew_video_id: this.state.reviewVideoID,
      image: this.state.imageName,
      remain_days: this.state.remain_days,
      price: [{old_price: '', new_price: this.state.firstPrice}, {old_price: '', new_price: this.state.secondPrice}],
      level_number: this.state.levelNumber
    }
    
    course_add(data).then(res => {
      const { classes } = this.props;
      if(res.success){
        this.setState({
          file: null,
          imagePreviewUrl: defaultImage,
          imageName: '',
          introVideoID: "",
          introVideoIDState: "",
          reviewVideoID: "",
          reviewVideoIDState: "",
          title: "",
          titleState: "",
          description: "",
          descriptionState: "",
          remain_days: 1,
          firstPrice: 0.0,
          secondPrice: 0.0,
          levelNumber: 1
        })
        this.setState({
          alert: <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Course Created!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={classes.button + " " + classes.success}
        />
        })
      }
    })
  }
  levelChange(e) {
    this.setState({levelNumber: e.target.value});
  }
  successAlert() {
    const { classes } = this.props;
    return(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Course Created!"
        onConfirm={() => this.hideAlert()}
        onCancel={() => this.hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
      />
    )
  };
  hideAlert() {
    this.setState({alert: null});
  }
  render() {
    const { classes } = this.props;
    return (<>
      {this.state.alert}
      <GridContainer>
        
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12}>
              <h4 className={classes.infoText}>
                Please set items for course
              </h4>
            </GridItem>
            <GridItem xs={12} sm={4} style={{textAlign: 'center'}}>
                <div className="picture-container">
                    <div className="picture">
                        <img src={this.state.imagePreviewUrl} className="picture-src" alt="..." />
                        <input type="file" onChange={e => this.handleImageChange(e)} />
                    </div>
                    <h6 className="description">Choose Picture</h6>
                </div>
                <Button color="info" className={classes.marginRight} onClick={this.logoUpload} disabled={this.state.file === null ? true : false}>
                  Logo Upload
                </Button>
            </GridItem>
            <GridItem xs={12} sm={6}>
                <CustomInput
                    success={this.state.introVideoIDState === "success"}
                    error={this.state.introVideoIDState === "error"}
                    labelText={
                    <span>
                        Introduce Video ID <small>(required)</small>
                    </span>
                    }
                    id="title"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        onChange: event => this.change(event, "introVideoID", "length", 3),
                        endAdornment: (
                            <InputAdornment
                              position="end"
                              className={classes.inputAdornment}
                            >
                                <MovieIcon className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                        ),
                        value: this.state.introVideoID
                    }}
                />
                <CustomInput
                    success={this.state.reviewVideoIDState === "success"}
                    error={this.state.reviewVideoIDState === "error"}
                    labelText={
                    <span>
                        Review Video ID <small>(required)</small>
                    </span>
                    }
                    id="preview"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        onChange: event => this.change(event, "reviewVideoID", "length", 3),
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                className={classes.inputAdornment}
                            >
                                <MovieIcon className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                        ),
                        value: this.state.reviewVideoID
                    }}
                />
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
                                <TitleIcon className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                        ),
                        value: this.state.title
                    }}
                />
                <CustomInput
                    success={this.state.descriptionState === "success"}
                    error={this.state.descriptionState === "error"}
                    labelText={
                    <span>
                        Description <small>(required)</small>
                    </span>
                    }
                    id="preview"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        onChange: event => this.change(event, "description", "length", 3),
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                className={classes.inputAdornment}
                            >
                                <DescriptionIcon className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                        ),
                        multiline: true,
                        rows: 5,
                        value: this.state.description
                    }}
                />
            </GridItem>
            <GridItem xs={12} sm={3}>
                <CustomInput
                    labelText={
                    <span>
                        Remain Days <small>(required)</small>
                    </span>
                    }
                    id="remain"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        onChange: event => this.change(event, "remain_days", "length", 0),
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                className={classes.inputAdornment}
                            >
                                <CalendarTodayIcon className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                        ),
                        type: 'number',
                        value: this.state.remain_days
                    }}
                />
            </GridItem>
            <GridItem xs={12} sm={3}>
                <CustomInput
                    labelText={
                    <span>
                        First price <small>(required)</small>
                    </span>
                    }
                    id="remain"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        onChange: event => this.change(event, "firstPrice", "length", 0),
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                className={classes.inputAdornment}
                            >
                                <PaymentIcon className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                        ),
                        type: 'number',
                        value: this.state.firstPrice
                    }}
                />
            </GridItem>
            <GridItem xs={12} sm={3}>
                <CustomInput
                    labelText={
                    <span>
                        Second price <small>(required)</small>
                    </span>
                    }
                    id="remain"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        onChange: event => this.change(event, "secondPrice", "length", 0),
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                className={classes.inputAdornment}
                            >
                                <PaymentIcon className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                        ),
                        type: 'number',
                        value: this.state.secondPrice
                    }}
                />
            </GridItem>
            <GridItem xs={12} sm={3}>
                <FormControl
                  fullWidth
                  className={classes.selectFormControl}
                >
                    <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                    >
                        Select Level Number
                    </InputLabel>
                    <Select
                        MenuProps={{
                            className: classes.selectMenu
                        }}
                        classes={{
                            select: classes.select
                        }}
                        value={this.state.levelNumber}
                        onChange={this.levelChange}
                        inputProps={{
                            name: "simpleSelect",
                            id: "simple-select"
                        }}
                    >
                        {[1,2,3,4,5,6,7].map(function(item, i){
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
          </GridContainer>
          
          <Button 
            color="rose" 
            className={classes.marginRight}
            disabled={(this.state.introVideoIDState === 'success' && 
              this.state.reviewVideoIDState === 'success' &&  
              this.state.titleState === 'success' &&
              this.state.descriptionState === 'success' &&
              this.state.imageName !== ''
            ) ? false : true}
            onClick={this.createCourse}
          >
            Create Course
          </Button>
          </CardBody>
          
        </Card>
      </GridItem>
      </GridContainer>
      </>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step1);
