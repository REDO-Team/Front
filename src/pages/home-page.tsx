import CameraHomeIcon from '../assets/icons/camera-home.svg';
import ChartHomeIcon from '../assets/icons/chart-home.svg';
import CoinsIcon from '../assets/icons/coins.svg?react';
import LogoutIcon from '../assets/icons/logout.svg';
import RecycleIcon from '../assets/icons/recycle.svg?react';
import RewardIcon from '../assets/icons/reward.svg';
import TrashIcon from '../assets/icons/trash.svg';
import {
  HOME_COMMUNITY_PREVIEWS,
  HOME_POINT_SUMMARY,
  HOME_REWARD_PREVIEWS,
  HOME_SERVICE_MENU_ITEMS,
  HOME_USER,
} from '../mocks/home';
import type { HomeServiceMenuItem } from '../types/home';

const SERVICE_MENU_ICON_SRC: Record<HomeServiceMenuItem['icon'], string> = {
  trash: TrashIcon,
  camera: CameraHomeIcon,
  reward: RewardIcon,
  chart: ChartHomeIcon,
};

const REWARD_IMAGE_STYLE = {
  plant:
    'bg-[linear-gradient(135deg,#edf7ef_0%,#d8c4a2_52%,#7c8f57_100%)] before:absolute before:left-3 before:top-3 before:h-7 before:w-7 before:rounded-full before:bg-[#8fa96b] after:absolute after:bottom-2 after:right-2 after:h-5 after:w-8 after:rounded-sm after:bg-[#c8934d]',
  'gift-card':
    'bg-[linear-gradient(135deg,#d8d1c8_0%,#ffffff_46%,#c6b5a0_100%)] before:absolute before:left-2 before:top-4 before:h-5 before:w-12 before:rounded-sm before:bg-white/85 after:absolute after:left-5 after:top-6 after:h-1 after:w-7 after:rounded-full after:bg-[#d7a44e]',
} as const;

