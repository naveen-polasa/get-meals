import { Link } from "react-router-dom";
import { useMealContext } from "../context";

const MealsList = () => {
  const { mealsList, loading, error, isEmpty } = useMealContext();

  if (loading) {
    return (
      <div className="text-center text-3xl flex items-center gap-x-6 justify-center h-44">
        <span className="animate-spin inline-block  h-12 w-12  rounded-full text-white border-4 border-red-300  border-t-red-500"></span>{" "}
        Loading...
      </div>
    );
  }
  if (isEmpty || !mealsList) {
    return <h4 className="text-center text-4xl py-12">No Meals Found...</h4>;
  }
  if (error) {
    return (
      <div className="text-center text-3xl h-36 flex items-center justify-center font-semibold">
        There was an error...
      </div>
    );
  }

  return (
    <div className="max-w-7xl px-5 mx-auto">
      <div className="mx-auto  flex gap-8 flex-wrap  justify-center">
        {mealsList.map((meal) => {
          const {
            strMeal: name,
            idMeal: id,
            strArea: area,
            strMealThumb: image,
          } = meal;
          return (
            <article
              key={id}
              className="bg-slate-50 border w-72 rounded-xl border-slate-600 "
            >
              <div>
                <img src={image} alt={name} className="rounded-t-xl" />
              </div>
              <div className="text-center p-2 flex justify-around items-center">
                <div className="w-fit">
                  <h3>{name}</h3>
                  <p className="font-light">{area}</p>
                </div>
                <Link to={`/meal/${id}`}>
                  <p className="mx-auto m-1 p-2  border w-min rounded-lg bg-red-400 hover:scale-110 hover:bg-orange-400 duration-300 text-white">
                    Details
                  </p>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
export default MealsList;
