function SearchBar({ globalFilter, setGlobalFilter }) {
    return (
        <div className="my-4">
            <input
                type="text"
                value={globalFilter || ''}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Search..."
                className="w-full py-2 px-4 bg-[#060E22] border-b-2 border-gray-800 focus:outline-none rounded-md"
            />
        </div>
    );
}
export default SearchBar;