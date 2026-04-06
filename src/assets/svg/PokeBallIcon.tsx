export const PokeBallIcon = () => {
    return (
        <svg height="160" width="160" xmlns="http://www.w3.org/2000/svg">
            {/* top half */}
            <path
                d="
                M 40 80
                A 40 40 0 0 1 120 80
                M 40 80
                H 120
                "
                fill="red"
                stroke="red"
                strokeWidth="4"
            />
            {/* bottom half */}
            <path
                d="
                M 40 80
                A 40 40 0 0 0 120 80
                M 40 80
                H 120
                "
                fill="white"
                stroke="white"
                strokeWidth="4"
            />
            {/* centre line */}
            <path
                d="
                M 40 80
                H 120
                "
                fill="black"
                stroke="black"
                strokeWidth="4"
            />
            {/* centre circle */}
            <circle cx="80" cy="80" r="12" stroke="black" strokeWidth="4" fill="white" />
            {/* outline */}
            <circle cx="80" cy="80" r="40" stroke="black" strokeWidth="4" fill="none" />
        </svg>
    )
}