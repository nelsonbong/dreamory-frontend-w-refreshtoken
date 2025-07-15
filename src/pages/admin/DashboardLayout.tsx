import { Box, Typography } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const isAuthenticated = localStorage.getItem('accessToken');

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          height: 'calc(100vh - 80px)',
          mt: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: {
              xs: '16px',
              sm: '18px',
              md: '25px',
            },
          }}
        >
          Please log in to access admin dashboard.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column', // Stack sidebar and content vertically on mobile
          sm: 'row',    // Side-by-side on tablets and up
        },
        height: 'calc(100vh - 80px)',
        mt: 0,
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          p: {
            xs: 1,
            sm: 2,
          },
          overflowY: 'auto',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;