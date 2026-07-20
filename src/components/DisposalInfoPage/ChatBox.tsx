import LogoProfile from '/src/assets/icons/logo-profile.svg';
import Inputting from '/src/assets/icons/inputting.svg?react';

interface ChatBoxProps {
  isMine: boolean;
  message: string;
  loading?: boolean;
}

export default function ChatBox({ isMine, message, loading = false }: ChatBoxProps) {
  return (
    <div className={`flex gap-4 ${!isMine ? 'justify-start' : 'justify-end'}`}>
      {!isMine && <img src={LogoProfile} alt='REDO AI' className='w-16 h-16' />}
      <div className={`flex flex-col gap-1.5 p-5 shadow-lg shadow-black/5 rounded-[30px] max-w-[256px] ${!isMine ? 'bg-white rounded-tl-[10px]' : 'bg-linear-to-tl  from-main-sky to-main-green1 rounded-tr-[10px]'}`}>
        {!isMine && <span className='font-pretendard font-bold text-sm text-main-green1'>리도 AI</span>}
        {loading ? <Inputting /> : <p className={`font-pretendard font-medium text-base break-keep ${!isMine ? 'text-text' : 'text-white'}`}>{message}</p>}
      </div>
    </div>
  );
}
