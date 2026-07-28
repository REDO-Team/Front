import type { RewardHistory } from '../../types/reward';
import RewardIcon from '../../assets/icons/reward-reward.svg';
import TrashIcon from '../../assets/icons/reward-trash.svg';

interface RewardCardProps {
  rewardHistory: RewardHistory;
}

export default function RewardCard({ rewardHistory }: RewardCardProps) {
  const { title, transactionType, amount, createdAt } = rewardHistory;
  const isEarned = transactionType === 'EARN';
  const pointText = `${isEarned ? '+' : '-'}${Math.abs(amount).toLocaleString()}P`;
  const dateText = createdAt.slice(0, 10).replaceAll('-', '.');

  return (
    <article className='flex min-h-[68px] items-center py-3.5'>
      <img
        src={isEarned ? TrashIcon : RewardIcon}
        alt=''
        className='h-10 w-10 shrink-0'
      />

      <div className='ml-3.5 min-w-0 flex-1'>
        <h3 className='truncate text-[15px] font-bold leading-none text-text'>
          {title}
        </h3>
        <time
          dateTime={createdAt}
          className='mt-2 block text-[12px] font-medium leading-none text-gray-500'
        >
          {dateText}
        </time>
      </div>

      <p
        className={`ml-3 shrink-0 text-[17px] font-bold ${isEarned ? 'text-main-green1' : 'text-gray-500'}`}
      >
        {pointText}
      </p>
    </article>
  );
}
