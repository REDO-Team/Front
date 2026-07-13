import { useNavigate } from 'react-router-dom';
import RightArrow from '/src/assets/icons/right-arrow.svg?react';

interface InfoCategoryCardProps {
  img: string;
  color: string[];
  shadow: string;
  title: string;
  content: string;
  to: string;
}

export default function InfoCategoryCard({ img, color, shadow, title, content, to }: InfoCategoryCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className='w-full flex justify-between items-center p-5 rounded-[20px] bg-white shadow shadow-black/3'
      onClick={() => {
        navigate(`${to}`);
      }}
    >
      <div className='flex items-center gap-4.5'>
        <div
          className={`p-3 max-[60px] rounded-2xl`}
          style={{
            background: `linear-gradient(to top left, ${color[0]}, ${color[1]})`,
            filter: `drop-shadow(0 0 5px ${shadow})`,
          }}
        >
          <img src={img} alt={img} />
        </div>
        <div className='flex flex-col gap-1'>
          <span className='font-pretendard font-bold text-lg text-text'>{title}</span>
          <p className='font-pretendard font-bold text-sm text-gray-500 break-keep'>{content}</p>
        </div>
      </div>
      <RightArrow className='text-gray-400' />
    </div>
  );
}
