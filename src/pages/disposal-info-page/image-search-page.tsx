import { useNavigate } from 'react-router-dom';
import ShootCard from '../../components/common/ShootCard';
import { useRef, useState } from 'react';
import { postGuideImageSearch } from '../../apis/disposal-guide';
import PhotoAnalysisLoading from '../../components/common/PhotoAnalysisLoading';

export default function ImageSearchPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleGallaryClick = () => {
    fileInputRef.current?.click();
  };

  const handleSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);
    try {
      const data = await postGuideImageSearch(file);
      // 이미지 검색 성공
      if (data.result?.identified) {
        navigate('/disposal-info/detail', {
          state: {
            guide: data?.result?.guideDetail,
          },
        });
      }
      // 이미지 검색 실패
      else {
        navigate('/disposal-info/fail');
      }
    } catch (e) {
      alert('접속이 원활하지 않습니다. 잠시 후 다시 시도해 주세요.');
      console.error('guide image search error', e);
    }
  };

  return (
    <>
      {!loading && (
        <div className='h-full pt-5'>
          <div className='flex flex-col h-full px-6.5'>
            <ShootCard />

            <div className='flex flex-col gap-3 bg-white rounded-xl px-6 py-4 mt-5 shadow-lg shadow-black/5'>
              <span className='font-pretendard font-bold text-base text-text'>촬영 팁</span>
              <ul className='flex flex-col gap-1.5 list-disc pl-5 font-pretendard font-medium text-sm text-gray-600'>
                <li>사물이 잘 보이도록 촬영해 주세요</li>
                <li>정면에서 찍으면 더 정확해요</li>
              </ul>
            </div>

            <input type='file' accept='image/*' className='hidden' ref={fileInputRef} onChange={handleSelectImage} />

            <div className='w-full flex flex-col gap-2.5 mt-auto'>
              <button type='button' className='font-pretendard font-bold text-lg text-main-green2 rounded-4xl bg-white border border-[#C8F5DA] py-4 w-full flex items-center justify-center' onClick={handleGallaryClick}>
                갤러리에서 불러오기
              </button>
              <button type='button' className='font-pretendard font-bold text-lg text-white rounded-4xl bg-main-green1 px-5 py-4 w-full flex items-center justify-center' onClick={() => navigate('/camera', { state: { from: 'info' } })}>
                촬영하기
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className='h-[calc(100dvh-56px)] pt-14'>
          <PhotoAnalysisLoading showNoti={false} />
        </div>
      )}
    </>
  );
}
