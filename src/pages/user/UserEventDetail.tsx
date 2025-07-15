import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import api from '../../api';
import type { EventId } from '../../types/event';

const UserEventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventId | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchEvent = async () => {
      try {
        const res = await api.get(`/public-events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error('Failed to fetch event:', error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!event) {
    return (
      <Container>
        <Typography variant="h5" color="error" textAlign="center" mt={4}>
          Event not found.
        </Typography>
        <Box textAlign="center" mt={2}>
          <Button variant="contained" onClick={() => navigate('/')}>
            Back to Homepage
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="240"
          image={event.thumbnail}
          alt={event.name}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {event.name}
          </Typography>
          <Box mb={1}>
            <Typography variant="subtitle1" color="text.secondary">
              Location:
            </Typography>
            <Typography variant="body1">{event.location}</Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="subtitle1" color="text.secondary">
              Status:
            </Typography>
            <Typography variant="body1">{event.status}</Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="subtitle1" color="text.secondary">
              Start Date:
            </Typography>
            <Typography variant="body1">
              {new Date(event.startDate).toLocaleDateString()}
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle1" color="text.secondary">
              End Date:
            </Typography>
            <Typography variant="body1">
              {new Date(event.endDate).toLocaleDateString()}
            </Typography>
          </Box>
          <Box textAlign="center" mt={2}>
            <Button variant="contained" onClick={() => navigate('/')}>
              Back to Browse Event
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserEventDetail;
