'use client';
import React, { useContext, useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';
import copy from 'clipboard-copy';
import { SocketContext } from '../app/SocketContext';
const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    flexDirection: { xs: 'column', sm: 'row' },
  },
  container: {
    width: { xs: '80%', sm: '600px' },
    margin: '35px 0',
    padding: 0,
  },
  margin: {
    marginTop: '20px',
  },
  padding: {
    padding: '20px',
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
};
const Options = ({ children }) => {
  const { me, callAccepted, name, setName, leaveCall, callUser, callEnded } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyClick = async () => {
    try {
      await copy(me.current);
      setIsCopied(true);
    } catch (error) {
      console.error('Failed to copy text to clipboard', error);
    }
  };
  return (
    <Container sx={styles.container}>
      <Paper elevation={10} sx={styles.paper}>
        <form style={styles.root} noValidate autoComplete="off">
          <Typography variant="h7" gutterBottom>
            {me.current
              ? `Ваш айди загружен: ${me.current}`
              : 'Ваш айди не готов'}
          </Typography>
          <Grid container sx={styles.gridContainer}>
            <Grid item xs={12} md={7} sx={styles.padding}>
              <Typography variant="h6" gutterBottom>
                Информация об аккаунте
              </Typography>
              <TextField
                label="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />

              <Button
                variant="contained"
                className="bg-blue-500 hover:bg-blue-700 text-white "
                fullWidth
                startIcon={<Assignment fontSize="large" />}
                onClick={handleCopyClick}
                sx={styles.margin}
              >
                {isCopied ? 'Скопировано!' : 'Копировать айди'}
              </Button>
            </Grid>
            <Grid item xs={12} md={5} sx={styles.padding}>
              <Typography variant="h6" gutterBottom>
                Позвонить
              </Typography>
              <TextField
                label="Айди для звонка"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
              />

              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  startIcon={<PhoneDisabled fontSize="large" />}
                  className="bg-purple-500 hover:bg-purple-700 text-white "
                  fullWidth
                  onClick={leaveCall}
                  sx={styles.margin}
                >
                  Сбросить
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<Phone fontSize="large" />}
                  className="bg-blue-500 hover:bg-blue-700 text-white "
                  fullWidth
                  onClick={() => callUser(idToCall)}
                  sx={styles.margin}
                >
                  Позвонить
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Options;
