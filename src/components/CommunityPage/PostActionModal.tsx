interface PostActionModalProps {
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PostActionModal({
  onClose,
  onEdit,
  onDelete,
}: PostActionModalProps) {
  return (
    <div className="fixed inset-0 z-40 max-w-120 mx-auto" onClick={onClose}>
      <div
        className="absolute top-[56px] right-[16px] w-[113px] bg-white rounded-[23.3px] py-[15px] px-[11px] flex flex-col z-50 shadow-[0_4.66px_11.65px_rgba(0,0,0,0.1)]"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 배경 닫힘 이벤트 방지
      >
        {/* 수정하기 버튼 */}
        <button
          onClick={() => {
            onEdit();
            onClose(); // 동작 실행 후 모달 닫기
          }}
          className="text-[16.31px] font-medium font-pretendard text-[#111111] leading-[20.97px] text-center pb-[12px] w-full"
        >
          수정하기
        </button>

        <hr className="border-t-[1px] border-gray-200 w-full" />

        {/* 삭제하기 버튼 */}
        <button
          onClick={() => {
            onDelete();
            onClose(); // 동작 실행 후 모달 닫기
          }}
          className="text-[16.31px] font-medium font-pretendard text-[#111111] leading-[20.97px] text-center pt-[12px] w-full"
        >
          삭제하기
        </button>
      </div>
    </div>
  );
}
