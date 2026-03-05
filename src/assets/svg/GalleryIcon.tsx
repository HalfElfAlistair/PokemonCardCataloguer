export const GalleryIcon = ({ iconClass }: { iconClass: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 225 225" width="100%" transform="rotate(-20)" className={iconClass}>
            <rect
                width="103"
                height="152"
                x="81"
                y="37"
                rx="10"
                ry="10"
                fill="none"
                strokeWidth="14"
            />

            <rect
                width="61"
                height="50"
                x="102"
                y="58"
                rx="5"
                ry="5"
                fill="none"
                strokeWidth="14"
                id='currentPageID'
            />

            <path
                d="
                    M 63 185 
                    L 62 93
                    L 41 150
                    C 29 178 59 185 63 185
                    Z
                "
            />

            <path
                d="
                    M 23 154
                    L 51 77
                    L 15 116
                    C 6 125 0 137 23 154
                    Z
                "
            />
        </svg>
    );
}