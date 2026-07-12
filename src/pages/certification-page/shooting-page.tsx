import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/common/TopBar';
import Home from '/src/assets/icons/home.svg';
import ShootCard from '../../components/common/ShootCard';
import NotiCard from '../../components/CertificationPage/NotiCard';
import FilledAnalysis from '/src/assets/icons/filled-analysis.svg';
import Location from '/src/assets/icons/location.svg';
import Devices from '/src/assets/icons/devices.svg';
import Info from '/src/assets/icons/info.svg?react';

export default function ShootingPage() {
  const navigate = useNavigate();

  return (
    <div className='h-full'>
      <div className='mb-5'>
        <TopBar title='촬영하기' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-green1' />
      </div>

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

        <button type='button' className='font-pretendard font-bold text-lg text-white rounded-4xl bg-main-green1 py-3.5 w-full text-center mt-auto' onClick={() => navigate('/camera', { state: 'certification' })}>
          촬영하기
        </button>
      </div>
    </div>
  );
}
