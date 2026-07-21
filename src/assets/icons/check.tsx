const CheckIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            className={className}
            width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16.25 1.25L6.25 11.25L1.25 6.25"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default CheckIcon;