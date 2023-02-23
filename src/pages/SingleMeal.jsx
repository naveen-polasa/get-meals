import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMealContext } from "../context";

const SingleMeal = () => {
  const { getSingleMeal, singleMeal, error } = useMealContext();

  const { id } = useParams();
  useEffect(() => {
    getSingleMeal(id);
  }, []);

  if (singleMeal.length === 0) {
    return (
      <div className="text-center text-3xl flex items-center gap-x-6 justify-center h-44">
        <span className="animate-spin inline-block  h-12 w-12  rounded-full text-white border-4 border-red-300  border-t-red-500"></span>{" "}
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-3xl h-36 flex items-center justify-center font-semibold">
        There was an error...
      </div>
    );
  }

  const {
    strMeal: name,
    strArea: area,
    strCategory: category,
    strMealThumb: image,
    strInstructions: instructions,
  } = singleMeal[0];

  return (
    <section className="w-[99x%] lg:w-[66%] mx-auto text-center">
      <h2 className="text-3xl my-5">{name} </h2>
      <div className="lg:flex  gap-x-12">
        <div className="w-72 md:w-96 mx-auto my-6 ">
          <img src={image} alt={name} className="" />
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
