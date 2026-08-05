import { useState } from "react";
import Modal from "../../components/common/Modal.tsx";
import YellowCharacter from '../../assets/icons/character/yellow.svg?react';
import GrayCharacter from '../../assets/icons/character/gray.svg?react';
import GreenCharacter from '../../assets/icons/character/green.svg?react';
import OrangeCharacter from '../../assets/icons/character/orange.svg?react';
import PurpleCharacter from '../../assets/icons/character/purple.svg?react';
import BlueCharacter from '../../assets/icons/character/blue.svg?react';
import ShadowIcon from '../../assets/icons/character/shadow.svg?react';

const formatTime = (dateString: string) => {
  if (!dateString) return "";
  const dateObj = new Date(dateString);

  const year = String(dateObj.getFullYear()).slice(2);
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const date = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${date} ${hours}:${minutes}`;
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

export interface Comment {
  commentId: number;
  writer: string;
  profileImageUrl?: string;
  characterCode: number;
  content: string;
  createdAt: string;
  isMine: boolean;
}

interface CommentItemProps {
  comment: Comment;
  isMine: boolean;
  onUpdate: (id: number, newContent: string) => void;
  onDelete: (id: number) => void;
}

export default function CommentItem({ comment, isMine, onUpdate, onDelete }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 수정 취소
  const handleCancelEdit = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  // 수정 완료
  const handleCompleteEdit = () => {
    if (editContent.trim() === "") return;
    onUpdate(comment.commentId, editContent);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          {comment.profileImageUrl ? (
            <img
              src={comment.profileImageUrl}
              alt="프로필"
              className="w-[32px] h-[32px] rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-[32px] h-[32px] rounded-full bg-gray-300 flex items-center justify-center">
              {renderCharacterProfile(comment.characterCode)}
            </div>
          )}

          <span className="text-[14px] font-bold text-gray-900">{comment.writer}</span>

          {isMine && (
            <span className="inline-flex items-center justify-center px-[6px] py-[2px] rounded-[10px] text-[10px] font-bold bg-main-green1 text-white">
              내 댓글
            </span>
          )}
          <span className="text-[12px] font-semibold text-gray-400">{formatTime(comment.createdAt)}</span>
        </div>

        {isMine && !isEditing && (
          <div className="flex items-center gap-2 text-[14px] font-semibold">
            <button className="text-gray-600" onClick={() => setIsEditModalOpen(true)}>수정</button>
            <button className="text-[#E25655]" onClick={() => setIsDeleteModalOpen(true)}>삭제</button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="pl-[40px]">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full bg-white border border-main-green1 rounded-[20px] px-[14px] py-[10px] text-[15px] text-gray-800 font-medium outline-none resize-none min-h-[63px]"
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

      <Modal
        isOpen={isDeleteModalOpen}
        title={"작성하신 댓글을\n삭제하시겠습니까?"}
        buttonText="삭제하기"
        buttonColor="green"
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          onDelete(comment.commentId);
        }}
      />
    </div>
  );
}