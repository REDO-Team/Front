import { useNavigate } from 'react-router-dom';
import benchIcon from '../assets/icons/bench.svg';
import bottleIcon from '../assets/icons/bottle.svg';
import clothesIcon from '../assets/icons/clothes.svg';
import countIcon from '../assets/icons/count.svg';
import flowerpotIcon from '../assets/icons/flowerpot.svg';
import home from '../assets/icons/home.svg';
import logo from '../assets/icons/logo.svg';
import noteIcon from '../assets/icons/note.svg';
import sneakersIcon from '../assets/icons/sneakers.svg';
import toiletPaperIcon from '../assets/icons/toilet-paper.svg';
import TopBar from '../components/common/TopBar';
import {
  ALL_CONTRIBUTION_USER_COUNT,
  CONTRIBUTION_ACTIVITIES,
} from '../mocks/contribution';
import type {
  ContributionActivity,
  ContributionProductType,
} from '../types/contribution';

const productIcons: Record<ContributionProductType, string> = {
  TOILET_PAPER: toiletPaperIcon,
  NOTE: noteIcon,
  BOTTLE: bottleIcon,
  BAG: countIcon,
  FLOWERPOT: flowerpotIcon,
  CLOTHES: clothesIcon,
  SNEAKERS: sneakersIcon,
  BENCH: benchIcon,
};

interface UserCountBannerProps {
  userCount: number;
}

function UserCountBanner({ userCount }: UserCountBannerProps) {
  return (
    <section
      className='flex min-h-28 items-center justify-between gap-4 rounded-[22px] bg-linear-to-br from-main-green1 to-main-sky px-5 py-5 text-white shadow-lg shadow-main-green1/10'
      aria-label='전체 사용자 수'
    >
      <p className='min-w-0 flex-1 text-lg font-medium leading-[1.45]'>
        현재 <strong className='text-[22px] font-bold'>{userCount}명</strong>의 사용자가
        <br />
        함께 지구를 지키고 있어요
      </p>
      <img
        src={logo}
        alt=''
        aria-hidden='true'
        className='h-auto w-[65px] shrink-0 brightness-0 invert'
      />
    </section>
  );
}

function ActivityMessage({ activity }: { activity: ContributionActivity }) {
  const nickname = (
    <span className='break-all font-semibold'>{activity.nickname}</span>
  );

  switch (activity.type) {
    case 'PRODUCT_IN_PROGRESS':
      return (
        <p>
          {nickname}님이 {activity.productName}을 만드는 중이에요
        </p>
      );
    case 'PRODUCT_REMAINING':
      return (
        <p>
          {nickname}님은 {activity.productName} 제작까지{' '}
          <strong className='font-bold text-main-green2'>
            {activity.remainingCount}회
          </strong>{' '}
          남았어요!
        </p>
      );
    case 'RECYCLING_COMPLETED':
      return (
        <p>
          {nickname}님이 오늘{' '}
          <strong className='font-bold text-main-green2'>
            {activity.recyclingCount}번째
          </strong>{' '}
          분리수거를 완료했어요
        </p>
      );
    case 'FIRST_RECYCLING':
      return <p>{nickname}님이 첫 분리수거를 실천했어요!</p>;
  }
}

function ContributionActivityCard({
  activity,
}: {
  activity: ContributionActivity;
}) {
  const isProductActivity =
    activity.type === 'PRODUCT_IN_PROGRESS' ||
    activity.type === 'PRODUCT_REMAINING';
  const icon =
    isProductActivity && activity.productType
      ? productIcons[activity.productType]
      : countIcon;
  const iconAlt = isProductActivity
    ? `${activity.productName ?? '물품'} 아이콘`
    : '분리수거 아이콘';

  return (
    <article className='flex min-h-24 items-center gap-5 rounded-[20px] bg-white px-4 py-4 shadow-lg shadow-black/5'>
      <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-bg-green3'>
        <img src={icon} alt={iconAlt} className='h-11 w-11 object-contain' />
      </div>
      <div className='min-w-0 flex-1 break-words text-base font-medium leading-[1.5] text-text [overflow-wrap:anywhere]'>
        <ActivityMessage activity={activity} />
      </div>
    </article>
  );
}

export default function AllContributionPage() {
  const navigate = useNavigate();

  return (
    <div className='min-h-[calc(100dvh-56px)] bg-bg-green1'>
      <TopBar
        title='전체 기여도'
        leftIcon
        rightIcon={home}
        onClick={() => navigate('/')}
        bgColor='bg-green1'
      />

      <div className='px-5 py-6'>
        <UserCountBanner userCount={ALL_CONTRIBUTION_USER_COUNT} />

        <ul className='mt-7 space-y-3' aria-label='전체 기여 활동'>
          {CONTRIBUTION_ACTIVITIES.map((activity) => (
            <li key={activity.id}>
              <ContributionActivityCard activity={activity} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
