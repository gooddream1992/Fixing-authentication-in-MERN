import React from 'react';

import './App.css';
import Chat from './Chat';
import { ChatkitProvider, TokenProvider } from 'views/src/index';;
const instanceLocator = 'v1:us1:eb148fcd-27ff-4a77-baf3-a490172b8165';
const tokenProvider = new TokenProvider({
  url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/eb148fcd-27ff-4a77-baf3-a490172b8165/token',
});
function App(props) {

  React.useEffect(() => {
    
  }, [props]);
  return (
    <ChatkitProvider
        instanceLocator={instanceLocator}
        tokenProvider={tokenProvider}
        userId={props.user_id}
    >
        <Chat otherUserId={props.other_id} roomId={props.doubte._id} roomName={props.doubte.title} doubte={props.doubte} userdata = {props.userdata} userid = {props.userid}/>
    </ChatkitProvider>
  );
}

export default App;
