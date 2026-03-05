export const CloseIcon = ({ iconClass }: { iconClass: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 225 225" width="100%" className={iconClass}>
            <line x1="52" y1="52" x2="182" y2="182" strokeWidth="14" />
            <line x1="52" y1="182" x2="182" y2="52" strokeWidth="14" />
        </svg>
    )
}