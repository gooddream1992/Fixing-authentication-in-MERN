import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
const courseList = {
  ...customSelectStyle,
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
          color: "rgba(255,255,255,.62)",
          margin: "0",
          fontSize: "14px",
          marginTop: "0",
          marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
          color: "#FFFFFF"
        }
      },
      cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
          color: "#777",
          fontSize: "65%",
          fontWeight: "400",
          lineHeight: "1"
        }
      },
      buttonPart: {
          margin: '10px 0px'
      },
      courseCreateButton: {
          padding: '10px 30px'
      },
      actionButton: {
        width: '25px',
        height: '25px',
        minHeight: '0px',
        "&:first-child": {
          marginRight: '10px'
        },
        "& svg": {
          fontSize: "20px"
        }
      },
      courseNameButton: {
        borderRadius: '5px',
        cursor: 'pointer',
        transitionDuration: '.3s',
        display: 'inline-block',
        padding: 5,
        '&:hover': {
          boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
        }
      },
      notification: {
        top: 0,
        left: 0
      }
  };
  
  export default courseList;