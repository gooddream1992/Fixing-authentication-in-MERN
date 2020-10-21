import React from 'react';
import {withRouter} from 'react-router-dom';
import { ChatkitProvider, TokenProvider } from 'views/src/index';

import './UserList.css';

import Avatar from 'react-avatar';
import List from './List.js';

import {support_chat_get} from 'Function/SupportChat.js';
const instanceLocator = 'v1:us1:eb148fcd-27ff-4a77-baf3-a490172b8165';
const tokenProvider = new TokenProvider({
  url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/eb148fcd-27ff-4a77-baf3-a490172b8165/token',
});
function UserList(props) {
  const [doubteList, setDoubteList] = React.useState([]);
  function ChatEnter(id, user_id) {
    props.history.push('/admin/chat/'+id+'/'+user_id);
  }
  
  React.useEffect(() => {
    
    var data = {
      flg: 'all',
      id: props.userid
    }
    support_chat_get(data).then(res => {
      setDoubteList(res);
    })
  }, [props]);
  return (
    <div className="UserList">
      <div className="UserList__titlebar">
        <div className="UserList__titlebar__avatar">
          <Avatar name={props.userdata.first_name+" "+props.userdata.last_name} src="/static/images/avatar/3.jpg" size="40" round={true}/>
        </div>
        
        <span className="UserList__titlebar__logged-in-as">{props.userdata.first_name+" "+props.userdata.last_name}</span>
      </div>
      <div className="UserList__container">
        <ul className="UserList__container__list">
          <ChatkitProvider
            instanceLocator={instanceLocator}
            tokenProvider={tokenProvider}
            userId={props.userid}
          >
            {doubteList.map(function(item, i){
              
              return(
                  <li className={"UserList__container__list__item "+(props.id === item._id ? 'select' : '')} key={i} onClick={() => ChatEnter(item._id, item.chat_admin_id)}>
                    <List otherUserId={item.user_id} roomId={item.room_id} roomName='' doubte_list={item}/>
                  </li>
              )
            })}
          </ChatkitProvider>
        </ul>
      </div>
    </div>
  );
}

export default withRouter(UserList);
