import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import SplashPage from './pages/splash-page';
import GuidePage from './pages/guide-page';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'splash',
        element: <SplashPage />,
      },
      {
        path: 'guide',
        element: <GuidePage />,
      },
    ],
  },
];

const router = createBrowserRouter([...routes]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
