import NotiCard from '../CertificationPage/NotiCard';
import GradientLogo from '/src/assets/icons/gradient-logo.svg';

export default function PhotoAnalysisLoading() {
  const currentPath = window.location.pathname;
  const showNoti = currentPath.includes('/certification');

  return (
    <div className='flex flex-col h-full px-5 z-50 bg-bg-green1'>
      <div className='flex flex-1 flex-col justify-center items-center gap-9.5'>
        <img src={GradientLogo} alt='logo' className='w-38 h-38' />
        <div className='flex flex-col gap-2 text-center'>
          <p className='font-pretendard font-bold text-[22px] text-text'>{showNoti ? '사진을 검수 중이에요!' : '배출 가이드를 찾고 있어요'}</p>
          <p className='font-pretendard font-semibold text-base text-gray-600'>{showNoti ? '잠시만 기다려주세요..' : 'ReDO! AI가 꼼꼼히 분석하는중..'}</p>
        </div>
      </div>

      <div className='mt-auto w-full'>{showNoti && <NotiCard />}</div>
    </div>
  );
}
