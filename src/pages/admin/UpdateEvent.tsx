import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api';
import type { EventFormData as BaseEventFormData } from '../../types/event';

type UpdateEventFormData = Omit<BaseEventFormData, 'thumbnail'> & {
  thumbnail?: FileList;
};

const UpdateEvent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateEventFormData>();

  // 🔄 Fetch event by ID from backend
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await api.get(`/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const event = res.data;

        reset({
          name: event.name,
          location: event.location,
          startDate: event.startDate.split('T')[0],
          endDate: event.endDate.split('T')[0],
        });
      } catch (err) {
        alert('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, reset]);

  // 🔁 Handle form submission
  const onSubmit = async (data: UpdateEventFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('location', data.location);
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    if (data.thumbnail?.[0]) {
      formData.append('thumbnail', data.thumbnail[0]);
    }

    const token = localStorage.getItem('token');

    try {
      await api.put(`/events/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Event updated successfully!');
      navigate('/admin/dashboard/list-events');
    } catch (err) {
      alert('Failed to update event');
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Update Event
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        encType="multipart/form-data"
      >
        <TextField
          fullWidth label="Event Name" margin="normal"
          {...register('name', { required: true })}
          error={!!errors.name}
        />
        <TextField
          fullWidth label="Location" margin="normal"
          {...register('location', { required: true })}
          error={!!errors.location}
        />
        <TextField
          type="date"
          fullWidth
          margin="normal"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          {...register('startDate', { required: true })}
        />
        <TextField
          type="date"
          fullWidth
          margin="normal"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          {...register('endDate', { required: true })}
        />

        <Typography variant="body2" sx={{ mt: 2 }}>
          Change Thumbnail (optional):
        </Typography>
        <input type="file" accept="image/*" {...register('thumbnail')} />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Update
        </Button>
      </Box>
    </Container>
  );
};

export default UpdateEvent;
