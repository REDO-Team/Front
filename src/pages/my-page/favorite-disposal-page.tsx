import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';

import Logo from '../../assets/icons/Big-logo.svg?react';

import { MOCK_FAVORITE_DISPOSALS } from '../../mocks/favorite-disposal';

const FavoriteDisposalPage = () => {
  const navigate = useNavigate();

  const [favorites] = useState(MOCK_FAVORITE_DISPOSALS);
  const [isLoading] = useState(false);

  const handleFavoriteClick = (favoriteId: number) => {
    navigate(`/my/favorites/${favoriteId}`);
  };

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-bg-my'>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className='min-h-screen bg-[#F9FBFB]'>

      <main className='px-[20px] pt-[72px]'>
        {favorites.length > 0 ? (
          <section className='flex flex-col gap-[10px]'>
            {favorites.map(favorite => (
              <article
                key={favorite.id}
                onClick={() =>
                  handleFavoriteClick(favorite.id)
                }
                className='h-[81px] w-full cursor-pointer rounded-[16px] bg-white px-[16px] py-[14px] shadow-[0_3px_12px_rgba(0,0,0,0.08)]'
              >
                <div className='flex h-full flex-col gap-[9px]'>
                  <time className='block truncate text-[14px] font-medium leading-[100%] tracking-[0] text-[#111111]'>
                    {favorite.createdAt}
                  </time>

                  <h2 className='truncate text-[18px] font-semibold leading-[100%] tracking-[-0.01em] text-[#111111]'>
                    {favorite.title}
                  </h2>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className='flex min-h-[calc(100vh-72px)] flex-col items-center justify-center pb-[80px]'>
                <Logo className='h-[146px] w-[161px]' />
                <p className='mt-[38px] text-center text-[22px] font-bold leading-[130%] tracking-[0] text-[#6B6B6B]'>
                    즐겨찾기한 배출정보가 없어요
                </p>
            </div>
        )}
      </main>
    </div>
  );
};

export default FavoriteDisposalPage;