import React from 'react';
import jweDecode from 'jwt-decode';

import './App.css';
import Chatkit from './Chatkit.js';
import UserList from './UserList';
import {doubte_get} from 'Function/DoubteChat.js';
import {user_get} from "Function/User.js";
function App(props) {
  const [userId, setUserId] = React.useState("");
  const [otherUserId, setOtherUserId] = React.useState("");
  const [doubteData, setDoubteData] = React.useState({});
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    setOtherUserId("");
    setUserId("");
    var data = {
      flg: 'one',
      id: props.match.params.id
    }
    doubte_get(data).then(res => {
      setUserId(res.chat_admin_id);
      setOtherUserId(res.chat_user_id);
      setDoubteData(res);
    })
    var user_data = jweDecode(localStorage.user_token);
    data = {
      id: user_data._id
    }
    user_get(data).then(res => {
      setUserData(res.user_data);
    })
  }, [props.match.params.id]);
  return (
    <div className="App">
      <div className="App__chatwindow">
        <UserList id={props.match.params.id} userdata = {userData} userid={props.match.params.user_id}/>
        {(userId && otherUserId) && (
          <Chatkit user_id={userId} other_id = {otherUserId} doubte={doubteData} userdata = {userData} userid={props.match.params.user_id}/>
        )}
      </div>
    </div>
  );
}

export default App;
