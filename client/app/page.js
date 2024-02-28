import { Typography, AppBar, Box } from '@mui/material';
import VideoPlayer from '../components/VideoPlayer';
import Options from '../components/Options';
import Notifications from '../components/Notifications';
import { ContextProvider } from '@/app/SocketContext';
export default function Home() {
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
      flexDirection: 'row',
      justifyContent: 'center',
      border: '2px solid black',
      width: { xs: '90%', sm: '600px', xl: '600px' },
    },
  };
  return (
    <ContextProvider>
      <Box sx={styles.wrapper}>
        <AppBar sx={styles.appBar} position="static" color="inherit">
          <Typography variant="h2" align="center">
            миглер чат
          </Typography>
        </AppBar>
        <VideoPlayer />
        <Options>
          <Notifications />
        </Options>
        {/* VideoPlayer */}
        {/* Options -> Notifications */}
      </Box>
    </ContextProvider>
  );
}
