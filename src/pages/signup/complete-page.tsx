import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../apis/token';

import CompleteCheckIcon from '../../assets/icons/signup-complete.svg?react';

const SignupCompletePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getAccessToken();

    const isProfileCompleted =
      sessionStorage.getItem('signupProfileCompleted');

    if (!accessToken) {
      navigate('/login', { replace: true });
      return;
    }

    if (isProfileCompleted !== 'true') {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleStart = () => {
    sessionStorage.removeItem('signupProfileCompleted');
    sessionStorage.removeItem('signupAgreedTermsIds');

    navigate('/', { replace: true });
  };

  return (
    <div className='mx-auto flex h-dvh w-full max-w-[402px] flex-col overflow-hidden bg-white px-5 pb-[24px] font-pretendard text-text'>
      <main className='flex flex-1 flex-col items-center justify-center'>
        <CompleteCheckIcon className='h-[100px] w-[100px]' />

        <div className='mt-[20px] w-full'>
          <h1 className='h-[29px] w-full text-center text-[22px] font-bold leading-[130%] tracking-[0] text-[#111111]'>
            가입이 완료되었어요!
          </h1>

          <p className='mt-[10px] h-[44px] w-full text-center text-[16px] font-semibold leading-[22px] tracking-[0] text-[#909090]'>
            ReDO!와 함께
            <br />
            지구를 가볍게 만들어봐요
          </p>
        </div>
      </main>

      <button
        type='button'
        onClick={handleStart}
        className='h-[50px] w-full shrink-0 rounded-[25px] bg-main-green1 text-[16px] font-bold text-white'
      >
        시작하기
      </button>
    </div>
  );
};

export default SignupCompletePage;