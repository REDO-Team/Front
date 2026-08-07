import { postGuideTextSearch } from '../../apis/disposal-guide';
import ChatBox from '../../components/DisposalInfoPage/ChatBox';
import ChatInput from '../../components/DisposalInfoPage/ChatInput';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { Guides } from '../../types/disposal-guide';

const INPUT_BAR_H = 106;
const STORAGE_KEY = 'problem-search-messages';

export default function ProblemSearchPage() {
  const [newMessage, setnewMessage] = useState<string>('');
  const [messages, setMessages] = useState<
    {
      isMine: boolean;
      message: string | undefined;
      isIdentified: boolean | undefined;
    }[]
  >(() => {
    const savedMessages = sessionStorage.getItem(STORAGE_KEY);

    if (savedMessages) {
      try {
        return JSON.parse(savedMessages);
      } catch (error) {
        console.error('Session Storage Message Call Error', error);
      }
    }

    return [
      {
        isMine: false,
        message: '안녕하세요! 올바른 분리배출, 제가 도와드릴게요. 문제 상황을 입력해주세요!',
        isIdentified: false,
      },
    ];
  });
  const [loading, setLoading] = useState(false);
  const [guide, setGuide] = useState<Guides>();

  // 키보드 높이 조정
  const [kb, setKb] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages, loading]);

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

  // 세션 스토리지에 저장된 메시지 불러오기
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    setMessages((prev) => [...prev, { isMine: true, message: newMessage, isIdentified: false }]);
    setnewMessage('');

    // 데이터 호출 예시
    setLoading(true);
    try {
      const data = await postGuideTextSearch(newMessage);
      setMessages((prev) => [...prev, { isMine: false, message: data.result?.reason, isIdentified: data.result?.identified }]);
      setGuide(data.result?.guideDetail);
    } catch (e) {
      alert('접속이 원활하지 않습니다. 잠시 후 다시 시도해 주세요.');
      console.error('guide text search error', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-full overflow-x-hidden flex mt-5'>
      <div className='flex flex-col px-6.5 flex-1 overflow-y-auto'>
        <div className='flex flex-col gap-6'>
          {messages.map((m, idx) => {
            return <ChatBox key={idx} isMine={m.isMine} message={m.message} isIdentified={m.isIdentified} guide={guide} />;
          })}
        </div>
        {loading && <ChatBox isMine={false} message='' loading={loading} />}

        <div
          ref={bottomRef}
          style={{
            height: `calc(${INPUT_BAR_H}px + ${kb}px + 8px)`,
            flexShrink: 0,
          }}
        ></div>
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
