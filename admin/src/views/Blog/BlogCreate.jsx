import React from "react";
import PropTypes from "prop-types";
// react component plugin for creating a beautiful datetime dropdown picker
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";
// @material-ui/icons
import Face from "@material-ui/icons/Face";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/snippets/c_cpp";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-idle_fingers";
//react component
import SweetAlert from "react-bootstrap-sweetalert";
//image
import defaultImage from "assets/img/Preview-icon.png";
//jss
import style from "assets/jss/material-dashboard-pro-react/views/event/create.js";
import "assets/css/text-editor.css";
//api
import {blog_background_upload, blog_add} from "Function/Blog.js";
import {server_url} from "server_host.js";



class EventCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        file: null,
        imagePreviewUrl: defaultImage,
        imageName: '',
        title: "",
        titleState: "",
        content: "",
        fileUrl: '',
        alert: null
    };
    this.handleSimple = this.handleSimple.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.logoUpload = this.logoUpload.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.freeType = this.freeType.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    
  }
  componentDidMount(){

  }
  
  // function that verifies if a string has a given length or not
  updateContent = (value) => {
    this.setState({content:value})
    localStorage.content = value;
}
jodit;
	setRef = jodit => this.jodit = jodit;
	
	config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}
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
    blog_background_upload(imgData).then(res => {
      this.setState({imageName: res.filename})
    })
    .catch(err => {
      console.log(err);
    })
  }
  fileUpload(e) {
    e.preventDefault();
    let newFile = e.target.files[0];
    const data = new FormData();
    data.append('file', newFile);
    var imgData = {
      imgData: data
    };
    blog_background_upload(imgData).then(res => {
      this.setState({fileUrl: server_url+"blog/img_get/"+res.filename})
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
  createEvent() {
    var data = {
        title: this.state.title,
        content: this.state.content,
        image: this.state.imageName,
    }
    blog_add(data).then(res => {
      const { classes } = this.props;
      if(res.success){
        this.setState({
            file: null,
            imagePreviewUrl: defaultImage,
            title: "",
            titleState: "",
            content: ''
        })
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
        <div className="test"></div>
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
                <div>
                  <label htmlFor="files">
                    <span style={{padding: '10px', background: 'grey', borderRadius: '3px', color: 'white'}}>File Upload</span>
                  </label>
                  <p style={{marginTop: '10px'}}>url: {this.state.fileUrl}</p>
                  <input type="file" id="files" style={{display: 'none'}} onChange={this.fileUpload}/>
                </div>
                <JoditEditor
                    editorRef={this.setRef}
                    value={this.state.content}
                    config={this.config}
                    onChange={this.updateContent}
                />
                
            </GridItem>
          </GridContainer>
          <Button 
            color="rose" 
            className={classes.marginRight}
            disabled={( 
              this.state.titleState === 'success' &&
              this.state.content !== '' &&
              this.state.imageName !== ''
            ) ? false : true}
            onClick={this.createEvent}
          >
            Create Blog
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
