import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../api';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setAccessToken(token);
  }, [location]);

  const handleLogout = async () => {
    try {
      await api.post('/session/logout'); // Clears the refresh token cookie
    } catch (error) {
      console.error('Logout failed:', error);
    }

    localStorage.removeItem('accessToken');
    setAccessToken(null);
    navigate('/admin/login');
  };

  return (
    <AppBar
      position="static"
      color="primary"
      sx={{
        width: '100%',
        height: {
          xs: '60px',
          sm: '70px',
          md: '80px',
        },
        justifyContent: 'center',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: '100%',
          px: { xs: 1, sm: 2, md: 4 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="body2"
          component={Link}
          to="/"
          color="inherit"
          sx={{
            textDecoration: 'none',
            fontSize: { xs: '18px', sm: '20px', md: '24px' },
          }}
        >
          Dreamory's Event Gallery
        </Typography>

        <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 } }}>
          {!accessToken ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/admin/register"
                sx={{
                  fontSize: { xs: '14px', sm: '16px', md: '18px' },
                  px: { xs: 1, sm: 2 },
                }}
              >
                Register
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/admin/login"
                sx={{
                  fontSize: { xs: '14px', sm: '16px', md: '18px' },
                  px: { xs: 1, sm: 2 },
                }}
              >
                Login
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                fontSize: { xs: '14px', sm: '16px', md: '18px' },
                px: { xs: 1, sm: 2 },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
