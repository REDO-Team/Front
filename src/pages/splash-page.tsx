import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashLogo from '/src/assets/icons/splash-logo.svg';

export default function SplashPage() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 4000);

    const navigateTimer = setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <div
      className={`bg-main-gradient h-screen flex flex-col justify-center items-center gap-6
      transition-opacity duration-1000
      ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <img src={SplashLogo} alt='Redo Logo' />
      <h1 className='font-pretendard font-bold text-2xl text-center text-white'>
        분리수거를 쉽게, <br /> 지구를 가볍게 !
      </h1>
    </div>
  );
}
