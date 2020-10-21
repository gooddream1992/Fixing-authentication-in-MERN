import {
  container,
  cardTitle,
  whiteColor,
  primaryColor,
  defaultFont,
  grayColor
} from "assets/jss/material-dashboard-pro-react.js";

const loginPageStyle = theme => ({
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px"
    }
  },
  cardTitle: {
    ...cardTitle,
    color: whiteColor
  },
  textCenter: {
    textAlign: "center"
  },
  justifyContentCenter: {
    justifyContent: "center !important"
  },
  customButtonClass: {
    "&,&:focus,&:hover": {
      color: whiteColor
    },
    marginLeft: "5px",
    marginRight: "5px"
  },
  inputAdornment: {
    marginRight: "18px"
  },
  inputAdornmentIcon: {
    color: grayColor[6]
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  cardHeader: {
    marginBottom: "20px"
  },
  socialLine: {
    padding: "0.9375rem 0"
  },
  phoneNumber: {
    margin: "0 0 17px 0",
    paddingTop: "27px",
    position: "relative",
    verticalAlign: "unset",
    width: '100%',
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
  }
});

export default loginPageStyle;
