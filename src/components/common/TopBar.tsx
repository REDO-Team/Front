import LeftArrow from '/src/assets/icons/left-arrow.svg';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  title?: string;
  leftIcon?: boolean;
  leftText?: string; // leftIcon 옆에 글자를 바로 적고 싶을 때 사용. leftIcon에서 두 덩어리로 작성해도 됨.
  rightIcon?: string;
  onClick?: () => void;
  bgColor?: string;
}

export default function TopBar({ title, leftIcon, leftText, rightIcon, onClick, bgColor = 'white' }: TopBarProps) {
  const navigate = useNavigate();

  return (
    <header className={`fixed top-0 w-full max-w-120 flex items-center justify-between h-14 px-4 z-50 bg-${bgColor}`}>
      {/* 왼쪽 아이콘 영역 */}
      {/* 꺾새 옆에 바로 글자를 적을 때 leftIcon에서 두 덩어리로 작성해주세요! */}
      {(leftIcon || leftText) && (
        <div className='flex items-center justify-center z-10 text-lg font-semibold leading-none text-text' onClick={() => navigate(-1)}>
          <button type='button' className='w-6 h-6 flex justify-center items-center cursor-pointer'>
            {leftIcon && <img src={LeftArrow} alt='뒤로가기' />}
          </button>
          {leftText && <span className='text-lg font-semibold leading-none text-center text-black'>{leftText}</span>}
        </div>
      )}

      {/* 가운데 제목 영역 */}
      {title && (
        <div className='absolute inset-0 flex items-center justify-center px-12 pointer-events-none'>
          <span className='max-w-full truncate whitespace-nowrap text-lg font-pretendard font-semibold leading-none text-center text-text'>{title}</span>
        </div>
      )}

      {/* 오른쪽 아이콘 영역 */}
      {rightIcon && (
        <button type='button' onClick={onClick}>
          <img src={rightIcon} alt='홈으로 가기' className='ml-auto flex items-center justify-end z-10 text-base font-semibold text-text' />
        </button>
      )}
    </header>
  );
}
