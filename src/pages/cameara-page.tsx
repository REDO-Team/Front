import { useLocation, useNavigate } from 'react-router-dom';
import Home from '/src/assets/icons/white-home.svg';
import Scan from '/src/assets/icons/scan.svg?react';
import TopBar from '../components/common/TopBar';
import Webcam from 'react-webcam';
import { useRef, useState } from 'react';
import PhotoAnalysisLoading from '../components/common/PhotoAnalysisLoading';
// import { useCertificationStore } from '../store/certificationStore';

export default function CamearaPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const webcamRef = useRef<Webcam | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState(false);
  // const setCertified = useCertificationStore((state) => state.setCertified);

  const handleCapture = () => {
    const img = webcamRef.current?.getScreenshot();
    setImgSrc(img);

    console.log(imgSrc);

    setLoading(true);
    setTimeout(() => {
      if (location?.state === 'certification') {
        navigate('/certification/success');
      } else {
        navigate('/disposal-info/detail');
      }
    }, 5000);
    // setCertified();
  };

  return (
    <>
      {!loading && (
        <div className='h-dvh'>
          <div className='relative flex flex-col h-full'>
            <TopBar title={`${location?.state === 'certification' ? '인증하기' : '이미지 검색'}`} leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='black/50' color='white' position='absolute' />

            <Webcam audio={false} ref={webcamRef} screenshotFormat='image/jpeg' videoConstraints={{ facingMode: 'environment' }} className='w-full object-cover h-full' />
            <div className='absolute inset-0 flex flex-col items-center justify-center px-20 z-10'>
              <Scan className='w-full h-auto' />
              <p className='font-pretendard font-semibold text-base text-white text-center'>쓰레기를 화면 안에 맞춰주세요</p>
            </div>

            <div className='absolute bottom-10 left-0 w-full h-18 z-50'>
              <div className='absolute left-1/2 -translate-x-1/2'>
                <div className='w-18 h-18 flex justify-center items-center border-4 border-white rounded-full'>
                  <button className='w-14 h-14 rounded-full bg-white active:w-12 active:h-12 transition-all' onClick={handleCapture} />
                </div>
              </div>
            </div>
          </div>

          {/* 카메라 기능 테스트를 위한 코드 */}
          {/* {imgSrc && <img src={imgSrc} alt='' />} */}

          {/* 로딩 화면 테스트 */}
        </div>
      )}

      {loading && (
        <div className='h-[calc(100dvh-56px)] pt-14'>
          <PhotoAnalysisLoading showNoti={location?.state === 'certification'} />
        </div>
      )}
    </>
  );
}
