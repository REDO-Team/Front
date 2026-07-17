import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeartIcon from '../../assets/icons/hearts.svg?react';
import RewardHistoryIcon from '../../assets/icons/reward-history.svg?react';
import PostIcon from '../../assets/icons/post.svg?react';
import CommentIcon from '../../assets/icons/comments.svg?react';
import RightArrowIcon from '../../assets/icons/light-right-arrow.svg?react';
import LogoutIcon from '../../assets/icons/logout.svg?react';
import WithdrawIcon from '../../assets/icons/user-delete.svg?react';

import Modal from '../../components/common/Modal';

interface MenuItem {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path: string;
}

type ModalType = 'logout' | 'withdraw' | null;

type WithdrawReason =
  | 'rejoin'
  | 'inconvenient'
  | 'lackReward'
  | 'lowUsage'
  | null;

interface WithdrawReasonItem {
  id: Exclude<WithdrawReason, null>;
  label: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    label: '즐겨찾기한 배출 정보',
    icon: HeartIcon,
    path: '/my/favorites',
  },
  {
    label: '리워드 사용 내역',
    icon: RewardHistoryIcon,
    path: '/my/history',
  },
  {
    label: '내가 작성한 글',
    icon: PostIcon,
    path: '/my/posts',
  },
  {
    label: '내가 작성한 댓글',
    icon: CommentIcon,
    path: '/my/comments',
  },
];

const WITHDRAW_REASONS: WithdrawReasonItem[] = [
  {
    id: 'rejoin',
    label: '탈퇴 후 재가입',
  },
  {
    id: 'inconvenient',
    label: '서비스 이용 불편',
  },
  {
    id: 'lackReward',
    label: '리워드 보상 부족',
  },
  {
    id: 'lowUsage',
    label: '이용 빈도 낮음',
  },
];

const MyPage = () => {
  const navigate = useNavigate();

  const [modalType, setModalType] = useState<ModalType>(null);
  const [withdrawReason, setWithdrawReason] =
    useState<WithdrawReason>(null);

  const closeModal = () => {
    setModalType(null);
    setWithdrawReason(null);
  };

  const openLogoutModal = () => {
    setModalType('logout');
  };

  const openWithdrawModal = () => {
    setWithdrawReason(null);
    setModalType('withdraw');
  };

  const handleLogout = () => {
    // 백엔드 연결 후 토큰 삭제 로직 추가
    localStorage.removeItem('accessToken');

    closeModal();
    navigate('/login');
  };

  const handleWithdraw = () => {
    if (!withdrawReason) return;

    // 백엔드 연결 후 회원탈퇴 API 호출
    console.log('선택한 탈퇴 사유:', withdrawReason);

    closeModal();
    navigate('/login');
  };

  return (
    <>
      <div className='flex min-h-full w-full flex-col overflow-y-auto bg-white px-5 pb-[100px] font-pretendard text-text'>
        {/* 프로필 */}
        <section className='mt-[24px] flex h-[80px] w-full items-center'>
          <div className='h-[80px] w-[80px] shrink-0 rounded-full bg-gradient-to-br from-main-green1 to-main-sky' />

          <button
            type='button'
            onClick={() => navigate('/my-page/profile')}
            className='ml-[14px] flex min-w-0 flex-1 items-center text-left'
          >
            <div className='min-w-0 flex-1'>
              <p className='truncate text-[20px] font-bold leading-[24px] text-gray-900'>
                지구
              </p>

              <p className='mt-[2px] truncate text-[14px] font-medium leading-[18px] text-gray-500'>
                ReDO의 지구지킴이
              </p>
            </div>

            <RightArrowIcon className='h-6 w-6 shrink-0' />
          </button>
        </section>

        {/* 포인트 카드 */}
        <section className='mt-[24px] flex h-[80px] w-full flex-col justify-center rounded-[20px] bg-bg-green1 px-[16px]'>
          <p className='text-[14px] font-medium leading-[18px] text-gray-500'>
            나의 포인트
          </p>

          <p className='mt-[2px] text-[24px] font-bold leading-[31px] tracking-[-1px] text-main-green1'>
            5,000
            <span className='ml-[2px] text-[16px] font-bold leading-[31px] tracking-[-1px]'>
              P
            </span>
          </p>
        </section>

        {/* 나의 활동 */}
        <section className='mt-[28px]'>
          <h2 className='text-[18px] font-semibold leading-[100%] tracking-[-0.01em] text-[#111111]'>
            나의 활동
          </h2>

          <div className='mt-[30px] flex w-full flex-col gap-[15px]'>
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type='button'
                  onClick={() => navigate(item.path)}
                  className='flex h-[43px] w-full shrink-0 items-center text-left'
                >
                  <Icon className='h-6 w-6 shrink-0' />

                  <span className='ml-[14px] min-w-0 flex-1 truncate text-[16px] font-medium leading-[22px] tracking-[0] text-gray-800'>
                    {item.label}
                  </span>

                  <RightArrowIcon className='h-6 w-6 shrink-0' />
                </button>
              );
            })}
          </div>
        </section>

        {/* 계정 메뉴 */}
        <section className='mt-[55px] shrink-0 border-t border-gray-200 pt-[24px]'>
          <button
            type='button'
            onClick={openLogoutModal}
            className='flex h-[24px] w-full items-center text-gray-400'
          >
            <LogoutIcon className='h-6 w-6 shrink-0' />

            <span className='ml-[12px] text-[16px] font-medium leading-[18px]'>
              로그아웃
            </span>
          </button>

          <button
            type='button'
            onClick={openWithdrawModal}
            className='mt-[16px] flex h-[24px] w-full items-center text-delete'
          >
            <WithdrawIcon className='h-6 w-6 shrink-0' />

            <span className='ml-[12px] text-[16px] font-medium leading-[18px]'>
              회원탈퇴
            </span>
          </button>
        </section>
      </div>

      {/* 로그아웃 모달 */}
      <Modal
        isOpen={modalType === 'logout'}
        title='로그아웃 하시겠습니까?'
        buttonText='로그아웃 하기'
        onClose={closeModal}
        onConfirm={handleLogout}
        titleLineHeight='100%'
      />

      {/* 회원탈퇴 모달 */}
      <Modal
        isOpen={modalType === 'withdraw'}
        title='탈퇴 사유를 선택해주세요'
        buttonText='회원 탈퇴하기'
        onClose={closeModal}
        onConfirm={handleWithdraw}
        //buttonDisabled={withdrawReason === null}
        titleLineHeight='100%'
      >
        <div className='grid grid-cols-2 gap-x-[12px] gap-y-[12px]'>
          {WITHDRAW_REASONS.map((reason) => {
            const isSelected = withdrawReason === reason.id;

            return (
              <button
                key={reason.id}
                type='button'
                onClick={() => setWithdrawReason(reason.id)}
                className='flex items-center whitespace-nowrap text-left'
              >
                <span
                  className={`mr-[7px] flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? 'border-main-green1'
                      : 'border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <span className='h-[8px] w-[8px] rounded-full bg-main-green1' />
                  )}
                </span>

                <span className='text-[12px] font-medium leading-[16px] text-gray-800'>
                  {reason.label}
                </span>
              </button>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default MyPage;