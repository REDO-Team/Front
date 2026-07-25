import { useNavigate } from "react-router-dom";
import FullCheck from "../../assets/icons/full-check.svg";

export default function CommunityModifyCompletePage() {
    const navigate = useNavigate();

    return (
        <div className='flex flex-1 flex-col bg-bg-green1 px-5 pb-6 font-pretendard text-text'>
            <div className='flex flex-1 flex-col items-center justify-center text-center'>
                <img
                    src={FullCheck}
                    alt='완료'
                    className='h-20 w-20 drop-shadow-[0_0_12px_rgba(6,198,95,0.4)] mb-8'
                />
                <div className="text-center mb-[120px]">
                    <h1 className="text-[24px] font-bold text-gray-800 mb-2">
                        게시글을 수정했어요!
                    </h1>
                    <p className="text-[16px] font-semibold text-gray-500">
                        앞으로도 함께 소통해요
                    </p>
                </div>
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