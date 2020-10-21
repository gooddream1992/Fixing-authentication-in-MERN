// import {
//     primaryColor,
//     primaryBoxShadow,
//     whiteColor,
//     blackColor,
//     grayColor,
//     hexToRgb
//   } from "assets/jss/material-dashboard-pro-react.js";
import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle.js";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";

  const lectureItemCreate = {
      ...customSelectStyle,
    sampleDataPard: {
        padding: '15px',
        border: '1px solid grey',
        borderRadius: '10px',
        marginTop: '20px',
        '& p': {
            padding: '5px',
            display: 'inline-block',
            position: 'relative',
            top: '-31px',
            background: 'white',
            fontWeight: 'bold'
        }
    },
    pdfFileUploadButton: {
      '& p': {
        background: 'linear-gradient(-143deg,#a759ff 0,#37a5ff 100%)',
        color: 'white',
        padding: '15px 30px',
        borderRadius: '5px',
        fontWeight: 'bold',
        margin: '20px 0px',
        textAlign: 'center'
      }
      
    },
    ...buttonStyle,
    ...customCheckboxRadioSwitch
  };
  
  export default lectureItemCreate;
  