import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
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
          px: {
            xs: 1,
            sm: 2,
            md: 4,
          },
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
            fontSize: {
              xs: '18px',
              sm: '20px',
              md: '24px',
            },
          }}
        >
          Dreamory's Event Gallery
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: {
              xs: 1,
              sm: 2,
            },
          }}
        >
          {!token ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/admin/register"
                sx={{
                  fontSize: {
                    xs: '14px',
                    sm: '16px',
                    md: '18px',
                  },
                  minWidth: 0,
                  px: {
                    xs: 1,
                    sm: 2,
                  },
                }}
              >
                Register
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/admin/login"
                sx={{
                  fontSize: {
                    xs: '14px',
                    sm: '16px',
                    md: '18px',
                  },
                  minWidth: 0,
                  px: {
                    xs: 1,
                    sm: 2,
                  },
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
                fontSize: {
                  xs: '14px',
                  sm: '16px',
                  md: '18px',
                },
                minWidth: 0,
                px: {
                  xs: 1,
                  sm: 2,
                },
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