import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='min-h-screen bg-white'>
      <main className='mx-auto min-h-screen w-full max-w-120'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
