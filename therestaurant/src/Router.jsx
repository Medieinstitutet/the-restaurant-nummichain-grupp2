import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { Booking } from './pages/Booking';
import { Layout } from './pages/Layout';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';
import Login from './pages/Login2';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/booking',
        element: <Booking />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
    ],
  },
]);
