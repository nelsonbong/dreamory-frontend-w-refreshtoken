import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

// Zod schema for login validation
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await api.post('/auth/login', data, {
        withCredentials: true, // ✅ Important: Enables sending/receiving cookies
      });

      const result = res.data;

      // ✅ Save access token only (refresh token is stored in httpOnly cookie automatically)
      localStorage.setItem('accessToken', result.accessToken);

      // ✅ Redirect after login
      navigate('/admin/dashboard/list-events');
    } catch (err) {
      alert('Invalid email or password');
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
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            textAlign: 'center',
            mb: 3,
          }}
        >
          Admin Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            fullWidth
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: { xs: 1, sm: 1.5 } }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
