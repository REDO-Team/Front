import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import HeartIcon from '../../assets/icons/hearts.svg?react';
import RewardHistoryIcon from '../../assets/icons/reward-history.svg?react';
import PostIcon from '../../assets/icons/post.svg?react';
import CommentIcon from '../../assets/icons/comments.svg?react';
import RightArrowIcon from '../../assets/icons/light-right-arrow.svg?react';
import LogoutIcon from '../../assets/icons/logout.svg?react';
import WithdrawIcon from '../../assets/icons/user-delete.svg?react';

import Modal from '../../components/common/Modal';

import {
  CHARACTER_IMAGE_MAP,
  isCharacterCode,
} from '../../constants/character';

import {
  getMyInfo,
  getWithdrawalReasons,
  withdrawUser,
} from '../../apis/user';
import { logout } from '../../apis/auth';
import { clearAuthData } from '../../apis/token';

interface MenuItem {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path: string;
}

type ModalType = 'logout' | 'withdraw' | null;

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

const labelMap: Record<number, string> = {
  1: '탈퇴 후 재가입',
  2: '서비스 이용 불편',
  3: '리워드 보상 부족',
  4: '이용 빈도 낮음',
};

const MyPage = () => {
  const navigate = useNavigate();

  const [modalType, setModalType] = useState<ModalType>(null);
  const [withdrawReasonId, setWithdrawReasonId] =
    useState<number | null>(null);

  const {
    data: user,
    isPending: isUserPending,
    isError: isUserError,
  } = useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
  });

  const {
    data: withdrawalReasons,
    isPending: isWithdrawalReasonPending,
    isError: isWithdrawalReasonError,
  } = useQuery({
    queryKey: ['withdrawalReasons'],
    queryFn: getWithdrawalReasons,
    enabled: modalType === 'withdraw',
  });

  const closeModal = () => {
    setModalType(null);
    setWithdrawReasonId(null);
  };

  const openLogoutModal = () => {
    setModalType('logout');
  };

  const openWithdrawModal = () => {
    setWithdrawReasonId(null);
    setModalType('withdraw');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearAuthData();
      closeModal();
      navigate('/login', { replace: true });
    }
  };

  const handleWithdraw = async () => {
    if (withdrawReasonId === null) return;

    try {
      await withdrawUser(withdrawReasonId);

      clearAuthData();
      closeModal();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
    }
  };

  if (isUserPending) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#F9FBFB]'>
        회원 정보를 불러오는 중이에요...
      </div>
    );
  }

  if (isUserError || !user) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#F9FBFB]'>
        회원 정보를 불러오지 못했어요.
      </div>
    );
  }

  const profileImageValue = user.profileImageUrl;

  const CharacterIcon =
    profileImageValue && isCharacterCode(profileImageValue)
      ? CHARACTER_IMAGE_MAP[profileImageValue]
      : null;

  const isUploadedImage =
    profileImageValue !== null &&
    !isCharacterCode(profileImageValue);

  return (
    <>
      <div className='flex min-h-screen w-full flex-col overflow-y-auto bg-[#F9FBFB] px-5 pb-[100px] font-pretendard text-text'>
        {/* 프로필 */}
        <section className='mt-[24px] flex h-[80px] w-full items-center'>
          <div className='flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white'>
            {CharacterIcon ? (
              <CharacterIcon className='h-full w-full translate-x-[2px] scale-[1.1]' />
            ) : isUploadedImage ? (
              <img
                src={profileImageValue}
                alt={`${user.nickname} 프로필`}
                className='h-full w-full object-cover'
              />
            ) : null}
          </div>

          <button
            type='button'
            onClick={() => navigate('/my/profile')}
            className='ml-[14px] flex min-w-0 flex-1 items-center text-left'
          >
            <div className='min-w-0 flex-1'>
              <p className='truncate text-[20px] font-bold leading-[24px] text-gray-900'>
                {user.nickname}
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
            {user.totalPoint.toLocaleString()}
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
        titleLineHeight='100%'
      >
        <div className='grid grid-cols-2 gap-x-[12px] gap-y-[12px]'>
          {isWithdrawalReasonPending ? (
            <p className='col-span-2 text-center text-[12px] text-gray-500'>
              탈퇴 사유를 불러오는 중이에요.
            </p>
          ) : isWithdrawalReasonError ||
            !withdrawalReasons ? (
            <p className='col-span-2 text-center text-[12px] text-delete'>
              탈퇴 사유를 불러오지 못했어요.
            </p>
          ) : (
            withdrawalReasons
  .filter((reason) => reason.reasonId !== 5)
  .map((reason) => {
              
              const isSelected =
                withdrawReasonId === reason.reasonId;

              return (
                <button
                  key={reason.reasonId}
                  type='button'
                  onClick={() =>
                    setWithdrawReasonId(reason.reasonId)
                  }
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
                    {labelMap[reason.reasonId]}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </Modal>
    </>
  );
};

export default MyPage;