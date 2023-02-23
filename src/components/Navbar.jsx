import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="border-b-2">
      <nav className="max-w-7xl mx-auto h-14 flex justify-between items-center px-6">
        <Link to="/">
          <h3 className="font-bold text-2xl">GetMeals</h3>
        </Link>
        <div className="flex gap-12 font-semibold text-xl">
          <Link to="/">Meals</Link>
          <Link to="about">
            <h3>About</h3>
          </Link>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
