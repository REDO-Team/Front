import { useNavigate } from "react-router-dom";
import CheckIcon from "../../assets/icons/check";

export default function CommunityModifyCompletePage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-bg-green1 font-pretendard">            
        <div className="w-[100px] h-[100px] bg-main-green1 rounded-full flex items-center justify-center mb-8 drop-shadow-[0_0_20px_rgba(24,178,104,0.5)]">
            <CheckIcon className="w-[30px] h-[22px]" />
        </div>

            <div className="text-center mb-[120px]">
                <h1 className="text-[24px] font-bold text-gray-800 mb-2">
                    게시글을 수정했어요!
                </h1>
                <p className="text-[16px] font-semibold text-gray-500">
                    앞으로도 함께 소통해요
                </p>
            </div>

            <footer className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-120 px-5 pb-8 pt-3">
                <button
                    onClick={() => navigate("/community")}
                    className="w-full py-4 bg-main-green1 text-white text-[18px] font-bold rounded-[30px]"
                >
                    확인
                </button>
            </footer>

        </div>
    );
}