import { useLocation, useNavigate } from 'react-router-dom';
import FailInfo from '../../components/common/FailInfo';
import FailCheckList from '../../components/CertificationPage/FailCheckList';

export default function FailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const failedReason = location?.state?.failedReason;
  const retryGuide = location?.state?.retryGuide;
  const retryAllowed = location?.state?.retryAllowed;
  // const certificationId = location?.state?.certificationId;
  // .split('.')
  // .map((text) => text.trim())
  // .filter(Boolean);

  return (
    <div className='h-full pt-5'>
      <div className='flex flex-col h-full px-5'>
        <FailInfo title={!retryAllowed ? '오늘 이미 인증한 품목이에요!' : '물품을 인식하지 못했어요!'} content={!retryAllowed ? '다른 품목으로 다시 시도해주세요' : '다시 시도해주세요'} />

        <div className='flex flex-col gap-6 mt-auto'>
          <div className='flex flex-col gap-5 px-5 py-6 bg-error-bg rounded-[20px]'>
            <span className='font-pretendard font-bold text-lg text-error-text'>실패 사유</span>
            <div>
              {!retryAllowed ? (
                <p className='font-pretendard font-semibold text-base text-gray-800 break-keep'>
                  동일한 품목은 하루 1회만 인증할 수 있어요. <br /> 아래 사항을 확인한 후 다시 촬영해주세요.
                </p>
              ) : (
                <p className='font-pretendard font-semibold text-base text-gray-800 break-keep'>{failedReason}</p>
              )}
            </div>
            <div className='flex flex-col gap-3'>
              {!retryAllowed ? (
                <>
                  <FailCheckList content='다른 품목으로 촬영' />
                  <FailCheckList content='오늘 인증하지 않은 품목인지 확인' />
                </>
              ) : (
                <>
                  {retryGuide.map((rg: string, idx: number) => {
                    return <FailCheckList content={rg} key={idx} />;
                  })}
                </>
              )}
            </div>
          </div>

          <button type='button' className='font-pretendard font-bold text-lg text-white rounded-4xl bg-main-green1 py-3.5 w-full text-center' onClick={() => navigate('/camera')}>
            다시 촬영하기
          </button>
        </div>
      </div>
    </div>
  );
}
