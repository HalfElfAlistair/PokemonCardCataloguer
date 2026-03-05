export const AccountIcon = ({ iconClass }: { iconClass: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 225 225" width="100%" className={iconClass}>
            <circle
                r="24"
                cx="113"
                cy="56"
                fill="none"
                strokeWidth="14"
            />
            <path
                d="
                    M 38 192
                    A 20 21
                     1 1 1 188 192
                    H 38
                    Z
                "
                fill="none"
                strokeWidth="14"
                strokeLinejoin="round"
            />
        </svg>
    )
}