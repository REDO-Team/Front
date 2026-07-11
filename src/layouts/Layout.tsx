import { matchPath, Outlet, useLocation } from 'react-router-dom';
import BottomBar from '../components/common/BottomBar';

const Layout = () => {
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isSplash = !!matchPath('/splash', location.pathname);
  const isLogin = !!matchPath('/login', location.pathname);
  const isGuide = !!matchPath('/guide', location.pathname);
  const isCertification = !!matchPath('/certification', location.pathname);
  const isCertificationGuide = !!matchPath('/certification/guide', location.pathname);
  const isCertificationShoot = !!matchPath('/certification/shooting', location.pathname);
  const isCertificationSuccess = !!matchPath('/certification/success', location.pathname);
  const isCertificationFail = !!matchPath('/certification/fail', location.pathname);
  const isDisposalInfo = !!matchPath('/disposal-info', location.pathname);
  const isImageSearch = !!matchPath('/disposal-info/image-search', location.pathname);
const isMyContribution = !!matchPath('/my-contribution', location.pathname);
const isProblemSearch = !!matchPath('/disposal-info/problem-search', location.pathname);

const hideTopBar = isHome || isSplash || isLogin;

const hideBottomBar =
  isSplash ||
  isLogin ||
  isCertification ||
  isCertificationGuide ||
  isCertificationShoot ||
  isCertificationSuccess ||
  isCertificationFail ||
  isImageSearch ||
  isProblemSearch ||
  isMyContribution;

  return (
    <div className={`min-h-screen ${isGuide || isCertification || isCertificationGuide || isCertificationShoot || isCertificationSuccess || isDisposalInfo || isImageSearch || isProblemSearch ? 'bg-bg-green1' : 'bg-white'} overflow-auto`}>
      <div className='mx-auto min-h-screen w-full max-w-120'>
        <div className={`mx-auto flex w-full max-w-120 flex-col ${hideTopBar ? 'min-h-dvh' : 'h-[calc(100dvh-56px)] pt-14'}`}>
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
