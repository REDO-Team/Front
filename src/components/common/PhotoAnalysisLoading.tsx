import GradientLogo from '/src/assets/icons/gradient-logo.svg';
import Alarm from '/src/assets/icons/alarm.svg';
import Close from '/src/assets/icons/close.svg';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import NotiCard from '../CertificationPage/NotiCard';

interface CameraLoadingProps {
  showNoti: boolean;
}

export default function PhotoAnalysisLoading({ showNoti }: CameraLoadingProps) {
  const navigate = useNavigate();

  return (
    <div className='w-full h-full z-50'>
      <TopBar rightIcon={Close} onClick={() => navigate(`${showNoti ? '/certification' : '/disposal-info'}`)} bgColor='bg-green1' />

      <div className='flex flex-col px-5 h-full'>
        <div className='flex flex-col justify-center items-center flex-1'>
          <img src={GradientLogo} alt='logo' className='w-38 h-38' />
          <div className='flex flex-col gap-2 text-center'>
            <p className='font-pretendard font-bold text-[22px] text-text'>{showNoti ? '사진을 검수 중이에요!' : '배출 가이드를 찾고 있어요'}</p>
            <p className='font-pretendard font-semibold text-base text-gray-600'>{showNoti ? '잠시만 기다려주세요..' : 'ReDO! AI가 꼼꼼히 분석하는중..'}</p>
          </div>
        </div>

        <div className='mt-auto w-full'>{showNoti && <NotiCard icon={Alarm} />}</div>
      </div>
    </div>
  );
}
