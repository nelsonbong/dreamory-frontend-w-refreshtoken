import {
  Box,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  type SidebarItem = {
    label: string;
    path: string;
  };

  const sidebarItems: SidebarItem[] = [
    { label: 'List Events', path: '/admin/dashboard/list-events' },
    { label: 'Create Event', path: '/admin/dashboard/create-event' },
  ];

  return (
    <Box
      component="nav"
      sx={{
        width: {
          xs: '100%',   // Full width on mobile
          sm: '220px',  // Fixed width on larger screens
        },
        flexShrink: 0,
        backgroundColor: '#f5f5f5',
        p: {
          xs: 1,
          sm: 2,
        },
      }}
    >
      <List sx={{ p: 0 }}>
        {sidebarItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ mb: 2 }}>
            <Paper
              elevation={2}
              sx={{
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: '6px',
              }}
            >
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  py: {
                    xs: 1,
                    sm: 1.5,
                  },
                  px: {
                    xs: 1.5,
                    sm: 2,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      sm: '18px',
                      md: '20px',
                    },
                  }}
                >
                  {item.label}
                </Typography>
              </ListItemButton>
            </Paper>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;