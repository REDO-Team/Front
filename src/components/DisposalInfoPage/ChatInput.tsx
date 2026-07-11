interface ChatBoxProps {
  message: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onSubmit: () => void;
}

export default function ChatInput({ message, onChange, onKeyDown, onSubmit }: ChatBoxProps) {
  return (
    <form
      className='flex justify-center items-center gap-0.5 px-4.5 pt-4 pb-7.5 rounded-t-[30px] fixed bottom-0 left-0 right-0 mx-auto z-50 w-full max-w-120 bg-white'
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor='messsage' className='sr-only'>
        질문 입력
      </label>
      <input type='text' name='messsage' id='messsage' placeholder='궁금한 점을 입력해주세요' className='flex-1 font-pretendard font-bold text-sm text-gray-500 border border-gray-200 rounded-full px-5 py-4 focus:outline-none focus:border-main-green1 disabled:bg-gray-100 disabled:cursor-not-allowed' value={message} onChange={(e) => onChange(e.target.value)} onKeyDown={onKeyDown} />
      <button type='submit' className='flex justify-center items-center px-5 py-4 gap-0.5 font-pretendard font-bold text-lg text-white bg-main-green1 rounded-full shrink-0 cursor-pointer disabled:cursor-not-allowed' disabled>
        전송
      </button>
    </form>
  );
}
