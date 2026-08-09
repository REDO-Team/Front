import { useEffect, useMemo, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import api from '../../apis/api';
import { setAccessToken } from '../../apis/token';
import { getTerms, type Term } from '../../apis/terms-api';

import LeftArrowIcon from '../../assets/icons/left-arrow.svg?react';
import FullCheckIcon from '../../assets/icons/full-check.svg?react';
import EmptyCheckIcon from '../../assets/icons/empty-check.svg?react';
import LightRightArrowIcon from '../../assets/icons/light-right-arrow.svg?react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const NOTION_URL_BY_CODE: Record<string, string> = {
  SERVICE: 'https://app.notion.com/p/368eb332282b80c39c48d3f7ab31558d?source=copy_link',
  PRIVACY: 'https://app.notion.com/p/391eb332282b806d90c0eff9827a7d5f?source=copy_link',
  AI_SERVICE: 'https://app.notion.com/p/AI-392eb332282b809086f0d3f3915ec6c7?source=copy_link',
  MARKETING: 'https://app.notion.com/p/39aeb332282b8012bd2cca451c75d311?source=copy_link',
};

interface SignupLocationState {
  signupType: 'LOCAL' | 'SOCIAL';
  socialProvider?: string;
  socialId?: string;
}

interface SignupResult {
  userId: number;
  accessToken: string;
}

interface SignupResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: SignupResult;
}

const TermsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const signupState = location.state as SignupLocationState | null;

  const signupType = signupState?.signupType ?? 'LOCAL';

  const [terms, setTerms] = useState<Term[]>([]);

  const [agreements, setAgreements] = useState<Record<number, boolean>>({});

  const [isLoading, setIsLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loadErrorMessage, setLoadErrorMessage] = useState('');

  const [submitErrorMessage, setSubmitErrorMessage] = useState('');

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setIsLoading(true);
        setLoadErrorMessage('');

        const termsData = await getTerms();

        // AI 서비스 약관과 마케팅 약관 순서 변경
const aiIndex = termsData.findIndex(
  (term) => term.code === 'AI_SERVICE',
);

const marketingIndex = termsData.findIndex(
  (term) => term.code === 'MARKETING',
);

