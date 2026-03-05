interface starIconProps {
    iconClass: string;
    favourite: boolean;
}
export const StarIcon = ({ iconClass, favourite }: starIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 225 225" width="100%" className={`${iconClass} ${favourite ? 'starTrue' : ''}`}>
            <path
                d="
                    M 117 38
                    L 142 86
                    L 195 95
                    L 157 132
                    L 165 187
                    L 117 162
                    L 69 187
                    L 77 132
                    L 38 95
                    L 93 86
                    Z
                "
                strokeWidth="14"
                strokeLinejoin="round"
            />
        </svg>
    )
}


