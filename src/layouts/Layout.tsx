import { matchPath, Outlet, useLocation } from 'react-router-dom';
import BottomBar from '../components/common/BottomBar';
import TopBar from '../components/common/TopBar';

const Layout = () => {
  const location = useLocation();

  const isSplash = !!matchPath('/splash', location.pathname);
  const isGuide = !!matchPath('/guide', location.pathname);

  const hideTopBar = isSplash;
  const hideBottomBar = isSplash;

  return (
    <div className='min-h-screen bg-white'>
      <main className='mx-auto min-h-screen w-full max-w-120'>
        {!hideTopBar && isGuide ? <TopBar title='이용 가이드' leftIcon /> : <TopBar />}
        <Outlet />
        {!hideBottomBar && <BottomBar />}
      </main>
    </div>
  );
};

export default Layout;