export default function HomePage() {
  const formattedPoint = HOME_POINT_SUMMARY.totalPoint.toLocaleString();
  const communityPreview = HOME_COMMUNITY_PREVIEWS[0];

  return (
    <div className='min-h-screen bg-bg-green1 pb-32 font-pretendard text-text'>
      <main className='px-5 pb-8 pt-4'>
        {/* 홈 상단 인사말과 로그아웃 진입 버튼입니다. */}
        <header className='flex items-start justify-between'>
          <div className='pt-3'>
            <p className='text-[13px] font-semibold leading-none text-gray-700'>
              오늘도 분리수거 함께해요!
            </p>
            <h1 className='mt-3 text-[20px] font-bold leading-[1.35]'>
              <span className='text-main-green1'>{HOME_USER.nickname}</span>님,
              <br />
              오늘도 ReDO! 해볼까요?
            </h1>
          </div>

          <button
            type='button'
            aria-label='로그아웃'
            className='mt-4 flex h-9 w-9 items-center justify-center rounded-full'
          >
            {/* TODO: 별도 이슈에서 로그아웃 모달을 연결합니다. */}
            <img src={LogoutIcon} alt='' className='h-6 w-6' />
          </button>
        </header>

        {/* 포인트 카드의 큰 재활용 아이콘은 장식 이미지라 텍스트 정보와 분리했습니다. */}
        <section className='relative mt-4 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#06C65F_0%,#21D38A_48%,#66E1FF_100%)] px-6 py-4 text-white shadow-[0_8px_18px_rgba(6,198,95,0.22)]'>
          <RecycleIcon
            aria-hidden='true'
            className='absolute -bottom-5 right-4 h-28 w-28 rotate-[-8deg] text-white/35'
          />
          <div className='relative'>
            <p className='flex items-center gap-1 text-[14px] font-semibold leading-none'>
              나의 포인트
              <CoinsIcon aria-hidden='true' className='h-4 w-4 text-white' />
            </p>
            <strong className='mt-2 block text-[30px] font-bold leading-none'>
              {formattedPoint}
              <span className='ml-1 text-[20px]'>P</span>
            </strong>
            <button
              type='button'
              className='mt-4 flex h-10 w-[134px] items-center justify-center rounded-full bg-white text-[15px] font-bold text-main-green1 shadow-[0_5px_12px_rgba(0,0,0,0.08)]'
            >
              {/* TODO: 별도 이슈에서 배출 인증 페이지 이동을 연결합니다. */}
              인증하러 가기 <span className='ml-1 text-xl leading-none'>›</span>
            </button>
          </div>
        </section>

        {/* 홈 서비스 메뉴입니다. 아이콘은 mock 데이터의 icon 값으로 매칭합니다. */}
        <section className='mt-7'>
          <h2 className='text-[17px] font-bold leading-none'>
            어떤 서비스를 찾으시나요?
          </h2>
          <div className='mt-4 grid grid-cols-2 gap-3'>
            {HOME_SERVICE_MENU_ITEMS.map((menu) => (
              <button
                key={menu.id}
                type='button'
                className='flex h-[100px] flex-col items-center justify-center rounded-[22px] bg-white px-3 shadow-[0_9px_18px_rgba(0,0,0,0.08)]'
              >
                {/* TODO: 별도 이슈에서 메뉴별 라우팅 이동을 연결합니다. */}
                <img
                  src={SERVICE_MENU_ICON_SRC[menu.icon]}
                  alt=''
                  className='h-10 w-10 object-contain'
                />
                <strong className='mt-3 text-[15px] font-bold leading-none'>
                  {menu.title}
                </strong>
              </button>
            ))}
          </div>
        </section>

        {communityPreview && (
          <section className='mt-6'>
            <button
              type='button'
              className='flex items-center text-[18px] font-bold leading-none'
            >
              {/* TODO: 별도 이슈에서 커뮤니티 목록 이동을 연결합니다. */}
              오늘의 커뮤니티 <span className='ml-1 text-2xl leading-none'>›</span>
            </button>

            <article className='mt-3 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_7px_16px_rgba(0,0,0,0.07)]'>
              <div className='min-w-0 flex-1'>
                <div className='flex items-center justify-between gap-3'>
                  <span className='rounded-full bg-skyblue-bg px-2 py-1 text-[10px] font-semibold text-skyblue-text'>
                    {communityPreview.category}
                  </span>
                  <span className='text-[12px] font-medium text-gray-400'>
                    {communityPreview.createdAtText}
                  </span>
                </div>
                <h3 className='mt-3 truncate text-[15px] font-bold leading-none'>
                  {communityPreview.title}
                </h3>
                <div className='mt-4 flex items-center gap-5 text-[12px] font-semibold text-gray-500'>
                  <span className='flex items-center gap-2'>
                    <span className='h-5 w-5 rounded-full bg-[linear-gradient(135deg,#06C65F,#66E1FF)]' />
                    {communityPreview.author}
                  </span>
                  <span className='flex items-center gap-1'>
                    <span className='h-3 w-3 rounded-[2px] border border-gray-400' />
                    {communityPreview.commentCount}
                  </span>
                </div>
              </div>
              <div className='h-[58px] w-[58px] shrink-0 rounded-xl bg-[linear-gradient(145deg,#06C65F,#66E1FF)]' />
            </article>
          </section>
        )}

        <section className='mt-5'>
          <button
            type='button'
            className='flex items-center text-[18px] font-bold leading-none'
          >
            {/* TODO: 별도 이슈에서 리워드 상점 이동을 연결합니다. */}
            리워드 상점 <span className='ml-1 text-2xl leading-none'>›</span>
          </button>

          <ul className='mt-3 flex flex-col gap-3'>
            {HOME_REWARD_PREVIEWS.map((reward) => (
              <li
                key={reward.id}
                className='flex min-h-[77px] items-center rounded-2xl bg-white px-3 py-2 shadow-[0_7px_16px_rgba(0,0,0,0.06)]'
              >
                <div
                  role='img'
                  aria-label={reward.imageAlt}
                  className={`relative h-[54px] w-[54px] shrink-0 overflow-hidden rounded-xl ${REWARD_IMAGE_STYLE[reward.imageVariant]}`}
                />
                <div className='ml-3 min-w-0 flex-1'>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                      reward.imageVariant === 'plant'
                        ? 'bg-skyblue-bg text-skyblue-text'
                        : 'bg-reward-bg text-reward-text'
                    }`}
                  >
                    {reward.category}
                  </span>
                  <p className='mt-2 truncate text-[15px] font-bold leading-none'>
                    {reward.name}
                  </p>
                </div>
                <strong className='ml-3 shrink-0 text-[16px] font-bold text-main-green1'>
                  {reward.requiredPoint.toLocaleString()}P
                </strong>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
