import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '../../assets/icons/home.svg';
import RewardProductCard from '../../components/RewardPage/RewardProductCard';
import TopBar from '../../components/common/TopBar';
import { mockRewardProducts } from '../../mocks/reward';
import type { RewardFilterType } from '../../types/reward';

const FILTER_TABS: { label: string; value: RewardFilterType }[] = [
  { label: '전체', value: 'ALL' },
  { label: '제휴 브랜드', value: 'PARTNER' },
  { label: '쿠폰/기프티콘', value: 'GIFTICON' },
];

export default function RewardStorePage() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] =
    useState<RewardFilterType>('ALL');

  const filteredProducts =
    selectedFilter === 'ALL'
      ? mockRewardProducts
      : mockRewardProducts.filter(
          (product) => product.type === selectedFilter,
        );

  return (
    <div className='flex flex-1 flex-col px-5 pb-10 pt-4 font-pretendard'>
      <TopBar
        title='리워드 상점'
        leftIcon
        rightIcon={Home}
        onClick={() => navigate('/')}
        bgColor='bg-green1'
      />
      <h1 className='sr-only'>리워드 상점</h1>

      <div
        role='group'
        aria-label='상품 유형 필터'
        className='flex items-center gap-2'
      >
        {FILTER_TABS.map((tab) => {
          const isSelected = selectedFilter === tab.value;

          return (
            <button
              key={tab.value}
              type='button'
              aria-pressed={isSelected}
              onClick={() => setSelectedFilter(tab.value)}
              className={`h-9 rounded-full px-4 text-[13px] font-semibold transition-colors ${
                isSelected
                  ? 'border border-main-green1 bg-main-green1 text-white'
                  : 'border border-gray-200 bg-white text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {filteredProducts.length > 0 ? (
        <div className='mt-4 flex flex-col gap-3'>
          {filteredProducts.map((product) => (
            <RewardProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className='mt-16 text-center text-sm font-medium text-gray-500'>
          해당하는 상품이 없습니다.
        </p>
      )}
    </div>
  );
}
