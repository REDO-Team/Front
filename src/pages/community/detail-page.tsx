import TopBar from "../../components/common/TopBar";
import HeartIcon from "../../assets/icons/heart";
import CommentIcon from "../../assets/icons/comment";
import { useNavigate, useParams } from "react-router-dom";
import HomeIcon from "../../assets/icons/home.svg";
import MoreIcon from "../../assets/icons/MoreIcon";
import PostActionModal from "../../components/CommunityPage/PostActionModal.tsx";
import { useState } from "react";
import Modal from "../../components/common/Modal.tsx";
import CommentItem from "./CommentItem.tsx";

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

const MOCK_POST = {
  category: "정보공유",
  title: "이렇게 하면 쉬워요!",
  author: "리도01",
  authorColor: "bg-main-green1",
  time: "2026.06.27 15:00",
  content:
    "안내 가이드 따라하다가 저만의 꿀팁을 발견했어요!\n다른 사용자 분들도 이 방법 사용해보시고 쉬웠는지 알려주세요ㅎㅎ",
  comments: 2,
  likes: 0,
};

const MOCK_COMMENTS = [
  {
    id: 1,
    author: "리도03",
    authorColor: "bg-main-green1",
    time: "26.06.27 15:00",
    content: "알려주신대로 하니까 빨라진 것 같아요! 좋은 정보 감사합니다!",
  },
  {
    id: 2,
    author: "리도08",
    authorColor: "bg-main-green1",
    time: "26.06.27 15:00",
    content: "저도 해봤는데 진짜 편하네요 ㅎㅎ 공유 감사해요!",
  },
  {
    id: 3,
    author: "리도01",
    authorColor: "bg-main-green1",
    time: "26.06.27 16:00",
    content: "댓글 남겨주셔서 감사해요!\n더 좋은 정보로 찾아올게요:)",
  },
];

export default function CommunityDetailPage() {
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigate = useNavigate();
  const { postId } = useParams();
  const isMyPost = true; // 임시 변수
  const currentUser = "리도01"; // 현재 로그인한 사용자 (임시)
  const { id } = useParams();

  console.log("Post ID:", id);

  const handleUpdateComment = (commentId: number, newContent: string) => {
    setComments(comments.map(comment => comment.id === commentId ? { ...comment, content: newContent } : comment));
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const handleModifyPost = () => {
    navigate(`/community/modify/${postId}`);
  }

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
        {/* 카테고리 라벨 & 내 글 라벨*/}
        <div className="flex items-center gap-1.5 mb-3">
          <span
            className={`inline-flex items-center justify-center px-[9px] py-[4px] rounded-[20px] text-[11px] font-bold leading-none ${getCategoryStyle(MOCK_POST.category)}`}
          >
            {MOCK_POST.category}
          </span>
          {isMyPost && (
            <span className="inline-flex items-center justify-center px-[9px] py-[4px] rounded-[20px] text-[11px] font-bold leading-none text-white bg-main-green1">
              내 글
            </span>
          )}
        </div>

        {/* 게시글 제목 */}
        <h1 className="text-[22px] font-bold text-gray-900 leading-snug break-keep mb-4">
          {MOCK_POST.title}
        </h1>

        {/* 작성자 프로필 */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className={`w-[38px] h-[38px] rounded-full ${MOCK_POST.authorColor}`}
          ></div>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-gray-800">
              {MOCK_POST.author}
            </span>
            <span className="text-[14px] font-semibold leading-[22px] text-gray-400">
              {MOCK_POST.time}
            </span>
          </div>
        </div>

        <hr className="border-t-[1px] border-gray-300 mb-4" />

        {/* 본문 내용 */}
        <p className="text-[16px] font-medium text-gray-900 leading-relaxed whitespace-pre-wrap break-keep mb-6">
          {MOCK_POST.content}
        </p>

        <div className="flex flex-row items-center gap-3 whitespace-nowrap text-[14px] font-semibold leading-[22px] text-gray-500 mb-4">
          <span className="flex items-center gap-1 text-gray-900">
            <CommentIcon className="w-[13px] h-[13px] text-main-green1" />
            댓글 {MOCK_POST.comments}
          </span>
          <button className="flex items-center gap-1 text-gray-900">
            <HeartIcon className="w-[17px] h-[15px] text-gray-500" />
            좋아요
          </button>
        </div>

        {/* 댓글 영역 */}
        <section className="bg-white rounded-[20px] p-5 shadow-[0_4px_10px_rgba(0,0,0,0.03)] flex flex-col gap-4">
          {" "}
          {comments.map((comment, index) => (
            <div key={comment.id} className="flex flex-col">

              <CommentItem
                comment={comment}
                isMine={comment.author === currentUser} // 내 댓글 여부 전달
                onUpdate={handleUpdateComment}
                onDelete={handleDeleteComment}
              />

              {index !== comments.length - 1 && (
                <hr className="border-t-[1px] border-gray-200 mt-4" />
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
