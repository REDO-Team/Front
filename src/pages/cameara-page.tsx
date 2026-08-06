import { useLocation, useNavigate } from 'react-router-dom';
import Home from '/src/assets/icons/white-home.svg';
import Scan from '/src/assets/icons/scan.svg?react';
import TopBar from '../components/common/TopBar';
import Webcam from 'react-webcam';
import { useRef, useState } from 'react';
import PhotoAnalysisLoading from '../components/common/PhotoAnalysisLoading';
import { postGuideImageSearch } from '../apis/disposal-guide';
import { postCertification, postCertificationRetry } from '../apis/certification';
// import { useCertificationStore } from '../store/certificationStore';

const base64ToFile = async (base64String: string, filename = 'capture.jpg'): Promise<File> => {
  const response = await fetch(base64String);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};

export default function CamearaPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from;
  const certificationSource = location?.state?.certificationSource;
  const guideId = location?.state?.guideId;
  const certificationId = location?.state?.certificationId || null;

  console.log('CameraPage state', location.state);

  const webcamRef = useRef<Webcam | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCapture = async () => {
    const img = webcamRef.current?.getScreenshot();

    if (!img) return;

    setLoading(true);
    try {
      const file = await base64ToFile(img);

      console.log({
        from,
        certificationId,
      });

      // 신규 인증
      if (from === 'certification') {
        console.log('신규 인증');
        const data = await postCertification({ image: file, certificationSource, recycleGuideId: guideId });

        // 신규 인증 성공
        if (data.result?.status === 'PASSED') {
          navigate('/certification/success', {
            state: {
              itemName: data.result.itemName,
              date: data.result.judgedAt,
              point: data.result.earnedPoint,
            },
          });
        }
        // 신규 인증 실패
        else if (data.result?.status === 'FAILED') {
          // AI 판정 실패
          if (data.result.failureType === 'VLM_JUDGEMENT_FAILED') {
            navigate('/certification/fail', {
              state: {
                failureType: data.result.failureType,
                failedReason: data.result.failedReason,
                retryGuide: data.result.retryGuide,
                retryAllowed: data.result.retryAllowed,
                certificationId: data.result.certificationId,
                certificationSource,
                guideId,
              },
            });
          }
          // 동일 품목 인증 시도
          else if (data.result.failureType === 'DUPLICATE_GUIDE_TODAY') {
            navigate('/certification/fail', {
              state: {
                failureType: data.result.failureType,
                failedReason: data.result.failedReason,
                retryGuide: data.result.retryGuide,
                retryAllowed: data.result.retryAllowed,
                certificationId: data.result.certificationId,
                certificationSource,
                guideId,
              },
            });
          }
        }
      }
      // 배출 정보 검색
      else if (from === 'info') {
        const data = await postGuideImageSearch(file);

        // 검색 성공
        if (data.result?.identified) {
          navigate('/disposal-info/detail', {
            state: {
              guide: data.result?.guideDetail,
            },
          });
        }
        // 검색 실패
        else {
          navigate('/disposal-info/fail');
        }
      }
      // 재인증
      else if (certificationId) {
        const data = await postCertificationRetry(certificationId, file);
        // 재인증 성공
        if (data.result?.status === 'PASSED') {
          navigate('/certification/success', {
            state: {
              itemName: data.result.itemName,
              date: data.result.judgedAt,
              point: data.result.earnedPoint,
            },
          });
        }
        // 재인증 실패
        else if (data.result?.status === 'FAILED') {
          // AI 판정 실패
          if (data.result.failureType === 'VLM_JUDGEMENT_FAILED') {
            navigate('/certification/fail', {
              state: {
                failureType: data.result.failureType,
                failedReason: data.result.failedReason,
                retryGuide: data.result.retryGuide,
                retryAllowed: data.result.retryAllowed,
                certificationId: data.result.certificationId,
              },
            });
          }
          // 동일 품목 재인증 시도
          else if (data.result.failureType === 'DUPLICATE_GUIDE_TODAY') {
            navigate('/certification/fail', {
              state: {
                failureType: data.result.failureType,
                failedReason: data.result.failedReason,
                retryGuide: data.result.retryGuide,
                retryAllowed: data.result.retryAllowed,
                certificationId: data.result.certificationId,
              },
            });
          }
        }
      }
    } catch (e) {
      alert('접속이 원활하지 않습니다. 잠시 후 다시 시도해 주세요.');
      console.error('camera error', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!loading && (
        <div className='h-dvh'>
          <div className='relative flex flex-col h-full'>
            <TopBar title={`${from === 'certification' ? '인증하기' : '이미지 검색'}`} leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='black/50' color='white' position='absolute' />

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
        </div>
      )}

      {loading && (
        <div className='h-[calc(100dvh-56px)] pt-14'>
          <PhotoAnalysisLoading showNoti={from === 'certification'} />
        </div>
      )}
    </>
  );
}
