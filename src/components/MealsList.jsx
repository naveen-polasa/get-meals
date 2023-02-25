import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMealContext } from "../context";
import Loading from "./Loading";

const MealsList = () => {
  const { mealsList, currentPage, loading, error, isEmpty, paginateBtn } =
    useMealContext();

  if (loading) {
    return <Loading />;
  }

  if (isEmpty || !mealsList[0]) {
    return <h4 className="text-center text-4xl py-12">No Meals Found...</h4>;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="max-w-7xl px-5 mx-auto">
      <div className="mx-auto  flex gap-8 flex-wrap  justify-center">
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
      <div className="text-center">
        {mealsList.map((meal, index) => {
          return (
            <button
              key={index}
              className=" mx-3 my-3 px-4 py-2 border w-min rounded-lg bg-red-400 hover:scale-110 hover:bg-orange-400 duration-300 text-white"
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
