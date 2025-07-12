import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/admin/LoginPage';
import RegisterPage from './pages/admin/RegisterPage';
import DashboardLayout from './pages/admin/DashboardLayout';
import ListEvents from './pages/admin/ListEvents';
import CreateEvent from './pages/admin/CreateEvent';
import UpdateEvent from './pages/admin/UpdateEvent';
import UserLayout from './pages/user/UserLayout';
import UserEventList from './pages/user/UserEventList.tsx';
import UserEventDetail from './pages/user/UserEventDetail';

function App() {
  const location = useLocation();

  // 👇 hide Navbar on user-facing pages
  const hideNavbar = location.pathname.startsWith('/public-events') || location.pathname === '/';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/register" element={<RegisterPage />} />
        <Route path="/admin/dashboard" element={<DashboardLayout />}>
          <Route path="list-events" element={<ListEvents />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="update-event/:id" element={<UpdateEvent />} />
        </Route>

        {/* User routes (without navbar) */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<UserEventList />} />
          <Route path="public-events/:id" element={<UserEventDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;