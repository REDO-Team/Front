interface IconProps {
  className?: string;
}

export default function LeftArrowIcon({ className = "text-black" }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* 1. X 좌표를 반대로 수정하여 왼쪽을 가리키게 만들었습니다. (M15.5 -> 9.5 -> 15.5)
          2. stroke 속성을 "currentColor"로 변경하였습니다. 
      */}
      <path
        d="M15.5 6L9.5 12L15.5 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
