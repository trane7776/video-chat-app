import React from 'react';
import { Typography, AppBar, Box } from '@mui/material';
const About = () => {
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
        <Typography variant="h3" align="center">
          разработчик
        </Typography>
        <Typography variant="h6" align="center">
          Избасаров Т.А
        </Typography>
        <Typography variant="h3" align="center">
          тестировщик
        </Typography>
        <Typography variant="h6" align="center">
          Арсюхин А.А
        </Typography>
      </AppBar>
    </Box>
  );
};

export default About;
