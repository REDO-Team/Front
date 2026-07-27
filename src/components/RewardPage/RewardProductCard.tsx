import { Link } from 'react-router-dom';
import RewardPlaceholder from '../../assets/icons/reward-reward.svg';
import type { RewardProductListItem } from '../../types/reward';

interface RewardProductCardProps {
  product: RewardProductListItem;
}

export default function RewardProductCard({
  product,
}: RewardProductCardProps) {
  const isPartner = product.rewardProductType === 'PARTNER_BRAND';

  return (
    <article className='min-h-[78px] rounded-[18px] bg-white p-2.5 shadow-[0_6px_16px_rgba(0,0,0,0.05)]'>
      <Link
        to={`/reward/products/${product.rewardProductId}`}
        aria-label={`${product.name} 상품 상세 보기`}
        className='flex min-h-[58px] items-center'
      >
        <div className='flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100'>
          <img
            src={product.imageUrl || RewardPlaceholder}
            alt={`${product.name} 상품`}
            className='h-full w-full object-cover'
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = RewardPlaceholder;
              event.currentTarget.className = 'h-9 w-9 object-contain';
            }}
          />
        </div>

        <div className='ml-3 min-w-0 flex-1'>
          <span
            className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold leading-none ${
              isPartner
                ? 'bg-skyblue-bg text-skyblue-text'
                : 'bg-reward-bg text-reward-text'
            }`}
          >
            {isPartner ? '친환경 제품' : '기프티콘'}
          </span>
          <h2 className='mt-2 truncate text-[14px] font-bold leading-none text-text'>
            {product.name}
          </h2>
        </div>

        <strong className='ml-3 shrink-0 text-[15px] font-bold text-main-green1'>
          {product.pricePoint.toLocaleString('ko-KR')}P
        </strong>
      </Link>
    </article>
  );
}
