import { useNavigate } from 'react-router-dom';
import benchIcon from '../assets/icons/bench.svg';
import bottleIcon from '../assets/icons/bottle.svg';
import clothesIcon from '../assets/icons/clothes.svg';
import countIcon from '../assets/icons/count.svg';
import flowerpotIcon from '../assets/icons/flowerpot.svg';
import noteIcon from '../assets/icons/note.svg';
import sneakersIcon from '../assets/icons/sneakers.svg';
import toiletPaperIcon from '../assets/icons/toilet-paper.svg';
import unlockIcon from '../assets/icons/unlock.svg';
import type { ContributionMilestoneType } from '../types/contribution';
import { getMyContribution } from '../apis/contribution';
import { useQuery } from '@tanstack/react-query';

const milestoneIcons: Record<ContributionMilestoneType, string> = {
  TOILET_PAPER: toiletPaperIcon,
  NOTE: noteIcon,
  GLASS_BOTTLE: bottleIcon,
  TRASH_BAG: countIcon,
  PLASTIC_FLOWER_POT: flowerpotIcon,
  T_SHIRT: clothesIcon,
  SNEAKERS: sneakersIcon,
  BENCH: benchIcon,
};

const itemGridPositions = ['col-start-2 row-start-1', 'col-start-4 row-start-1', 'col-start-5 row-start-2', 'col-start-3 row-start-2', 'col-start-1 row-start-2', 'col-start-1 row-start-3', 'col-start-3 row-start-3', 'col-start-5 row-start-3'];


const useMyContribution = () => {
  return useQuery({
    queryKey: ['myContribution'],
    queryFn: () => getMyContribution(),
  });
};

export default function MyContributionPage() {
  const navigate = useNavigate();
  const { data, isPending, isError } = useMyContribution();

  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>나의 기여도 조회에 실패했습니다.</div>;
  }

  return (
    <div className='min-h-screen bg-[#F9FBFB] pt-14'>
      <section>
        <div className='px-5 py-6'>
          <h2 className='text-[20px] font-bold leading-[1.35] text-text'>
            {data?.latestAchievedMilestone ? (
              <>
                {data?.nickname}님,
                <br />
                지금까지 {data?.totalCertificationCount}번의 분리수거로
                <br />
                <span className='text-main-green2'>{data?.latestAchievedMilestone.name}</span>를 만들었어요!
              </>
            ) : (
              data?.summaryMessage
            )}
          </h2>
        </div>
      </section>

      <section className='mx-4 mt-8 rounded-[24px] bg-white px-6 py-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)]'>
        <div className='relative'>
          <svg className='pointer-events-none absolute inset-0 h-full w-full' viewBox='0 0 100 100' preserveAspectRatio='none' fill='none' aria-hidden='true'>
            <path d='M33.3 10 H79 Q83.3 10 83.3 14 V42 Q83.3 46 79 46 H16.7 H4 Q0 46 0 50 V78 Q0 82 4 82 H83.3' stroke='#06C65F' strokeWidth='2' strokeDasharray='5 6' strokeLinecap='round' strokeLinejoin='round' vectorEffect='non-scaling-stroke' />
          </svg>

          <div className='relative z-10 grid grid-cols-6 gap-y-7'>
            {data?.milestones.map((milestone, index) => {
              const isLocked = milestone.status !== 'ACHIEVED';

              return (
                <div key={milestone.type} className={`col-span-2 flex flex-col items-center gap-2 ${itemGridPositions[index] ?? ''}`}>
                  <div className='flex h-16 w-16 items-center justify-center'>
                    <img
                      src={isLocked ? unlockIcon : milestoneIcons[milestone.type]}
                      alt={isLocked ? `${milestone.name} 잠김` : `${milestone.name} 아이콘`}
                      className='h-full w-full'
                    />
                  </div>

                  <span className={`text-sm font-medium ${milestone.status === 'ACHIEVED' ? 'text-main-green2' : 'text-text'}`}>
                    {milestone.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className='px-5 pb-8 pt-4 text-center'>
        {data?.nextMilestone ? (
          <p className='text-base font-semibold leading-6 text-text'>
            다음 물품까지 <span className='font-bold text-main-green2'>{data?.remainingCount}번</span> 남았어요!
          </p>
        ) : (
          <p className='text-base font-semibold leading-6 text-main-green2'>모든 물품을 달성했어요!</p>
        )}

        <div className='mt-3 space-y-1 text-[11px] font-medium leading-[1.45] text-[#8A8A8A]'>
          <p>※ 환경부 및 재활용 업계 공개 자료 기반 평균 환산치</p>
          <p>※ 재활용 원료 기준은 품목 및 환경에 따라 달라질 수 있습니다</p>
        </div>
      </div>

      <button type='button' onClick={() => navigate('/all-contribution')} className='mx-5 mb-8 flex h-12 w-[calc(100%-2.5rem)] items-center justify-center rounded-full bg-main-green1 text-base font-bold text-white shadow-[0_5px_12px_rgba(0,0,0,0.08)]'>
        <p>함께 만드는 변화 보러가기</p>
      </button>
    </div>
  );
}
