import type { RewardProduct } from '../../types/reward';

interface RewardProductCardProps {
  product: RewardProduct;
}

export default function RewardProductCard({
  product,
}: RewardProductCardProps) {
  const isPartner = product.type === 'PARTNER';

  return (
    <article className='flex min-h-[78px] items-center rounded-[18px] bg-white p-2.5 shadow-[0_6px_16px_rgba(0,0,0,0.05)]'>
      <div
        aria-hidden='true'
        className='h-14 w-14 shrink-0 rounded-xl bg-gray-100'
      />

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
        {product.point.toLocaleString()}P
      </strong>
    </article>
  );
}