if (
  aiIndex !== -1 &&
  marketingIndex !== -1
) {
  [
    termsData[aiIndex],
    termsData[marketingIndex],
  ] = [
    termsData[marketingIndex],
    termsData[aiIndex],
  ];
}

        setTerms(termsData);

        const initialAgreements = termsData.reduce<Record<number, boolean>>((acc, term) => {
          acc[term.termId] = false;
          return acc;
        }, {});

        setAgreements(initialAgreements);
      } catch (error) {
        console.error('약관 조회 실패:', error);

        setLoadErrorMessage('약관을 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchTerms();
  }, []);

  const isAllAgreed = useMemo(() => {
    return terms.length > 0 && terms.every((term) => agreements[term.termId]);
  }, [terms, agreements]);

  const isRequiredAgreed = useMemo(() => {
    const requiredTerms = terms.filter((term) => term.isRequired);

    return requiredTerms.length > 0 && requiredTerms.every((term) => agreements[term.termId]);
  }, [terms, agreements]);

  const handleToggleAll = () => {
    const nextChecked = !isAllAgreed;

    const nextAgreements = terms.reduce<Record<number, boolean>>((acc, term) => {
      acc[term.termId] = nextChecked;
      return acc;
    }, {});

    setAgreements(nextAgreements);
    setSubmitErrorMessage('');
  };

  const handleToggleAgreement = (termId: number) => {
    setAgreements((prev) => ({
      ...prev,
      [termId]: !prev[termId],
    }));

    setSubmitErrorMessage('');
  };

  const handleOpenTerms = (term: Term) => {
    const notionUrl = NOTION_URL_BY_CODE[term.code];

    if (!notionUrl) {
      return;
    }

    window.open(notionUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNext = async () => {
    if (!isRequiredAgreed || isSubmitting) {
      return;
    }

    const agreedTermsIds = terms.filter((term) => agreements[term.termId]).map((term) => term.termId);

    // 일반 회원가입
    if (signupType === 'LOCAL') {
      sessionStorage.setItem('signupAgreedTermsIds', JSON.stringify(agreedTermsIds));

      navigate('/signup');
      return;
    }

    // 소셜 회원가입
    const socialProvider = signupState?.socialProvider;

    const socialId = signupState?.socialId;

    if (!socialProvider || !socialId) {
      setSubmitErrorMessage('소셜 로그인 정보가 없습니다. 다시 로그인해 주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitErrorMessage('');

      const response = await api.post<SignupResponse>('/api/auth/signup', {
        signupType: 'SOCIAL',
        socialProvider,
        socialId,
        agreedTermsIds,
      });

      const { isSuccess, message, result } = response.data;

      if (!isSuccess) {
        setSubmitErrorMessage(message || '회원가입에 실패했습니다.');
        return;
      }

      if (!result?.accessToken) {
        setSubmitErrorMessage('로그인 토큰을 발급받지 못했습니다.');
        return;
      }

      setAccessToken(result.accessToken);

      navigate('/signup/profile', {
        replace: true,
      });
    } catch (error) {
      console.error('소셜 회원가입 실패:', error);

      setSubmitErrorMessage('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className='flex min-h-dvh items-center justify-center bg-white'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='flex min-h-dvh w-full flex-col bg-white px-5 pb-[27px] font-pretendard text-text'>
      <header className='pt-[28px]'>
        <div className='flex h-[22px] items-center'>
          <button type='button' onClick={() => navigate('/login')} aria-label='뒤로가기' className='flex h-6 w-6 items-center justify-center'>
            <LeftArrowIcon className='h-[18px] w-[9px] text-text' />
          </button>

          <h1 className='ml-[8px] text-[18px] font-semibold leading-[100%] text-[#111111]'>약관 동의</h1>
        </div>

        <p className='mt-[27px] whitespace-nowrap text-[14px] font-medium text-[#6B6B6B]'>ReDO! 서비스 이용을 위해 약관에 동의해 주세요</p>
      </header>

      {isLoading ? (
        <div className='flex flex-1 items-center justify-center'>
          <LoadingSpinner />
        </div>
      ) : loadErrorMessage ? (
        <div className='flex flex-1 items-center justify-center'>
          <span className='text-[14px] text-red-500'>{loadErrorMessage}</span>
        </div>
      ) : (
        <>
          <button type='button' onClick={handleToggleAll} aria-pressed={isAllAgreed} className='mt-[15px] flex h-[50px] w-full items-center rounded-[25px] border border-gray-200 px-[14px] text-left'>
            {isAllAgreed ? <FullCheckIcon className='h-6 w-6 shrink-0' /> : <EmptyCheckIcon className='h-6 w-6 shrink-0' />}

            <span className='ml-[10px] text-[16px] font-semibold text-[#4A4A4A]'>아래 약관에 모두 동의합니다</span>
          </button>

          <section className='mt-[20px] flex w-full flex-col gap-3 px-[14px]'>
            {terms.map((term) => (
              <div key={term.termId} className='flex h-[32px] w-full items-center'>
                <button type='button' onClick={() => handleToggleAgreement(term.termId)} aria-pressed={agreements[term.termId] ?? false} className='flex min-w-0 flex-1 items-center text-left'>
                  {agreements[term.termId] ? <FullCheckIcon className='h-6 w-6 shrink-0' /> : <EmptyCheckIcon className='h-6 w-6 shrink-0' />}

                  <span className='ml-[10px] truncate text-[16px] font-medium text-[#4A4A4A]'>
                    [{term.isRequired ? '필수' : '선택'}] {term.title}
                  </span>
                </button>

                {NOTION_URL_BY_CODE[term.code] && (
                  <button type='button' onClick={() => handleOpenTerms(term)} aria-label={`${term.title} 상세보기`} className='flex h-6 w-6 shrink-0 items-center justify-center'>
                    <LightRightArrowIcon className='h-6 w-6' />
                  </button>
                )}
              </div>
            ))}
          </section>

          {submitErrorMessage && <p className='mt-[16px] text-center text-[13px] font-medium text-red-500'>{submitErrorMessage}</p>}
        </>
      )}

      <button type='button' disabled={isLoading || isSubmitting || Boolean(loadErrorMessage) || !isRequiredAgreed} onClick={handleNext} className={`mt-auto h-[50px] w-full rounded-[30px] text-[16px] font-bold text-white ${isRequiredAgreed && !isLoading && !isSubmitting && !loadErrorMessage ? 'bg-main-green1' : 'cursor-not-allowed bg-gray-400'}`}>
        다음
      </button>
    </div>
  );
};

export default TermsPage;
