import React from 'react';
import { Typography, AppBar, Box } from '@mui/material';
import Link from 'next/link';
const Contacts = () => {
  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
    },
    appBar: {
      borderRadius: '3px',
      margin: '30px 100px',
      display: 'flex',
      flexDirection: 'col',
      justifyContent: 'center',
      border: '2px solid black',
      width: { xs: '90%', sm: '600px', xl: '600px' },
    },
  };
  return (
    <Box sx={styles.wrapper}>
      <AppBar sx={styles.appBar} position="static" color="inherit">
        <Typography variant="h4" align="center">
          корпоративная почта
        </Typography>
        <Link href="mailto:izbasarov.t@edu.rea.ru">
          <Typography variant="h6" align="center">
            izbasarov.t@edu.rea.ru
          </Typography>
        </Link>
      </AppBar>
    </Box>
  );
};

export default Contacts;
