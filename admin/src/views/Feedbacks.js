import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from 'material-table';
// @material-ui/icon components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// react component
import ReactNotifications from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import {server_url} from "server_host.js";
//jss
import styles from "assets/jss/material-dashboard-pro-react/views/courses/list.js"


const useStyles = makeStyles(styles);
// function MyNotification(props) {
//   return (
//     <div style={{
//       display: 'flex',
//       backgroundColor: 'white',
//       borderRadius: 5,
//       padding: '15px',
//       width: '100%'
//     }}>
//       <div style={{width: '40px', height: '40px', borderRadius: '20px', background: 'linear-gradient(-32deg, rgb(28, 247, 45) 0px, rgb(205, 250, 97) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
//         <CheckIcon style={{color: 'white'}}/>
//       </div>
//       <div style={{marginTop: 10, marginLeft: 10}}>
//         <h5 style={{margin: 0}}>{props.title}</h5>
//       </div>
//     </div>
//   )
// }
export default function TableList(props) {
  const classes = useStyles();

  
  function dateFormate(date) {
    var date1 = new Date(date);
    return date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();
  }
  React.useEffect(() => {
    
  }, []);
  return (<>
    <ReactNotifications />
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Feedback Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <MaterialTable
              title="Multiple Actions Preview"
              // tableRef={React.createRef()}
              columns={[
                { 
                  title: 'User Name', 
                  field: 'user_name'
                },
                { 
                  title: 'User Email',
                  field: 'user_email'
                },
                { 
                    title: 'Lecture Content Name', 
                    field: 'lectureitem_name'
                },
                { 
                  title: 'FeedBack', 
                  field: 'feedback'
                },
                { title: 'Created', field: 'create', render: rowData => (dateFormate(rowData.create)) }
              ]}
              data={query =>
                new Promise((resolve, reject) => {
                  let url = server_url+'feedback/feedback_get_all/'
                  url += query.pageSize
                  url += '/' + (query.page)
                  if(query.search === ""){
                    url += '/0'
                  }
                  else {
                    url += '/'+query.search
                  }
                  fetch(url)
                    .then(response => response.json())
                    .then(result => {
                      resolve({
                        data: result.data,
                        page: parseInt(result.page),
                        totalCount: result.totalpage,
                      })
                    })
                })
              }
              options={{
                  selection: true
              }}    
              onSelectionChange={(rows) => {}}
              actions={[
              {
                tooltip: 'Remove All Selected Videos',
                icon: 'delete',
                onClick: (evt, data) => console.log(123)
              }
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}
