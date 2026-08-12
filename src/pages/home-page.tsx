import CameraHomeIcon from '../assets/icons/camera-home.svg';
import ChartHomeIcon from '../assets/icons/chart-home.svg';
import CoinsIcon from '../assets/icons/coins.svg?react';
import LogoutIcon from '../assets/icons/logout.svg';
import BigLogo from '../assets/icons/Big-logo.svg?react';
import RewardIcon from '../assets/icons/reward.svg';
import TrashIcon from '../assets/icons/trash.svg';
import { HOME_SERVICE_MENU_ITEMS } from '../constants/home';
import type { HomeServiceMenuItem } from '../types/home';
import { useNavigate } from 'react-router-dom';
import { getMyInfo } from '../apis/user';
import { getRewardPreview } from '../apis/reward';
import { useQuery } from '@tanstack/react-query';
import RewardProductCard from '../components/RewardPage/RewardProductCard';
import { useState } from 'react';
import Modal from '../components/common/Modal';
import { logout } from '../apis/auth';
import { clearAuthData } from '../apis/token';
import { getCommunityList } from '../apis/community';

const formatCategory = (categoryValue: string | number) => {
  const value = String(categoryValue);

  if (value === '1') return '정보공유';
  if (value === '2') return '리워드후기';
  if (value === '3') return '환경실천';

  return '전체보기';
};

const formatTimeAgo = (dateString: string) => {
  const postDate = new Date(dateString);
  const diff = Date.now() - postDate.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;

  return postDate.toLocaleDateString('ko-KR');
};

const SERVICE_MENU_ICON_SRC: Record<HomeServiceMenuItem['icon'], string> = {
  trash: TrashIcon,
  camera: CameraHomeIcon,
  reward: RewardIcon,
  chart: ChartHomeIcon,
};
const useInfo = () => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
  });
};

const useRewardProducts = () => {
  return useQuery({
    queryKey: ['rewardProducts', 'preview'],
    queryFn: getRewardPreview,
  });
};

const useLatestCommunityPreview = () => {
  return useQuery({
    queryKey: ['latestCommunityPreview'],
    queryFn: getCommunityList,
    select: (data) => data.result.items[0] ?? null,
  });
};

