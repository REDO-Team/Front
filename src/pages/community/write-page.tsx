import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/common/TopBar";
import HomeIcon from "../../assets/icons/home.svg";
import CameraIcon from "../../assets/icons/camera";

const CATEGORIES = ["정보공유", "환경실천", "리워드후기"];

export default function CommunityWritePage() {
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (imagePreviews.length >= 5) {
                alert("사진은 최대 5장까지 첨부 가능합니다.");
                return;
            }
            const previewUrl = URL.createObjectURL(file);
            setImagePreviews((prev) => [...prev, previewUrl]);
        }
    };

    const handleSubmit = () => {
        if (!selectedCategory || !title.trim() || !content.trim()) {
            alert("제목, 본문을 모두 입력해주세요!");
            return;
        }

        // 서버(API)로 데이터 전송하는 로직이 들어갈 자리
        console.log("전송할 데이터:", { selectedCategory, title, content, imagePreviews });

        navigate("/community");
    };
    const removeImage = (index: number) => {
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };
    const isFormValid = selectedCategory !== "" && title.trim() !== "" && content.trim() !== "";

    return (
        <div className="bg-bg-green1 min-h-screen pb-24 relative font-pretendard">
            <TopBar
                title="게시글 작성"
                leftIcon
                rightIcon={HomeIcon}
                onClick={() => navigate("/")}
                bgColor="bg-green1"
            />

            <main className="px-5 pt-6 pb-24 flex flex-col gap-4">

                <section className="flex gap-2">
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
                                        : "bg-white border-gray-200 text-gray-600"
                                    } font-pretendard font-semibold text-[14px]`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </section>


                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력해주세요"
                    className="placeholder:text-gray-500 w-full h-[60px] py-[17px] px-[24px] border border-[#EAEAEA] rounded-[20px] text-[15px] font-semibold border-gray-200 outline-none bg-white"
                />

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="리도 사용자들과 자유롭게 소통해주세요."
                    className="placeholder:text-gray-500 w-full h-[148px] py-[17px] px-[24px] border border-[#EAEAEA] rounded-[20px] text-[15px] font-semibold border-gray-200 outline-none resize-none bg-white"
                />

                <div className="flex gap-3 overflow-x-visible pb-2"> {/* overflow-x-auto를 visible로 바꿔서 X가 잘리지 않게 함 */}

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                    />

                    {/* 카메라 버튼 */}
                    {imagePreviews.length < 5 && (
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-[80px] h-[80px] shrink-0 border-[2px] border-dashed border-[#EAEAEA] rounded-[20px] flex flex-col items-center justify-center text-gray-200 gap-1 bg-white"
                        >
                            <CameraIcon className="text-gray-500 w-[25px] h-[22px]" />
                            <span className="text-[14px] font-bold text-gray-500">
                                {imagePreviews.length}/5
                            </span>
                        </button>
                    )}

                    {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative w-[80px] h-[80px] shrink-0 mt-2"> {/* mt-2를 추가해서 위쪽 여백 확보 */}
                            <img src={preview} alt="preview" className="w-full h-full object-cover rounded-[20px]" />
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-[12px] font-bold z-10"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>

                <a
                    href="https://app.notion.com/p/391eb332282b804aa63de892afb16324?source=copy_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-gray-400 mt-2"
                >
                    커뮤니티 이용수칙 &gt;
                </a>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-120 px-5 pb-8 pt-3 bg-white">
                <button
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className={`w-full py-4 rounded-[30px] text-[16px] font-bold text-white transition-colors
            ${isFormValid ? "bg-main-green1" : "bg-gray-300 cursor-not-allowed"}
          `}
                >
                    게시하기
                </button>
            </footer>
        </div>
    );
}