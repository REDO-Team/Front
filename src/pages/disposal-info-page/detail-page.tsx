import { useLocation, useNavigate } from 'react-router-dom';
import Favorites from '/src/assets/icons/favorites.svg';
import FullCheck from '/src/assets/icons/full-check.svg?react';
import Info from '/src/assets/icons/info.svg?react';
import RecycleCategoryCard from '../../components/common/RecycleCategoryCard';
import Modal from '../../components/common/Modal';
import { useState } from 'react';
import type { Guides } from '../../types/disposal-guide';
import { postGuideFavorite } from '../../apis/disposal-guide';

export default function DisposalInfoDetailage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const guide: Guides = location?.state?.guide;
  console.log(guide);

  const isRecyclePossible = guide?.name.includes('일반쓰레기');

  const handleFavorites = async () => {
    try {
      const data = await postGuideFavorite(guide?.guideId);
      console.log(data);

      setIsOpen(true);
    } catch (e) {
      alert('접속이 원활하지 않습니다. 잠시 후 다시 시도해 주세요.');
      console.error('guide favorite post error', e);
    }
  };

  const handleNavigate = () => {
    if (guide?.name.includes('쓰레기')) {
      navigate('/');
    } else {
      navigate('/certification');
    }
  };

  return (
    <div className='h-full pt-5'>
      <div className='flex flex-col h-full px-5'>
        <RecycleCategoryCard padding={20} gap={12} radius={20} imgSize={80} categorySize={12} nameSize={24} category={guide?.recycleCategory} name={guide?.name} content={isRecyclePossible ? '분리배출이 불가능한 품목이에요' : '분리배출이 가능한 품목이에요'} />

        <div className='flex flex-col gap-3 mt-7.5'>
          <p className='font-pretendard font-bold text-lg text-text'>이렇게 배출해주세요</p>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-5 px-6.5 py-6 rounded-xl bg-white shadow-lg shadow-black/5'>
              {guide?.guideSteps &&
                guide?.guideSteps?.map((g, idx) => {
                  return (
                    <div className='flex items-center gap-3' key={idx}>
                      <FullCheck className='w-4.5 h-4.5 shrink-0' />
                      <p className='font-pretendard font-medium text-base text-gray-800'>{g}</p>
                    </div>
                  );
                })}
            </div>
            {guide?.tip && (
              <div className='flex items-center gap-2.5 px-6 py-3.5 bg-bg-green2 rounded-[20px]'>
                <Info className='text-main-green1 w-6 h-6' />
                <p className='font-pretendard font-medium text-sm text-main-green2'>{guide?.tip}</p>
              </div>
            )}
          </div>
        </div>

        <div className='w-full flex flex-col gap-2.5 mt-auto'>
          <button type='button' className='font-pretendard font-bold text-lg text-main-green1 rounded-4xl bg-white border border-[#C8F5DA] py-4 w-full flex items-center justify-center gap-1.5' onClick={handleFavorites}>
            <img src={Favorites} alt='즐겨찾기' />
            <span>즐겨찾기 저장</span>
          </button>
          <button type='button' className='font-pretendard font-bold text-lg text-white rounded-4xl bg-main-green1 px-5 py-4 w-full flex items-center justify-center' onClick={handleNavigate}>
            {guide?.name.includes('쓰레기') ? '홈으로' : '가이드대로 배출 후 인증'}
          </button>
        </div>

        {isOpen && (
          <Modal
            isOpen={isOpen}
            title='즐겨찾기 저장 완료'
            buttonText='보러 가기'
            onClose={() => setIsOpen(false)}
            onConfirm={() => {
              navigate('/my/favorites'); //즐겨찾기 페이지로 이동
            }}
          />
        )}
      </div>
    </div>
  );
}
