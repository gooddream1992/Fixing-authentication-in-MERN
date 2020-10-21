import {
  primaryColor,
  cardTitle,
  defaultFont,
  grayColor
} from "assets/jss/material-dashboard-pro-react.js";
import customInputStyle from 'assets/jss/material-dashboard-pro-react/components/customInputStyle.js';
import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle.js";
const userProfileStyles = {
  cardTitle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
    "& small": {
      fontSize: "80%",
      fontWeight: "400"
    }
  },
  cardCategory: {
    marginTop: "10px",
    color: grayColor[0] + " !important",
    textAlign: "center"
  },
  description: {
    color: grayColor[0]
  },
  updateProfileButton: {
    float: "right"
  },
  phoneNumber: {
    margin: "0 0 17px 0",
    paddingTop: "27px",
    position: "relative",
    verticalAlign: "unset",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: grayColor[14]
    },
    '& .MuiInput-underline': {
      marginTop: '0px',
      "&:hover:not($disabled):before,&:before": {
        borderColor: grayColor[4] + "!important",
        borderWidth: "1px !important"
      },
      "&:after": {
        borderColor: primaryColor[0]
      },
      "& + p": {
        fontWeight: "300"
      }
    },
    '& .MuiInputLabel-formControl': {
      ...defaultFont,
      color: grayColor[3] + " !important",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "1.42857",
      top: "10px",
      letterSpacing: "unset",
      "& + $underline": {
        marginTop: "0px"
      }
    }
  },
  ...customInputStyle,
  ...buttonStyle
};
export default userProfileStyles;
