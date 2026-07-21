import { useNavigate, useParams } from 'react-router-dom';
import Location from '../../assets/icons/location.svg';
import { mockRecentShippingAddress, mockRewardProducts, mockRewardSummary } from '../../mocks/reward';
import type { RewardProduct, RewardShippingAddress } from '../../types/reward';
import RewardPlaceholder from '../../assets/icons/reward-reward.svg';

interface PurchaseSectionProps {
  product: RewardProduct;
}

interface PartnerPurchaseSectionProps extends PurchaseSectionProps {
  shippingAddress: RewardShippingAddress | null;
  onAddAddress: () => void;
}

function PartnerPurchaseSection({ product, shippingAddress, onAddAddress }: PartnerPurchaseSectionProps) {
  void product;

  if (!shippingAddress) {
    return (
      <button type='button' onClick={onAddAddress} className='mt-3 flex min-h-17 w-full items-center rounded-[22px] bg-white px-5 py-4 text-left shadow-[0_6px_16px_rgba(0,0,0,0.04)]'>
        <img src={Location} alt='' className='h-7 w-6 shrink-0' />
        <span className='ml-3 text-sm font-bold text-text'>배송 정보 입력하기</span>
        <span aria-hidden='true' className='ml-auto text-[30px] font-light leading-none text-main-green1'>
          +
        </span>
      </button>
    );
  }

  return (
    <section className='mt-3 flex min-h-17 items-center rounded-[22px] bg-white px-5 py-4 shadow-[0_6px_16px_rgba(0,0,0,0.04)]'>
      <img src={Location} alt='' className='h-7 w-6 shrink-0' />
      <div className='ml-3 min-w-0 flex-1'>
        <h2 className='truncate text-sm font-bold text-text'>{shippingAddress.name}</h2>
        <p className='mt-0.5 truncate text-xs text-gray-500'>{shippingAddress.address}</p>
      </div>
      <button type='button' className='ml-3 shrink-0 text-xs font-semibold text-main-green1'>
        변경
      </button>
    </section>
  );
}

function GifticonPurchaseSection({ product }: PurchaseSectionProps) {
  void product;
  return (
    <section className='mt-5'>
      <h2 className='text-lg font-bold text-text'>수신자</h2>
      <input type='text' placeholder='수신자 이름을 입력해주세요' className='mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-text placeholder:text-gray-400 focus:border-main-green1 focus:outline-none' />
      <h2 className='mt-5 text-lg font-bold text-text'>핸드폰 번호</h2>
      <input type='text' placeholder='번호를 입력해주세요' className='mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-text placeholder:text-gray-400 focus:border-main-green1 focus:outline-none' />
    </section>
  );
}

export default function RewardCheckoutPage() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = Number(productId);
  const product = Number.isSafeInteger(numericProductId) ? mockRewardProducts.find(({ id }) => id === numericProductId) : undefined;

  if (!product) {
    return <div className='flex flex-1 flex-col bg-white px-5 pb-6 pt-4 font-pretendard'></div>;
  }

  const isPartner = product.type === 'PARTNER';
  const remainingPoint = mockRewardSummary.currentPoint - product.point;

  return (
    <div className='flex flex-1 flex-col bg-bg-green1 px-5 pb-6 pt-4 font-pretendard'>
      <h1 className='text-lg font-bold text-text'>제품 내역</h1>
      <div className='mt-3 flex min-h-27 items-center gap-4 rounded-[28px] bg-white px-5 py-[18px]'>
        <div className='flex h-[70px] w-[70px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100'>
          <img src={RewardPlaceholder} alt='' className='h-10 w-10 object-contain' />
        </div>

        <div className='min-w-0 flex-1'>
          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold leading-none ${isPartner ? 'bg-skyblue-bg text-skyblue-text' : 'bg-reward-bg text-reward-text'}`}>{isPartner ? '친환경 제품' : '기프티콘'}</span>

          <h2 className='mt-2 truncate text-base font-bold leading-tight text-text'>{product.name}</h2>

          <div className='mt-2 flex items-center gap-1.5'>
            <span className='text-sm font-semibold text-gray-400'>사용 포인트</span>
            <span className='text-base font-semibold text-main-green1'>{product.point.toLocaleString()}P</span>
          </div>
        </div>
      </div>

      {isPartner ? <PartnerPurchaseSection product={product} shippingAddress={mockRecentShippingAddress} onAddAddress={() => navigate('/reward/address-list')} /> : <GifticonPurchaseSection product={product} />}

      <div>
        <p className='mt-2 flex text-black font-bold'>포인트 사용 내역</p>
        <div className='mt-3  min-h-27 items-center gap-4 rounded-[28px] bg-white px-5 py-[18px]'>
          <div className='flex w-full justify-between'>
            <span className='text-sm font-semibold text-gray-400'>보유 포인트</span>
            <span className='font-bold'>{mockRewardSummary.currentPoint.toLocaleString()}P</span>
          </div>
          <div className='flex w-full justify-between'>
            <span className='text-sm font-semibold text-gray-400'>사용예정 포인트</span>
            <span className='text-red-500 font-bold'>-{product.point.toLocaleString()}P</span>
          </div>
          <div className='my-4 h-px w-full bg-gray-200' />

          <div className='flex w-full justify-between'>
            <span className='text-lg font-semibold text-black'>잔여 포인트</span>
            <span className={`text-lg font-bold ${remainingPoint < 0 ? 'text-red-500' : 'text-main-green1'}`}>{remainingPoint.toLocaleString()}P</span>
          </div>
        </div>
      </div>

      <div className='mt-auto pt-8'>
        <button type='button' onClick={() => navigate(`/reward/use-complete/${product.id}`)} className='w-full rounded-full bg-main-green1 py-3 text-white'>
          포인트 사용하기
        </button>
      </div>
    </div>
  );
}
