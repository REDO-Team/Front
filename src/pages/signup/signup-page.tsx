import { useEffect, useState } from 'react';
import axios from 'axios';
import {checkLoginId,sendEmailVerification,verifyEmailCode,signup,} from '../../apis/auth';
import { useNavigate } from 'react-router-dom';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg?react';

const ID_REGEX = /^[A-Za-z]{6,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

type UserIdStatus =
  | 'none'
  | 'formatError'
  | 'available'
  | 'duplicate';

  
const SignupPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
  const agreedTermsIds = sessionStorage.getItem(
    'signupAgreedTermsIds',
  );

  if (!agreedTermsIds) {
    navigate('/signup/terms', { replace: true });
  }
  }, [navigate]);
  
  const [isCheckingUserId, setIsCheckingUserId] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [userIdStatus, setUserIdStatus] = useState<UserIdStatus>('none');

  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isPasswordConfirmTouched, setIsPasswordConfirmTouched] =
    useState(false);

  const isPasswordValid = PASSWORD_REGEX.test(password);

  const isPasswordMatched =
    passwordConfirm !== '' && password === passwordConfirm;

  const showPasswordError =
    isPasswordTouched &&
    password !== '' &&
    !isPasswordValid;

  const showPasswordSuccess =
    isPasswordConfirmTouched &&
    passwordConfirm !== '' &&
    isPasswordValid &&
    isPasswordMatched;

  const showPasswordConfirmError =
    isPasswordConfirmTouched &&
    passwordConfirm !== '' &&
    !isPasswordMatched;

  const isUserIdChecked = userIdStatus === 'available';

  const isValid =
    isUserIdChecked &&
    isEmailVerified &&
    isPasswordValid &&
    isPasswordMatched;

  const handleCheckId = async () => {
  const trimmedUserId = userId.trim();

  if (!ID_REGEX.test(trimmedUserId)) {
    setUserIdStatus('formatError');
    return;
  }

  try {
    setIsCheckingUserId(true);

    const isAvailable = await checkLoginId(trimmedUserId);

    if (isAvailable) {
      setUserIdStatus('available');
    } else {
      setUserIdStatus('duplicate');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(
        error.response?.data?.message ??
          '아이디 중복 확인에 실패했습니다.',
      );
    } else {
      alert('오류가 발생했습니다.');
    }
  } finally {
    setIsCheckingUserId(false);
  }
};

  const handleSendEmail = async () => {
  if (email.trim() === '') {
    alert('이메일 주소를 입력해주세요.');
    return;
  }

  try {
    await sendEmailVerification(email.trim());

    setIsEmailVerified(false);
    setVerificationCode('');

    alert('인증번호를 발송했습니다.');
  } catch {
    alert('인증번호 발송에 실패했습니다.');
  }
};

  const handleVerify = async () => {
  try {
    await verifyEmailCode(
      email.trim(),
      verificationCode.trim(),
    );

    setIsEmailVerified(true);
    alert('인증되었습니다.');
  } catch {
    setIsEmailVerified(false);
    alert('인증번호가 올바르지 않습니다.');
  }
};

