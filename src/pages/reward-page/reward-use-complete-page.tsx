import { Navigate, useNavigate, useParams } from 'react-router-dom';
import FullCheck from '../../assets/icons/full-check.svg';
import { mockRewardProducts } from '../../mocks/reward';

export default function RewardUseCompletePage() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = Number(productId);
  const product = Number.isSafeInteger(numericProductId)
    ? mockRewardProducts.find(({ id }) => id === numericProductId)
    : undefined;

  if (!product) {
    return <Navigate to='/reward/store' replace />;
  }

  const deliveryTarget =
    product.type === 'PARTNER' ? '배송지' : '번호';

  return (
    <div className='flex flex-1 flex-col bg-bg-green1 px-5 pb-6 font-pretendard text-text'>
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