export default function HomePage() {
  const navigate = useNavigate();
  const { data: communityPreview } = useLatestCommunityPreview();
  const { data: userInfo } = useInfo();
  const {
    data: rewardData,
    isPending: isRewardProductsPending,
    isError: isRewardProductsError,
  } = useRewardProducts();
  const rewardProducts = rewardData?.items ?? [];
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearAuthData();
      setIsLogoutModalOpen(false);
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className='min-h-screen bg-[#F9FBFB] pb-32 font-pretendard text-text'>
      <main className='px-5 pb-8 pt-4'>
        {/* 홈 상단 인사말과 로그아웃 진입 버튼입니다. */}
        <header className='flex items-start justify-between'>
          <div className='pt-3'>
            <p className='text-[13px] font-semibold leading-none text-gray-700'>오늘도 분리수거 함께해요!</p>
            <h1 className='mt-3 text-[20px] font-bold leading-[1.35]'>
              <span className='text-main-green1'>{userInfo?.nickname}</span>님,
              <br />
              오늘도 ReDO! 해볼까요?
            </h1>
          </div>

          <button type='button' 
          aria-label='로그아웃' 
          className='mt-4 flex h-9 w-9 items-center justify-center rounded-full'
          onClick={() => setIsLogoutModalOpen(true)}>
            <img src={LogoutIcon} alt='' className='h-6 w-6' />
          </button>
        </header>

        {/* 사용자 누적 포인트 카드입니다. */}
        <section className='relative mt-4 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#06C65F_0%,#21D38A_48%,#66E1FF_100%)] px-6 py-4 text-white shadow-[0_8px_18px_rgba(6,198,95,0.22)]'>
          <BigLogo aria-hidden='true' className='pointer-events-none absolute -bottom-5 -right-1 h-[180px] w-[196px] opacity-30 brightness-0 invert' />
          <div className='relative'>
            <p className='flex items-center gap-1 text-[14px] font-semibold leading-none'>
              나의 포인트
              <CoinsIcon aria-hidden='true' className='h-4 w-4 text-white' />
            </p>
            <strong className='mt-2 block text-[30px] font-bold leading-none'>
              {userInfo?.totalPoint.toLocaleString()}
              <span className='ml-1 text-[20px]'>P</span>
            </strong>
            <button type='button' onClick={() => navigate('/certification')} className='mt-4 flex h-10 w-[134px] items-center justify-center rounded-full bg-white text-[15px] font-bold text-main-green1 shadow-[0_5px_12px_rgba(0,0,0,0.08)]'>
              인증하러 가기 <span className='ml-1 text-xl leading-none'>›</span>
            </button>
          </div>
        </section>

        {/* 홈 서비스 메뉴입니다. 아이콘은 메뉴 설정의 icon 값으로 매칭합니다. */}
        <section className='mt-7'>
          <h2 className='text-[17px] font-bold leading-none'>어떤 서비스를 찾으시나요?</h2>
          <div className='mt-4 grid grid-cols-2 gap-3'>
            {HOME_SERVICE_MENU_ITEMS.map((menu) => (
              <button
                key={menu.id}
                type='button'
                onClick={() => navigate(menu.path)}
                className='flex h-[100px] flex-col items-center justify-center rounded-[22px] bg-white px-3 shadow-[0_9px_18px_rgba(0,0,0,0.08)]'
              >
                <img src={SERVICE_MENU_ICON_SRC[menu.icon]} alt='' className='h-10 w-10 object-contain' />
                <strong className='mt-3 text-[15px] font-bold leading-none'>{menu.title}</strong>
              </button>
            ))}
          </div>
        </section>

        {communityPreview && (
          <section className='mt-6'>
            <button type='button' onClick={() => navigate('/community')} className='flex items-center text-[18px] font-bold leading-none'>
              오늘의 커뮤니티 <span className='ml-1 text-2xl leading-none'>›</span>
            </button>

            <button type='button' onClick={() => navigate(`/community/${communityPreview.id}`)} aria-label={`${communityPreview.title} 게시글 보기`} className='mt-3 flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-[0_7px_16px_rgba(0,0,0,0.07)]'>
              <div className='min-w-0 flex-1'>
                <div className='flex items-center justify-between gap-3'>
                  <span className='rounded-full bg-skyblue-bg px-2 py-1 text-[10px] font-semibold text-skyblue-text'>{formatCategory(communityPreview.category)}</span>
                  <span className='text-[12px] font-medium text-gray-400'>{formatTimeAgo(communityPreview.createdAt)}</span>
                </div>
                <h3 className='mt-3 truncate text-[15px] font-bold leading-none'>{communityPreview.title}</h3>
                <div className='mt-4 flex items-center gap-5 text-[12px] font-semibold text-gray-500'>
                  <span className='flex items-center gap-2'>
                    <span className='h-5 w-5 rounded-full bg-[linear-gradient(135deg,#06C65F,#66E1FF)]' />
                    {communityPreview.writer}
                  </span>
                  <span className='flex items-center gap-1'>
                    <span className='h-3 w-3 rounded-[2px] border border-gray-400' />
                    {communityPreview.numComments}
                  </span>
                </div>
              </div>
              {communityPreview.imageUrl && (
                <img
                  src={communityPreview.imageUrl}
                  alt=''
                  className='h-[58px] w-[58px] shrink-0 rounded-xl object-cover'
                />
              )}
            </button>
          </section>
        )}

        <section className='mt-5'>
          <button type='button' onClick={() => navigate('/reward/store')} className='flex items-center text-[18px] font-bold leading-none'>
            리워드 상점 <span className='ml-1 text-2xl leading-none'>›</span>
          </button>

          {isRewardProductsPending ? (
            <p className='py-8 text-center text-sm text-gray-500'>상품을 불러오는 중이에요...</p>
          ) : isRewardProductsError ? (
            <p className='py-8 text-center text-sm text-gray-500'>상품을 불러오지 못했어요.</p>
          ) : rewardProducts.length === 0 ? (
            <p className='py-8 text-center text-sm text-gray-500'>등록된 상품이 없어요.</p>
          ) : (
            <ul className='mt-3 flex flex-col gap-3'>
              {rewardProducts.map((product) => (
                <li key={product.rewardProductId}>
                  <RewardProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <Modal
        isOpen={isLogoutModalOpen}
        title='로그아웃 하시겠습니까?'
        buttonText='로그아웃 하기'
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        titleLineHeight='100%'
      />
    </div>
  );
}
