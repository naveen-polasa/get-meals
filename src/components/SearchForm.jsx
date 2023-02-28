import { useMealContext } from "../context";

const SearchForm = () => {
  const { search, handleSearch } = useMealContext();
  return (
    <div className="max-w-7xl py-6 flex mx-auto">
      <input
        type="text"
        className="mx-auto border-2 rounded-lg w-[80%] md:w-[38rem] h-12 px-5 text-xl bg-orange-50 border-red-300"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};
export default SearchForm;
