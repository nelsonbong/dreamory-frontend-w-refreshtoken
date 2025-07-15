import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Box,
  CircularProgress,
  Pagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api';
import type { Event }from '../../types/event';

const UserEventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEvents = async (currentPage: number) => {
    setLoading(true);
    try {
      const res = await api.get(`/public-events?page=${currentPage}&limit=3`);
      setEvents(res.data.events);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('❌ Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  return (
    <Container>
      <Typography variant="h3" gutterBottom textAlign="center" mt={8}>
        Dreamory Events
      </Typography>

      {loading ? (
        <Box mt={4} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4} mt={8}>
            {events.map((event) => (
              <Card
                key={event.id}
                sx={{
                  width: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardActionArea onClick={() => navigate(`/public-events/${event.id}`)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.thumbnail}
                    alt={event.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" noWrap>
                      {event.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      Click for More Details...
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>

          <Box display="flex" justifyContent="center" mt={8}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default UserEventList;
