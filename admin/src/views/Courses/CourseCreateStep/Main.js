import React from "react";
import PropTypes from "prop-types";
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
import PictureUpload from "components/CustomUpload/PictureUpload.js";
import CustomInput from "components/CustomInput/CustomInput.js";

//image
import defaultImage from "assets/img/default-avatar.png";
//jss
import style from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";



class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        file: null,
        imagePreviewUrl: defaultImage,
        title: "",
        titleState: "",
        preview_title: "",
        preview_titleState: "",
        course_type: "advanced",
        remain_days: 1,
        support_range: 'online'
    };
    this.handleSimple = this.handleSimple.bind(this);
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
        this.state({file: newFile});
        this.state({imagePreviewUrl: reader.result});
    };
    reader.readAsDataURL(newFile);
  };
  isValidated() {
    if (
      this.state.titleState === "success" &&
      this.state.preview_titleState === "success"
    ) {
      return true;
    } else {
      if (this.state.titleState !== "success") {
        this.setState({ titleState: "error" });
      }
      if(this.state.preview_titleState !== "success") {
        this.setState({ preview_titleState: "error" });
      }
    }
    return false;
  }
  handleSimple(event, stateName) {
      this.setState({[stateName]: event.target.value});
  };
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Please set main item for course
          </h4>
        </GridItem>
        <GridItem xs={12} sm={4}>
            <div className="picture-container">
                <div className="picture">
                    <img src={this.state.imagePreviewUrl} className="picture-src" alt="..." />
                    <input type="file" onChange={e => this.handleImageChange(e)} />
                </div>
                <h6 className="description">Choose Picture</h6>
            </div>
        </GridItem>
        <GridItem xs={12} sm={6}>
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
                    )
                }}
            />
            <CustomInput
                success={this.state.preview_titleState === "success"}
                error={this.state.preview_titleState === "error"}
                labelText={
                <span>
                    Preview Title <small>(required)</small>
                </span>
                }
                id="preview"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    onChange: event => this.change(event, "preview_title", "length", 3),
                    endAdornment: (
                        <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                        >
                            <Face className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                    )
                }}
            />
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
                    Choose Course Type
                </InputLabel>
                <Select
                    MenuProps={{
                        className: classes.selectMenu
                    }}
                    classes={{
                        select: classes.select
                    }}
                    value={this.state.course_type}
                    onChange={(e) => this.handleSimple(e, 'course_type')}
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
                        value="advanced"
                    >
                        Advanced Course
                    </MenuItem>
                    <MenuItem
                        classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                        }}
                        value="function"
                    >
                        Foundation Course
                    </MenuItem>
                    <MenuItem
                        classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                        }}
                        value="other"
                    >
                        Other Course
                    </MenuItem>
                
                </Select>
            </FormControl>
        </GridItem>
        <GridItem xs={12} sm={4}>
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
                            <Face className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                    ),
                    type: 'number',
                    value: this.state.remain_days
                }}
            />
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
                    Support Range
                </InputLabel>
                <Select
                    MenuProps={{
                        className: classes.selectMenu
                    }}
                    classes={{
                        select: classes.select
                    }}
                    value={this.state.support_range}
                    onChange={(e) => this.handleSimple(e, 'support_range')}
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
                        value="online"
                    >
                        online
                    </MenuItem>
                    <MenuItem
                        classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                        }}
                        value="other"
                    >
                        Other
                    </MenuItem>
                
                </Select>
            </FormControl>
        </GridItem>
      </GridContainer>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step1);
