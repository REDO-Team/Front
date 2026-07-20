import { Link, useNavigate } from 'react-router-dom';
import Home from '../../assets/icons/home.svg';
import YellowCharacter from '../../assets/icons/character/yellow-character.svg';
import RewardCard from '../../components/RewardPage/RewardCard';
import TopBar from '../../components/common/TopBar';
import { mockRewardHistory, mockRewardSummary } from '../../mocks/reward';

export default function RewardHomePage() {
  const navigate = useNavigate();
  const { nickname, currentPoint, monthlyPoint } = mockRewardSummary;

  return (
    <div className='flex flex-1 flex-col gap-10 px-5 pb-10 font-pretendard'>
      <TopBar
        title='리워드 적립'
        leftIcon
        rightIcon={Home}
        onClick={() => navigate('/')}
        bgColor='bg-green1'
      />

      {/* 포인트 카드 부분 */}
      <section
        aria-label={`${nickname}님의 포인트 현황`}
        className='relative mt-4 h-40 shrink-0 overflow-hidden rounded-[22px] bg-[linear-gradient(120deg,#06C65F_0%,#12CE83_48%,#66E1FF_100%)] px-6 py-7 text-white'
      >
        <div className='relative z-10'>
          <p className='text-[15px] font-semibold leading-none'>
            {nickname}님의 포인트
          </p>

          <p className='mt-2 text-[38px] font-bold leading-none tracking-[-0.02em]'>
            {currentPoint.toLocaleString()}
            <span className='ml-1.5 text-[24px]'>P</span>
          </p>

          <p className='mt-4 inline-flex h-8 items-center rounded-full bg-white/30 px-3.5 text-[13px] font-semibold leading-none backdrop-blur-[1px]'>
            이번 달 + {monthlyPoint.toLocaleString()}P 적립했어요
          </p>
        </div>

        <div
          aria-hidden='true'
          className='absolute bottom-0 right-0 h-full w-[155px] overflow-hidden'
        >
          <img
            src={YellowCharacter}
            alt=''
            className='absolute -left-[45px] -top-[17px] h-[245px] w-[245px] max-w-none mix-blend-multiply'
          />
        </div>
      </section>


      {/* 리워드 내역 미리보기 부분 */}
      <section>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-black'>리워드 내역 조회</h2>
          <Link
            to='/reward/history'
            className='text-sm text-gray-500 hover:text-gray-800'
          >
            더보기
          </Link>
        </div>

        <div className='mt-3 rounded-[22px] bg-white px-4 shadow-[0_8px_20px_rgba(0,0,0,0.06)] divide-y divide-gray-200'>
          {mockRewardHistory.slice(0, 4).map((history) => (
            <RewardCard key={history.id} rewardHistory={history} />
          ))}
        </div>
      </section>

      {/* 리워드 상품 버튼 부분 */}
      <Link
        to='/reward/store'
        className='flex min-h-20 items-center justify-between rounded-[22px] bg-[linear-gradient(105deg,#06C65F_0%,#27D49C_52%,#66E1FF_100%)] px-5 text-white shadow-[0_8px_18px_rgba(6,198,95,0.16)]'
      >
        <span className='flex flex-col'>
          <span className='text-[11px] font-semibold leading-none'>
            내가 모은 포인트로 무엇을 할까?
          </span>
          <strong className='mt-2 text-[22px] font-bold leading-none'>
            리워드 상점가기
          </strong>
        </span>
        <span
          aria-hidden='true'
          className='mr-1 h-3.5 w-3.5 rotate-45 border-r-[3px] border-t-[3px] border-white'
        />
      </Link>
    </div>
  );
}
