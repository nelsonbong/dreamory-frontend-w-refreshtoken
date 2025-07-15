import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; // Adjust path if needed
import type { EventFormData } from '../../types/event'

const CreateEvent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventFormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: EventFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('location', data.location);
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    formData.append('thumbnail', data.thumbnail[0]); // Only one file expected
    formData.append('status', 'Ongoing'); // default status

    const token = localStorage.getItem('accessToken');

    try {
      await api.post('/events', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      reset();
      navigate('/admin/dashboard/list-events');
    } catch (err) {
      alert('Error creating event');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create Event
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        encType="multipart/form-data"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          fullWidth
          label="Event Name"
          margin="normal"
          {...register('name', { required: true })}
          error={!!errors.name}
        />
        <TextField
          fullWidth
          label="Location"
          margin="normal"
          {...register('location', { required: true })}
          error={!!errors.location}
        />
        <TextField
          fullWidth
          type="date"
          label="Start Date"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          {...register('startDate', { required: true })}
          error={!!errors.startDate}
        />
        <TextField
          fullWidth
          type="date"
          label="End Date"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          {...register('endDate', { required: true })}
          error={!!errors.endDate}
        />
        <input
          type="file"
          accept="image/*"
          {...register('thumbnail', { required: true })}
          style={{ marginTop: '16px' }}
        />
        {errors.thumbnail && (
          <Typography color="error" fontSize="0.875rem">
            Thumbnail is required
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Create
        </Button>
      </Box>
    </Container>
  );
};

export default CreateEvent;