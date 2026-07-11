import { useState } from 'react';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg?react';

const ID_REGEX = /^[A-Za-z]{6,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

const SignupPage = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [isUserIdTouched, setIsUserIdTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isPasswordConfirmTouched, setIsPasswordConfirmTouched] =
    useState(false);

  const isUserIdValid = ID_REGEX.test(userId);
  const isPasswordValid = PASSWORD_REGEX.test(password);
  const isPasswordMatched =
    passwordConfirm !== '' && password === passwordConfirm;

  const showUserIdError =
    isUserIdTouched && userId !== '' && !isUserIdValid;

  const showPasswordError =
    isPasswordTouched && password !== '' && !isPasswordValid;

  const showPasswordSuccess =
    isPasswordConfirmTouched &&
    passwordConfirm !== '' &&
    isPasswordValid &&
    isPasswordMatched;

  const showPasswordConfirmError =
    isPasswordConfirmTouched &&
    passwordConfirm !== '' &&
    !isPasswordMatched;

  const isValid =
    isUserIdValid &&
    email.trim() !== '' &&
    verificationCode.trim() !== '' &&
    isPasswordValid &&
    isPasswordMatched;

  return (
    <div className='flex h-dvh w-full flex-col overflow-hidden bg-white font-pretendard text-text'>
      {/* 상단 영역 */}
      <header className='shrink-0 px-5 pt-[28px]'>
        <div className='flex h-[22px] items-center'>
          <button
            type='button'
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
                  setUserId(event.target.value);
                }}
                onBlur={() => setIsUserIdTouched(true)}
                placeholder='아이디'
                autoComplete='username'
                aria-invalid={showUserIdError}
                aria-describedby={
                  showUserIdError ? 'userId-error' : undefined
                }
                className='h-[48px] min-w-0 flex-1 rounded-[24px] border border-gray-200 bg-gray-50 px-[16px] text-[14px] font-medium outline-none placeholder:text-gray-400'
              />

              <button
                type='button'
                className='h-[48px] w-[108px] shrink-0 rounded-[24px] border border-main-green1 bg-white text-[16px] font-semibold text-main-green1 transition-colors active:bg-main-green1 active:text-white'
              >
                중복확인
              </button>
            </div>

            {showUserIdError && (
              <p
                id='userId-error'
                className='mt-[10px] flex h-[17px] items-center gap-[4px] text-[14px] font-medium leading-[100%] tracking-[0] text-[#F05A5A]'
              >
                <span aria-hidden='true'>ⓘ</span>
                올바른 아이디 형식이 아닙니다.
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
                onChange={(event) => setEmail(event.target.value)}
                placeholder='이메일 입력'
                autoComplete='email'
                className='h-[48px] min-w-0 flex-1 rounded-[24px] border border-gray-200 bg-gray-50 px-[16px] text-[14px] font-medium outline-none placeholder:text-gray-400'
              />

              <button
                type='button'
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
                onChange={(event) =>
                  setVerificationCode(event.target.value)
                }
                placeholder='인증번호 입력'
                className='h-[48px] min-w-0 flex-1 rounded-[24px] border border-gray-200 bg-gray-50 px-[16px] text-[14px] font-medium outline-none placeholder:text-gray-400'
              />

              <button
                type='button'
                className='h-[48px] w-[108px] shrink-0 rounded-[24px] border border-main-green1 bg-white text-[16px] font-semibold text-main-green1 transition-colors active:bg-main-green1 active:text-white'
              >
                확인
              </button>
            </div>
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
                className='mt-[10px] flex h-[17px] items-center gap-[4px] text-[14px] font-medium leading-[100%] tracking-[0] text-[#F05A5A]'
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
              onChange={(event) => {
                setPasswordConfirm(event.target.value);
              }}
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
                className='mt-[10px] flex h-[17px] items-center gap-[4px] text-[14px] font-medium leading-[100%] tracking-[0] text-[#F05A5A]'
              >
                <span aria-hidden='true'>ⓘ</span>
                비밀번호가 일치하지 않습니다.
              </p>
            ) : (
              showPasswordSuccess && (
                <p className='mt-[10px] flex h-[17px] items-center gap-[4px] text-[14px] font-medium leading-[100%] tracking-[0] text-[#06C65F]'>
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
          disabled={!isValid}
          className={`h-[50px] w-full rounded-[30px] text-[16px] font-bold text-white transition-colors ${
            isValid
              ? 'bg-main-green1'
              : 'cursor-not-allowed bg-gray-400'
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default SignupPage;