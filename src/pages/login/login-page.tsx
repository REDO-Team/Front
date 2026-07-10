import Logo from '../../assets/icons/Big-logo.svg?react';
import GoogleIcon from '/src/assets/icons/google.svg?react';
import KakaoIcon from '/src/assets/icons/Kakao.svg?react';
import NaverIcon from '/src/assets/icons/naver.svg?react';

const LoginPage = () => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-white px-5'>
      <div className='flex w-full max-w-[362px] flex-col items-center'>
        {/* 로고 및 문구 */}
        <div className='flex flex-col items-center'>
          <Logo className='h-[119px] w-[130px]' />

          <p className="mt-4 text-center font-pretendard text-[18px] font-semibold leading-[101%] tracking-[-0.01em] text-gray-800">
            분리수거를 쉽게,
            <br />
            지구를 가볍게!
          </p>
        </div>

        {/* 로그인 입력 영역 */}
        <div className='mt-[65px] flex w-full flex-col'>
          <input
            type='text'
            placeholder='아이디'
            className='h-[48px] w-full rounded-[30px] border border-gray-200 bg-gray-50 px-5 text-[14px] font-medium text-text outline-none placeholder:text-gray-400'
          />

          <input
            type='password'
            placeholder='비밀번호'
            className='mt-[10px] h-[48px] w-full rounded-[30px] border border-gray-200 bg-gray-50 px-5 text-[14px] font-medium text-text outline-none placeholder:text-gray-400'
          />

          <button
            type='button'
            className='mt-[10px] h-[50px] w-full rounded-[30px] bg-gray-400 text-[14px] font-bold text-white'
          >
            로그인
          </button>
        </div>

        {/* 회원가입 */}
        <div className='mt-[22px] text-center text-[12px] font-medium text-gray-500'>
          계정이 없나요?{' '}
          <button type='button' className='font-semibold text-text'>
            회원가입
          </button>
        </div>

        {/* 간편 로그인 */}
        <div className='mt-[48px] flex w-full items-center gap-3'>
          <div className='h-px flex-1 bg-gray-200' />

          <span className='shrink-0 text-[14px] font-medium leading-none text-gray-600'>
            간편 로그인
          </span>

          <div className='h-px flex-1 bg-gray-200' />
        </div>

        {/* 간편 로그인 아이콘 */}
        <div className='mt-[14px] flex items-center justify-center gap-[13px]'>
          <GoogleIcon className='h-[42px] w-[42px]' />
          <KakaoIcon className='h-[34px] w-[34px]' />
          <NaverIcon className='h-[34px] w-[34px]' />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;