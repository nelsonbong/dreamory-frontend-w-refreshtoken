import {
  Container, Typography, Table, TableHead,
  TableBody, TableRow, TableCell, Button,
  TextField, Select, MenuItem, InputLabel, FormControl,
  Box, IconButton, CircularProgress, Dialog, DialogTitle,
  DialogContent, DialogActions, InputAdornment
} from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownward, ArrowUpward, Visibility, VisibilityOff } from '@mui/icons-material';
import api from '../../api';
import type { ListEvent } from '../../types/event';

const ListEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<ListEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortAsc, setSortAsc] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const res = await api.get('/events', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(res.data);
      } catch (err) {
        alert('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const openDeleteDialog = (id: string) => {
    setDeletingId(id);
    setPassword('');
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (!deletingId || !password) return;

    const token = localStorage.getItem('accessToken');
    try {
      await api.post(
        `/events/${deletingId}/delete-with-password`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('✅ Event deleted successfully');
      setEvents((prev) => prev.filter((e) => e.id !== deletingId));
    } catch (err: any) {
      alert(err.response?.data?.message || '❌ Failed to delete event');
    } finally {
      setOpenDialog(false);
      setDeletingId(null);
      setPassword('');
    }
  };

  const handleStatusChange = async (eventId: string, newStatus: string) => {
    const token = localStorage.getItem('accessToken');
    try {
      await api.patch(`/events/${eventId}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents(prev =>
        prev.map(e =>
          e.id === eventId ? { ...e, status: newStatus } : e
        )
      );
    } catch (err: any) {
      alert(err.response?.data?.message || '❌ Failed to update status');
    }
  };

  const filteredEvents = useMemo(() => {
    let filtered = [...events];
    if (statusFilter !== 'All') {
      filtered = filtered.filter(event => event.status === statusFilter);
    }
    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        event =>
          event.name.toLowerCase().includes(lower) ||
          event.location.toLowerCase().includes(lower)
      );
    }
    return filtered.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return sortAsc ? dateA - dateB : dateB - dateA;
    });
  }, [events, searchTerm, statusFilter, sortAsc]);

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">Loading Events...</Typography>
        <CircularProgress sx={{ mt: 2 }} />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Event List</Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        <TextField
          label="Search by name or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ minWidth: 250 }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Ongoing">Ongoing</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          startIcon={sortAsc ? <ArrowDownward /> : <ArrowUpward />}
          onClick={() => setSortAsc(!sortAsc)}
        >
          Sort by Start Date
        </Button>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>
              Start
              <IconButton size="small" onClick={() => setSortAsc(!sortAsc)}>
                {sortAsc ? <ArrowDownward fontSize="small" /> : <ArrowUpward fontSize="small" />}
              </IconButton>
            </TableCell>
            <TableCell>End</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEvents.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>
                <Select
                  size="small"
                  value={event.status}
                  onChange={(e) => handleStatusChange(event.id, e.target.value)}
                  sx={{ minWidth: 120 }}
                >
                  <MenuItem value="Ongoing">Ongoing</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </TableCell>
              <TableCell>{new Date(event.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(event.endDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate(`/admin/dashboard/update-event/${event.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => openDeleteDialog(event.id)}
                  sx={{ ml: 1 }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {filteredEvents.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center">No events found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Password Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Please enter your password to confirm deletion of this event.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ListEvents;
