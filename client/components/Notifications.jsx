'use client';
import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { SocketContext } from '../app/SocketContext';
const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>{call.name !== '' ? call.name : 'Аноним'} звонит: </h1>
          <Button
            variant="contained"
            color="primary"
            className="bg-sky-500 hover:bg-sky-700 text-white "
            onClick={answerCall}
          >
            Ответить
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
