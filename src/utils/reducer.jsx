export const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_WORD": {
      return { ...state, search: action.payload };
    }
    case "SET_MEALS_LIST": {
      return { ...state, mealsList: action.payload };
    }
    case "LOADING": {
      return { ...state, loading: action.payload };
    }
    case "ERROR": {
      return { ...state, error: action.payload };
    }
    case "SET_SINGLE_MEAL": {
      return { ...state, singleMeal: action.payload };
    }
    case "NO_MEALS": {
      return { ...state, isEmpty: action.payload };
    }
    case "CHANGE_PAGE": {
      return { ...state, currentPage: action.payload };
    }
  }
};
