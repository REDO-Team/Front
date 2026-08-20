import GradientLogo from '/src/assets/icons/gradient-logo.svg';
import Scan from '/src/assets/icons/scan.svg';
import Seed from '/src/assets/icons/seed.svg';
import Seedling from '/src/assets/icons/seedling.svg';
import RightArrow from '/src/assets/icons/right-arrow.svg?react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCertificationRule } from '../../apis/certification';

export default function CertificationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const certificationSource = location?.state?.certificationSource || 'GENERAL';
  const guideId = location?.state?.guideId || null;
  const [remain, setRemain] = useState<number | undefined>(3);
  const [restrictType, setRestrictType] = useState<string | undefined>('NONE');

  useEffect(() => {
    const fetchCertificationRule = async () => {
      try {
        const data = await getCertificationRule();
        setRemain(data.result?.remainingCount);
        setRestrictType(data.result?.restriction.type);
      } catch (e) {
        console.error('certification rule error', e);
      }
    };

    fetchCertificationRule();
  }, []);

  const handleCertificate = () => {
    navigate('/certification/shooting', {
      state: {
        certificationSource,
        guideId,
        restrictType,
      },
    });
  };

  const handleCertificationGuide = () => {
    navigate('/certification/guide', { state: { certificationSource, guideId, restrictType } });
  };

  return (
    <div className='h-full pt-5'>
      <div className='flex flex-col items-center px-6.5 h-full'>
        <div className='relative w-47.5 h-47.5'>
          <img src={Scan} alt='스캔' className='absolute inset-0 w-full h-full' />
          <img src={GradientLogo} alt='로고' className='absolute w-23 h-23 top-1/2 left-1/2 -translate-1/2' />
        </div>

        <div className='mt-2.5'>
          <p className='font-bold text-[22px] text-center text-main-green1'>
            <span className='text-text'>작은 인증이</span>
            <br />
            지구를 지키는 큰 변화
          </p>
          <p className='text-base text-center text-gray-500 font-semibold'>오늘도 ReDO!와 함께해요</p>
        </div>

        <div className='w-full px-6.5 py-4.5 bg-white mt-auto flex flex-col gap-4 shadow-lg shadow-black/5 rounded-[20px]'>
          <div className='flex justify-between items-center w-full'>
            <div className='flex items-center gap-4'>
              <img src={Seed} alt='인증' className='w-12.5 h-12.5' />
              <span className='font-pretendard font-semibold text-base text-text'>1일 최대 인증 횟수</span>
            </div>
            <span className='font-pretendard font-bold text-[22px] text-main-green1'>
              3<span className='text-gray-600'>회</span>
            </span>
          </div>
          <div className='flex justify-between items-center w-full'>
            <div className='flex items-center gap-4'>
              <img src={Seedling} alt='인증' className='w-12.5 h-12.5' />
              <span className='font-pretendard font-semibold text-base text-text'>잔여 인증 횟수</span>
            </div>
            <span className='font-pretendard font-bold text-[22px] text-main-green1'>
              {remain}
              <span className='text-gray-600'>회</span>
            </span>
          </div>
        </div>

        <div className='flex flex-col w-full gap-2.5 mt-auto mb-5'>
          <button type='button' className='font-pretendard font-bold text-xl text-white rounded-4xl bg-main-green1 px-5 py-4 w-full flex items-center justify-center relative' onClick={handleCertificate}>
            <span>인증하기</span>
            <RightArrow className='absolute right-5' />
          </button>
          <button type='button' className='font-pretendard font-bold text-xl text-main-green1 rounded-4xl bg-white border border-main-green1 px-5 py-4 w-full flex items-center justify-center relative' onClick={handleCertificationGuide}>
            <span>인증 가이드 보기</span>
            <RightArrow className='absolute right-5' />
          </button>
        </div>
      </div>
    </div>
  );
}
