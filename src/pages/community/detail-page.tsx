import TopBar from "../../components/common/TopBar";
import HeartIcon from "../../assets/icons/heart";
import CommentIcon from "../../assets/icons/comment";
import { useNavigate, useParams } from "react-router-dom";
import HomeIcon from "../../assets/icons/home.svg";
import MoreIcon from "../../assets/icons/MoreIcon";
import PostActionModal from "../../components/CommunityPage/PostActionModal.tsx";
import { useState, useEffect } from "react";
import Modal from "../../components/common/Modal.tsx";
import CommentItem from "./CommentItem.tsx";
import { getCommunityDetail, likeCommunity, unlikeCommunity } from "../../apis/community.ts";
import { MOCK_COMMENTS } from "../../mocks/community";
import LoadingSpinner from "../../components/common/LoadingSpinner.tsx";
import YellowCharacter from '../../assets/icons/character/yellow.svg?react';
import GrayCharacter from '../../assets/icons/character/gray.svg?react';
import GreenCharacter from '../../assets/icons/character/green.svg?react';
import OrangeCharacter from '../../assets/icons/character/orange.svg?react';
import PurpleCharacter from '../../assets/icons/character/purple.svg?react';
import BlueCharacter from '../../assets/icons/character/blue.svg?react';
import ShadowIcon from '../../assets/icons/character/shadow.svg?react';

