import { useMealContext } from "../context";

const SearchForm = () => {
  const { search,handleSearch } = useMealContext();
  return (
    <div className="max-w-7xl my-6 flex mx-auto">
      <input
        type="text"
        className="mx-auto border rounded-lg border-black w-[85%] lg:w-[60%] h-12 px-5"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};
export default SearchForm;
