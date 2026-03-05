interface PageHeaderProps {
    headerClass: string;
    containerClass: string;
    headingText: string;
    headingClass: string;
    subheading: string;
}

export const PageHeader = ({ headerClass, containerClass, headingText, headingClass, subheading }: PageHeaderProps) => {
    return (
        <header className={headerClass}>
            <div className={containerClass ? 'headingContainer' : ''}>
                <h1 className={headingClass ? headingClass : 'h1Green'}>{headingText}</h1>
                {subheading && (
                    <p>{subheading}</p>
                )}
            </div>
        </header>
    )
}