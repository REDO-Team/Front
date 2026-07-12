import Error from '/src/assets/icons/error.svg';

interface FailInfoProps {
  title: string;
  content: string;
}

export default function FailInfo({ title, content }: FailInfoProps) {
  return (
    <div className='flex flex-col gap-7.5 justify-center items-center text-center flex-1'>
      <img src={Error} alt='실패' className='w-20 h-20 drop-shadow-[0_0_10px_#EA433580]' />
      <div className='flex flex-col gap-2.5'>
        <p className='font-pretendard font-bold text-[22px] text-text break-keep'>{title}</p>
        <p className='font-pretendard font-semibold text-base text-gray-500 break-keep whitespace-pre-line'>{content}</p>
      </div>
    </div>
  );
}
