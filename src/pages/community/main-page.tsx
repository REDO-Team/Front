import BottomBar from "../../components/common/BottomBar";
import TopBar from "../../components/common/TopBar";
import PencilIcon from "../../assets/icons/pencil.svg";
import { useState } from "react";
import HeartIcon from "../../assets/icons/heart.svg";
import CommentIcon from "../../assets/icons/comment.svg";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["전체보기", "정보공유", "리워드후기", "환경실천"];

// API 연결 전 테스트용 데이터
const MOCK_POSTS = [
  {
    id: 1,
    category: "정보공유",
    time: "20분 전",
    title: "이렇게 하면 쉬워요!",
    content: "이렇게 하면 쉬워요!",
    author: "리도01",
    authorColor: "bg-main-green1",
    likes: 2,
    comments: 2,
    hasThumbnail: false,
  },
  {
    id: 2,
    category: "환경실천",
    time: "1시간 전",
    title: "오늘 한강에서 플로깅 했어요!",
    content: "오랜만에 한강에 갔어요",
    author: "리도07",
    authorColor: "bg-main-sky",
    likes: 2,
    comments: 2,
    hasThumbnail: true,
  },
  {
    id: 3,
    category: "리워드후기",
    time: "어제",
    title: "리워드로 친환경 제품 사서 잘 쓰고 있어요",
    content: "리워드로 친환경 제품 사서 잘 쓰고 있어요",
    author: "리도12",
    authorColor: "bg-reward-text",
    likes: 2,
    comments: 2,
    hasThumbnail: false,
  },
  {
    id: 4,
    category: "정보공유",
    time: "2026.05.26",
    title: "분리배출 헷갈릴 때 보는 체크리스트",
    content: "분리배출 헷갈릴 때 보는 체크리스트",
    author: "리도03",
    authorColor: "bg-main-green1",
    likes: 2,
    comments: 2,
    hasThumbnail: false,
  },
];
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
export default function CommunityMainPage() {
  const navigate = useNavigate();

  const handlePostClick = (postId: number) => {
    navigate(`/community/${postId}`);
  };
  const [selectedCategory, setSelectedCategory] = useState("전체보기");

  const filteredPosts =
    selectedCategory === "전체보기"
      ? MOCK_POSTS
      : MOCK_POSTS.filter((post) => post.category === selectedCategory);

  return (
    <div className="font-pretendard bg-bg-green1 min-h-screen pb-32">
      <TopBar title="커뮤니티" leftIcon bgColor="bg-green1" />

      <section className="flex overflow-x-auto whitespace-nowrap p-4 gap-2 scrollbar-hide">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center justify-center 
             px-5 py-2 
             rounded-[20px] border transition-colors
              ${isSelected
                  ? "bg-main-green1 border-main-green1 text-white"
                  : "bg-white border-gray-300 text-gray-600"
                } font-pretendard font-semibold text-[14px]`}
            >
              {category}
            </button>
          );
        })}
      </section>

      <section className="font-pretendard flex flex-col px-4 gap-4 pb-10">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className="bg-white rounded-[20px] p-5 shadow-[0_4px_10px_rgba(0,0,0,0.03)] flex flex-col gap-3"
          >
            <span
              className={`w-fit flex items-center justify-center px-[9px] py-[4px] rounded-[20px] font-pretendard text-[11px] font-bold leading-none ${getCategoryStyle(
                post.category,
              )}`}
            >
              {post.category}
            </span>

            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col flex-1 gap-2 min-w-0">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[16px] font-semibold text-gray-900 leading-snug break-keep">
                    {post.title}
                  </h3>
                  {post.content && (
                    <p className="text-[15px] font-medium leading-[22px] text-gray-600 break-keep truncate">
                      {post.content}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-1">
                  {/* 유저 프로필 */}
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-[20px] h-[20px] rounded-full ${post.authorColor}`}
                    ></div>
                    <span className="text-[14px] font-bold leading-[22px] text-gray-600">
                      {post.author}
                    </span>
                  </div>

                  <div className="flex flex-row items-center gap-2 whitespace-nowrap text-[14px] font-semibold leading-[22px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <img
                        src={HeartIcon}
                        alt="좋아요"
                        className="w-[11.25px] h-[10px]"
                      />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <img
                        src={CommentIcon}
                        alt="댓글"
                        className="w-[11.25px] h-[10.62px]"
                      />
                      {post.comments}
                    </span>
                  </div>

                  {!post.hasThumbnail && (
                    <span className="ml-auto text-[14px] font-semibold leading-[22px] text-gray-400">
                      {post.time}
                    </span>
                  )}
                </div>
              </div>
              {post.hasThumbnail && (
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  <div className="w-[60px] h-[60px] shrink-0 rounded-[10px] bg-gradient-to-br from-[#40DC8F] to-[#4BE1FF]"></div>
                  <span className="ml-auto text-[14px] font-semibold leading-[22px] text-gray-400">
                    {post.time}
                  </span>
                </div>
              )}
            </div>

          </article>
        ))}
      </section>

      <button
        onClick={() => navigate("/community/write")}
        className="fixed bottom-28 right-6 z-50 flex h-[60px] w-[60px] items-center justify-center rounded-[100px] bg-main-green1 shadow-[0_4px_23px_rgba(6,198,95,0.4)]">
        <img
          src={PencilIcon}
          alt="글쓰기"
          className="h-6 w-6 invert brightness-0"
        />
      </button>

      <BottomBar />
    </div>
  );
}
