import { useNavigate } from 'react-router-dom';
import CategoryTag from './CategoryTag';
import DownArrow from '/src/assets/icons/down-arrow.svg?react';
import UpArrow from '/src/assets/icons/up-arrow.svg?react';
import { filterCategoryTags } from '../../utils/filterCategoryTag';
import { getDisposalGuide } from '../../apis/disposal-guide';

interface CategoryCardProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  category: string;
  onClick: () => void;
  isOpen: boolean;
}

export default function CategoryCard({ Icon, category, onClick, isOpen }: CategoryCardProps) {
  const navigate = useNavigate();

  const handleClickTag = async (tag: string) => {
    try {
      const data = await getDisposalGuide(tag);

      navigate('/disposal-info/detail', {
        state: {
          guide: data.result,
        },
      });
    } catch (e) {
      alert('접속이 원활하지 않습니다. 잠시 후 다시 시도해 주세요.');
      console.error('disposal guide error:', e);
    }
  };

  return (
    <div className={`flex flex-col px-6 py-4.5 bg-white rounded-[20px] shadow-lg shadow-black/3 ${isOpen && 'border-2 border-main-green1'}`} onClick={() => onClick()}>
      <div className={`w-full flex justify-between items-center ${isOpen && 'pb-3.5 border-b border-gray-200'}`}>
        <div className='flex items-center gap-2.5'>
          <Icon className={`w-6 h-6 ${isOpen ? 'text-main-green1' : 'text-text'}`} />
          <span className={`font-pretendard font-bold text-lg ${isOpen ? 'text-main-green1' : 'text-text'}`}>{category}</span>
        </div>
        {isOpen ? <UpArrow className='w-6 h-6 text-main-green1' /> : <DownArrow className='w-6 h-6 text-gray-400' />}
      </div>

      <div className={`inline-block ${isOpen && 'mt-2.5'}`}>
        {isOpen &&
          filterCategoryTags(category).map((tag, idx) => {
            return <CategoryTag key={idx} tagName={tag} onClick={() => handleClickTag(tag)} />;
          })}
      </div>
    </div>
  );
}
