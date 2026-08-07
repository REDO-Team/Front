import BottomBar from '../../components/common/BottomBar';
import PencilIcon from '../../assets/icons/pencil.svg';
import { useState, useEffect } from 'react';
import HeartIcon from '../../assets/icons/heart.svg';
import CommentIcon from '../../assets/icons/comment.svg';
import { useNavigate } from 'react-router-dom';
import { getCommunityList } from '../../apis/community';
import YellowCharacter from '../../assets/icons/character/yellow.svg?react';
import GrayCharacter from '../../assets/icons/character/gray.svg?react';
import GreenCharacter from '../../assets/icons/character/green.svg?react';
import OrangeCharacter from '../../assets/icons/character/orange.svg?react';
import PurpleCharacter from '../../assets/icons/character/purple.svg?react';
import BlueCharacter from '../../assets/icons/character/blue.svg?react';
import ShadowIcon from '../../assets/icons/character/shadow.svg?react';

const formatTimeAgo = (dateString: string) => {
  const postDate = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - postDate.getTime();

  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);

  if (sec < 60) return `방금 전`;
  if (min < 60) return `${min}분 전`;
  if (hour < 24) return `${hour}시간 전`;

  if (day < 7) return `${day}일 전`;
  const year = postDate.getFullYear();
  const month = String(postDate.getMonth() + 1).padStart(2, '0');
  const date = String(postDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${date}`;
};

interface PostItem {
  id: number;
  category: string | number;
  title: string;
  preview?: string;
  writer: string;
  profileImageUrl?: string;
  characterCode: number;
  numLikes: number;
  numComments: number;
  imageUrl?: string;
  createdAt: string;
}

const CATEGORIES = ['전체보기', '정보공유', '리워드후기', '환경실천'];
const formatCategory = (categoryValue: string | number) => {
  const value = String(categoryValue);
  if (value === '1') return '정보공유';
  if (value === '2') return '리워드후기';
  if (value === '3') return '환경실천';
  return '전체보기';
};
const getCategoryStyle = (category: string) => {
  switch (category) {
    case '정보공유':
      return 'bg-bg-green2 text-main-green1';
    case '환경실천':
      return 'bg-skyblue-bg text-skyblue-text';
    case '리워드후기':
      return 'bg-reward-bg text-reward-text';
    default:
      return 'bg-gray-100 text-gray-500';
  }
};

const renderCharacterProfile = (code: number) => {
  switch (code) {
    case 1:
      return <YellowCharacter className='w-full h-full' />;
    case 2:
      return <GrayCharacter className='w-full h-full' />;
    case 3:
      return <GreenCharacter className='w-full h-full' />;
    case 4:
      return <OrangeCharacter className='w-full h-full' />;
    case 5:
      return <PurpleCharacter className='w-full h-full' />;
    case 6:
      return <BlueCharacter className='w-full h-full' />;
    default:
      return <ShadowIcon className='w-full h-full' />;
  }
};

export default function CommunityMainPage() {
  const navigate = useNavigate();

  const handlePostClick = (postId: number) => {
    navigate(`/community/${postId}`);
  };
  const [selectedCategory, setSelectedCategory] = useState('전체보기');

  const [posts, setPosts] = useState<PostItem[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getCommunityList();

        setPosts(data.result.items);
      } catch (error) {
        console.error('게시글 목록 불러오기 실패', error);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = selectedCategory === '전체보기' ? posts : posts.filter((post) => formatCategory(post.category) === selectedCategory);
  return (
    <div className='font-pretendard bg-bg-green1 min-h-screen pb-32'>
      <section className='flex overflow-x-auto whitespace-nowrap p-4 gap-2 scrollbar-hide'>
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center justify-center 
             px-5 py-2 
             rounded-[20px] border transition-colors
              ${isSelected ? 'bg-main-green1 border-main-green1 text-white' : 'bg-white border-gray-300 text-gray-600'} font-pretendard font-semibold text-[14px]`}
            >
              {category}
            </button>
          );
        })}
      </section>

      <section className='font-pretendard flex flex-col px-4 gap-4 pb-10'>
        {filteredPosts.map((post) => (
          <article key={post.id} onClick={() => handlePostClick(post.id)} className='bg-white rounded-[20px] p-5 shadow-[0_4px_10px_rgba(0,0,0,0.03)] flex flex-col gap-3'>
            <span className={`w-fit flex items-center justify-center px-[9px] py-[4px] rounded-[20px] font-pretendard text-[11px] font-bold leading-none ${getCategoryStyle(formatCategory(post.category))}`}>{formatCategory(post.category)}</span>

            <div className='flex justify-between items-start gap-4'>
              <div className='flex flex-col flex-1 gap-2 min-w-0'>
                <div className='flex flex-col gap-1'>
                  <h3 className='text-[16px] font-semibold text-gray-900 leading-snug break-keep'>{post.title}</h3>
                  {post.preview && <p className='text-[15px] font-medium leading-[22px] text-gray-600 break-keep truncate'>{post.preview}</p>}
                </div>

                <div className='flex items-center gap-3 mt-1'>
                  {/* 유저 프로필 */}
                  <div className='flex items-center gap-1.5'>
                    {post.profileImageUrl ? <img src={post.profileImageUrl} alt='프로필' className='w-[20px] h-[20px] rounded-full object-cover' /> : <div className='w-[20px] h-[20px] rounded-full bg-gray-100 flex items-center justify-center overflow-hidden'>{renderCharacterProfile(post.characterCode)}</div>}
                    <span className='text-[14px] font-bold leading-[22px] text-gray-600'>{post.writer}</span>
                  </div>

                  <div className='flex flex-row items-center gap-2 whitespace-nowrap text-[14px] font-semibold leading-[22px] text-gray-500'>
                    <span className='flex items-center gap-1'>
                      <img src={HeartIcon} alt='좋아요' className='w-[11.25px] h-[10px]' />
                      {post.numLikes}
                    </span>
                    <span className='flex items-center gap-1'>
                      <img src={CommentIcon} alt='댓글' className='w-[11.25px] h-[10.62px]' />
                      {post.numComments}
                    </span>
                  </div>

                  {!post.imageUrl && <span className='ml-auto text-[14px] font-semibold leading-[22px] text-gray-400'>{formatTimeAgo(post.createdAt)}</span>}
                </div>
              </div>
              {post.imageUrl && (
                <div className='flex flex-col items-center gap-1.5 shrink-0'>
                  <img src={post.imageUrl} alt='썸네일' className='w-[60px] h-[60px] rounded-[10px] object-cover shrink-0' />
                  <span className='ml-auto text-[14px] font-semibold leading-[22px] text-gray-400'>{formatTimeAgo(post.createdAt)}</span>
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      <button onClick={() => navigate('/community/write')} className='fixed bottom-28 right-6 z-50 flex h-[60px] w-[60px] items-center justify-center rounded-[100px] bg-main-green1 shadow-[0_4px_23px_rgba(6,198,95,0.4)]'>
        <img src={PencilIcon} alt='글쓰기' className='h-6 w-6 invert brightness-0' />
      </button>

      <BottomBar />
    </div>
  );
}
