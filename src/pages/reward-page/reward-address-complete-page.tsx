import { Navigate, useNavigate, useParams } from 'react-router-dom';
import FullCheck from '../../assets/icons/full-check.svg';
import { mockRewardProducts } from '../../mocks/reward';

export default function RewardAddressCompletePage() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = Number(productId);
  const product = Number.isSafeInteger(numericProductId)
    ? mockRewardProducts.find(({ id }) => id === numericProductId)
    : undefined;

  if (!product || product.type !== 'PARTNER') {
    return <Navigate to='/reward/store' replace />;
  }

  return (
    <div className='flex flex-1 flex-col bg-bg-green1 px-5 pb-6 font-pretendard text-text'>
      <div className='flex flex-1 flex-col items-center justify-center text-center'>
        <img
          src={FullCheck}
          alt='완료'
          className='h-20 w-20 drop-shadow-[0_0_12px_rgba(6,198,95,0.4)]'
        />

        <h1 className='mt-7 text-[22px] font-bold leading-[1.3]'>
          배송지가 등록되었어요!
        </h1>
        <p className='mt-2.5 text-base font-semibold leading-[1.4] text-gray-500'>
          등록한 주소로 리워드를
          <br />
          안전하게 보내드릴게요.
        </p>
      </div>

      <button
        type='button'
        onClick={() => navigate(`/reward/checkout/${product.id}`, { replace: true })}
        className='h-[50px] w-full shrink-0 rounded-full bg-main-green1 text-base font-bold text-white'
      >
        확인
      </button>
    </div>
  );
}
