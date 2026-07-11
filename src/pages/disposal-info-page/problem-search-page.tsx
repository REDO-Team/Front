import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/common/TopBar';
import Home from '/src/assets/icons/home.svg';
import ChatBox from '../../components/DisposalInfoPage/ChatBox';
import ChatInput from '../../components/DisposalInfoPage/ChatInput';
import { useEffect, useState, type KeyboardEvent } from 'react';

const INPUT_BAR_H = 106;

const ChatMessages = [
  {
    msg: '현재 플라스틱 용기가 어떤 상태인가요? 오염물이 묻어있거나 비닐이 쌓여있는지 알려주세요!',
    // user: '지금 빨간 국물들이 조금 묻어있는 상태야',
  },
  {
    msg: '배출 정보를 찾고 있습니다! 잠시만 기다려주세요..',
  },
];

export default function ProblemSearchPage() {
  const navigate = useNavigate();
  const [newMessage, setnewMessage] = useState<string>('');
  const [messages, setMessages] = useState<{ isMine: boolean; message: string }[]>([
    {
      isMine: false,
      message: '안녕하세요! 올바른 분리배출, 제가 도와드릴게요. 문제 상황을 입력해주세요!',
      // user: '이거 어떻게 버리는지 모르겠어',
    },
  ]);
  const [kb, setKb] = useState(0);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const onResize = () => {
      const raw = Math.max(0, window.innerHeight - vv.height - (vv.offsetTop || 0));

      setKb(raw > 80 ? raw : 0);
    };

    vv.addEventListener('resize', onResize);
    vv.addEventListener('scroll', onResize);

    onResize();

    return () => {
      vv.removeEventListener('resize', onResize);
      vv.removeEventListener('scroll', onResize);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    setMessages((prev) => [...prev, { isMine: true, message: newMessage }]);
    setnewMessage('');

    // 데이터 호출 예시
    setTimeout(() => {
      setMessages((prev) => [...prev, { isMine: false, message: ChatMessages[0].msg }]);
    }, 1000);
  };

  return (
    <div className='h-full overflow-x-hidden'>
      <div className='mb-5'>
        <TopBar title='문제 상황 검색' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-green1' />
      </div>

      <div
        className='flex flex-col px-6.5 flex-1 overflow-y-auto'
        style={{
          paddingBottom: `calc(${INPUT_BAR_H}px + ${kb}px + 8px)`,
        }}
      >
        <div className='flex flex-col gap-6'>
          {messages.map((m, idx) => {
            return <ChatBox key={idx} isMine={m.isMine} message={m.message} />;
          })}
        </div>
      </div>

      <div
        style={{
          bottom: `calc(${kb}px + env(safe-area-inset-bottom, 0px))`,
        }}
      >
        <ChatInput message={newMessage} onChange={setnewMessage} onKeyDown={handleKeyDown} onSubmit={handleSend} />
      </div>
    </div>
  );
}
