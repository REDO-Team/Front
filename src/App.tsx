import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import HomePage from './pages/home-page';
import SplashPage from './pages/splash-page';
import GuidePage from './pages/guide-page';
import CertificationPage from './pages/certification-page';
import LoginPage from './pages/login/login-page';
import CertificationGuidePage from './pages/certification-page/guide-page';
import ShootingPage from './pages/certification-page/shooting-page';
import SuccessPage from './pages/certification-page/success-page';
import DisposalInfoPage from './pages/disposal-info-page';
import ImageSearchPage from './pages/disposal-info-page/image-search-page';
import FailPage from './pages/certification-page/fail-page';
import ProblemSearchPage from './pages/disposal-info-page/problem-search-page';

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
      {
        path: 'guide',
        element: <GuidePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'certification',
        children: [
          {
            index: true,
            element: <CertificationPage />,
          },
          {
            path: 'guide',
            element: <CertificationGuidePage />,
          },
          {
            path: 'shooting',
            element: <ShootingPage />,
          },
          {
            path: 'success',
            element: <SuccessPage />,
          },
          {
            path: 'fail',
            element: <FailPage />,
          },
        ],
      },
      {
        path: 'disposal-info',
        children: [
          {
            index: true,
            element: <DisposalInfoPage />,
          },
          {
            path: 'image-search',
            element: <ImageSearchPage />,
          },
          {
            path: 'problem-search',
            element: <ProblemSearchPage />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
