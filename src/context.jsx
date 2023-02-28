import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { reducer } from "./utils/reducer";
import Paginate from "./utils/Paginate";

const MealContext = createContext();

const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const single_meal_url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

const defaultState = {
  search: "",
  loading: false,
  error: false,
  mealsList: [],
  singleMeal: [],
  isEmpty: false,
  currentPage: 0,
};

const MealsContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    dispatch({ type: "SEARCH_WORD", payload: searchValue });
  };

  const fetchMeals = useCallback(async () => {
    try {
      dispatch({ type: "ERROR", payload: false });
      dispatch({ type: "NO_MEALS", payload: false });
      dispatch({ type: "LOADING", payload: true });

      const response = await fetch(`${url}${state.search}`);
      const { meals } = await response.json();
      if (!meals) {
        dispatch({ type: "NO_MEALS", payload: true });
      }
      dispatch({ type: "LOADING", payload: false });
      if (meals === null) {
        return;
      }
      dispatch({
        type: "SET_MEALS_LIST",
        payload: Paginate(meals),
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: true });
    }
  }, [state.search]);

  useEffect(() => {
    fetchMeals();
  }, [state.search]);

  const getSingleMeal = async (id) => {
    try {
      const response = await fetch(`${single_meal_url}${id}`);
      const { meals } = await response.json();
      dispatch({ type: "SET_SINGLE_MEAL", payload: meals });
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: true });
    }
  };

  const paginateBtn = (index) => {
    dispatch({ type: "CHANGE_PAGE", payload: index });
  };

  return (
    <MealContext.Provider
      value={{ ...state, handleSearch, getSingleMeal, paginateBtn }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMealContext = () => useContext(MealContext);

export default MealsContext;
