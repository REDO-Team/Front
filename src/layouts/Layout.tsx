import { matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom';
import BottomBar from '../components/common/BottomBar';
import TopBar from '../components/common/TopBar';
import Home from '/src/assets/icons/home.svg';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const isLogin = !!matchPath('/login', location.pathname);

  const isSignup = !!matchPath({ path: '/signup/*', end: false }, location.pathname);

  const isGuide = !!matchPath('/guide', location.pathname);

  const isCertification = !!matchPath('/certification', location.pathname);
  const isCertificationGuide = !!matchPath('/certification/guide', location.pathname);
  const isCertificationShoot = !!matchPath('/certification/shooting', location.pathname);
  const isCertificationSuccess = !!matchPath('/certification/success', location.pathname);
  const isCertificationFail = !!matchPath('/certification/fail', location.pathname);

  const isDisposalInfo = !!matchPath('/disposal-info', location.pathname);
  const isDisposalInfoDetail = !!matchPath('/disposal-info/detail', location.pathname);
  const isDisposalInfoFail = !!matchPath('/disposal-info/fail', location.pathname);
  const isImageSearch = !!matchPath('/disposal-info/image-search', location.pathname);
  const isProblemSearch = !!matchPath('/disposal-info/problem-search', location.pathname);

  const isMyContribution = !!matchPath('/my-contribution', location.pathname);
  const isAllContribution = !!matchPath('/all-contribution', location.pathname);

  const isCamera = !!matchPath('/camera', location.pathname);

  const isReward = !!matchPath({ path: '/reward/*', end: false }, location.pathname);
  const isRewardAddressComplete = !!matchPath('/reward/address-complete', location.pathname);
  const isRewardUseComplete = !!matchPath('/reward/use-complete/:productId', location.pathname);
  const isRewardHistory = !!matchPath('/reward/history', location.pathname);
  const isRewardStore = !!matchPath('/reward/store', location.pathname);
  const isRewardProdocts = !!matchPath('/reward/products/:productId', location.pathname);
  const isRewardCheckout = !!matchPath('/reward/checkout/:productId', location.pathname);
  const isRewardAddressList = !!matchPath('/reward/address-list', location.pathname);
  const isRewardAddressSearch = !!matchPath('/reward/address-search', location.pathname);
  const isRewardAddressEdit = !!matchPath('/reward/address-detail/:shippingAddressId/edit', location.pathname);

  const isCommunityDetail = !!matchPath('/community/:postId', location.pathname);
  const isCommunityWrite = !!matchPath('/community/write', location.pathname);
  const isCommunityModify = !!matchPath('/community/modify/:postId', location.pathname);
  const isCommunityMain = !!matchPath('/community', location.pathname);

  const isMy = !!matchPath({ path: '/my/*', end: false }, location.pathname);

  const isMyProfileEdit = !!matchPath('/my/profile', location.pathname);

  const isMyPosts = !!matchPath('/my/posts', location.pathname);

  const isMycomments = !!matchPath('/my/comments', location.pathname);

  const isMyfavorites = !!matchPath({ path: '/my/favorites', end: false }, location.pathname);

  const isMyhistory = !!matchPath('/my/history', location.pathname);

  const hideTopBar = isHome || isLogin || isSignup || isCamera || isMy || isRewardAddressComplete || isRewardUseComplete;

  const hideBottomBar = isLogin || isSignup || isCertification || isCertificationGuide || isCertificationShoot || isCertificationSuccess || isCertificationFail || isImageSearch || isProblemSearch || isMyContribution || isAllContribution || isDisposalInfoFail || isDisposalInfoDetail || isCamera || isDisposalInfo || isReward || isCommunityDetail || isMyPosts || isMycomments || isMyProfileEdit || isMyfavorites || isMyhistory || isCommunityWrite || isCommunityModify;

  const hasGreenBackground = isGuide || isCertification || isCertificationGuide || isCertificationShoot || isCertificationSuccess || isDisposalInfo || isDisposalInfoDetail || isImageSearch || isProblemSearch || isDisposalInfoFail || isCamera || isCommunityMain || isCommunityWrite || isCommunityModify || isCommunityDetail;

  return (
    <div className={`flex flex-1 flex-col min-h-screen ${hasGreenBackground ? 'bg-bg-green1' : 'bg-bg-my'}`}>
      <div className='flex mx-auto min-h-screen w-full max-w-120'>
        {isGuide && <TopBar title='이용 가이드' bgColor='bg-bg-green1' />}

        {isCertification && <TopBar title='인증하기' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-green1' />}
        {isCertificationGuide && <TopBar title='인증 가이드' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-green1' />}
        {isCertificationShoot && <TopBar title='촬영하기' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-green1' />}
        {isCertificationSuccess && <TopBar title='인증하기' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-green1' navigateBack='certification' />}
        {isCertificationFail && <TopBar title='인증하기' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-green1' navigateBack='certification' />}

        {isDisposalInfo && <TopBar title='배출 정보' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-green1' navigateBack='/' />}
        {isImageSearch && <TopBar title='이미지 검색' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-green1' />}
        {isProblemSearch && <TopBar title='문제 상황 검색' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-green1' />}
        {isDisposalInfoDetail && <TopBar title='배출 정보' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-green1' navigateBack='disposal-info' />}
        {isDisposalInfoFail && <TopBar title='배출 정보' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-green1' />}

        {isCommunityMain && <TopBar title='커뮤니티' bgColor='bg-bg-green1' />}
        {isCommunityWrite && <TopBar title='게시글 작성' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-green1' />}
        {isCommunityModify && <TopBar title='게시글 수정' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-green1' />}

        {isMyPosts && <TopBar title='작성한 게시글' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-my' />}
        {isMyfavorites && <TopBar title='즐겨찾기한 배출정보' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-my' />}
        {isMyhistory && <TopBar title='리워드 사용내역' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-my' />}
        {isMycomments && <TopBar title='작성한 댓글' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-my' />}

        {isReward && <TopBar title='리워드 적립' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-my' />}
        {isRewardHistory && <TopBar title='리워드 내역' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-my' />}
        {isRewardStore && <TopBar title='리워드 상점' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-my' />}
        {isRewardProdocts && <TopBar title='제품 정보' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-my' />}
        {isRewardCheckout && <TopBar title='포인트 사용' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-my' />}
        {isRewardAddressList && <TopBar title='배송지 목록' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-my' />}
        {isRewardAddressSearch && <TopBar title='배송지 입력' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-my' />}
        {isRewardAddressEdit && <TopBar title='배송지 입력' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-my' />}

        {isMyContribution && <TopBar title='나의 기여도' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-my' />}
        {isAllContribution && <TopBar title='전체 기여도' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-bg-my' />}

        <div className={`mx-auto flex w-full max-w-120 flex-col ${hideTopBar ? 'min-h-dvh' : 'pt-14'}`}>
          <main className='flex flex-1 flex-col'>
            <Outlet />
          </main>

          {!hideBottomBar && <BottomBar />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
