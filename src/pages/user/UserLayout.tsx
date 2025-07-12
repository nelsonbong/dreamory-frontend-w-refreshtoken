import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const UserLayout = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
        py: 4,
        px: { xs: 2, sm: 4 },
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          textAlign: 'right',
          backgroundColor: '#f9f9f9',
          pt: 1,
          pb: 1,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/admin/dashboard')}
        >
          Admin Portal
        </Button>
      </Box>

      <Outlet />
    </Box>
  );
};

export default UserLayout;