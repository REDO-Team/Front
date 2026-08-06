import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
  type RouteObject,
} from 'react-router-dom';

import { getAccessToken } from './apis/token';
import { getMyInfo } from './apis/user';
import LoadingSpinner from './components/common/LoadingSpinner';

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
import RewardAddressDetailPage from "./pages/reward-page/reward-address-detail-page";
import RewardUseCompletePage from "./pages/reward-page/reward-use-complete-page";
import MyPage from "./pages/my-page";
import ProfileEditPage from './pages/my-page/profile-edit-page';
import MyPostsPage from './pages/my-page/my-posts-page';
import MyCommentsPage from './pages/my-page/my-comments-page';
import FavoriteDisposalPage from './pages/my-page/favorite-disposal-page';
import FavoriteDisposalDetailPage from './pages/my-page/favorite-disposal-detail-page';
import RewardUseHistoryPage from './pages/my-page/reward-use-history-page';
import CommunityDetailPage from "./pages/community/detail-page";
import CommunityWritePage from "./pages/community/write-page";
import CommunityModifyPage from "./pages/community/modify-page";
import CommunityCompletePage from "./pages/community/complete-page";
import CommunityModifyCompletePage from "./pages/community/modify-complete-page";

interface ApiErrorResponse {
  code?: string;
  message?: string;
  errorDetail?: string;
}

/**
 * 로그인한 사용자만 접근할 수 있는 라우트
 */
const ProtectedRoute = () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};

/**
 * 비로그인 사용자만 접근할 수 있는 라우트
 */
const GuestOnlyRoute = () => {
  const accessToken = getAccessToken();

  if (accessToken) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

/**
 * 회원가입 과정 전용 라우트
 */
const SignupRoute = () => {
  const location = useLocation();
  const accessToken = getAccessToken();

  const isProfilePage =
    location.pathname === '/signup/profile';

  const isCompletePage =
    location.pathname === '/signup/complete';

  const shouldCheckProfile =
    Boolean(accessToken) && isProfilePage;

  const {
    data: user,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: [
      'signupProfileCheck',
      accessToken,
    ],
    queryFn: getMyInfo,
    enabled: shouldCheckProfile,
    retry: false,
  });

  /*
   * /signup, /signup/terms
   * 비로그인 사용자만 접근 가능
   */
  if (!isProfilePage && !isCompletePage) {
    if (accessToken) {
      return <Navigate to='/' replace />;
    }

    return <Outlet />;
  }

  /*
   * /signup/profile, /signup/complete
   * 회원가입 API에서 발급받은 토큰 필요
   */
  if (!accessToken) {
    return <Navigate to='/login' replace />;
  }

  /*
   * 프로필 생성 완료 화면은
   * 프로필 생성 직후에만 접근 가능
   */
  if (isCompletePage) {
    const isProfileCompleted =
      sessionStorage.getItem(
        'signupProfileCompleted',
      ) === 'true';

    if (!isProfileCompleted) {
      return <Navigate to='/' replace />;
    }

    return <Outlet />;
  }

  /*
   * /signup/profile 진입 시
   * 현재 사용자 프로필 생성 여부 확인
   */
  if (isPending) {
    return (
      <div className='flex min-h-dvh items-center justify-center bg-white'>
        <LoadingSpinner />
      </div>
    );
  }

  /*
   * 사용자 정보 조회 성공:
   * 이미 프로필을 생성한 사용자
   */
  if (user) {
    return <Navigate to='/' replace />;
  }

  if (isError) {
    const isProfileNotCreated =
      axios.isAxiosError<ApiErrorResponse>(
        error,
      ) &&
      error.response?.data?.code ===
        'USER_404_001';

    /*
     * USER_404_001:
     * 회원가입은 됐지만 프로필이 아직 없는 상태
     */
    if (isProfileNotCreated) {
      return <Outlet />;
    }

    /*
     * 토큰 만료나 기타 인증 오류
     */
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      /*
       * 비로그인 전용
       */
      {
        element: <GuestOnlyRoute />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
        ],
      },

      /*
       * 회원가입 과정
       */
      {
        path: 'signup',
        element: <SignupRoute />,
        children: [
          {
            index: true,
            element: <SignupPage />,
          },
          {
            path: 'terms',
            element: <TermsPage />,
          },
          {
            path: 'profile',
            element: <ProfileCreatePage />,
          },
          {
            path: 'complete',
            element: <SignupCompletePage />,
          },
        ],
      },

      /*
       * 로그인 필수 페이지
       */
      {
        element: <ProtectedRoute />,
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
              {
                path: 'posts',
                element: <MyPostsPage />,
              },
              {
                path: 'favorites',
                element: <FavoriteDisposalPage />,
              },
              {
                path: 'favorites/:favoriteId',
                element: (
                  <FavoriteDisposalDetailPage />
                ),
              },
              {
                path: 'history',
                element: <RewardUseHistoryPage />,
              },
              {
                path: 'comments',
                element: <MyCommentsPage />,
              },
            ],
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
            path: 'my-contribution',
            element: <MyContributionPage />,
          },
          {
            path: 'all-contribution',
            element: <AllContributionPage />,
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
              {
                path: 'detail',
                element: <DisposalInfoDetailPage />,
              },
              {
                path: 'fail',
                element: <DisposalInfoFailPage />,
              },
            ],
          },

          {
            path: 'camera',
            element: <CamearaPage />,
          },

          {
            path: 'reward',
            children: [
              {
                index: true,
                element: <RewardHomePage />,
              },
              {
                path: 'history',
                element: <RewardHistoryPage />,
              },
              {
                path: 'store',
                element: <RewardStorePage />,
              },
              {
                path: 'products/:productId',
                element: <RewardProductDetailPage />,
              },
              {
                path: 'checkout/:productId',
                element: <RewardCheckoutPage />,
              },
              {
                path: 'address-list',
                element: <RewardAddressListPage />,
              },
              {
                path: 'address-search',
                element: <RewardAddressSearchPage />,
              },
              {
                path: 'address-detail',
                element: <RewardAddressDetailPage />,
              },
              {
                path: 'address-detail/:shippingAddressId/edit',
                element: <RewardAddressDetailPage />,
              },
              {
                path: 'address-complete/:productId',
                element: (
                  <RewardAddressCompletePage />
                ),
              },
              {
                path: 'use-complete/:productId',
                element: <RewardUseCompletePage />,
              },
            ],
          },

          {
            path: 'community',
            children: [
              {
                index: true,
                element: <CommunityMainPage />,
              },
              {
                path: 'write',
                element: <CommunityWritePage />,
              },
              {
                path: 'modify/:postId',
                element: <CommunityModifyPage />,
              },
              {
                path: 'complete',
                element: <CommunityCompletePage />,
              },
              {
                path: 'modify-complete',
                element: (
                  <CommunityModifyCompletePage />
                ),
              },
              {
                path: ':postId',
                element: <CommunityDetailPage />,
              },
            ],
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
