'use client';
import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
const stunLink =
  'https://raw.githubusercontent.com/pradt2/always-online-stun/master/valid_hosts.txt';
const SocketContext = createContext();

//const socket = io('http://localhost:3001/api/socket');
const socket = io('https://video-chat-app-f4z3.onrender.com');
function fetchIceServers() {
  fetch(
    'https://raw.githubusercontent.com/pradt2/always-online-stun/master/valid_hosts.txt'
  )
    .then((response) => response.text())
    .then((data) => {
      // Разбиваем текст на строки
      console.log(data);
      const lines = data.split('\n');

      // Создаем массив объектов конфигурации ICE серверов
      const iceServers = lines.map((line) => {
        return { urls: `stun:${line.trim()}` };
      });
      return iceServers;
    });
}
const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [iceServers, setIceServers] = useState();
  const me = useRef();
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });
    socket.on('me', (id) => {
      me.current = id;
    });
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
    if (socket.id) {
      me.current = socket.id;
    }
  }, []);

  const answerCall = () => {
    console.log(iceServers);
    setCallAccepted(true);
    console.log('ss');
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      config: {
        iceServers: [
          {
            urls: 'stun:stun.relay.metered.ca:80',
          },
          {
            urls: 'turn:standard.relay.metered.ca:80',
            username: 'b65d8e73890bedbc719cde44',
            credential: 'Ne7dq9WoPWgxZfWH',
          },
          {
            urls: 'turn:standard.relay.metered.ca:80?transport=tcp',
            username: 'b65d8e73890bedbc719cde44',
            credential: 'Ne7dq9WoPWgxZfWH',
          },
          {
            urls: 'turn:standard.relay.metered.ca:443',
            username: 'b65d8e73890bedbc719cde44',
            credential: 'Ne7dq9WoPWgxZfWH',
          },
          {
            urls: 'turns:standard.relay.metered.ca:443?transport=tcp',
            username: 'b65d8e73890bedbc719cde44',
            credential: 'Ne7dq9WoPWgxZfWH',
          },
        ],
      },
    });
    console.log('sss');
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
      config: {
        iceServers: [
          {
            urls: 'stun:stun.relay.metered.ca:80',
          },
          {
            urls: 'turn:standard.relay.metered.ca:80',
            username: 'b65d8e73890bedbc719cde44',
            credential: 'Ne7dq9WoPWgxZfWH',
          },
          {
            urls: 'turn:standard.relay.metered.ca:80?transport=tcp',
            username: 'b65d8e73890bedbc719cde44',
            credential: 'Ne7dq9WoPWgxZfWH',
          },
          {
            urls: 'turn:standard.relay.metered.ca:443',
            username: 'b65d8e73890bedbc719cde44',
            credential: 'Ne7dq9WoPWgxZfWH',
          },
          {
            urls: 'turns:standard.relay.metered.ca:443?transport=tcp',
            username: 'b65d8e73890bedbc719cde44',
            credential: 'Ne7dq9WoPWgxZfWH',
          },
        ],
      },
    });

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me.current,
        name,
      });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
