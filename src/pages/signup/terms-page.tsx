import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg?react';
import FullCheckIcon from '../../assets/icons/full-check.svg?react';
import EmptyCheckIcon from '../../assets/icons/empty-check.svg?react';
import LightRightArrowIcon from '../../assets/icons/light-right-arrow.svg?react';
import { getTerms, type Term } from '../../apis/terms-api';

const NOTION_URL_BY_CODE: Record<string, string> = {
  SERVICE:
    'https://app.notion.com/p/368eb332282b80c39c48d3f7ab31558d?source=copy_link',
  PRIVACY:
    'https://app.notion.com/p/391eb332282b806d90c0eff9827a7d5f?source=copy_link',
  AI:
    'https://app.notion.com/p/AI-392eb332282b809086f0d3f3915ec6c7?source=copy_link',
  MARKETING:
    'https://app.notion.com/p/39aeb332282b8012bd2cca451c75d311?source=copy_link',
};

const TermsPage = () => {
  const navigate = useNavigate();

  const [terms, setTerms] = useState<Term[]>([]);
  const [agreements, setAgreements] = useState<Record<number, boolean>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const termsData = await getTerms();

        console.log('백엔드 약관 목록:', termsData);

        setTerms(termsData);

        const initialAgreements = termsData.reduce<
          Record<number, boolean>
        >((acc, term) => {
          acc[term.termId] = false;
          return acc;
        }, {});

        setAgreements(initialAgreements);
      } catch (error) {
        console.error('약관 조회 실패:', error);
        setErrorMessage('약관을 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchTerms();
  }, []);

  const isAllAgreed = useMemo(() => {
    return (
      terms.length > 0 &&
      terms.every((term) => agreements[term.termId])
    );
  }, [terms, agreements]);

  const isRequiredAgreed = useMemo(() => {
    const requiredTerms = terms.filter(
      (term) => term.isRequired,
    );

    return (
      requiredTerms.length > 0 &&
      requiredTerms.every(
        (term) => agreements[term.termId],
      )
    );
  }, [terms, agreements]);

  const handleToggleAll = () => {
    const nextChecked = !isAllAgreed;

    const nextAgreements = terms.reduce<
      Record<number, boolean>
    >((acc, term) => {
      acc[term.termId] = nextChecked;
      return acc;
    }, {});

    setAgreements(nextAgreements);
  };

  const handleToggleAgreement = (termId: number) => {
    setAgreements((prev) => ({
      ...prev,
      [termId]: !prev[termId],
    }));
  };

  const handleOpenTerms = (term: Term) => {
    const notionUrl = NOTION_URL_BY_CODE[term.code];

    if (notionUrl) {
      window.open(
        notionUrl,
        '_blank',
        'noopener,noreferrer',
      );
    }
  };

  const handleNext = () => {
    const agreedTermsIds = terms
      .filter((term) => agreements[term.termId])
      .map((term) => term.termId);

    sessionStorage.setItem(
      'signupAgreedTermsIds',
      JSON.stringify(agreedTermsIds),
    );

    navigate('/signup');
  };

  return (
    <div className='flex min-h-dvh w-full flex-col bg-white px-5 pb-[27px] font-pretendard text-text'>
      <header className='pt-[28px]'>
        <div className='flex h-[22px] items-center'>
          <button
            type='button'
            onClick={() => navigate('/login')}
            aria-label='뒤로가기'
            className='flex h-6 w-6 items-center justify-center'
          >
            <LeftArrowIcon className='h-[18px] w-[9px] text-text' />
          </button>

          <h1 className='ml-[8px] text-[18px] font-semibold leading-[100%] text-[#111111]'>
            약관 동의
          </h1>
        </div>

        <p className='mt-[27px] whitespace-nowrap text-[14px] font-medium text-[#6B6B6B]'>
          ReDO! 서비스 이용을 위해 약관에 동의해 주세요
        </p>
      </header>

      {isLoading ? (
        <div className='flex flex-1 items-center justify-center'>
          <span className='text-[14px] text-[#6B6B6B]'>
            약관을 불러오는 중입니다.
          </span>
        </div>
      ) : errorMessage ? (
        <div className='flex flex-1 items-center justify-center'>
          <span className='text-[14px] text-red-500'>
            {errorMessage}
          </span>
        </div>
      ) : (
        <>
          <button
            type='button'
            onClick={handleToggleAll}
            aria-pressed={isAllAgreed}
            className='mt-[15px] flex h-[50px] w-full items-center rounded-[25px] border border-gray-200 px-[14px] text-left'
          >
            {isAllAgreed ? (
              <FullCheckIcon className='h-6 w-6 shrink-0' />
            ) : (
              <EmptyCheckIcon className='h-6 w-6 shrink-0' />
            )}

            <span className='ml-[10px] text-[16px] font-semibold text-[#4A4A4A]'>
              아래 약관에 모두 동의합니다
            </span>
          </button>

          <section className='mt-[20px] flex w-full flex-col gap-3 px-[14px]'>
            {terms.map((term) => (
              <div
                key={term.termId}
                className='flex h-[32px] w-full items-center'
              >
                <button
                  type='button'
                  onClick={() =>
                    handleToggleAgreement(term.termId)
                  }
                  aria-pressed={
                    agreements[term.termId] ?? false
                  }
                  className='flex min-w-0 flex-1 items-center text-left'
                >
                  {agreements[term.termId] ? (
                    <FullCheckIcon className='h-6 w-6 shrink-0' />
                  ) : (
                    <EmptyCheckIcon className='h-6 w-6 shrink-0' />
                  )}

                  <span className='ml-[10px] truncate text-[16px] font-medium text-[#4A4A4A]'>
                    [{term.isRequired ? '필수' : '선택'}]{' '}
                    {term.title}
                  </span>
                </button>

                {NOTION_URL_BY_CODE[term.code] && (
                  <button
                    type='button'
                    onClick={() => handleOpenTerms(term)}
                    aria-label={`${term.title} 상세보기`}
                    className='flex h-6 w-6 shrink-0 items-center justify-center'
                  >
                    <LightRightArrowIcon className='h-6 w-6' />
                  </button>
                )}
              </div>
            ))}
          </section>
        </>
      )}

      <button
        type='button'
        disabled={
          isLoading ||
          Boolean(errorMessage) ||
          !isRequiredAgreed
        }
        onClick={handleNext}
        className={`mt-auto h-[50px] w-full rounded-[30px] text-[16px] font-bold text-white ${
          isRequiredAgreed &&
          !isLoading &&
          !errorMessage
            ? 'bg-main-green1'
            : 'bg-gray-400'
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default TermsPage;