import { useState } from "react";
import Modal from "../../components/common/Modal.tsx";

interface Comment {
  id: number;
  author: string;
  authorColor: string;
  time: string;
  content: string;
}

interface CommentItemProps {
  comment: Comment;
  isMine: boolean;
  onUpdate: (id: number, newContent: string) => void;
  onDelete: (id: number) => void;
}

export default function CommentItem({ comment, isMine, onUpdate, onDelete }: CommentItemProps) {
  // 댓글 수정 모드 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  // 댓글 전용 모달 상태 관리
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 수정 취소
  const handleCancelEdit = () => {
    setEditContent(comment.content); // 텍스트 원래대로 복구
    setIsEditing(false); // 일반 모드로 전환
  };

  // 수정 완료
  const handleCompleteEdit = () => {
    if (editContent.trim() === "") return;
    onUpdate(comment.id, editContent); // 부모로 변경된 데이터 전달
    setIsEditing(false); // 일반 모드로 전환
  };

  return (
    <div className="flex flex-col">
      {/* 댓글 상단 */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <div className={`w-[32px] h-[32px] rounded-full ${comment.authorColor}`}></div>
          <span className="text-[13px] font-bold text-gray-800">{comment.author}</span>
          
          {isMine && (
            <span className="inline-flex items-center justify-center px-[6px] py-[2px] rounded-[10px] text-[10px] font-bold bg-main-green1 text-white">
              내 댓글
            </span>
          )}
          <span className="text-[11px] font-semibold text-gray-400">{comment.time}</span>
        </div>

        {/* 수정/삭제 버튼 */}
        {isMine && !isEditing && (
          <div className="flex items-center gap-2 text-[12px] font-medium">
            <button className="text-gray-600" onClick={() => setIsEditModalOpen(true)}>수정</button>
            <button className="text-[#E25655]" onClick={() => setIsDeleteModalOpen(true)}>삭제</button>
          </div>
        )}
      </div>

      {/* 댓글 내용 영역 */}
      {isEditing ? (
        <div className="pl-[40px]">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-[10px] p-3 text-[14px] text-gray-800 outline-none resize-none min-h-[80px]"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={handleCancelEdit}
              className="px-4 py-1.5 rounded-full text-[13px] font-bold bg-gray-100 text-gray-600"
            >
              취소
            </button>
            <button
              onClick={handleCompleteEdit}
              className="px-4 py-1.5 rounded-full text-[13px] font-bold bg-main-green1 text-white"
            >
              완료
            </button>
          </div>
        </div>
      ) : (
        <p className="text-[15px] font-medium text-gray-800 pl-[40px] leading-snug whitespace-pre-wrap">
          {comment.content}
        </p>
      )}

      {/* 댓글 수정 확인 모달 */}
      <Modal
        isOpen={isEditModalOpen}
        title={"작성하신 댓글을\n수정하시겠습니까?"}
        buttonText="수정하기"
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={() => {
          setIsEditModalOpen(false);
          setIsEditing(true); 
        }}
      />

      {/* 댓글 삭제 확인 모달 */}
      <Modal
        isOpen={isDeleteModalOpen}
        title={"작성하신 댓글을\n삭제하시겠습니까?"}
        buttonText="삭제하기"
        buttonColor="green" 
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          onDelete(comment.id); // 모달 확인 누르면 실제 삭제 함수 실행
        }}
      />
    </div>
  );
}