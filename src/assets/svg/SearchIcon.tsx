export const SearchIcon = ({ iconClass }: { iconClass: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 225 225" width="100%" className={iconClass}>
            <circle
                r="55"
                cx="95"
                cy="95"
                fill="none"
                strokeWidth="14"
            />

            <line
                x1="135"
                y1="134"
                x2="185"
                y2="184"
                strokeWidth="14"
                strokeLinecap="round"
            />
        </svg>
    );
}