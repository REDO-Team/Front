import { useState,useEffect,useRef,useCallback, } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../apis/api';
import { setAccessToken } from '../../apis/token';

import LoadingSpinner from '../../components/common/LoadingSpinner';

import Logo from '../../assets/icons/Big-logo.svg?react';
import GoogleIcon from '/src/assets/icons/google.svg?react';
import KakaoIcon from '/src/assets/icons/kakao.svg?react';
import NaverIcon from '/src/assets/icons/naver.svg?react';

type SocialProvider =
  | 'google'
  | 'kakao'
  | 'naver';

const waitForMinimumLoadingTime = async (
  startTime: number,
  minimumTime = 3000,
) => {
  const elapsedTime = Date.now() - startTime;
  const remainingTime = Math.max(
    minimumTime - elapsedTime,
    0,
  );

  await new Promise((resolve) =>
    setTimeout(resolve, remainingTime),
  );
};

interface SocialLoginResult {
  userId?: number;
  isNewUser: boolean;
  accessToken?: string;
  socialProvider?: string;
  socialId?: string;
}

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isNaverInitializedRef = useRef(false);
  const navigate = useNavigate();

  
  const isValid =
    id.trim() !== '' &&
    password.trim() !== '';

  const handleSocialLogin = useCallback(
  async (
    provider: SocialProvider,
    socialAccessToken: string,
  ) => {
    setError('');
    setIsLoading(true);

    const startTime = Date.now();


    try {
      const response = await api.post(
        `/api/auth/login/${provider}`,
        {
          accessToken: socialAccessToken,
        },
      );

      const result =
        response.data.result as SocialLoginResult;

      if (result.isNewUser) {
        if (
          !result.socialProvider ||
          !result.socialId
        ) {
          setError(
            '소셜 회원가입 정보를 불러오지 못했습니다.',
          );
          setIsLoading(false);
          return;
        }

        navigate('/signup/terms', {
          state: {
            signupType: 'SOCIAL',
            socialProvider:
              result.socialProvider,
            socialId: result.socialId,
          },
        });

        return;
      }

      if (!result.accessToken) {
        setError(
          '로그인 토큰을 발급받지 못했습니다.',
        );
        setIsLoading(false);
        return;
      }

      setAccessToken(result.accessToken);

      await waitForMinimumLoadingTime(startTime);

      navigate('/');
    } catch {
  setError(
    '소셜 로그인에 실패했습니다.',
  );
  setIsLoading(false);
}
  },
  [navigate],
);

const handleGoogleLogin = () => {
  setError('');

  const googleClientId =
    import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    setError(
      '구글 Client ID가 설정되지 않았습니다.',
    );
    return;
  }

  if (!window.google) {
    setError(
      '구글 로그인 기능을 불러오는 중입니다. 잠시 후 다시 시도해주세요.',
    );
    return;
  }

  const tokenClient =
    window.google.accounts.oauth2.initTokenClient({
      client_id: googleClientId,

      scope: [
        'openid',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '),

      callback: (response) => {
        if (
          response.error ||
          !response.access_token
        ) {
          setError(
            '구글 인증에 실패했습니다.',
          );
          return;
        }

        void handleSocialLogin(
          'google',
          response.access_token,
        );
      },

      error_callback: () => {
        setError(
          '구글 로그인 창을 열지 못했습니다.',
        );
      },
    });

  tokenClient.requestAccessToken({
    prompt: 'select_account',
  });
};

const handleKakaoLogin = () => {
  setError('');

  const kakaoJavaScriptKey =
    import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  if (!kakaoJavaScriptKey) {
    setError(
      '카카오 JavaScript 키가 설정되지 않았습니다.',
    );
    return;
  }

  if (!window.Kakao) {
    setError(
      '카카오 로그인 기능을 불러오는 중입니다. 잠시 후 다시 시도해주세요.',
    );
    return;
  }

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(
      kakaoJavaScriptKey,
    );
  }

  window.Kakao.Auth.login({
    success: (response) => {
      if (!response.access_token) {
        setError(
          '카카오 인증 토큰을 발급받지 못했습니다.',
        );
        return;
      }

      void handleSocialLogin(
        'kakao',
        response.access_token,
      );
    },

    fail: (error) => {
      console.error(
        '카카오 로그인 실패:',
        error,
      );

      setError(
        '카카오 인증에 실패했습니다.',
      );
    },
  });
};

