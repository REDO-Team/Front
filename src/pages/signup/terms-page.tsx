import { useState } from 'react';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg?react';
import FullCheckIcon from '../../assets/icons/full-check.svg?react';
import EmptyCheckIcon from '../../assets/icons/empty-check.svg?react';
import LightRightArrowIcon from '../../assets/icons/light-right-arrow.svg?react';

type AgreementId = 'service' | 'privacy' | 'age' | 'ai' | 'marketing';

interface AgreementItem {
  id: AgreementId;
  label: string;
  required: boolean;
  notionUrl?: string;
}

const AGREEMENT_ITEMS: AgreementItem[] = [
  {
    id: 'service',
    label: '서비스 이용약관',
    required: true,
    notionUrl:
      'https://app.notion.com/p/368eb332282b80c39c48d3f7ab31558d?source=copy_link',
  },
  {
    id: 'privacy',
    label: '개인정보 수집 및 이용',
    required: true,
    notionUrl:
      'https://app.notion.com/p/391eb332282b806d90c0eff9827a7d5f?source=copy_link',
  },
  {
    id: 'age',
    label: '만 14세 이상입니다',
    required: true,
  },
  {
    id: 'ai',
    label: 'AI 서비스 이용약관 동의',
    required: true,
    notionUrl:
      'https://app.notion.com/p/AI-392eb332282b809086f0d3f3915ec6c7?source=copy_link',
  },
  {
    id: 'marketing',
    label: '마케팅 정보 수신 동의',
    required: false,
    notionUrl:
      'https://app.notion.com/p/39aeb332282b8012bd2cca451c75d311?source=copy_link',
  },
];

const INITIAL_AGREEMENTS: Record<AgreementId, boolean> = {
  service: false,
  privacy: false,
  age: false,
  ai: false,
  marketing: false,
};

const TermsPage = () => {
  const [agreements, setAgreements] =
    useState<Record<AgreementId, boolean>>(INITIAL_AGREEMENTS);

  const isAllAgreed = AGREEMENT_ITEMS.every(
    (item) => agreements[item.id],
  );

  const isRequiredAgreed = AGREEMENT_ITEMS.filter(
    (item) => item.required,
  ).every((item) => agreements[item.id]);

  const handleToggleAll = () => {
    const nextChecked = !isAllAgreed;

    setAgreements({
      service: nextChecked,
      privacy: nextChecked,
      age: nextChecked,
      ai: nextChecked,
      marketing: nextChecked,
    });
  };

  const handleToggleAgreement = (id: AgreementId) => {
    setAgreements((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpenTerms = (notionUrl: string) => {
    window.open(notionUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='flex min-h-dvh w-full flex-col bg-white px-5 pb-[27px] font-pretendard text-text'>
      <header className='pt-[28px]'>
        <div className='flex h-[22px] items-center'>
          <button
            type='button'
            aria-label='뒤로가기'
            className='flex h-6 w-6 items-center justify-center'
          >
            <LeftArrowIcon className='h-[18px] w-[9px] text-text' />
          </button>

          <h1 className='ml-[8px] text-[18px] font-semibold leading-[100%] tracking-[0] text-[#111111]'>
            약관 동의
          </h1>
        </div>

        <p className='mt-[27px] max-w-[267px] whitespace-nowrap text-[14px] font-medium leading-[100%] tracking-[0] text-[#6B6B6B]'>
          ReDO! 서비스 이용을 위해 약관에 동의해 주세요
        </p>
      </header>

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

        <span className='ml-[10px] text-[16px] font-semibold leading-[15px] tracking-[0] text-[#4A4A4A]'>
          아래 약관에 모두 동의합니다
        </span>
      </button>

      <section className='mt-[20px] flex h-[216px] w-full flex-col justify-between px-[14px]'>
        {AGREEMENT_ITEMS.map((item) => (
          <div key={item.id} className='flex h-[32px] w-full items-center'>
            <button
              type='button'
              onClick={() => handleToggleAgreement(item.id)}
              aria-pressed={agreements[item.id]}
              aria-label={`${item.label} 동의`}
              className='flex min-w-0 flex-1 items-center text-left'
            >
              {agreements[item.id] ? (
                <FullCheckIcon className='h-6 w-6 shrink-0' />
              ) : (
                <EmptyCheckIcon className='h-6 w-6 shrink-0' />
              )}

              <span className='ml-[10px] truncate text-[16px] font-medium leading-[15px] tracking-[0] text-[#4A4A4A]'>
                [{item.required ? '필수' : '선택'}] {item.label}
              </span>
            </button>

            {item.notionUrl && (
              <button
                type='button'
                onClick={() => handleOpenTerms(item.notionUrl!)}
                aria-label={`${item.label} 상세보기`}
                className='flex h-6 w-6 shrink-0 items-center justify-center'
              >
                <LightRightArrowIcon className='h-6 w-6' />
              </button>
            )}
          </div>
        ))}
      </section>

      <button
        type='button'
        className={`mt-auto h-[50px] w-full rounded-[30px] text-[16px] font-bold text-white transition-colors ${
          isRequiredAgreed ? 'bg-main-green1' : 'bg-gray-400'
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default TermsPage;