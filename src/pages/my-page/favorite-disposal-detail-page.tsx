import { useParams } from 'react-router-dom';

import FullCheck from '../../assets/icons/full-check.svg?react';
import Info from '../../assets/icons/info.svg?react';

import RecycleCategoryCard from '../../components/common/RecycleCategoryCard';

import { MOCK_FAVORITE_DISPOSALS } from '../../mocks/favorite-disposal';

const FavoriteDisposalDetailPage = () => {
  const { favoriteId } = useParams();

  const favorite = MOCK_FAVORITE_DISPOSALS.find((item) => item.id === Number(favoriteId));

  if (!favorite) {
    return (
      <div className='min-h-screen bg-[#F9FBFB]'>
        <main className='flex min-h-[500px] items-center justify-center px-5 pt-[72px]'>
          <p className='text-[14px] font-medium text-gray-400'>해당 배출 정보를 찾을 수 없습니다.</p>
        </main>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#F9FBFB]'>
      <main className='flex flex-col px-5 pb-[32px] pt-[72px]'>
        <RecycleCategoryCard padding={20} gap={12} radius={20} imgSize={80} categorySize={12} nameSize={24} category={favorite.category} name={favorite.name} content={favorite.content} />

        <section className='mt-[30px] flex flex-col gap-3'>
          <h2 className='font-pretendard text-[18px] font-bold text-text'>이렇게 배출해주세요</h2>

          <div className='flex flex-col gap-5 rounded-xl bg-white px-[26px] py-6 shadow-lg shadow-black/5'>
            {favorite.guide.map((guide, index) => (
              <div key={`${favorite.id}-${index}`} className='flex items-center gap-3'>
                <FullCheck className='h-[18px] w-[18px] shrink-0' />

                <p className='font-pretendard text-base font-medium text-gray-800'>{guide}</p>
              </div>
            ))}
          </div>

          {favorite.info && (
            <div className='flex items-center gap-2.5 rounded-[20px] bg-bg-green2 px-6 py-3.5'>
              <Info className='h-6 w-6 shrink-0 text-main-green1' />

              <p className='font-pretendard text-sm font-medium text-main-green2'>{favorite.info}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default FavoriteDisposalDetailPage;
