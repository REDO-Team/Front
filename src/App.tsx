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
import RewardAddressCompletePage from "./pages/reward-page/reward-address-complete-page";
import RewardAddressListPage from "./pages/reward-page/reward-address-list-page";
import RewardAddressSearchPage from "./pages/reward-page/reward-address-search-page";
import RewardUseCompletePage from "./pages/reward-page/reward-use-complete-page";
import MyPage from "./pages/my-page";
import ProfileEditPage from './pages/my-page/profile-edit-page';
import CommunityDetailPage from "./pages/community/detail-page";

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
        path: 'my',
        children: [
          {
            index: true,
            element: <MyPage />,
          },
          {
            path: 'profile',
            element: <ProfileEditPage />,
          },
        ],
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
          {
            path: "products/:productId",
            element: <RewardProductDetailPage />,
          },
          {
            path: "checkout/:productId",
            element: <RewardCheckoutPage />,
          },
          {
            path: "address-list",
            element: <RewardAddressListPage />,
          },
          {
            path: "address-search",
            element: <RewardAddressSearchPage />,
          },
          {
            path: "address-complete/:productId",
            element: <RewardAddressCompletePage />,
          },
          {
            path: "use-complete/:productId",
            element: <RewardUseCompletePage />,
          },
        ],
      },
      {
        path: "community",
        children: [
          {
            index: true,
            element: <CommunityMainPage />,
          },
          {
            path: ":postId",
            element: <CommunityDetailPage />,
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
