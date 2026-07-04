interface IconProps {
  className?: string;
}

// 기본 색상을 "text-black"으로 설정해 두었습니다.
export default function CloseIcon({ className = "text-black" }: IconProps) {
  return (
    <svg
      className={className}
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* stroke="#111111"로 고정되어 있던 색상을 "currentColor"로 변경했습니다. */}
      <path
        d="M17.3928 1.39282L1.39282 17.3928M1.39282 1.39282L17.3928 17.3928"
        stroke="currentColor"
        strokeWidth="2.78571"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