const formatTimeAgo = (dateString: string) => {
  const postDate = new Date(dateString);

  const year = postDate.getFullYear();
  const month = String(postDate.getMonth() + 1).padStart(2, '0');
  const date = String(postDate.getDate()).padStart(2, '0');
  const hours = String(postDate.getHours()).padStart(2, '0');
  const minutes = String(postDate.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${date} ${hours}:${minutes}`;
};

const formatCategory = (categoryValue: any) => {
  const value = String(categoryValue);
  if (value === '1') return '정보공유';
  if (value === '2') return '리워드후기';
  if (value === '3') return '환경실천';
  return '전체보기';
};

const getCategoryStyle = (category: string) => {
  switch (category) {
    case "정보공유":
      return "bg-bg-green2 text-main-green1";
    case "환경실천":
      return "bg-skyblue-bg text-skyblue-text";
    case "리워드후기":
      return "bg-reward-bg text-reward-text";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

const renderCharacterProfile = (code: number) => {
  switch (code) {
    case 1: return <YellowCharacter className="w-full h-full" />;
    case 2: return <GrayCharacter className="w-full h-full" />;
    case 3: return <GreenCharacter className="w-full h-full" />;
    case 4: return <OrangeCharacter className="w-full h-full" />;
    case 5: return <PurpleCharacter className="w-full h-full" />;
    case 6: return <BlueCharacter className="w-full h-full" />;
    default: return <ShadowIcon className="w-full h-full" />;
  }
};

export default function CommunityDetailPage() {
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();
  const { postId } = useParams();

  const [post, setPost] = useState<any>(null);
  const [isMyPost, setIsMyPost] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!postId) return;
      try {
        const data = await getCommunityDetail(Number(postId));
        console.log("게시글 상세 데이터:", data);

        const postData = data.result || data;
        setPost(postData);

        setIsMyPost(postData.isMine);
        setIsLiked(postData.isLiked);

      } catch (error) {
        console.error("게시글 상세 불러오기 실패", error);
      }
    };

    fetchDetail();
  }, [postId]);

  const handleUpdateComment = (commentId: number, newContent: string) => {
    setComments(comments.map(comment => comment.id === commentId ? { ...comment, content: newContent } : comment));
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const handleModifyPost = () => {
    navigate(`/community/modify/${postId}`);
  }

  if (!post) {

    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>);
  }

  const handleLikeToggle = async () => {
    if (!postId) return;
    try {
      if (isLiked) {
        const res = await unlikeCommunity(Number(postId));
        setIsLiked(false);

        if (res.isSuccess) {
          setPost((prev: any) => ({ ...prev, numLikes: res.result.likeCount }));
        }
      } else {
        const res = await likeCommunity(Number(postId));
        setIsLiked(true);

        if (res.isSuccess) {
          setPost((prev: any) => ({ ...prev, numLikes: res.result.likeCount }));
        }
      }
    } catch (error) {
      console.error("좋아요 처리 실패", error);
    }
  };

  return (
    <div className="bg-bg-green1 min-h-screen pb-24 relative font-pretendard">
      <TopBar
        title="커뮤니티"
        leftIcon
        rightIcon={isMyPost ? <MoreIcon /> : HomeIcon}
        onClick={
          isMyPost ? () => setIsActionModalOpen(true) : () => navigate("/")
        }
        bgColor="bg-green1"
      />

      <main className="px-5 pt-4 pb-6">
        <div className="flex items-center gap-1.5 mb-3">
          <span
            className={`inline-flex items-center justify-center px-[9px] py-[4px] rounded-[20px] text-[11px] font-bold leading-none ${getCategoryStyle(formatCategory(post.category))}`}
          >
            {formatCategory(post.category)}
          </span>
          {isMyPost && (
            <span className="inline-flex items-center justify-center px-[9px] py-[4px] rounded-[20px] text-[11px] font-bold leading-none text-white bg-main-green1">
              내 글
            </span>
          )}
        </div>

        {/* 게시글 제목 */}
        <h1 className="text-[22px] font-bold text-gray-900 leading-snug break-keep mb-4">
          {post.title}
        </h1>

        {/* 작성자 프로필 */}
        <div className="flex items-center gap-2 mb-4">
          {post.profileImageUrl ? (
            <img src={post.profileImageUrl} alt="프로필"
              className="w-[38px] h-[38px] rounded-full object-cover shrink-0" />
          ) : (
            <div className="w-[38px] h-[38px] rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
              {renderCharacterProfile(post.characterCode)}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-gray-800">
              {post.writer}
            </span>
            <span className="text-[14px] font-semibold leading-[22px] text-gray-400">
              {post.createdAt ? formatTimeAgo(post.createdAt) : ""}
            </span>
          </div>
        </div>

        {/* 본문 내용 */}
        <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_10px_rgba(0,0,0,0.03)] mb-6">
          <p className="text-[16px] font-medium text-gray-900 leading-relaxed whitespace-pre-wrap break-keep mb-6">
            {post.content}
          </p>
          {post.imageUrls && post.imageUrls.length > 0 && (
            <div className="flex flex-col gap-3 mt-4">
              {post.imageUrls.map((url: string, index: number) => (
                <img
                  key={index}
                  src={url}
                  alt={`게시글 이미지 ${index + 1}`}
                  className="w-full rounded-[10px] object-cover"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-row items-center gap-3 whitespace-nowrap text-[14px] font-semibold leading-[22px] text-gray-500 mb-4">
          <span className="flex items-center gap-1 text-gray-900">
            <CommentIcon className="w-[13px] h-[13px] text-main-green1" />
            댓글 {post.numComments > 0 ? post.numComments : ""}
          </span>
          <button
            className="flex items-center gap-1 text-gray-900"
            onClick={handleLikeToggle}
          >
            <HeartIcon className={`w-[17px] h-[15px] ${!isLiked && "text-gray-500"}`}
              isFilled={isLiked} />
            좋아요 {post.numLikes > 0 ? post.numLikes : ""}
          </button>
        </div>

        {/* 댓글 영역 */}
        <section className="flex flex-col gap-3">
          {" "}
          {comments.map((comment, index) => (
            <div key={comment.id} className="flex flex-col">

              <CommentItem
                comment={comment}
                isMine={comment.author === "리도01"} // 내 댓글 여부 전달
                onUpdate={handleUpdateComment}
                onDelete={handleDeleteComment}
              />

              {index !== comments.length - 1 && (
                <hr className="border-t-[1px] border-gray-300 mt-4" />
              )}
            </div>
          ))}
        </section>
      </main>

      {/* 댓글 입력창 */}
      <footer className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-120 bg-white rounded-t-[30px] shadow-[0_-4px_10px_rgba(0,0,0,0.05)] px-[18px] py-[16px] pb-[30px]">
        {" "}
        <div className="flex items-center gap-[10px]">
          <input
            type="text"
            placeholder="댓글을 입력해주세요"
            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-[16px] outline-none placeholder:text-gray-600"
          />
          <button className="bg-main-green1 text-white text-[14px] font-bold px-5 py-2.5 rounded-full shrink-0">
            게시
          </button>
        </div>
      </footer>

      {/* 수정/삭제 모달 */}
      {isActionModalOpen && (
        <PostActionModal
          onClose={() => setIsActionModalOpen(false)}
          onEdit={() => {
            setIsActionModalOpen(false);
            setIsEditModalOpen(true);
          }}
          onDelete={() => {
            setIsActionModalOpen(false);
            setIsDeleteModalOpen(true);
          }}
        />
      )}

      {/* 수정 모달 */}
      <Modal
        isOpen={isEditModalOpen}
        title="작성하신 게시글을
        수정하시겠습니까?"
        buttonText="수정하기"
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={() => {
          setIsEditModalOpen(false);
          handleModifyPost();
        }}
      />

      {/* 삭제 모달 */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="작성하신 게시글을
        삭제하시겠습니까?"
        buttonText="삭제하기"
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          // navigate();
        }}
      />
    </div>
  );
}
