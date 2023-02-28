import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { useMealContext } from "../context";

const SingleMeal = () => {
  const { getSingleMeal, singleMeal, error } = useMealContext();

  const { id } = useParams();
  useEffect(() => {
    getSingleMeal(id);
  }, []);

  if (error) {
    return <Error />;
  }
  if (singleMeal.length === 0) {
    return <Loading />;
  }

  const {
    strMeal: name,
    strArea: area,
    strCategory: category,
    strMealThumb: image,
    strInstructions: instructions,
  } = singleMeal[0];

  return (
    <section className="w-[98%] lg:w-[66%] mx-auto text-center ">
      <h2 className="text-3xl my-5 font-bold">{name} </h2>
      <div className="md:flex gap-x-12 items-center m-4 border-2 md:p-6 border-red-400 bg-red-50 rounded-xl">
        <div className="w-72 md:w-96 mx-auto my-6 md:pb-9">
          <img src={image} alt={name} />
        </div>
        <div className="text-xl py-3 m-2 mx-auto text-start flex flex-col gap-6 w-[70%] lg:w-[50%]">
          <p>
            <span className="bg-lime-200 rounded-md px-1 font-semibold mr-3">
              Name:
            </span>
            {name}
          </p>
          <p>
            <span className="bg-lime-200 rounded-md px-1 font-semibold mr-3">
              Category:
            </span>
            {category}
          </p>
          <p>
            <span className="bg-lime-200 rounded-md px-1 font-semibold mr-3">
              Area:
            </span>
            {area}
          </p>
          <p>
            <span className="bg-lime-200 rounded-md px-1 font-semibold mr-3">
              Instructions:
            </span>
            {instructions && instructions.length > 400
              ? instructions.substring(0, 400)
              : instructions}
            ...
          </p>
        </div>
      </div>
      <Link to="/">
        <p className="mx-auto m-1 p-2 border text-center w-fit  rounded-lg bg-red-400  hover:bg-orange-400 hover:scale-110 duration-300 text-white my-4">
          Back To Home
        </p>
      </Link>
    </section>
  );
};
export default SingleMeal;
