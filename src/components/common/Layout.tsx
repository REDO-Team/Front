import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='min-h-screen bg-white'>
      <main className='mx-auto min-h-screen w-full max-w-[480px]'>
        {children}
      </main>
    </div>
  );
};

export default Layout;