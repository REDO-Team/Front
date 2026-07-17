import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/icons/Big-logo.svg?react';
import GoogleIcon from '/src/assets/icons/google.svg?react';
import KakaoIcon from '/src/assets/icons/kakao.svg?react';
import NaverIcon from '/src/assets/icons/naver.svg?react';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const isValid =
    id.trim() !== '' &&
    password.trim() !== '';

  const handleLogin = () => {
    setError('');

    if (id === 'admin' && password === '1234') {
      navigate('/');
      return;
    }

    setError('아이디 혹은 비밀번호가 일치하지 않습니다');
  };

  return (
    <div className='min-h-dvh w-full overflow-y-auto bg-white px-5'>
      <div className='mx-auto flex min-h-dvh w-full max-w-[362px] flex-col items-center pt-[150px] py-[40px]'>
        {/* 로고 및 문구 */}
        <div className='flex flex-col items-center'>
          <Logo className='h-[119px] w-[130px]' />

          <p className='mt-4 text-center font-pretendard text-[18px] font-semibold leading-[101%] tracking-[-0.01em] text-gray-800'>
            함께하는 분리수거
          </p>
        </div>

        {/* 로그인 입력 영역 */}
        <div className='mt-[95px] flex w-full flex-col'>
          <input
            type='text'
            value={id}
            autoComplete='username'
            onChange={(event) => {
              setId(event.target.value);
              setError('');
            }}
            placeholder='아이디'
            className='h-[48px] w-full rounded-[30px] border border-gray-200 bg-gray-50 px-5 text-[15px] font-medium text-text outline-none placeholder:text-gray-400'
          />

          <input
            type='password'
            value={password}
            autoComplete='current-password'
            onChange={(event) => {
              setPassword(event.target.value);
              setError('');
            }}
            placeholder='비밀번호'
            className='mt-[10px] h-[48px] w-full rounded-[30px] border border-gray-200 bg-gray-50 px-5 text-[15px] font-medium text-text outline-none placeholder:text-gray-400'
          />

          {error && (
            <p className='mt-[15px] w-full text-center text-[13px] font-medium leading-[100%] tracking-[0] text-delete'>
              {error}
            </p>
          )}

          <button
            type='button'
            disabled={!isValid}
            onClick={handleLogin}
            className={`mt-[10px] h-[50px] w-full rounded-[30px] text-[16px] font-bold text-white transition-colors ${
              isValid
                ? 'bg-main-green1'
                : 'cursor-not-allowed bg-gray-400'
            }`}
          >
            로그인
          </button>
        </div>

        {/* 회원가입 */}
        <div className='mt-[22px] text-center text-[14px] font-medium leading-[15px] text-gray-500'>
          계정이 없나요?{' '}
          <button
            type='button'
            onClick={() => navigate('/signup/terms')}
            className='text-text'
          >
            회원가입
          </button>
        </div>

        {/* 간편 로그인 */}
        <div className='mt-[58px] flex w-full items-center gap-3'>
          <div className='h-[1px] flex-1 bg-gray-300' />

          <span className='shrink-0 text-center text-[14px] font-medium leading-[14px] text-gray-600'>
            간편 로그인
          </span>

          <div className='h-[1px] flex-1 bg-gray-300' />
        </div>

        {/* 간편 로그인 아이콘 */}
        <div className='mt-[14px] flex items-center justify-center gap-[13px] pb-[20px]'>
          <GoogleIcon className='h-[52px] w-[52px]' />
          <KakaoIcon className='h-[44px] w-[44px]' />
          <NaverIcon className='h-[44px] w-[44px]' />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;