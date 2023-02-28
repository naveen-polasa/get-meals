import { Link } from "react-router-dom";
import { useMealContext } from "../context";
import Error from "./Error";
import Loading from "./Loading";

const MealsList = () => {
  const { mealsList, currentPage, loading, error, isEmpty, paginateBtn } =
    useMealContext();

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Loading />;
  }

  if (isEmpty || !mealsList[0]) {
    return <h4 className="text-center text-4xl py-12">No Meals Found...</h4>;
  }

  return (
    <div className="max-w-7xl px-5 mx-auto">
      <div className="mx-auto  flex gap-8 flex-wrap justify-center lg:gap-16">
        {mealsList[currentPage].map((meal) => {
          const {
            strMeal: name,
            idMeal: id,
            strArea: area,
            strMealThumb: image,
          } = meal;
          return (
            <article
              key={id}
              className="bg-red-50 border border-red-500 w-72 rounded-xl hover:scale-105 duration-300 ease-linear"
            >
              <div>
                <img
                  src={image}
                  alt={name}
                  className="rounded-t-xl border-b border-red-300"
                />
              </div>
              <div className="text-center p-2 flex justify-around items-center">
                <div className="w-fit">
                  <h3 className="font-semibold text-xl">{name}</h3>
                  <p className="font-mono text-sm">{area}</p>
                </div>
                <Link to={`/meal/${id}`}>
                  <p className="mx-auto m-1 p-2  border w-min rounded-lg bg-red-400 hover:scale-110 hover:bg-orange-400 duration-300 text-white border-red-500">
                    Details
                  </p>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      <div className="text-center py-4">
        {mealsList.map((meal, index) => {
          return (
            <button
              key={index}
              className="mx-3 my-3 px-4 py-2 border w-min rounded-lg bg-red-400 hover:scale-110 hover:bg-orange-400 duration-300 text-white"
              onClick={() => paginateBtn(index)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default MealsList;
