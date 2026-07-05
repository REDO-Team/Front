interface IconProps {
  className?: string;
}

export default function MyIcon({ className }: IconProps) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.88 24.76C19.4413 24.76 24.76 19.4413 24.76 12.88C24.76 6.31868 19.4413 1 12.88 1C6.31868 1 1 6.31868 1 12.88C1 19.4413 6.31868 24.76 12.88 24.76Z"
        stroke="#909090"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8799 12.2861C13.6676 12.2861 14.423 11.9732 14.98 11.4162C15.537 10.8592 15.8499 10.1038 15.8499 9.31607C15.8499 8.52838 15.537 7.77295 14.98 7.21596C14.423 6.65898 13.6676 6.34607 12.8799 6.34607C12.0922 6.34607 11.3368 6.65898 10.7798 7.21596C10.2228 7.77295 9.90991 8.52838 9.90991 9.31607C9.90991 10.1038 10.2228 10.8592 10.7798 11.4162C11.3368 11.9732 12.0922 12.2861 12.8799 12.2861Z"
        stroke="#909090"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M21.1822 21.3807C20.9719 18.2913 18.3987 15.85 15.2558 15.85H10.5038C7.35682 15.85 4.78124 18.2978 4.5769 21.3932C7.19941 23.0748 13.4199 26.8401 21.1822 21.3932"
        stroke="#909090"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
