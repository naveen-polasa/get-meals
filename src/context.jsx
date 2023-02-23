import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

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
};

const MealsContext = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SEARCH_WORD": {
        return { ...state, search: action.payload };
      }
      case "SET_MEALS_LIST": {
        return { ...state, mealsList: action.payload };
      }
      case "LOADING": {
        return { ...state, loading: !state.loading };
      }
      case "ERROR": {
        return { ...state, error: true };
      }
      case "SET_SINGLE_MEAL": {
        return { ...state, singleMeal: action.payload };
      }
      case "NO_MEALS": {
        return { ...state, isEmpty: action.payload };
      }
    }
  }, defaultState);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    dispatch({ type: "SEARCH_WORD", payload: searchValue });
  };

  const fetchMeals = useCallback(async () => {
    dispatch({ type: "NO_MEALS", payload: false });
    dispatch({ type: "LOADING" });
    try {
      const response = await fetch(`${url}${state.search}`);
      const data = await response.json();
      if (!data.meals) {
        dispatch({ type: "NO_MEALS", payload: true });
      }
      dispatch({ type: "SET_MEALS_LIST", payload: data.meals });

      dispatch({ type: "LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR" });
    }
  }, [state.search]);

  useEffect(() => {
    fetchMeals();
  }, [state.search]);

  const getSingleMeal = async (id) => {
    dispatch({ type: "SET_SINGLE_MEAL", payload: [] });
    try {
      const response = await fetch(`${single_meal_url}${id}`);
      console.log(response.ok);
      if (!response.ok) {
        dispatch({ type: "ERROR" });
        return;
      }
      const { meals } = await response.json();
      dispatch({ type: "SET_SINGLE_MEAL", payload: meals });
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR" });
    }
  };

  return (
    <MealContext.Provider value={{ ...state, handleSearch, getSingleMeal }}>
      {children}
    </MealContext.Provider>
  );
};

export const useMealContext = () => useContext(MealContext);

export default MealsContext;
