'use client';
import React, { useContext } from 'react';
import { Grid, Typography, Paper, Box } from '@mui/material';

import { SocketContext } from '../app/SocketContext';

const styles = {
  gridContainer: {
    justifyContent: 'center',
    flexDirection: { xs: 'column', sm: 'row' },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
};

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  return (
    <div className="flex flex-row flex-wrap justify-center">
      {/* Our own video */}

      <Paper sx={styles.paper}>
        <div>
          <Typography variant="h5" gutterBottom>
            {name || 'Аноним'}
          </Typography>

          <video
            className="video"
            playsInline
            muted
            ref={myVideo}
            autoPlay
            src=""
          ></video>
        </div>
      </Paper>

      {/* User's video */}

      {callAccepted && !callEnded && (
        <Paper sx={styles.paper}>
          <div>
            <Typography variant="h5" gutterBottom>
              {call.name || 'Аноним'}
            </Typography>

            <video className="video" playsInline ref={userVideo} autoPlay />
          </div>
        </Paper>
      )}
    </div>
  );
};

export default VideoPlayer;
