import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CameraIcon from '../../assets/icons/camera';
import { getCommunityDetail, updateCommunity } from '../../apis/community';

const CATEGORIES = ['정보공유', '리워드후기', '환경실천'];

const getCategoryNumber = (category: string) => {
  switch (category) {
    case '정보공유': return 1;
    case '리워드후기': return 2;
    case '환경실천': return 3;
    default: return 0;
  }
};

const formatCategoryString = (categoryValue: string | number) => {
  const value = String(categoryValue);
  if (value === '1') return '정보공유';
  if (value === '2') return '리워드후기';
  if (value === '3') return '환경실천';
  return '전체보기';
};

interface ExistingImage {
  imageId: number;
  imageUrl: string;
}

export default function CommunityModifyPage() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([]);

  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadPostData = async () => {
      if (!postId) return;
      try {
        const data = await getCommunityDetail(Number(postId));
        const postData = data.result || data;

        setSelectedCategory(formatCategoryString(postData.category));
        setTitle(postData.title);
        setContent(postData.content);

        if (postData.images) {
          setExistingImages(postData.images);
        }
      } catch (error) {
        console.error('게시글 정보 불러오기 실패', error);
        alert('게시글 정보를 불러오는데 실패했습니다.');
      }
    };
    loadPostData();
  }, [postId]);

  const totalImagesCount = existingImages.length + newImagePreviews.length;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (totalImagesCount >= 5) {
        alert('사진은 최대 5장까지 첨부 가능합니다.');
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setNewImagePreviews((prev) => [...prev, previewUrl]);
      setNewImageFiles((prev) => [...prev, file]);
    }
  };

  const removeExistingImage = (imageId: number) => {
    setExistingImages((prev) => prev.filter((img) => img.imageId !== imageId));
    setDeleteImageIds((prev) => [...prev, imageId]);
  };

  const removeNewImage = (indexToRemove: number) => {
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
    setNewImageFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const isFormValid = selectedCategory !== '' && title.trim() !== '' && content.trim() !== '';

  const handleSubmit = async () => {
    if (!postId || !isFormValid) {
      alert('제목, 본문을 모두 입력해주세요!');
      return;
    }

    try {
      const formData = new FormData();

      formData.append('category', String(getCategoryNumber(selectedCategory)));
      formData.append('title', title);
      formData.append('content', content);

      deleteImageIds.forEach((id) => {
        formData.append('deleteImageIds', String(id));
      });

      newImageFiles.forEach((file) => {
        formData.append('images', file);
      });

      const res = await updateCommunity(Number(postId), formData);

      if (res.isSuccess) {
        navigate('/community/modify-complete');
      } else {
        alert('게시글 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('게시글 수정 실패', error);
      alert('서버 오류로 게시글을 수정하지 못했습니다.');
    }
  };

  return (
    <div className='bg-bg-green1 min-h-screen pb-24 relative font-pretendard'>
      <main className='px-5 pt-6 pb-24 flex flex-col gap-4'>
        <section className='flex gap-2'>
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center justify-center 
                 px-5 py-2 
                 rounded-[20px] border transition-colors
                 ${isSelected ? 'bg-main-green1 border-main-green1 text-white' : 'bg-white border-gray-200 text-gray-600'} font-pretendard font-semibold text-[14px]`}
              >
                {category}
              </button>
            );
          })}
        </section>

        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='제목을 입력해주세요' className='placeholder:text-gray-500 w-full h-[60px] py-[17px] px-[24px] border border-[#EAEAEA] rounded-[20px] text-[15px] font-semibold border-gray-200 outline-none bg-white' />

        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='리도 사용자들과 자유롭게 소통해주세요.' className='placeholder:text-gray-500 w-full h-[148px] py-[17px] px-[24px] border border-[#EAEAEA] rounded-[20px] text-[15px] font-semibold border-gray-200 outline-none resize-none bg-white' />

        <div className='flex gap-3 overflow-x-visible pb-2'>
          <input type='file' accept='image/*' ref={fileInputRef} onChange={handleImageUpload} className='hidden' />

          {totalImagesCount < 5 && (
            <button onClick={() => fileInputRef.current?.click()} className='w-[80px] h-[80px] shrink-0 border-[2px] border-dashed border-[#EAEAEA] rounded-[20px] flex flex-col items-center justify-center text-gray-200 gap-1 bg-white'>
              <CameraIcon className='text-gray-500 w-[25px] h-[22px]' />
              <span className='text-[14px] font-bold text-gray-500'>{totalImagesCount}/5</span>
            </button>
          )}

          {existingImages.map((img) => (
            <div key={`existing-${img.imageId}`} className='relative w-[80px] h-[80px] shrink-0'>
              <img src={img.imageUrl} alt='existing preview' className='w-full h-full object-cover rounded-[20px]' />
              <button onClick={() => removeExistingImage(img.imageId)} className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-[12px] font-bold z-10'>
                X
              </button>
            </div>
          ))}

          {newImagePreviews.map((preview, index) => (
            <div key={`new-${index}`} className='relative w-[80px] h-[80px] shrink-0'>
              <img src={preview} alt='new preview' className='w-full h-full object-cover rounded-[20px]' />
              <button onClick={() => removeNewImage(index)} className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-[12px] font-bold z-10'>
                X
              </button>
            </div>
          ))}
        </div>

        <a href='https://app.notion.com/p/391eb332282b804aa63de892afb16324?source=copy_link' target='_blank' rel='noopener noreferrer' className='text-[14px] text-gray-400 mt-2'>
          커뮤니티 이용수칙 &gt;
        </a>
      </main>

      <footer className='fixed bottom-0 left-0 right-0 mx-auto w-full max-w-120 px-5 pb-8 pt-3'>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full py-4 rounded-[30px] text-[16px] font-bold text-white transition-colors
            ${isFormValid ? 'bg-main-green1' : 'bg-gray-300 cursor-not-allowed'}
          `}
        >
          수정하기
        </button>
      </footer>
    </div>
  );
}