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
import {payment_get} from '../../Function/PaymentList.js';
//jss
import styles from "assets/jss/material-dashboard-pro-react/views/courses/list.js"


const useStyles = makeStyles(styles);
export default function TableList(props) {
  const classes = useStyles();
  const tableRef = React.useRef(null);
  const [transactionList, setTransactionList] = React.useState([]);

  function dateFormate(date) {
    var date1 = new Date(date);
    var monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    var weekNmaes = [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ];
    var monthIndex = date1.getMonth();
    var year = date1.getFullYear();
    var day = date1.getDate();
    var weekIndex = date1.getDay();
    var hour = date1.getHours();
    var min = date1.getMinutes();
    return hour+":"+min +" "+weekNmaes[weekIndex]+", "+day+" "+monthNames[monthIndex]+" "+year;
  }
  React.useEffect(() => {
    var data = {}
    payment_get(data).then(res => {
      console.log(res)
      var data = [];
      res.map(function (item, i){
          var data1 = {
              user_id: item.user_id, user_email: item.user_email, description: item.description, amount: item.pay_amount, balance: item.balance, create: item.createdAt, id: item._id
          }
          data.push(data1);
          return data;
      })
      data.reverse()
      setTransactionList(data)
    })
  }, []);
  return (<>
    <ReactNotifications />
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Transaction Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <MaterialTable
              title="Multiple Actions Preview"
              tableRef={tableRef}
              columns={[
                { 
                  title: 'User Email', 
                  field: 'user_email',
                  render: rowData => (
                    <a href={'/#'} target="_blank" rel="noopener noreferrer">{rowData.user_email}</a>
                  ),
                },
                { 
                  title: 'Description',
                  field: 'title',
                  render: rowData => (
                    <div>{rowData.description}</div>
                  )
                },
                { 
                    title: 'Amount', 
                    field: 'amount',
                    render: rowData => (
                      <span>{rowData.amount}</span>
                    ) 
                },
                { 
                  title: 'Balance', 
                  field: 'balance',
                  render: rowData => (
                    <span>{rowData.balance}</span>
                  ) 
                },
                { title: 'Created', field: 'create', render: rowData => (dateFormate(rowData.create)) }
              ]}
              data={transactionList}
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
