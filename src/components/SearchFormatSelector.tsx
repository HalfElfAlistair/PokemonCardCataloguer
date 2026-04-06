import { useSortFilterStates } from "../state/sortFilterContext";
export const SearchFormatSelector = () => {
    const { searchFormat, updateSearchFormat } = useSortFilterStates();
    return (
        <div
            className='searchFormatSelector flex'
        >
            {['Name', 'ID'].map((format: string) => {
                const lowerCaseFormat = format.toLowerCase();
                return (
                    <button
                        key={format}
                        className={`searchFormat${format} ${searchFormat === lowerCaseFormat ? 'searchFormatButtonActive' : ''}`}
                        onClick={() => updateSearchFormat(lowerCaseFormat)}
                    >
                        {format}
                    </button>
                )
            })}
        </div>
    )
}