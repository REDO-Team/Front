import { useNavigate, useParams } from 'react-router-dom';
import Home from '../../assets/icons/home.svg';
import RewardPlaceholder from '../../assets/icons/reward-reward.svg';
import TopBar from '../../components/common/TopBar';
import { mockRewardProducts } from '../../mocks/reward';

export default function RewardProductDetailPage() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = Number(productId);
  const product = Number.isSafeInteger(numericProductId)
    ? mockRewardProducts.find(({ id }) => id === numericProductId)
    : undefined;
  const isPartner = product?.type === 'PARTNER';

  return (
    <div className='flex flex-1 flex-col bg-white px-5 pb-6 pt-4 font-pretendard'>
      <TopBar
        title='제품 정보'
        leftIcon
        rightIcon={Home}
        onClick={() => navigate('/')}
        bgColor='white'
      />

      {product ? (
        <>
          <section aria-labelledby='product-name'>
            <div
              role='img'
              aria-label={`${product.name} 상품 이미지 준비 중`}
              className={`flex aspect-[31/20] w-full items-center justify-center overflow-hidden rounded-xl ${
                isPartner ? 'bg-skyblue-bg' : 'bg-reward-bg'
              }`}
            >
              <div className='flex flex-col items-center gap-3 text-center'>
                <img
                  src={RewardPlaceholder}
                  alt=''
                  className='h-16 w-16'
                />
                <span className='text-sm font-semibold text-gray-500'>
                  {product.name}
                </span>
              </div>
            </div>

            <span
              className={`mt-5 inline-flex rounded-full px-2.5 py-1.5 text-xs font-semibold leading-none ${
                isPartner
                  ? 'bg-skyblue-bg text-skyblue-text'
                  : 'bg-reward-bg text-reward-text'
              }`}
            >
              {isPartner ? '친환경 제품' : '기프티콘'}
            </span>

            <h1
              id='product-name'
              className='mt-2 text-xl font-bold leading-tight text-text'
            >
              {product.name}
            </h1>

            <dl className='mt-4 flex items-center justify-end gap-2'>
              <dt className='text-sm font-medium text-gray-400'>
                필요 포인트
              </dt>
              <dd className='text-xl font-bold text-main-green1'>
                {product.point.toLocaleString()}P
              </dd>
            </dl>
          </section>

          <div className='my-4 h-px w-full bg-gray-200' />

          {isPartner ? (
            <section aria-labelledby='product-description-title'>
              <h2
                id='product-description-title'
                className='text-base font-bold text-text'
              >
                제품 설명
              </h2>
              <p className='mt-2 text-sm leading-6 text-gray-600'>
                {product.description ?? '제품 설명이 준비 중입니다.'}
              </p>
            </section>
          ) : (
            <section aria-labelledby='usage-guide-title'>
              <h2
                id='usage-guide-title'
                className='text-base font-bold text-text'
              >
                사용 안내
              </h2>
              <div className='mt-2 flex items-start gap-2 text-sm leading-6 text-gray-600'>
                <span
                  aria-hidden='true'
                  className='mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-main-green1'
                />
                <p>{product.usageGuide ?? '사용 안내가 준비 중입니다.'}</p>
              </div>

              <dl className='mt-6 flex items-center justify-between rounded-2xl bg-bg-green1 px-5 py-4 shadow-[0_5px_14px_rgba(0,0,0,0.05)]'>
                <dt className='text-xs font-medium text-gray-400'>유효기간</dt>
                <dd className='text-xs font-bold text-gray-700'>
                  {product.validityPeriod ?? '준비 중'}
                </dd>
              </dl>
            </section>
          )}

          <div className='mt-auto pt-8'>
            <button
              type='button'
              aria-label={`${product.name} 포인트 사용`}
              className='h-12 w-full rounded-full bg-main-green1 text-base font-bold text-white'
            >
              포인트 사용
            </button>
          </div>
        </>
      ) : (
        <section className='rounded-[22px] bg-white px-5 py-12 text-center shadow-[0_8px_20px_rgba(0,0,0,0.06)]'>
          <h1 className='text-lg font-bold text-text'>
            제품을 찾을 수 없어요.
          </h1>
          <p className='mt-2 text-sm text-gray-500'>
            제품 번호를 확인한 후 다시 시도해 주세요.
          </p>
        </section>
      )}
    </div>
  );
}
