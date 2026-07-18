import { useNavigate } from 'react-router-dom';
import Home from '../../assets/icons/home.svg';
import RewardCard from '../../components/RewardPage/RewardCard';
import TopBar from '../../components/common/TopBar';
import { mockRewardHistory } from '../../mocks/reward';

export default function RewardHistoryPage() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-1 flex-col px-5 pb-10 pt-5 font-pretendard'>
      <TopBar
        title='리워드 내역'
        leftIcon
        rightIcon={Home}
        onClick={() => navigate('/')}
        bgColor='bg-green1'
      />
      <h1 className='sr-only'>리워드 내역</h1>

      <section
        aria-label='전체 리워드 내역'
        className='w-full divide-y divide-gray-200 rounded-[22px] bg-white px-4 shadow-[0_8px_20px_rgba(0,0,0,0.06)]'
      >
        {mockRewardHistory.map((history) => (
          <RewardCard key={history.id} rewardHistory={history} />
        ))}
      </section>
    </div>
  );
}
