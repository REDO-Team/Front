import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import RewardPlaceholder from '../../assets/icons/reward-reward.svg';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import FailInfo from '../../components/common/FailInfo';
import { getRewardProductDetail } from '../../apis/reward';

export default function RewardProductDetailPage() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = Number(productId);
  const isValidProductId =
    Number.isSafeInteger(numericProductId) &&
    numericProductId > 0;

  const { data: product, isPending, isError } = useQuery({
    queryKey: ['rewardProduct', numericProductId],
    queryFn: () => getRewardProductDetail(numericProductId),
    enabled: isValidProductId,
  });


  const isPartner = product?.rewardProductType === 'PARTNER_BRAND';
  const isUnavailable =
    !product ||
    product.stockQuantity === 0 ||
    product.status !== 'ACTIVE';

  return (
    <div className='flex flex-1 flex-col bg-[#F9FBFB] px-5 pb-6 pt-4 font-pretendard'>
      {!isValidProductId ? (
        <FailInfo
          title='제품을 찾을 수 없어요.'
          content='제품 번호를 확인한 후 다시 시도해 주세요.'
        />
      ) : isPending ? (
        <div className='flex flex-1 items-center justify-center'>
          <LoadingSpinner />
        </div>
      ) : isError || !product ? (
        <FailInfo
          title='제품을 불러오지 못했어요.'
          content='잠시 후 다시 시도해 주세요.'
        />
      ) : (
        <>
          <section aria-labelledby='product-name'>
            <div className={`flex aspect-[31/20] w-full items-center justify-center overflow-hidden rounded-xl ${isPartner ? 'bg-skyblue-bg' : 'bg-reward-bg'}`}>
              <img
                src={product.imageUrl || RewardPlaceholder}
                alt={`${product.name} 상품`}
                className='h-full w-full object-cover'
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = RewardPlaceholder;
                  event.currentTarget.className = 'h-16 w-16 object-contain';
                }}
              />
            </div>

            <span className={`mt-5 inline-flex rounded-full px-2.5 py-1.5 text-xs font-semibold leading-none ${isPartner ? 'bg-skyblue-bg text-skyblue-text' : 'bg-reward-bg text-reward-text'}`}>{isPartner ? '친환경 제품' : '기프티콘'}</span>

            <h1 id='product-name' className='mt-2 text-xl font-bold leading-tight text-text'>
              {product.name}
            </h1>

            <dl className='mt-4 flex items-center justify-end gap-2'>
              <dt className='text-sm font-medium text-gray-400'>필요 포인트</dt>
              <dd className='text-xl font-bold text-main-green1'>{product.pricePoint.toLocaleString('ko-KR')}P</dd>
            </dl>
          </section>

          <div className='my-4 h-px w-full bg-gray-200' />

          {isPartner ? (
            <section aria-labelledby='product-description-title'>
              <h2 id='product-description-title' className='text-base font-bold text-text'>
                제품 설명
              </h2>
              <p className='mt-2 text-sm leading-6 text-gray-600'>{product.description ?? '제품 설명이 준비 중입니다.'}</p>
            </section>
          ) : (
            <section aria-labelledby='usage-guide-title'>
              <h2 id='usage-guide-title' className='text-base font-bold text-text'>
                사용 안내
              </h2>
              <div className='mt-2 flex items-start gap-2 text-sm leading-6 text-gray-600'>
                <span aria-hidden='true' className='mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-main-green1' />
                <p>{product.usageGuide ?? '사용 안내가 준비 중입니다.'}</p>
              </div>

              <dl className='mt-6 flex items-center justify-between rounded-2xl bg-bg-green1 px-5 py-4 shadow-[0_5px_14px_rgba(0,0,0,0.05)]'>
                <dt className='text-xs font-medium text-gray-400'>유효기간</dt>
                <dd className='text-xs font-bold text-gray-700'>발급일로부터 {product.validityDays}일</dd>
              </dl>
            </section>
          )}

          <div className='mt-auto pt-8'>
            <button
              type='button'
              aria-label={`${product.name} 포인트 사용`}
              disabled={isUnavailable}
              onClick={() =>
                navigate(`/reward/checkout/${product.rewardProductId}`)
              }
              className={`h-12 w-full rounded-full text-base font-bold text-white ${
                isUnavailable
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-main-green1'
              }`}
            >
              {product.stockQuantity === 0 || product.status === 'SOLD_OUT'
                ? '품절'
                : product.status !== 'ACTIVE'
                  ? '구매 불가'
                  : '포인트 사용'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
