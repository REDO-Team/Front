import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/common/LoadingSpinner';

import ShippingIcon from '../../assets/icons/shipping.svg?react';
import DeliveryCompleteIcon from '../../assets/icons/delivery-complete.svg?react';
import ExchangeCompleteIcon from '../../assets/icons/exchange-complete.svg?react';
import Logo from '../../assets/icons/Big-logo.svg?react';

import type {
  FulfillmentStatus,
  FulfillmentType,
} from '../../types/reward';

import { getRewardRedemptions } from '../../apis/reward';

const formatRedeemedAt = (
  redeemedAt: string,
) => {
  const date = new Date(redeemedAt);

  const month = String(
    date.getMonth() + 1,
  ).padStart(2, '0');

  const day = String(
    date.getDate(),
  ).padStart(2, '0');

  const hour = String(
    date.getHours(),
  ).padStart(2, '0');

  const minute = String(
    date.getMinutes(),
  ).padStart(2, '0');

  return `${month}.${day} ${hour}:${minute}`;
};

const RewardUseHistoryPage = () => {
  const {
    data,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['rewardRedemptions'],
    queryFn: () =>
      getRewardRedemptions({
        size: 10,
      }),
  });

  const rewardUseHistory =
    data?.content ?? [];

  const renderStatusIcon = (
  type: FulfillmentType,
  status: FulfillmentStatus,
) => {
  if (status === 'READY' || status === 'SENT') {
    return (
      <ShippingIcon
        aria-label='처리중'
        className='h-[22px] w-auto shrink-0'
      />
    );
  }

  if (
    type === 'DELIVERY' &&
    status === 'COMPLETED'
  ) {
    return (
      <DeliveryCompleteIcon
        aria-label='배송완료'
        className='h-[22px] w-auto shrink-0'
      />
    );
  }

  if (
    type === 'COUPON' &&
    status === 'COMPLETED'
  ) {
    return (
      <ExchangeCompleteIcon
        aria-label='발송완료'
        className='h-[22px] w-auto shrink-0'
      />
    );
  }

  return null;
};

  if (isPending) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-bg-my'>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-bg-my'>
        리워드 사용 내역을 불러오지 못했어요.
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-bg-my'>
      <main className='px-5 pb-[40px] pt-[60px]'>
        {rewardUseHistory.length > 0 ? (
          <ul className='flex flex-col gap-[10px]'>
            {rewardUseHistory.map((item) => (
              <li
                key={item.rewardRedemptionId}
                className='flex h-[104px] w-full items-center rounded-[20px] bg-white px-[16px] py-[17px] shadow-[0_4px_12px_rgba(0,0,0,0.07)]'
              >
                {/* 상품 이미지 */}
                <div className='h-[70px] w-[70px] shrink-0 overflow-hidden rounded-[10px] bg-gray-100'>
                  <img
                    src={item.productImageUrl}
                    alt={item.productName}
                    className='h-full w-full object-cover'
                  />
                </div>

                {/* 상품 정보 */}
                <div className='ml-[14px] min-w-0 flex-1'>
                  <p className='text-[12px] font-semibold leading-[130%] tracking-[-0.01em] text-[#909090]'>
                    {formatRedeemedAt(
                      item.redeemedAt,
                    )}{' '}
                    교환
                  </p>

                  <h2 className='mt-[2px] truncate text-[16px] font-bold leading-[15px] tracking-[0] text-[#111111]'>
                    {item.productName}
                  </h2>

                  <p className='mt-[3px] truncate text-[14px] font-semibold leading-[22px] tracking-[0] text-[#909090]'>
                    사용 포인트{' '}
                    <span className='text-main-green1'>
                      {item.usedPoint.toLocaleString()}
                      P
                    </span>
                  </p>
                </div>

                {/* 배송 상태 */}
                <div className='ml-[8px] self-start pt-[1px]'>
                  {renderStatusIcon(
                      item.fulfillmentType,
                    item.fulfillmentStatus,
                  )}
                </div>
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