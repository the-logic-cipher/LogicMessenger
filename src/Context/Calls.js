import Context from './Context';
import {useContext, useState, useEffect} from 'react';

const {cometChat, selectedConversation} = useContext(Context);
const [callType, setCallType] = useState(null);
const [callSettings, setCallSettings] = useState(null);
const [call, setCall] = useState(null);
const [isSomeoneCalling, setIsSomeoneCalling] = useState(false);

useEffect(() => {
  return () => {
    setCallType(null);
    setCall(null);
    setCallSettings(null);
    setIsSomeoneCalling(false);
    // cometChat.removeUserListener(userOnlineListenerId);
  };
}, []);

useEffect(() => {
  if (cometChat) {
    listenForCall();
  }
}, [cometChat]);

useEffect(() => {
  if (callType && selectedConversation) {
    initialCall();
  }
}, [callType]);

const startAudioCall = () => {
  if (cometChat && selectedConversation) {
    setCallType(cometChat.CALL_TYPE.AUDIO);
  }
};

const startVideoCall = () => {
  if (cometChat && selectedConversation) {
    setCallType(cometChat.CALL_TYPE.VIDEO);
  }
};

const rejectCall = (status, call) => {
  if (status && call) {
    cometChat.rejectCall(call.sessionId, status).then(
      call => {
        console.log('Call rejected successfully', call);
        setCallSettings(null);
        setCallType(null);
        setCall(null);
        setIsSomeoneCalling(false);
      },
      error => {
        console.log('Call rejection failed with error:', error);
      },
    );
  }
};

const startCall = call => {
  const sessionId = call.sessionId;
  const callType = call.type;
  const callListener = new cometChat.OngoingCallListener({
    onUserJoined: user => {
      /* Notification received here if another user joins the call. */
      console.log('User joined call:', user);
      /* this method can be use to display message or perform any actions if someone joining the call */
    },
    onUserLeft: user => {
      /* Notification received here if another user left the call. */
      console.log('User left call:', user);
      /* this method can be use to display message or perform any actions if someone leaving the call */
    },
    onUserListUpdated: userList => {
      console.log('user list:', userList);
    },
    onCallEnded: call => {
      /* Notification received here if current ongoing call is ended. */
      console.log('Call ended:', call);
      /* hiding/closing the call screen can be done here. */
      const status = cometChat.CALL_STATUS.CANCELLED;
      rejectCall(status, call.sessionId);
      setCallSettings(null);
      setCallType(null);
      setCall(null);
      setIsSomeoneCalling(false);
    },
    onError: error => {
      console.log('Error :', error);
      /* hiding/closing the call screen can be done here. */
      setCallSettings(null);
      setCallType(null);
      setCall(null);
      setIsSomeoneCalling(false);
    },
    onAudioModesUpdated: audioModes => {
      console.log('audio modes:', audioModes);
    },
  });
  const callSettings = new cometChat.CallSettingsBuilder()
    .setSessionID(sessionId)
    .enableDefaultLayout(true)
    .setIsAudioOnlyCall(callType == cometChat.CALL_TYPE.AUDIO ? true : false)
    .setCallEventListener(callListener)
    .build();
  setCallSettings(() => callSettings);
};

const acceptCall = call => {
  if (call) {
    cometChat.acceptCall(call.sessionId).then(
      call => {
        console.log('Call accepted successfully:', call);
        // start the call using the startCall() method
        startCall(call);
        setIsSomeoneCalling(false);
      },
      error => {
        console.log('Call acceptance failed with error', error);
        // handle exception
      },
    );
  }
};

const confirmCall = call => {
  if (call) {
    setIsSomeoneCalling(true);
  }
};

const listenForCall = () => {
  cometChat.addCallListener(
    callListenerId,
    new cometChat.CallListener({
      onIncomingCallReceived(call) {
        console.log('Incoming call:', call);
        const callInitiatorUid = call.callInitiator.uid;
        if (callInitiatorUid && callInitiatorUid !== user.uid) {
          setCall(call);
          confirmCall(call);
        }
      },
      onOutgoingCallAccepted(call) {
        console.log('Outgoing call accepted:', call);
        startCall(call);
      },
      onOutgoingCallRejected(call) {
        console.log('Outgoing call rejected:', call);
        setCallSettings(null);
        setCallType(null);
        setCall(null);
        setIsSomeoneCalling(null);
      },
      onIncomingCallCancelled(call) {
        console.log('Incoming call calcelled:', call);
        setCallSettings(null);
        setCallType(null);
        setCall(null);
        setIsSomeoneCalling(null);
      },
    }),
  );
};

const isGroup = () => {
  return selectedConversation && selectedConversation.guid;
};

const initialCall = () => {
  const receiverID = isGroup()
    ? selectedConversation.guid
    : selectedConversation.uid;
  const receiverType = isGroup()
    ? cometChat.RECEIVER_TYPE.GROUP
    : cometChat.RECEIVER_TYPE.USER;

  const call = new cometChat.Call(receiverID, callType, receiverType);

  cometChat.initiateCall(call).then(
    outGoingCall => {
      console.log('Call initiated successfully:', outGoingCall);
      setCall(outGoingCall);
      // perform action on success. Like show your calling screen.
    },
    error => {
      console.log('Call initialization failed with exception:', error);
    },
  );
};

const cancelCall = () => {
  const status = cometChat.CALL_STATUS.CANCELLED;
  rejectCall(status, call);
};

const handleRejectCall = () => {
  const status = cometChat.CALL_STATUS.REJECTED;
  rejectCall(status, call);
};

const handleAcceptCall = () => {
  acceptCall(call);
};
