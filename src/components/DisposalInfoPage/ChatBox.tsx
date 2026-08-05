import LogoProfile from '/src/assets/icons/logo-profile.svg';
import Inputting from '/src/assets/icons/inputting.svg?react';
import { useNavigate } from 'react-router-dom';
import type { Guides } from '../../types/disposal-guide';

interface ChatBoxProps {
  isMine: boolean;
  message: string | undefined;
  loading?: boolean;
  isIdentified?: boolean;
  guide?: Guides;
}

export default function ChatBox({ isMine, message, loading = false, isIdentified = false, guide = undefined }: ChatBoxProps) {
  const navigate = useNavigate();

  return (
    <div className={`flex gap-4 ${!isMine ? 'justify-start' : 'justify-end'}`}>
      {!isMine && <img src={LogoProfile} alt='REDO AI' className='w-16 h-16' />}
      <div className={`flex flex-col gap-1.5 p-5 shadow-lg shadow-black/5 rounded-[30px] max-w-[256px] ${!isMine ? 'bg-white rounded-tl-[10px]' : 'bg-linear-to-tl  from-main-sky to-main-green1 rounded-tr-[10px]'}`}>
        {!isMine && <span className='font-pretendard font-bold text-sm text-main-green1'>리도 AI</span>}
        {loading ? <Inputting /> : <p className={`font-pretendard font-medium text-base break-keep ${!isMine ? 'text-text' : 'text-white'}`}>{message}</p>}
        {!isMine && isIdentified && (
          <button type='button' className='font-pretendard font-bold text-base text-white bg-main-green1 rounded-[20px] w-full py-3 mt-3' onClick={() => navigate('/disposal-info/detail', { state: { guide } })}>
            가이드 보러가기
          </button>
        )}
      </div>
    </div>
  );
}
