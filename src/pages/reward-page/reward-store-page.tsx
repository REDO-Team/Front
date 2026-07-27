import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import RewardProductCard from '../../components/RewardPage/RewardProductCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import FailInfo from '../../components/common/FailInfo';
import { getRewardProducts } from '../../apis/reward';
import type { RewardFilterType } from '../../types/reward';

const FILTER_TABS: { label: string; value: RewardFilterType }[] = [
  { label: '전체', value: 'ALL' },
  { label: '제휴 브랜드', value: 'PARTNER_BRAND' },
  { label: '쿠폰/기프티콘', value: 'COUPON_GIFTICON' },
];

export default function RewardStorePage() {
  const [selectedFilter, setSelectedFilter] = useState<RewardFilterType>('ALL');
  const params =
    selectedFilter === 'ALL'
      ? undefined
      : { rewardProductType: selectedFilter };
  const { data, isPending, isError } = useQuery({
    queryKey: ['rewardProducts', params],
    queryFn: () => getRewardProducts(params),
  });
  const products = data?.items ?? [];

  return (
    <div className='flex flex-1 flex-col px-5 pb-10 pt-4 font-pretendard'>
      <h1 className='sr-only'>리워드 상점</h1>

      <div role='group' aria-label='상품 유형 필터' className='flex items-center gap-2'>
        {FILTER_TABS.map((tab) => {
          const isSelected = selectedFilter === tab.value;

          return (
            <button key={tab.value} type='button' aria-pressed={isSelected} onClick={() => setSelectedFilter(tab.value)} className={`h-9 rounded-full px-4 text-[13px] font-semibold transition-colors ${isSelected ? 'border border-main-green1 bg-main-green1 text-white' : 'border border-gray-200 bg-white text-gray-600'}`}>
              {tab.label}
            </button>
          );
        })}
      </div>

      {isPending ? (
        <div className='flex flex-1 items-center justify-center'>
          <LoadingSpinner />
        </div>
      ) : isError ? (
        <FailInfo
          title='상품을 불러오지 못했어요.'
          content='잠시 후 다시 시도해 주세요.'
        />
      ) : products.length > 0 ? (
        <div className='mt-4 flex flex-col gap-3'>
          {products.map((product) => (
            <RewardProductCard
              key={product.rewardProductId}
              product={product}
            />
          ))}
        </div>
      ) : (
        <p className='mt-16 text-center text-sm font-medium text-gray-500'>해당하는 상품이 없습니다.</p>
      )}
    </div>
  );
}
