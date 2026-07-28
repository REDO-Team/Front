import RewardCard from '../../components/RewardPage/RewardCard';
import { getRewardHistory } from '../../apis/reward';
import type { RewardHistoryParams } from '../../types/reward';
import { useQuery } from '@tanstack/react-query';

const useRewardHistory = (params?: RewardHistoryParams) => {
  return useQuery({
    queryKey: ['rewardHistory', params],
    queryFn: () => getRewardHistory(params),
  });
};

export default function RewardHistoryPage() {
  const { data, isPending, isError } = useRewardHistory({
    cursor: undefined,
    size: 10,
  });

  if (isPending) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <p>리워드 내역을 불러오는 중이에요...</p>
      </div>
    );
  }

  if (isError){
    return(
      <div className='flex flex-1 items-center justify-center'>
        <p>리워드 내역을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</p>
      </div>
    )
  }

  return (
    <div className='flex flex-1 flex-col px-5 pb-10 pt-5 font-pretendard'>
      <h1 className='sr-only'>리워드 내역</h1>

      <section aria-label='전체 리워드 내역' className='w-full divide-y divide-gray-200 rounded-[22px] bg-white px-4 shadow-[0_8px_20px_rgba(0,0,0,0.06)]'>
        {data.items.length === 0 ? (
          <div className='flex flex-1 items-center justify-center py-10'>
            <p>아직 내역이 없어요.</p>
          </div>
        ) : (
          data?.items.map((history) => (
            <RewardCard key={history.transactionId} rewardHistory={history} />
          ))
        )}
      </section>
    </div>
  );
}
