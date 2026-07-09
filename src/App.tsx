import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import HomePage from './pages/home-page';
import SplashPage from './pages/splash-page';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'splash',
        element: <SplashPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...routes]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
