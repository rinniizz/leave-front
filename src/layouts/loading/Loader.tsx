import { Box } from '@mui/system';
import { LineWave } from 'react-loader-spinner';

const LoaderComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <LineWave color="#4fa94d" width="100" visible={true} />
    </Box>
  );
};

export default LoaderComponent;
