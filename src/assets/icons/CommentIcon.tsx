interface IconProps {
  className?: string;
}

export default function CommentIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="26"
      height="25"
      viewBox="0 0 26 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M13 10.4706V10.4841M7.66667 10.4706V10.4841M18.3333 10.4706V10.4841M21 1C22.0609 1 23.0783 1.42763 23.8284 2.1888C24.5786 2.94998 25 3.98236 25 5.05882V15.8824C25 16.9588 24.5786 17.9912 23.8284 18.7524C23.0783 19.5136 22.0609 19.9412 21 19.9412H14.3333L7.66667 24V19.9412H5C3.93913 19.9412 2.92172 19.5136 2.17157 18.7524C1.42143 17.9912 1 16.9588 1 15.8824V5.05882C1 3.98236 1.42143 2.94998 2.17157 2.1888C2.92172 1.42763 3.93913 1 5 1H21Z"
        stroke="#909090"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
