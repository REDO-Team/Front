import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import FullCheck from '../../assets/icons/full-check.svg';
import { getRewardProductDetail } from '../../apis/reward';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import FailInfo from '../../components/common/FailInfo';
import type { RewardProductType } from '../../types/reward';

interface RewardUseCompleteLocationState {
  rewardProductType?: RewardProductType;
}

export default function RewardUseCompletePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = Number(productId);
  const isValidProductId =
    Number.isSafeInteger(numericProductId) && numericProductId > 0;
  const locationProductType = (state as RewardUseCompleteLocationState | null)
    ?.rewardProductType;
  const {
    data: product,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['rewardProduct', numericProductId],
    queryFn: () => getRewardProductDetail(numericProductId),
    enabled: isValidProductId && !locationProductType,
  });
  const rewardProductType = locationProductType ?? product?.rewardProductType;

  if (!isValidProductId) {
    return <Navigate to='/reward/store' replace />;
  }

  if (!locationProductType && isPending) {
    return (
      <div className='flex flex-1 items-center justify-center bg-[#F9FBFB]'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!rewardProductType || isError) {
    return (
      <div className='flex flex-1 flex-col bg-[#F9FBFB] px-5 pb-6 font-pretendard'>
        <FailInfo
          title='완료 정보를 불러오지 못했어요.'
          content='리워드 스토어에서 사용 내역을 확인해 주세요.'
        />
        <button
          type='button'
          onClick={() => navigate('/reward/store', { replace: true })}
          className='h-[50px] w-full shrink-0 rounded-full bg-main-green1 text-base font-bold text-white'
        >
          확인
        </button>
      </div>
    );
  }

  const deliveryTarget =
    rewardProductType === 'PARTNER_BRAND' ? '배송지' : '번호';

  return (
    <div className='flex flex-1 flex-col bg-[#F9FBFB] px-5 pb-6 font-pretendard text-text'>
      <div className='flex flex-1 flex-col items-center justify-center text-center'>
        <img
          src={FullCheck}
          alt='완료'
          className='h-20 w-20 drop-shadow-[0_0_12px_rgba(6,198,95,0.4)]'
        />

        <h1 className='mt-7 text-[22px] font-bold leading-[1.3]'>
          포인트 사용이 완료되었어요!
        </h1>
        <p className='mt-2.5 text-base font-semibold leading-[1.4] text-gray-500'>
          리워드가 준비되었어요.
          <br />
          입력하신 {deliveryTarget}로 보내드릴게요.
        </p>
      </div>

      <button
        type='button'
        onClick={() => navigate('/reward/store', { replace: true })}
        className='h-[50px] w-full shrink-0 rounded-full bg-main-green1 text-base font-bold text-white'
      >
        확인
      </button>
    </div>
  );
}
