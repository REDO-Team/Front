import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/common/TopBar';
import Home from '/src/assets/icons/home.svg';
import Info from '/src/assets/icons/info.svg?react';
import Check from '/src/assets/icons/check.svg?react';
import FailInfo from '../../components/common/FailInfo';
import CategoryCard from '../../components/DisposalInfoPage/CategoryCard';
import { useState } from 'react';
import { CATEGORY_LIST } from '../../constants/recycle-category';

export default function DisposalInfoFailPage() {
  const navigate = useNavigate();
  const [openCard, setOpenCard] = useState<string>('');

  const handleCategoryCard = (category: string) => {
    setOpenCard((prev) => (prev === category ? '' : category));
  };

  return (
    <div className='h-full'>
      <div className='mb-10'>
        <TopBar title='배출 정보' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-green1' />
      </div>

      <div className='flex flex-col h-full px-5'>
        <FailInfo title='물품을 정확하게 인식하지 못했어요' content={`더 정확한 안내를 위해 \n 카테고리를 선택해주세요.`} />

        <div className='flex flex-col gap-3 mb-6'>
          {CATEGORY_LIST.map((c) => {
            return <CategoryCard Icon={c.icon} category={c.category} onClick={() => handleCategoryCard(c.category)} isOpen={c.category === openCard} />;
          })}
        </div>

        <div className='flex flex-col gap-2.5 px-6 py-5 bg-bg-green2 rounded-[20px]'>
          <div className='flex gap-2.5 items-center'>
            <Info className='w-6 h-6 text-main-green2' />
            <span className='font-pretendard font-bold text-lg text-main-green2'>AI TIP</span>
          </div>

          <div className='flex flex-col gap-1'>
            <div className='flex gap-2.5 items-center'>
              <Check className='text-main-green2' />
              <p className='font-pretendard font-bold text-sm text-main-green2'>가장 비슷한 카테고리의 품목을 선택해주세요.</p>
            </div>
            <div className='flex gap-2.5 items-center'>
              <Check className='text-main-green2' />
              <p className='font-pretendard font-bold text-sm text-main-green2'>선택한 품목 기준으로 배출 방법을 다시 안내해드려요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
