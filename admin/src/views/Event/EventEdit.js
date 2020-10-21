import React from "react";
import PropTypes from "prop-types";
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
// @material-ui/icons
import Face from "@material-ui/icons/Face";

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
//image
import defaultImage from "assets/img/default-avatar.png";
//jss
import style from "assets/jss/material-dashboard-pro-react/views/event/create.js";
import {server_url} from "server_host.js";
//api
import {event_background_upload, event_update, event_get} from "Function/Event.js";



class EventCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        file: null,
        imagePreviewUrl: defaultImage,
        imageName: '',
        title: "",
        titleState: "",
        description: "",
        descriptionState: "",
        venue: '',
        venueState: "",
        startDate: '',
        freeType: 'free',
        videoUrl: '',
        videoUrlState: "",
        alert: null
    };
    this.handleSimple = this.handleSimple.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.logoUpload = this.logoUpload.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.freeType = this.freeType.bind(this);
    this.startChange = this.startChange.bind(this);
    
  }
  componentDidMount(){
    
    var data = {
        id: this.props.match.params.id
    }
    event_get(data).then(res => {
      this.setState({courseContent: res});

      this.setState({
        imageName: res.background_img,
        imagePreviewUrl: server_url+"event/img_get/"+res.background_img,
        title: res.title,
        titleState: "success",
        description: res.description,
        descriptionState: "success",
        venue: res.venue,
        venueState: "success",
        startDate: this.dateFormate(res.start_date),
        freeType: res.pay_type,
        videoUrl: res.video_url,
        videoUrlState: "success",
      });
  })
  .catch(err => {
      console.log(err);
  })
}
dateFormate(date1) {
    var date = new Date(date1);
    // var monthNames = [
    //     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    // ];
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return year+"-"+monthIndex+1+"-"+date.getDate();
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
    event_background_upload(imgData).then(res => {
      this.setState({imageName: res.filename})
    })
    .catch(err => {
      console.log(err);
    })
  }
  handleSimple(event, stateName) {
      this.setState({[stateName]: event.target.value});
  };
  freeType(event) {
    this.setState({freeType: event.target.value})
  }
  startChange(e) {
    this.setState({startDate: e._d});
  }
  updateEvent() {
    var data = {
        id: this.props.match.params.id,
        data: {
            title: this.state.title,
            description: this.state.description,
            start_date: new Date(this.state.startDate),
            pay_type: this.state.freeType,
            venue: this.state.venue,
            background_img: this.state.imageName,
            video_url: this.state.videoUrl
        }
    }
    event_update(data).then(res => {
      const { classes } = this.props;
      if(res.success){
        
        this.setState({
          alert: <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Created Event!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={classes.button + " " + classes.success}
        />
        })
      }
    })
  }
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
                Please set event
              </h4>
            </GridItem>
            <GridItem xs={12} sm={3} style={{textAlign: 'center'}}>
                <div className="picture-container">
                    <div className="picture">
                        <img src={this.state.imagePreviewUrl} className="picture-src" alt="..." />
                        <input type="file" onChange={e => this.handleImageChange(e)} />
                    </div>
                    <h6 className="description">Choose Picture</h6>
                </div>
                <Button color="info" className={classes.marginRight} onClick={this.logoUpload} disabled={this.state.file === null ? true : false}>
                  Background Upload
                </Button>
            </GridItem>
            <GridItem xs={12} sm={9} style={{textAlign: 'center'}}>
                <div className={classes.backgroundPart}>
                    <img src={this.state.imagePreviewUrl} alt="..." />
                </div>
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
                                <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                        ),
                        multiline: true,
                        rows: 5,
                        value: this.state.description
                    }}
                />
            </GridItem>
            <GridItem xs={12} sm={3}>
                <InputLabel style={{color: '#AAAAAA', fontSize: '12px', marginTop: '12px'}}>Date Picker</InputLabel>
                <FormControl fullWidth>
                    <Datetime
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        inputProps={{ placeholder: "Date Picker Here" }}
                        onChange={this.startChange}
                        value={this.state.startDate}
                    />
                </FormControl>
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
                        Pay Type
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
                    >
                        {['pay', 'free'].map(function(item, i){
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
            <GridItem xs={12} sm={3}>
                <CustomInput
                    success={this.state.venueState === "success"}
                    error={this.state.venueState === "error"}
                    labelText={
                    <span>
                        Venue <small>(required)</small>
                    </span>
                    }
                    id="remain"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        onChange: event => this.change(event, "venue", "length", 0),
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                className={classes.inputAdornment}
                            >
                                <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                        ),
                        type: 'text',
                        value: this.state.venue
                    }}
                />
            </GridItem>
            <GridItem xs={12} sm={3}>
                <CustomInput
                    success={this.state.videoUrlState === "success"}
                    error={this.state.videoUrlState === "error"}
                    labelText={
                    <span>
                        Video id <small>(required)</small>
                    </span>
                    }
                    id="remain"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        onChange: event => this.change(event, "videoUrl", "length", 0),
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                className={classes.inputAdornment}
                            >
                                <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                        ),
                        type: 'text',
                        value: this.state.videoUrl
                    }}
                />
            </GridItem>
          </GridContainer>
          <Button 
            color="rose" 
            className={classes.marginRight}
            disabled={( 
              this.state.titleState === 'success' &&
              this.state.descriptionState === 'success' &&
              this.state.videoUrlState === "success" &&
              this.state.venueState === "success" &&
              this.state.startDate !== '' &&
              this.state.imageName !== ''
            ) ? false : true}
            onClick={this.updateEvent}
          >
            Update Course
          </Button>
          </CardBody>
          
        </Card>
      </GridItem>
      </GridContainer>
      </>
    );
  }
}

EventCreate.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(EventCreate);