useEffect(() => {
  if (isNaverInitializedRef.current) {
    return;
  }

  const naverClientId =
    import.meta.env.VITE_NAVER_CLIENT_ID;

  if (!naverClientId) {
    console.error(
      'VITE_NAVER_CLIENT_ID가 설정되지 않았습니다.',
    );
    return;
  }

  if (!window.naver) {
    console.error(
      '네이버 SDK를 불러오지 못했습니다.',
    );
    return;
  }

  isNaverInitializedRef.current = true;

  const naverLogin =
    new window.naver.LoginWithNaverId({
      clientId: naverClientId,
      callbackUrl: `${window.location.origin}/login`,
      isPopup: false,
      callbackHandle: true,
      loginButton: {
        color: 'green',
        type: 3,
        height: 44,
      },
    });

  naverLogin.init();

  // 네이버 인증 후 돌아온 콜백 URL인지 확인
  const isNaverCallback =
    window.location.hash.includes(
      'access_token=',
    );

  // 일반적인 /login 진입이나 로그아웃 후 이동에서는
  // 네이버 자동 로그인을 실행하지 않음
  if (!isNaverCallback) {
    return;
  }

  naverLogin.getLoginStatus(
    (status: boolean) => {
      if (!status) {
        setError(
          '네이버 인증 정보를 확인하지 못했습니다.',
        );
        return;
      }

      const socialAccessToken =
        naverLogin.accessToken?.accessToken;

      if (!socialAccessToken) {
        setError(
          '네이버 인증 토큰을 가져오지 못했습니다.',
        );
        return;
      }

      // 콜백 토큰이 URL에 계속 남아
      // 로그아웃 후 재로그인되는 것을 방지
      window.history.replaceState(
        {},
        document.title,
        '/login',
      );

      void handleSocialLogin(
        'naver',
        socialAccessToken,
      );
    },
  );
}, [handleSocialLogin]);

const handleNaverLogin = () => {
  setError('');

  const naverButton =
    document.querySelector<HTMLAnchorElement>(
      '#naverIdLogin a',
    );

  if (!naverButton) {
    setError(
      '네이버 로그인 기능을 불러오는 중입니다. 잠시 후 다시 시도해주세요.',
    );
    return;
  }

  naverButton.click();
};

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    const startTime = Date.now();

    try {
      const response = await api.post('/api/auth/login', {
        loginId: id.trim(),
        password,
      });

      const accessToken = response.data.result.accessToken;

      setAccessToken(accessToken);

      await waitForMinimumLoadingTime(startTime);

      navigate('/');
    } catch {
  setError(
    '아이디 혹은 비밀번호가 일치하지 않습니다',
  );
  setIsLoading(false);
}
  };

  if (isLoading) {
    return (
      <div className='flex min-h-dvh items-center justify-center bg-white'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='min-h-dvh w-full overflow-y-auto bg-white px-5'>
      <div className='mx-auto flex min-h-dvh w-full max-w-[362px] flex-col items-center py-[40px] pt-[150px]'>
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
            disabled={!isValid || isLoading}
            onClick={handleLogin}
            className={`mt-[10px] h-[50px] w-full rounded-[30px] text-[16px] font-bold text-white transition-colors ${
              isValid && !isLoading
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
            onClick={() =>
              navigate('/signup/terms', {
                state: {
                  signupType: 'LOCAL',
                },
              })
            }
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
          <button
            type='button'
            aria-label='구글 로그인'
            onClick={handleGoogleLogin}
            className='flex h-[52px] w-[52px] items-center justify-center'
          >
            <GoogleIcon className='h-[52px] w-[52px]' />
          </button>
          
          <button
            type='button'
            aria-label='카카오 로그인'
            onClick={handleKakaoLogin}
            className='flex h-[44px] w-[44px] items-center justify-center'
          >
            <KakaoIcon className='h-[44px] w-[44px]' />
          </button>
          
          <button
            type='button'
            aria-label='네이버 로그인'
            onClick={handleNaverLogin}
            className='flex h-[44px] w-[44px] items-center justify-center'
          >
            <NaverIcon className='h-[44px] w-[44px]' />
          </button>
        </div>
        <div
            id='naverIdLogin'
            className='hidden'
          />
      </div>
    </div>
  );
};

export default LoginPage;