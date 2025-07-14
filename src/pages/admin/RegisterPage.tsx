import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
});

const onSubmit = async (data: RegisterFormData) => {
  try {
    const res = await api.post('/auth/register', data, { withCredentials: true });
    const result = res.data;

    // ✅ Store accessToken only
    localStorage.setItem('accessToken', result.accessToken);

    // ✅ Redirect
    navigate('/admin/dashboard/list-events');
  } catch (error) {
    alert('Registration failed');
  }
};

  return (
    <Box
      sx={{
        height: 'calc(100vh - 80px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: {
              xs: '1.5rem', // mobile
              sm: '2rem',   // tablet
              md: '2.5rem', // desktop
            },
            textAlign: 'center',
            mb: 3,
          }}
        >
          Admin Register
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 2}}
        >
          <TextField
            fullWidth
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              fontSize: {
                xs: '0.9rem',
                sm: '1rem',
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              fontSize: {
                xs: '0.9rem',
                sm: '1rem',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              py: {
                xs: 1,
                sm: 1.5,
              },
              fontSize: {
                xs: '0.9rem',
                sm: '1rem',
              },
            }}
          >
            Register
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;