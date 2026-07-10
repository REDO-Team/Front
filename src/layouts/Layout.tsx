import { matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom';
import BottomBar from '../components/common/BottomBar';
import TopBar from '../components/common/TopBar';
import Home from '/src/assets/icons/home.svg';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const isSplash = !!matchPath('/splash', location.pathname);
  const isLogin = !!matchPath('/login', location.pathname);
  const isGuide = !!matchPath('/guide', location.pathname);
  const isCertification = !!matchPath('/certification', location.pathname);
  const isCertificationGuide = !!matchPath('/certification/guide', location.pathname);

  const hideTopBar = isHome || isSplash || isLogin;
  const hideBottomBar = isSplash || isLogin || isCertification || isCertificationGuide;

  return (
    <div className={`min-h-screen ${isGuide || isCertification || isCertificationGuide ? 'bg-bg-green1' : 'bg-white'}`}>
      <div className='mx-auto min-h-screen w-full max-w-120'>
        {!hideTopBar && (isGuide ? <TopBar title='이용 가이드' leftIcon /> : isCertification ? <TopBar title='인증하기' leftIcon rightIcon={Home} onClick={() => navigate('/')} /> : isCertificationGuide ? <TopBar title='인증 가이드' leftIcon rightIcon={Home} onClick={() => navigate('/')} /> : <TopBar />)}
        <div className={`mx-auto flex w-full max-w-120 flex-col ${hideTopBar ? 'min-h-dvh' : 'h-[calc(100dvh-56px)] pt-14'}`}>
          <main className='flex-1'>
            <Outlet />
          </main>

          {!hideBottomBar && <BottomBar />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