const handleSignup = async () => {
  if (!isValid || isSigningUp) {
    return;
  }

  try {
    setIsSigningUp(true);

    const agreedTermsIds: number[] = JSON.parse(
      sessionStorage.getItem('signupAgreedTermsIds') ?? '[]',
    );

    const result = await signup(
      userId.trim(),
      email.trim(),
      password,
      agreedTermsIds,
    );

    localStorage.setItem('accessToken', result.accessToken);

    navigate('/signup/profile');
  } catch {
    alert('회원가입에 실패했습니다.');
  } finally {
    setIsSigningUp(false);
  }
};

  return (
    <div className='flex h-dvh w-full flex-col overflow-hidden bg-white font-pretendard text-text'>
      {/* 상단 영역 */}
      <header className='shrink-0 px-5 pt-[28px]'>
        <div className='flex h-[22px] items-center'>
          <button
            type='button'
            onClick={() => navigate('/signup/terms')}
            aria-label='뒤로가기'
            className='flex h-6 w-6 shrink-0 items-center justify-center'
          >
            <LeftArrowIcon className='h-[18px] w-[9px]' />
          </button>

          <h1 className='ml-[8px] max-w-[102px] text-[18px] font-semibold leading-[100%] tracking-[0] text-[#111111]'>
            회원가입
          </h1>
        </div>
      </header>

      {/* 스크롤되는 입력 영역 */}
      <main className='min-h-0 flex-1 overflow-y-auto px-5 pb-6'>
        <section className='mt-[37px] flex w-full flex-col gap-[22px]'>
          {/* 아이디 */}
          <div className='flex w-full flex-col'>
            <label
              htmlFor='userId'
              className='mb-[8px] block text-[16px] font-semibold leading-[15px] tracking-[0] text-[#2A2A2A]'
            >
              아이디
            </label>

            <div className='flex h-[48px] w-full items-center gap-[8px]'>
              <input
                id='userId'
                type='text'
                value={userId}
                onChange={(event) => {
                  const value = event.target.value;

                  setUserId(value);

                  if (value === '') {
                    setUserIdStatus('none');
                  } else if (!ID_REGEX.test(value)) {
                    setUserIdStatus('formatError');
                  } else {
                    // 아이디를 수정하면 중복확인을 다시 해야 함
                    setUserIdStatus('none');
                  }
                }}
                placeholder='아이디'
                autoComplete='username'
                className='h-[48px] min-w-0 flex-1 rounded-[24px] border border-gray-200 bg-gray-50 px-[16px] text-[14px] font-medium outline-none placeholder:text-gray-400'
              />

              <button
                type='button'
                onClick={handleCheckId}
                disabled={isCheckingUserId}
                className='h-[48px] w-[108px] shrink-0 rounded-[24px] border border-main-green1 bg-white text-[16px] font-semibold text-main-green1 transition-colors active:bg-main-green1 active:text-white'
              >
                {isCheckingUserId ? '확인 중...' : '중복확인'}
              </button>
            </div>

            {userIdStatus === 'formatError' && (
              <p className='mt-[10px] flex h-[17px] items-center gap-[4px] text-[14px] font-medium leading-[100%] tracking-[0] text-delete'>
                <span aria-hidden='true'>ⓘ</span>
                영문 6자 이상으로 입력해주세요.
              </p>
            )}

            {userIdStatus === 'duplicate' && (
              <p className='mt-[10px] flex h-[17px] items-center gap-[4px] text-[14px] font-medium leading-[100%] tracking-[0] text-delete'>
                <span aria-hidden='true'>ⓘ</span>
                사용 중인 아이디입니다.
              </p>
            )}

            {userIdStatus === 'available' && (
              <p className='mt-[10px] flex h-[17px] items-center gap-[4px] text-[14px] font-medium leading-[100%] tracking-[0] text-main-green1'>
                <span aria-hidden='true'>✓</span>
                사용 가능한 아이디입니다.
              </p>
            )}
          </div>

          {/* 이메일 주소 */}
          <div className='flex w-full flex-col'>
            <label
              htmlFor='email'
              className='mb-[8px] block text-[16px] font-semibold leading-[15px] tracking-[0] text-[#2A2A2A]'
            >
              이메일 주소
            </label>

            <div className='flex h-[48px] w-full items-center gap-[8px]'>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);

                  // 이메일을 수정하면 다시 인증해야 함
                  setIsEmailVerified(false);
                  setVerificationCode('');
                }}
                placeholder='이메일 입력'
                autoComplete='email'
                className='h-[48px] min-w-0 flex-1 rounded-[24px] border border-gray-200 bg-gray-50 px-[16px] text-[14px] font-medium outline-none placeholder:text-gray-400'
              />

              <button
                type='button'
                onClick={handleSendEmail}
                className='h-[48px] w-[108px] shrink-0 rounded-[24px] border border-main-green1 bg-white text-[16px] font-semibold text-main-green1 transition-colors active:bg-main-green1 active:text-white'
              >
                인증
              </button>
            </div>
          </div>

          {/* 인증번호 */}
          <div className='flex w-full flex-col'>
            <label
              htmlFor='verificationCode'
              className='mb-[8px] block text-[16px] font-semibold leading-[15px] tracking-[0] text-[#2A2A2A]'
            >
              인증번호
            </label>

            <div className='flex h-[48px] w-full items-center gap-[8px]'>
              <input
                id='verificationCode'
                type='text'
                inputMode='numeric'
                value={verificationCode}
                onChange={(event) => {
                  setVerificationCode(event.target.value);

                  // 인증번호를 수정하면 인증 상태 초기화
                  setIsEmailVerified(false);
                }}
                placeholder='인증번호 입력'
                className='h-[48px] min-w-0 flex-1 rounded-[24px] border border-gray-200 bg-gray-50 px-[16px] text-[14px] font-medium outline-none placeholder:text-gray-400'
              />

              <button
                type='button'
                onClick={handleVerify}
                className='h-[48px] w-[108px] shrink-0 rounded-[24px] border border-main-green1 bg-white text-[16px] font-semibold text-main-green1 transition-colors active:bg-main-green1 active:text-white'
              >
                확인
              </button>
            </div>

            {isEmailVerified && (
              <p className='mt-[10px] flex h-[17px] items-center gap-[4px] text-[14px] font-medium leading-[100%] tracking-[0] text-main-green1'>
                <span aria-hidden='true'>✓</span>
                이메일 인증이 완료되었습니다.
              </p>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div className='flex w-full flex-col'>
            <label
              htmlFor='password'
              className='mb-[8px] block text-[16px] font-semibold leading-[15px] tracking-[0] text-[#2A2A2A]'
            >
              비밀번호 입력
            </label>

            <input
              id='password'
              type='password'
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setIsPasswordConfirmTouched(false);
              }}
              onBlur={() => setIsPasswordTouched(true)}
              placeholder='비밀번호 입력'
              autoComplete='new-password'
              aria-invalid={showPasswordError}
              aria-describedby={
                showPasswordError ? 'password-error' : undefined
              }
              className='h-[48px] w-full rounded-[24px] border border-gray-200 bg-gray-50 px-[16px] text-[14px] font-medium outline-none placeholder:text-gray-400'
            />

            {showPasswordError && (
              <p
                id='password-error'
                className='mt-[10px] flex h-[17px] items-center gap-[4px] text-[14px] font-medium leading-[100%] tracking-[0] text-delete'
              >
                <span aria-hidden='true'>ⓘ</span>
                8~16자의 영문, 숫자를 조합해 주세요.
              </p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className='flex w-full flex-col'>
            <label
              htmlFor='passwordConfirm'
              className='mb-[8px] block text-[16px] font-semibold leading-[15px] tracking-[0] text-[#2A2A2A]'
            >
              비밀번호 확인
            </label>

            <input
              id='passwordConfirm'
              type='password'
              value={passwordConfirm}
              onChange={(event) =>
                setPasswordConfirm(event.target.value)
              }
              onBlur={() => setIsPasswordConfirmTouched(true)}
              placeholder='비밀번호 확인 입력'
              autoComplete='new-password'
              aria-invalid={showPasswordConfirmError}
              aria-describedby={
                showPasswordConfirmError
                  ? 'password-confirm-error'
                  : undefined
              }
              className='h-[48px] w-full rounded-[24px] border border-gray-200 bg-gray-50 px-[16px] text-[14px] font-medium outline-none placeholder:text-gray-400'
            />

            {showPasswordConfirmError ? (
              <p
                id='password-confirm-error'
                className='mt-[10px] flex h-[17px] items-center gap-[4px] text-[14px] font-medium leading-[100%] tracking-[0] text-delete'
              >
                <span aria-hidden='true'>ⓘ</span>
                비밀번호가 일치하지 않습니다.
              </p>
            ) : (
              showPasswordSuccess && (
                <p className='mt-[10px] flex h-[17px] items-center gap-[4px] text-[14px] font-medium leading-[100%] tracking-[0] text-main-green1'>
                  <span aria-hidden='true'>✓</span>
                  사용 가능한 비밀번호입니다.
                </p>
              )
            )}
          </div>
        </section>
      </main>

      {/* 하단 고정 버튼 */}
      <div className='shrink-0 bg-white px-5 pb-[27px] pt-3'>
        <button
          type='button'
          disabled={!isValid || isSigningUp}
          onClick={handleSignup}
          className={`h-[50px] w-full rounded-[30px] text-[16px] font-bold text-white transition-colors ${
            isValid && !isSigningUp
              ? 'bg-main-green1'
              : 'cursor-not-allowed bg-gray-400'
          }`}
        >
          {isSigningUp ? '가입 중...' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default SignupPage;