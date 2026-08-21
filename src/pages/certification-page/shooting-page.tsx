import { useLocation, useNavigate } from 'react-router-dom';
import ShootCard from '../../components/common/ShootCard';
import NotiCard from '../../components/CertificationPage/NotiCard';
import FilledAnalysis from '/src/assets/icons/filled-analysis.svg';
import Location from '/src/assets/icons/location.svg';
import Devices from '/src/assets/icons/devices.svg';
import Info from '/src/assets/icons/info.svg?react';
import { useState } from 'react';
import Modal from '../../components/common/Modal';

export default function ShootingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpenExceed, SetIsOpenExceed] = useState(false); // 인증 횟수 초과 모달
  const [isOpenWaitTime, SetIsOpenWaitTime] = useState(false); // 재인증 대기 모달
  const restrictType = location?.state?.restrictType;
  const certificationSource = location?.state?.certificationSource;
  const guideId = location?.state?.guideId;

  const handleClickShoot = () => {
    if (restrictType === 'DAILY_LIMIT_EXCEEDED') {
      SetIsOpenExceed(true);
    } else if (restrictType === 'COOLDOWN' || restrictType === 'PROCESSING_EXISTS') {
      SetIsOpenWaitTime(true);
    } else {
      navigate('/camera', { state: { from: 'certification', certificationSource, guideId } });
    }
  };

  return (
    <div className='h-full pt-5'>
      <div className='flex flex-col h-full px-6.5'>
        <ShootCard />
        <div className='mt-5 mb-4'>
          <NotiCard icon={<Info className='text-main-green1 w-9.5 h-9.5' />} />
        </div>

        <div className='flex justify-between bg-white rounded-[20px] px-10.5 py-4.5 shadow-lg shadow-black/5'>
          <div className='flex flex-col justify-between items-center h-18'>
            <div className='bg-bg-green1 w-fit rounded-full'>
              <img src={FilledAnalysis} alt='쓰레기' />
            </div>
            <p className='font-pretendard font-medium text-xs text-text text-center min-[376px]:text-sm'>
              쓰레기가 <br /> 잘 보이게
            </p>
          </div>
          <div className='flex flex-col justify-between items-center h-18'>
            <div className='bg-bg-green1 w-fit rounded-full'>
              <img src={Location} alt='장소' className='w-6' />
            </div>
            <p className='font-pretendard font-medium text-xs text-text text-center min-[376px]:text-sm'>
              배출장소가 <br /> 보이게
            </p>
          </div>
          <div className='flex flex-col items-center justify-start gap-2 h-18'>
            <div className='bg-bg-green1 w-fit rounded-full'>
              <img src={Devices} alt='화면 고정' />
            </div>
            <p className='font-pretendard font-medium text-xs text-text text-center min-[376px]:text-sm'>흔들리지 않게</p>
          </div>
        </div>

        <button type='button' className='font-pretendard font-bold text-lg text-white rounded-4xl bg-main-green1 py-3.5 w-full text-center mt-auto mb-5' onClick={handleClickShoot}>
          촬영하기
        </button>
      </div>

      {isOpenExceed && (
        <Modal
          isOpen={isOpenExceed}
          title={`인증 가능 횟수를 초과했어요. \n 하루 최대 3회까지만 인증할 수 있어요. \n 내일 다시 시도해주세요.`}
          titleFontWeight='medium'
          titleTextSize='15px'
          buttonText='확인'
          titleLineHeight='22px'
          onClose={() => SetIsOpenExceed(false)}
          onConfirm={() => {
            SetIsOpenExceed(false);
          }}
        />
      )}

      {isOpenWaitTime && (
        <Modal
          isOpen={isOpenWaitTime}
          title={`인증 대기 시간입니다. \n 이전 인증 후 5분이 지나야 재인증이 가능합니다.`}
          titleFontWeight='medium'
          titleTextSize='15px'
          buttonText='확인'
          titleLineHeight='22px'
          onClose={() => SetIsOpenWaitTime(false)}
          onConfirm={() => {
            SetIsOpenWaitTime(false);
          }}
        />
      )}
    </div>
  );
}
