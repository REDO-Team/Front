import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout";
import HomePage from "./pages/home-page";
import SplashPage from "./pages/splash-page";
import GuidePage from "./pages/guide-page";
import CertificationPage from "./pages/certification-page";
import LoginPage from "./pages/login/login-page";
import CertificationGuidePage from "./pages/certification-page/guide-page";
import ShootingPage from "./pages/certification-page/shooting-page";
import SuccessPage from "./pages/certification-page/success-page";
import DisposalInfoPage from "./pages/disposal-info-page";
import ImageSearchPage from "./pages/disposal-info-page/image-search-page";
import ProblemSearchPage from "./pages/disposal-info-page/problem-search-page";
import FailPage from "./pages/certification-page/fail-page";
import MyContributionPage from "./pages/my-contribution-page";
import DisposalInfoDetailPage from "./pages/disposal-info-page/detail-page";
import TermsPage from "./pages/signup/terms-page";
import SignupPage from "./pages/signup/signup-page";
import ProfileCreatePage from "./pages/signup/profile-create-page";
import SignupCompletePage from "./pages/signup/complete-page";
import DisposalInfoFailPage from "./pages/disposal-info-page/fail-page";
import CamearaPage from "./pages/cameara-page";
import AllContributionPage from "./pages/all-contribution-page";
import CommunityMainPage from "./pages/community/main-page";
import RewardHomePage from "./pages/reward-page/reward-home-page";
import RewardHistoryPage from "./pages/reward-page/reward-history-page";
import RewardStorePage from "./pages/reward-page/reward-store-page";
import RewardProductDetailPage from "./pages/reward-page/reward-product-detail-page";
import RewardCheckoutPage from "./pages/reward-page/reward-purchase-page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "splash",
        element: <SplashPage />,
      },
      {
        path: "guide",
        element: <GuidePage />,
      },
      {
        path: "certification",
        children: [
          {
            index: true,
            element: <CertificationPage />,
          },
          {
            path: "guide",
            element: <CertificationGuidePage />,
          },
          {
            path: "shooting",
            element: <ShootingPage />,
          },
          {
            path: "success",
            element: <SuccessPage />,
          },
          {
            path: "fail",
            element: <FailPage />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "my-contribution",
        element: <MyContributionPage />,
      },
      {
        path: "all-contribution",
        element: <AllContributionPage />,
      },
      {
        path: "signup",
        children: [
          {
            index: true,
            element: <SignupPage />,
          },
          {
            path: "terms",
            element: <TermsPage />,
          },
          {
            path: "profile",
            element: <ProfileCreatePage />,
          },
          {
            path: "complete",
            element: <SignupCompletePage />,
          },
        ],
      },
      {
        path: "disposal-info",
        children: [
          {
            index: true,
            element: <DisposalInfoPage />,
          },
          {
            path: "image-search",
            element: <ImageSearchPage />,
          },
          {
            path: "problem-search",
            element: <ProblemSearchPage />,
          },
          {
            path: "detail",
            element: <DisposalInfoDetailPage />,
          },
          {
            path: "fail",
            element: <DisposalInfoFailPage />,
          },
        ],
      },
      {
        path: "camera",
        element: <CamearaPage />,
      },
      {
        path: "community",
        element: <CommunityMainPage />,
      },
      {
        path: "reward",
        children: [
          {
            index: true,
            element: <RewardHomePage />,
          },
          {
            path: "history",
            element: <RewardHistoryPage />,
          },
          {
            path: "store",
            element: <RewardStorePage />,
          },
        ],
      },
      {
        path: "rewards/products/:productId",
        element: <RewardProductDetailPage />,
      },
      {
        path: "rewards/checkout/:productId",
        element: <RewardCheckoutPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
