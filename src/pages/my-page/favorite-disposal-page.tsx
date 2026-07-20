import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HomeIcon from '../../assets/icons/home.svg';
import TopBar from '../../components/common/TopBar';
import { MOCK_FAVORITE_DISPOSALS } from '../../mocks/favorite-disposal';

const FavoriteDisposalPage = () => {
  const navigate = useNavigate();

  const [favorites] = useState(MOCK_FAVORITE_DISPOSALS);

  const handleFavoriteClick = (favoriteId: number) => {
    navigate(`/my/favorites/${favoriteId}`);
  };

  return (
    <div className='min-h-screen bg-[#F9FBFB]'>
      <TopBar
        title='즐겨찾기한 배출정보'
        leftIcon
        rightIcon={HomeIcon}
        onClick={() => navigate('/')}
        bgColor='#F9FBFB'
      />

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
          <div className='flex min-h-[500px] items-center justify-center'>
            <p className='text-[14px] font-medium text-gray-400'>
              즐겨찾기한 배출정보가 없습니다.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default FavoriteDisposalPage;