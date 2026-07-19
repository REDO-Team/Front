import type { MouseEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HomeIcon from '../../assets/icons/home.svg';
import Modal from '../../components/common/Modal';
import TopBar from '../../components/common/TopBar';
import { MOCK_MY_COMMENTS } from '../../mocks/my-comment';

const MyCommentsPage = () => {
  const navigate = useNavigate();

  const [comments, setComments] = useState(MOCK_MY_COMMENTS);
  const [deleteCommentId, setDeleteCommentId] = useState<
    number | null
  >(null);

  const isDeleteModalOpen = deleteCommentId !== null;

  const handleCommentClick = (commentId: number) => {
    navigate(`/community/${commentId}`);
  };

  const handleDeleteButtonClick = (
    event: MouseEvent<HTMLButtonElement>,
    commentId: number,
  ) => {
    event.stopPropagation();
    setDeleteCommentId(commentId);
  };

  const handleDeleteModalClose = () => {
    setDeleteCommentId(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteCommentId === null) return;

    setComments(prevComments =>
      prevComments.filter(
        comment => comment.id !== deleteCommentId,
      ),
    );

    setDeleteCommentId(null);
  };

  return (
    <div className='min-h-screen bg-bg-green1'>
      <TopBar
        title='작성한 댓글'
        leftIcon
        rightIcon={HomeIcon}
        onClick={() => navigate('/')}
        bgColor='bg-green1'
      />

      <main className='px-[20px] pt-[72px]'>
        {comments.length > 0 ? (
          <section className='flex flex-col gap-[10px]'>
            {comments.map(comment => (
              <article
                key={comment.id}
                onClick={() =>
                  handleCommentClick(comment.id)
                }
                className='h-[81px] w-full cursor-pointer rounded-[16px] bg-white px-[16px] py-[16px] shadow-[0_3px_12px_rgba(0,0,0,0.08)]'
              >
                <div className='flex h-full flex-col justify-between'>
                  <h2 className='truncate text-[18px] font-semibold leading-[18px] tracking-[-0.01em] text-[#111111]'>
                    {comment.content}
                  </h2>

                  <div className='flex items-center justify-between'>
                    <time className='text-[14px] font-medium leading-[14px] text-[#111111]'>
                      {comment.createdAt}
                    </time>

                    <button
                      type='button'
                      onClick={event =>
                        handleDeleteButtonClick(
                          event,
                          comment.id,
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
          <div className='flex min-h-[500px] items-center justify-center'>
            <p className='text-[14px] font-medium text-gray-400'>
              작성한 댓글이 없습니다.
            </p>
          </div>
        )}
      </main>

      <Modal
        isOpen={isDeleteModalOpen}
        title={'작성하신 댓글을\n삭제하시겠습니까?'}
        buttonText='삭제하기'
        onClose={handleDeleteModalClose}
        onConfirm={handleDeleteConfirm}
        titleLineHeight='130%'
      />
    </div>
  );
};

export default MyCommentsPage;