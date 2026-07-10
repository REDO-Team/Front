import Info from '/src/assets/icons/info.svg?react';
import Check from '/src/assets/icons/check.svg?react';
import FullCheck from '/src/assets/icons/full-check.svg';
import Error from '/src/assets/icons/error.svg';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/common/TopBar';
import Home from '/src/assets/icons/home.svg';

export default function CertificationGuidePage() {
  const navigate = useNavigate();

  return (
    <div className='h-full'>
      <div className='mb-5'>
        <TopBar title='인증 가이드' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-green1' />
      </div>

      <div className='px-5 h-full flex flex-col'>
        <div className='flex flex-col p-5 gap-3.5 bg-linear-to-r from-main-green1 to-main-sky rounded-[20px] shadow-md shadow-main-green1/15'>
          <div className='flex items-center gap-1.5'>
            <Info className='text-white w-4.5 h-4.5' />
            <span className='font-pretendard font-bold text-base text-white'>리워드 지급 기준</span>
          </div>

          <div className='flex flex-col gap-3 shadow-lg shadow-black/5'>
            <div className='flex gap-2'>
              <div className='flex flex-col px-3.5 py-3 rounded-[20px] bg-white/30 flex-1'>
                <span className='font-pretendard font-bold text-sm text-white opacity-100'>일반 인증</span>
                <span className='font-pretendard font-bold text-2xl text-white'>50 P</span>
              </div>
              <div className='flex flex-col px-3.5 py-3 rounded-[20px] bg-white/30 flex-1'>
                <span className='font-pretendard font-bold text-sm text-white opacity-100'>검색 후 인증</span>
                <span className='font-pretendard font-bold text-2xl text-white'>100 P</span>
              </div>
            </div>

            <div className='flex gap-1.5 items-center rounded-[20px] px-3 py-2.5 bg-white/30'>
              <Check className='text-white w-4 h-4' />
              <p className='font-pretendard font-bold text-sm text-white break-keep'>하루 최대 3회까지 인증 및 리워드 적립 가능</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-3 bg-white px-6.5 py-5 rounded-[20px] mt-5 shadow-lg shadow-black/5'>
          <span className='font-pretendard font-semibold text-base text-text'>인증 방법</span>
          <div className='flex flex-col gap-2.5'>
            <div className='flex items-center gap-3'>
              <img src={FullCheck} alt='체크' className='w-4.5 h-4.5' />
              <p className='font-pretendard font-medium text-base text-gray-800'>하나의 물품만 촬영해주세요</p>
            </div>
            <div className='flex items-center gap-3'>
              <img src={FullCheck} alt='체크' className='w-4.5 h-4.5' />
              <p className='font-pretendard font-medium text-base text-gray-800'>선명한 사진으로 촬영해주세요</p>
            </div>
            <div className='flex items-center gap-3'>
              <img src={FullCheck} alt='체크' className='w-4.5 h-4.5' />
              <p className='font-pretendard font-medium text-base text-gray-800'>분리배출 완료 후 촬영해주세요</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-3 bg-white px-6.5 py-5 rounded-[20px] mt-3 shadow-lg shadow-black/5'>
          <span className='font-pretendard font-semibold text-base text-text'>촬영 예시 이미지</span>
          <div className='flex justify-center gap-2'>
            <div className='relative flex-1 flex flex-col items-center gap-2.5'>
              <div className='min-w-37 min-h-22 rounded-[20px] bg-bg-green3 w-full'></div>
              <img src={FullCheck} alt='옳음' className='absolute top-4 left-4.5 w-4.5 h-4.5' />
              <span className='font-pretendard font-bold text-sm text-main-green1'>좋은 예시</span>
            </div>
            <div className='relative flex-1 flex flex-col items-center gap-2.5'>
              <div className='min-w-37 min-h-22 rounded-[20px] bg-error-bg w-full'></div>
              <img src={Error} alt='틀림' className='absolute top-4 left-4.5' />
              <span className='font-pretendard font-bold text-sm text-error-text'>나쁜 예시</span>
            </div>
          </div>
        </div>

        <button type='button' className='font-pretendard font-bold text-lg text-white rounded-4xl bg-main-green1 py-3.5 w-full text-center mt-auto' onClick={() => navigate('/certification/shooting')}>
          인증하기
        </button>
      </div>
    </div>
  );
}
