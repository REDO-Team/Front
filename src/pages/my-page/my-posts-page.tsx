import type { MouseEvent } from 'react';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';

import Logo from '../../assets/icons/Big-logo.svg?react';

import {
  deleteCommunity,
  getMyCommunities,
} from '../../apis/community';

const formatCreatedAt = (createdAt: string) => {
  const date = new Date(createdAt);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

const MyPostsPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [deletePostId, setDeletePostId] =
    useState<number | null>(null);

  const {
    data,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['myCommunities'],
    queryFn: () => getMyCommunities(0, 10),
  });

  const posts = data?.result?.items ?? [];

  const deleteMutation = useMutation({
    mutationFn: deleteCommunity,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['myCommunities'],
      });

      setDeletePostId(null);
    },
  });

  const isDeleteModalOpen =
    deletePostId !== null;

  const handlePostClick = (
    communityId: number,
  ) => {
    navigate(`/community/${communityId}`);
  };

  const handleDeleteButtonClick = (
    event: MouseEvent<HTMLButtonElement>,
    communityId: number,
  ) => {
    event.stopPropagation();
    setDeletePostId(communityId);
  };

  const handleDeleteModalClose = () => {
    if (deleteMutation.isPending) return;

    setDeletePostId(null);
  };

  const handleDeleteConfirm = () => {
    if (
      deletePostId === null ||
      deleteMutation.isPending
    ) {
      return;
    }

    deleteMutation.mutate(deletePostId);
  };

  if (isPending) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-bg-my'>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-bg-my'>
        작성한 게시글을 불러오지 못했어요.
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-bg-my'>
      <main className='px-[20px] pt-[72px]'>
        {posts.length > 0 ? (
          <section className='flex flex-col gap-[10px]'>
            {posts.map((post) => (
              <article
                key={post.communityId}
                onClick={() =>
                  handlePostClick(
                    post.communityId,
                  )
                }
                className='h-[81px] w-full cursor-pointer rounded-[16px] bg-white px-[16px] py-[16px] shadow-[0_3px_12px_rgba(0,0,0,0.08)]'
              >
                <div className='flex h-full flex-col justify-between'>
                  <h2 className='truncate text-[18px] font-semibold leading-[18px] tracking-[-0.01em] text-[#111111]'>
                    {post.title}
                  </h2>

                  <div className='flex items-center justify-between'>
                    <time className='text-[14px] font-medium leading-[14px] text-[#111111]'>
                      {formatCreatedAt(
                        post.createdAt,
                      )}
                    </time>

                    <button
                      type='button'
                      onClick={(event) =>
                        handleDeleteButtonClick(
                          event,
                          post.communityId,
                        )
                      }
                      className='text-[14px] font-medium leading-[14px] text-main-green1'
                    >
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

      <Modal
        isOpen={isDeleteModalOpen}
        title={'작성하신 게시글을\n삭제하시겠습니까?'}
        buttonText={
          deleteMutation.isPending
            ? '삭제 중...'
            : '삭제하기'
        }
        onClose={handleDeleteModalClose}
        onConfirm={handleDeleteConfirm}
        titleLineHeight='130%'
      />
    </div>
  );
};

export default MyPostsPage;