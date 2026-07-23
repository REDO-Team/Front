import ShippingIcon from '../../assets/icons/shipping.svg?react';
import DeliveryCompleteIcon from '../../assets/icons/delivery-complete.svg?react';
import ExchangeCompleteIcon from '../../assets/icons/exchange-complete.svg?react';
import Logo from '../../assets/icons/Big-logo.svg?react';

import { MOCK_REWARD_USE_HISTORY } from '../../mocks/reward-use-history';

const REWARD_IMAGE_STYLE = {
  plant: 'bg-[linear-gradient(135deg,#edf7ef_0%,#d8c4a2_52%,#7c8f57_100%)] before:absolute before:left-3 before:top-3 before:h-7 before:w-7 before:rounded-full before:bg-[#8fa96b] after:absolute after:bottom-2 after:right-2 after:h-5 after:w-8 after:rounded-sm after:bg-[#c8934d]',
  'gift-card': 'bg-[linear-gradient(135deg,#d8d1c8_0%,#ffffff_46%,#c6b5a0_100%)] before:absolute before:left-2 before:top-4 before:h-5 before:w-12 before:rounded-sm before:bg-white/85 after:absolute after:left-5 after:top-6 after:h-1 after:w-7 after:rounded-full after:bg-[#d7a44e]',
} as const;

const RewardUseHistoryPage = () => {
  const renderStatusIcon = (status: 'SHIPPING' | 'DELIVERED' | 'COMPLETED') => {
    switch (status) {
      case 'SHIPPING':
        return <ShippingIcon aria-label='배송중' className='h-[22px] w-auto shrink-0' />;

      case 'DELIVERED':
        return <DeliveryCompleteIcon aria-label='배송완료' className='h-[22px] w-auto shrink-0' />;

      case 'COMPLETED':
        return <ExchangeCompleteIcon aria-label='교환완료' className='h-[22px] w-auto shrink-0' />;

      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-[#F9FBFB]'>
      <main className='px-5 pb-[40px] pt-[72px]'>
        {MOCK_REWARD_USE_HISTORY.length > 0 ? (
          <ul className='flex flex-col gap-[10px]'>
            {MOCK_REWARD_USE_HISTORY.map((item) => (
              <li key={item.id} className='flex h-[104px] w-full items-center rounded-[20px] bg-white px-[16px] py-[17px] shadow-[0_4px_12px_rgba(0,0,0,0.07)]'>
                {/* 상품 이미지 */}
                <div role='img' aria-label={item.productName} className={`relative h-[70px] w-[70px] shrink-0 overflow-hidden rounded-[10px] ${REWARD_IMAGE_STYLE[item.imageVariant]}`} />

                {/* 상품 정보 */}
                <div className='ml-[14px] min-w-0 flex-1'>
                  <p className='text-[12px] font-semibold leading-[130%] tracking-[-0.01em] text-[#909090]'>{item.exchangedAt} 교환</p>

                  <h2 className='mt-[2px] truncate text-[16px] font-bold leading-[15px] tracking-[0] text-[#111111]'>{item.productName}</h2>

                  <p className='mt-[3px] truncate text-[14px] font-semibold leading-[22px] tracking-[0] text-[#909090]'>
                    사용 포인트 <span className='text-main-green1'>{item.usedPoint.toLocaleString()}P</span>
                  </p>
                </div>

                {/* 배송 상태 SVG */}
                <div className='ml-[8px] self-start pt-[1px]'>{renderStatusIcon(item.status)}</div>
              </li>
            ))}
          </ul>
        ) : (
            <div className='flex min-h-[calc(100vh-72px)] flex-col items-center justify-center pb-[80px]'>
                <Logo className='h-[146px] w-[161px]' />
                <p className='mt-[38px] text-center text-[22px] font-bold leading-[130%] tracking-[0] text-[#6B6B6B]'>
                    사용한 리워드 내역이 없어요
                </p>
            </div>
        )}
      </main>
    </div>
  );
};

export default RewardUseHistoryPage;
