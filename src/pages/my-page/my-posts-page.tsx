import type { MouseEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/icons/Big-logo.svg?react';

import Modal from '../../components/common/Modal';
import { MOCK_MY_POSTS } from '../../mocks/my-post';

const MyPostsPage = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState(MOCK_MY_POSTS);
  const [deletePostId, setDeletePostId] = useState<number | null>(null);

  const isDeleteModalOpen = deletePostId !== null;

  const handlePostClick = (postId: number) => {
    navigate(`/community/${postId}`);
  };

  const handleDeleteButtonClick = (event: MouseEvent<HTMLButtonElement>, postId: number) => {
    event.stopPropagation();
    setDeletePostId(postId);
  };

  const handleDeleteModalClose = () => {
    setDeletePostId(null);
  };

  const handleDeleteConfirm = () => {
    if (deletePostId === null) return;

    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== deletePostId));

    setDeletePostId(null);
  };

  return (
    <div className='min-h-screen bg-[#F9FBFB]'>
      <main className='px-[20px] pt-[72px]'>
        {posts.length > 0 ? (
          <section className='flex flex-col gap-[10px]'>
            {posts.map((post) => (
              <article key={post.id} onClick={() => handlePostClick(post.id)} className='h-[81px] w-full cursor-pointer rounded-[16px] bg-white px-[16px] py-[16px] shadow-[0_3px_12px_rgba(0,0,0,0.08)]'>
                <div className='flex h-full flex-col justify-between'>
                  <h2 className='truncate text-[18px] font-semibold leading-[18px] tracking-[-0.01em] text-[#111111]'>{post.title}</h2>

                  <div className='flex items-center justify-between'>
                    <time className='text-[14px] font-medium leading-[14px] text-[#111111]'>{post.createdAt}</time>

                    <button type='button' onClick={(event) => handleDeleteButtonClick(event, post.id)} className='text-[14px] font-medium leading-[14px] text-main-green1'>
                      삭제
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className='flex min-h-[calc(100vh-72px)] flex-col items-center justify-center pb-[80px]'>
                <Logo className='h-[146px] w-[161px]' />
                <p className='mt-[38px] text-center text-[22px] font-bold leading-[130%] tracking-[0] text-[#6B6B6B]'>
                    아직 작성한 게시글이 없어요
                </p>
            </div>
        )}
      </main>

      <Modal isOpen={isDeleteModalOpen} title={'작성하신 게시글을\n삭제하시겠습니까?'} buttonText='삭제하기' onClose={handleDeleteModalClose} onConfirm={handleDeleteConfirm} titleLineHeight='130%' />
    </div>
  );
};

export default MyPostsPage;
