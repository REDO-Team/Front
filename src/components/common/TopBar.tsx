import type { ReactNode } from "react";

interface TopBarProps {
  title?: string;
  leftIcon?: ReactNode;
  leftText?: string; // leftIcon 옆에 글자를 바로 적고 싶을 때 사용. leftIcon에서 두 덩어리로 작성해도 됨.
  rightIcon?: ReactNode;
}

export default function TopBar({
  title,
  leftIcon,
  leftText,
  rightIcon,
}: TopBarProps) {
  return (
    <header className="relative flex items-center justify-between w-full h-[56px] px-4 bg-white">
      {/* 왼쪽 아이콘 영역 */}
      {/* 꺾새 옆에 바로 글자를 적을 때 leftIcon에서 두 덩어리로 작성해주세요! */}
      {(leftIcon || leftText) && (
        <div className="flex items-center justify-start z-10 gap-4 text-lg font-semibold leading-none text-black">
          {leftIcon}
          {leftText && (
            <span className="text-lg font-semibold leading-none text-center text-black">
              {leftText}
            </span>
          )}
        </div>
      )}

      {/* 가운데 제목 영역 */}
      {title && (
        <div className="absolute inset-0 flex items-center justify-center px-12 pointer-events-none">
          <span className="max-w-full truncate whitespace-nowrap text-lg font-semibold leading-none text-center text-black">
            {title}
          </span>
        </div>
      )}

      {/* 오른쪽 아이콘 영역 */}
      {rightIcon && (
        <div className="ml-auto flex items-center justify-end z-10 text-base font-semibold text-black">
          {rightIcon}
        </div>
      )}
    </header>
  );
}
