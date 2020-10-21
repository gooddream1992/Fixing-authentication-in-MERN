import Moment from 'react-moment';
import React, { useEffect } from 'react';
import { withChatkitOneToOne } from 'views/src/index';
import Avatar from 'react-avatar';
import Skeleton from '@material-ui/lab/Skeleton';
import './UserList.css';


function Chat(props) {
  useEffect(() => {
  });

  // TODO: Show messages from Chatkit
  var messages = [];
  props.chatkit.messages.map(function(m, i){
    messages[i] = {
        id: m.id,
        isOwnMessage: m.sender.id === props.chatkit.currentUser.id,
        createdAt: m.createdAt,
        // This will only work with simple messages.
        // To learn more about displaying multi-part messages see
        // https://pusher.com/docs/chatkit/reference/javascript#messages
        textContent: m.parts[0].payload.content,
    }
    if(m.parts[0].payload.type === "application/json"){
        messages[i].textContent = JSON.parse(m.parts[0].payload.content).value;
    }
    return messages;
  });

  return (
    <>
    {!props.chatkit.isLoading && (
        <>
        <div>
            <Avatar name={props.chatkit.otherUser.name} src="/static/images/avatar/3.jpg" size="60" round={true}/>
        </div>
        <div className="UserList__container__list__item__content">
            <p className="UserList__container__list__item__content__name">
                {props.chatkit.otherUser.name}
            </p>
            <p className="UserList__container__list__item__content__text">
                {(!props.doubte_list.join_flg) && (
                    "You haven't joined to this yet."
                )}
                {messages.length !== 0 && (
                    (messages[messages.length-1].isOwnMessage) ?
                        "You: "+messages[messages.length-1].textContent
                    :
                        props.chatkit.otherUser.name+": "+messages[messages.length-1].textContent
                )}
                    
            </p>
        </div>
        <div className="UserList__container__list__item__time">
            {!props.doubte_list.join_flg && (
                <Moment
                    calendar={{
                    sameDay: 'LT',
                    lastDay: '[Yesterday at] LT',
                    lastWeek: '[last] dddd [at] LT',
                    }}
                >
                    {props.doubte_list.createdAt}
                </Moment>
            )}
            {props.doubte_list.join_flg && (
                <Moment
                    calendar={{
                    sameDay: 'LT',
                    lastDay: '[Yesterday at] LT',
                    lastWeek: '[last] dddd [at] LT',
                    }}
                >
                    {messages[messages.length-1].createdAt}
                </Moment>
            )}
        </div>
        {!props.chatkit.isLoading && (
        props.chatkit.otherUser.isTyping ? 
            <p>{props.chatkit.otherUser.name} is typing....</p> :
            ""
        )}
        </>
    )}
    {props.chatkit.isLoading && (
        <div className="UserList__container__list__item_loading">
            <Skeleton variant="circle" width={60} height={60} />
            <div>
                <Skeleton variant="text" />
                <Skeleton variant="rect" width={210} height={40} />
            </div>
            
        </div>
    )}
    </>
  );
}

export default withChatkitOneToOne(Chat);
