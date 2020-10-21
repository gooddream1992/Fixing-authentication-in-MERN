import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle.js";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
const courseCreate = {
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
      videoSelectpart: {
        textAlign: 'center',
        "& label img": {
          width: '200px'
        },
        "& input": {
          display: 'none'
        }
      },
      batchFileUpload: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .button': {
          '& svg': {
            fontSize: '60px'
          }
        }
      },
      ...buttonStyle,
      ...customSelectStyle
  };
  
  export default courseCreate;