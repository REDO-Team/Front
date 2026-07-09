import { useLocation, Link } from 'react-router-dom';
import HomeIcon from '../../assets/icons/HomeIcon';
import HomeActiveIcon from '../../assets/icons/HomeActiveIcon';
import BookIcon from '../../assets/icons/BookIcon';
import BookActiveIcon from '../../assets/icons/BookActiveIcon';
import CommentIcon from '../../assets/icons/CommentIcon';
import CommentActiveIcon from '../../assets/icons/CommentActiveIcon';
import MyIcon from '../../assets/icons/MyIcon';
import MyActiveIcon from '../../assets/icons/MyActiveIcon';

// 각 페이지 완성 시 실제 경로로 수정 필요합니다.
const NAV_ITEMS = [
  { path: '/', label: '홈', Icon: HomeIcon, ActiveIcon: HomeActiveIcon },
  {
    path: '/guide',
    label: '가이드',
    Icon: BookIcon,
    ActiveIcon: BookActiveIcon,
  },
  {
    path: '/community',
    label: '커뮤니티',
    Icon: CommentIcon,
    ActiveIcon: CommentActiveIcon,
  },
  { path: '/my', label: '마이', Icon: MyIcon, ActiveIcon: MyActiveIcon },
];

interface BottomBarProps {
  className?: string;
}

export default function BottomBar({ className = '' }: BottomBarProps) {
  const { pathname } = useLocation();

  return (
    <nav aria-label='하단 내비게이션' className={`fixed bottom-0 left-0 right-0 mx-auto z-50 w-full max-w-120 h-24 bg-white rounded-t-[30px] shadow-[0_-4px_10.1px_rgba(0,0,0,0.05)] ${className}`}>
      <ul className='flex items-center justify-around h-full px-2'>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(`${item.path}/`));
          const CurrentIcon = isActive ? item.ActiveIcon : item.Icon;

          return (
            <li key={item.path} className='flex-1 h-full'>
              <Link to={item.path} aria-current={isActive ? 'page' : undefined} className='flex flex-col items-center justify-center w-full h-full gap-2'>
                <CurrentIcon className={isActive ? 'text-[#06C65F]' : 'text-gray-500'} />
                <span className='font-pretendard text-[13px] font-semibold text-gray-500'>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
