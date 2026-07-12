import BottomBar from "../../components/common/BottomBar";
import TopBar from "../../components/common/TopBar";
import PencilIcon from "../../assets/icons/pencil.svg";
import { useState } from "react";

const CATEGORIES = ["전체보기", "정보공유", "리워드후기", "환경실천"];
export default function CommunityMainPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체보기");
  return (
    <div className="bg-bg-green1 min-h-screen pb-20">
      <TopBar title="커뮤니티" leftIcon bgColor="bg-green1" />

      <section className="flex overflow-x-auto whitespace-nowrap p-4 gap-2">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center justify-center 
             px-5 py-2 
             rounded-[20px] border transition-colors
              ${
                isSelected
                  ? "bg-main-green1 border-main-green1 text-white"
                  : "bg-white border-gray-300 text-gray-600"
              } font-pretendard font-semibold text-[14px]`}
            >
              {category}
            </button>
          );
        })}
      </section>

      <button className="fixed bottom-28 right-6 z-50 flex h-[60px] w-[60px] items-center justify-center rounded-[100px] bg-main-green1 shadow-[0_4px_23px_rgba(6,198,95,0.4)]">
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
