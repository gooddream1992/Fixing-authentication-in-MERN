import Moment from 'react-moment';
import React, { useState, useEffect } from 'react';
import { withChatkitOneToOne } from 'views/src/index';
import Button from "components/CustomButtons/Button.js";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';
import Rating from '@material-ui/lab/Rating';
import CloseIcon from '@material-ui/icons/Close';

//react component
import Avatar from 'react-avatar';

import './Chat.css';
import defaultAvatar from './default-avatar.png';
import {doubte_update, message_delete, chat_file_upload} from 'Function/SupportChat.js';

import {server_url} from 'server_host.js';
function Chat(props) {
  const [pendingMessage, setPendingMessage] = useState('');
  const [joinFlg, setJoinFlg] = React.useState(false);
  const [solved, setSolved] = React.useState(false);
  const [roomId, setRoomId] = React.useState('');
  const [chatReload, setChatReload] = React.useState(false);
  const [imageFile, setImageFile] = React.useState(null);
  
  const messageList = React.createRef();
  const handleMessageKeyDown = event => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
    props.chatkit.sendTypingEvent();
  };

  const handleMessageChange = event => {
    setPendingMessage(event.target.value);
  };
  function ProcessBar(event){
  }
  const handleSendMessage = () => {
    if (pendingMessage === '') {
      if(imageFile !== null) {
        const data = new FormData()
        data.append('file', imageFile);
        var data1 = {
            file: data,
            onProcessFuc: ProcessBar
        }
        chat_file_upload(data1).then(res => {
            props.chatkit.sendMultipartMessage({
                parts: [
                  {
                    type: imageFile.type,
                    content: JSON.stringify({file_name: imageFile.name, upload_file_name: res.filename})
                  }
                ]
            });
            props.chatkit.setReadCursor();
            setImageFile(null);
        })
      }
      return;
    }
    // TODO: Send message to Chatkit
    if(imageFile !== null) {
      const data = new FormData()
      data.append('file', imageFile);
      data1 = {
          file: data,
          onProcessFuc: ProcessBar
      }
      chat_file_upload(data1).then(res => {
          props.chatkit.sendMultipartMessage({
              parts: [
                {
                  type: imageFile.type,
                  content: JSON.stringify({file_name: imageFile.name, upload_file_name: res.filename})
                }
              ]
          });
          props.chatkit.setReadCursor();
          props.chatkit.sendSimpleMessage({ text: pendingMessage });
          props.chatkit.setReadCursor();
          setImageFile(null);
      })
    }
    else {
      props.chatkit.sendSimpleMessage({ text: pendingMessage });
      props.chatkit.setReadCursor();
    }
    
    setPendingMessage('');
  };
  function Join(id) {
    var data = {
      id: id,
      data: {
        join_flg: true
      } 
    }
    doubte_update(data).then(res => {
      setJoinFlg(true);
      props.chatkit.sendSimpleMessage({ text: 'joined' });
      props.chatkit.setReadCursor();
    })
    .catch(err => {
      console.log(err)
    })
    
  }
  function ImageChange(e) {
    setImageFile(e.target.files[0]);
  }
  useEffect(() => {
    if(messageList.current.scrollTop !== messageList.current.scrollHeight){
      messageList.current.scrollTop = messageList.current.scrollHeight;
    }
    if(props.roomId !== roomId){
      setJoinFlg(props.doubte.join_flg);
    }
    if(props.chatkit.messages.length !== 0){
      if(props.chatkit.messages[props.chatkit.messages.length-1].parts[0].payload.type === 'application/json' && JSON.parse(props.chatkit.messages[props.chatkit.messages.length-1].parts[0].payload.content).value === 'solved'){
        setSolved(true)
      }
    }
    
    if(props.chatkit.messages.length > 0 && !chatReload) {
      if(props.chatkit.messages[props.chatkit.messages.length-1].parts[0].payload.content.includes('{"id":')){
          var data = {
              roomId: props.chatkit.messages[props.chatkit.messages.length-1].roomId,
              messageId: props.chatkit.messages[props.chatkit.messages.length-1].id
          }
          message_delete(data).then(res => {
            setChatReload(true);
          })
          
      }
    }
    setRoomId(props.roomId);
  }, [joinFlg, props, messageList, roomId, chatReload]);
  var list = [];
      var change_flg = '';
      if(props.chatkit.otherUser !== null && props.chatkit.currentUser !== null) {
        props.chatkit.messages.map(function(m, i) {
          if(change_flg !== ''){
              if(change_flg !== m.sender.id){
                  list[i-1].change_flg = true;
              }
          }
          list[i] = {
              id: m.id,
              isOwnMessage: m.sender.id === props.chatkit.currentUser.id,
              change_flg: false,
              createdAt: m.createdAt,
              messageType: m.parts[0].partType,
              fileType: m.parts[0].payload.type,
              textContent: m.parts[0].payload.content,
              url: "",
              view_type: true,
              otherId: props.chatkit.otherUser.name,
              otherAvatar: props.chatkit.otherUser.avatarURL,
              userId: props.chatkit.currentUser.name,
              userAvatar: props.chatkit.currentUser.avatarURL
          }
          if(m.parts[0].payload.type === 'application/json'){
            list[i].view_type = JSON.parse(m.parts[0].payload.content).view;
            list[i].textContent = JSON.parse(m.parts[0].payload.content).value;
          }
          if(m.parts[0].payload.type.includes('image/') || m.parts[0].payload.type.includes('other_file/')) {
            list[i].textContent = JSON.parse(m.parts[0].payload.content).file_name;
            list[i].url = server_url+"supportchat/img_get/"+JSON.parse(m.parts[0].payload.content).upload_file_name;
          }
          if(props.chatkit.messages.length === i+1){
              list[i].change_flg = true
          }
          change_flg = m.sender.id;
          return list;
        });
    }
  

  return (
    <div className="Chat">
      
      <div className="Chat__titlebar">
        <img
          src={defaultAvatar}
          className="Chat__titlebar__avatar"
          alt="avatar"
        />
        <div className="Chat__titlebar__details">
          {/*TODO: Get other user's name from Chatkit */}
          <span>{props.chatkit.isLoading
                ? 'Loading...'
                : props.chatkit.otherUser.name}
        </span>
        </div>
      </div>
      <div className="Chat__messages" ref={messageList}>
        <div className="Chat__messages_content">
          <div className="Chat__messages_header_doubte_data">
            <p className="Chat__messages_header_doubte_data_title">User Info</p>
            <p><strong>User Name:</strong> {props.doubte.username}</p>
            <p><strong>User Phone:</strong> {props.doubte.phone}</p>
            <p><strong>User Email:</strong> {props.doubte.email}</p>
            {!joinFlg && (
              <div className="Chat__messages_header_doubte_data_button">
                <Button  color="primary" onClick={() => Join(props.doubte._id, props.doubte.room_id, 'you')}>
                  you join
                </Button>
              </div>
            )}
          </div>
          {joinFlg && (
            <div className="Chat__messages_list">
              {list.map(m => (
                <Message key={m.id} {...m} />
              ))}
            </div>
          )} 
          {imageFile !== null && (
            <div style={{display: 'flex'}}>
              <AttachFileIcon />
              <p>{imageFile.name}</p>
              <CloseIcon onClick={() => setImageFile(null)}/>
            </div>
          )}   
          </div>
          {joinFlg && (
            <div>
              {!props.chatkit.isLoading && (
                props.chatkit.otherUser.isTyping ? 
                <p>{props.chatkit.otherUser.name} is typing....</p> :
                <p></p>
              )}
            </div>
          )} 
        
      </div>
      {(joinFlg && !solved) && (
        <div className="Chat__compose">
          <input
            className="Chat__compose__input"
            type="text"
            placeholder="Type a message..."
            value={pendingMessage}
            onChange={handleMessageChange}
            onKeyDown={handleMessageKeyDown}
          />
          <div className="Chat__compose__icon__button">
            <label htmlFor="image-id">
              <ImageIcon />
            </label>
            <input id="image-id" type="file" style={{display: 'none'}} accept="image/*" onChange={ImageChange}/>
            <Button justIcon round color="twitter" onClick={handleSendMessage} className="send-button">
              <SendIcon />
            </Button>
          </div>
        </div>
      )}
      
    </div>
  );
}
function Message({ isOwnMessage, isLatestMessage, createdAt, textContent, otherId, userId, otherAvatar, userAvatar, messageType, fileType, url, view_type}) {
  return (
    <>
    {textContent !== 'joined' ? 
    (
      view_type &&
        (
          <div
            className={
              isOwnMessage
                ? 'Chat__messages__message__wrapper Chat__messages__message__wrapper--self'
                : 'Chat__messages__message__wrapper Chat__messages__message__wrapper--other'
            }
          >
            {!isOwnMessage && (
              <Avatar name={otherId} src={otherAvatar} size="30" round={true} style={{margin: '12px 12px'}}/>
            )}
            
            <div className="Chat__messages__message__wrapper__inner">
              <div
                className={
                  isOwnMessage
                    ? 'Chat__messages__message Chat__messages__message--self'
                    : 'Chat__messages__message Chat__messages__message--other'
                }
              >
                
                <div className="Chat__messages__message__content">
                  {(fileType.includes('image')) && (
                      <a href={url} target="_blank" rel="noopener noreferrer">
                          <img src={url} alt="img"/>{textContent}
                      </a>
                  )}
                  {(fileType.includes('other_file')) && (
                      <a href={url} target="_blank" rel="noopener noreferrer">
                          <AttachFileIcon />{textContent}
                      </a>
                  )}
                  {(!fileType.includes('image') && !fileType.includes('other_file')) && (
                      textContent
                  )}
                </div>
                <div className="Chat__messages__message__time">
                  <Moment
                    calendar={{
                      sameDay: 'LT',
                      lastDay: '[Yesterday at] LT',
                      lastWeek: '[last] dddd [at] LT',
                    }}
                  >
                    {createdAt}
                  </Moment>
                </div>
                <div
                  className={
                    isOwnMessage
                      ? 'Chat__messages__message__arrow alt'
                      : 'Chat__messages__message__arrow'
                  }
                />
              </div>
            </div>
            {isOwnMessage && (
              <Avatar name={userId} src={userAvatar} size="30" round={true} style={{margin: '12px 12px'}}/>
            )}
          </div>
        )
    ) : 
    (
      <div className="Chat__messages__message__wrapper Chat__messages__message__wrapper--joined">
        <div className="Chat__messages__message__wrapper--joined_text">
          You have {textContent} at 
          <Moment
            calendar={{
              sameDay: 'LT',
              lastDay: '[Yesterday at] LT',
              lastWeek: '[last] dddd [at] LT',
            }}
            style={{marginLeft: '10px'}}
          >
            {createdAt}
          </Moment>
        </div>
      </div>
    )
    }
    
    {(fileType === "application/json" && textContent === 'solved') && (
      <div className="Chat__messages__message__wrapper Chat__messages__message__wrapper--joined">
        <div className="Chat__messages__message__wrapper--joined_text">
          {otherId} has {textContent} at 
          <Moment
            calendar={{
              sameDay: 'LT',
              lastDay: '[Yesterday at] LT',
              lastWeek: '[last] dddd [at] LT',
            }}
            style={{marginLeft: '10px'}}
          >
            {createdAt}
          </Moment>
        </div>
      </div>
    )}
    {(fileType === "application/json" && textContent.includes("rate_")) && (
      <div className="Chat__messages__message__wrapper Chat__messages__message__wrapper--joined">
        <div className="Chat__messages__message__wrapper--joined_text">
          {otherId} FeedBack 
          <Moment
            calendar={{
              sameDay: 'LT',
              lastDay: '[Yesterday at] LT',
              lastWeek: '[last] dddd [at] LT',
            }}
            style={{marginLeft: '10px'}}
          >
            {createdAt}
          </Moment>
          <div>
            <Rating name="read-only" value={textContent.split("_")[1]} readOnly />
          </div>
        </div>
      </div>
    )}
    </>
  );
  
}

export default withChatkitOneToOne(Chat);
