import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import YellowRewardCharacter from '../../assets/icons/character/yellow2.svg?react';
import GrayRewardCharacter from '../../assets/icons/character/gray2.svg?react';
import GreenRewardCharacter from '../../assets/icons/character/green2.svg?react';
import OrangeRewardCharacter from '../../assets/icons/character/orange2.svg?react';
import PurpleRewardCharacter from '../../assets/icons/character/purple2.svg?react';
import BlueRewardCharacter from '../../assets/icons/character/blue2.svg?react';
import RewardCard from '../../components/RewardPage/RewardCard';
import { getRewardHistory, getRewardPoints } from '../../apis/reward';
import { getMyInfo } from '../../apis/user';

const REWARD_CHARACTER_IMAGE_MAP = {
  '1': YellowRewardCharacter,
  '2': GrayRewardCharacter,
  '3': GreenRewardCharacter,
  '4': OrangeRewardCharacter,
  '5': PurpleRewardCharacter,
  '6': BlueRewardCharacter,
} as const;

export default function RewardHomePage() {
  const { data: userInfo } = useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
  });

  const CharacterImage = userInfo?.characterCode
    ? REWARD_CHARACTER_IMAGE_MAP[userInfo.characterCode]
    : REWARD_CHARACTER_IMAGE_MAP['1'];

  const { data, isPending, isError } = useQuery({
    queryKey: ['rewardPoints'],
    queryFn: getRewardPoints,
  });
  const {
    data: historyData,
    isPending: isHistoryPending,
    isError: isHistoryError,
  } = useQuery({
    queryKey: ['rewardHistory', { size: 4 }],
    queryFn: () => getRewardHistory({ size: 4 }),
  });

  return (
    <div className='flex flex-1 flex-col gap-10 px-5 pb-10 font-pretendard'>
      {/* 포인트 카드 부분 */}
      <section aria-label={`${userInfo?.nickname}님의 포인트 현황`} className='relative mt-4 h-40 shrink-0 overflow-hidden rounded-[22px] bg-[linear-gradient(120deg,#06C65F_0%,#12CE83_48%,#66E1FF_100%)] px-6 py-7 text-white'>
        <div className='relative z-10'>
          <p className='text-[15px] font-semibold leading-none'>{userInfo?.nickname}님의 포인트</p>

          <p className='mt-2 text-[38px] font-bold leading-none tracking-[-0.02em]'>
            {isPending ? (
              <span className='text-[18px]'>불러오는 중...</span>
            ) : isError || !data ? (
              <span className='text-[18px]'>포인트를 불러오지 못했어요</span>
            ) : (
              <>
                {data.totalPoint.toLocaleString('ko-KR')}
                <span className='ml-1.5 text-[24px]'>P</span>
              </>
            )}
          </p>

          <p className='mt-4 inline-flex h-8 items-center rounded-full bg-white/30 px-3.5 text-[13px] font-semibold leading-none backdrop-blur-[1px]'>
            {isPending
              ? '이번 달 적립 포인트를 불러오는 중이에요'
              : isError || !data
                ? '포인트 정보를 다시 불러와 주세요'
                : `이번 달 + ${data.monthlyEarnedPoint.toLocaleString('ko-KR')}P 적립했어요`}
          </p>
        </div>

        <div aria-hidden='true' className='absolute bottom-0 right-0 h-full w-[155px] overflow-hidden'>
          <CharacterImage className='absolute -bottom-8 right-5 h-40 w-auto max-w-none' />
        </div>
      </section>

      {/* 리워드 내역 미리보기 부분 */}
      <section>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-black'>리워드 내역 조회</h2>
          <Link to='/reward/history' className='text-sm text-gray-500 hover:text-gray-800'>
            더보기
          </Link>
        </div>

        <div className='mt-3 rounded-[22px] bg-white px-4 shadow-[0_8px_20px_rgba(0,0,0,0.06)] divide-y divide-gray-200'>
          {isHistoryPending ? (
            <p className='py-10 text-center text-sm font-medium text-gray-500'>
              리워드 내역을 불러오는 중이에요...
            </p>
          ) : isHistoryError || !historyData ? (
            <p className='py-10 text-center text-sm font-medium text-gray-500'>
              리워드 내역을 불러오지 못했어요.
            </p>
          ) : historyData.items.length === 0 ? (
            <p className='py-10 text-center text-sm font-medium text-gray-500'>
              아직 내역이 없어요.
            </p>
          ) : (
            historyData.items.map((history) => (
              <RewardCard
                key={history.transactionId}
                rewardHistory={history}
              />
            ))
          )}
        </div>
      </section>

      {/* 리워드 상품 버튼 부분 */}
      <Link to='/reward/store' className='flex min-h-20 items-center justify-between rounded-[22px] bg-[linear-gradient(105deg,#06C65F_0%,#27D49C_52%,#66E1FF_100%)] px-5 text-white shadow-[0_8px_18px_rgba(6,198,95,0.16)]'>
        <span className='flex flex-col'>
          <span className='text-[11px] font-semibold leading-none'>내가 모은 포인트로 무엇을 할까?</span>
          <strong className='mt-2 text-[22px] font-bold leading-none'>리워드 상점가기</strong>
        </span>
        <span aria-hidden='true' className='mr-1 h-3.5 w-3.5 rotate-45 border-r-[3px] border-t-[3px] border-white' />
      </Link>
    </div>
  );
}
