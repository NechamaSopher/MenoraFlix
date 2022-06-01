const initialState = {
  favoritesMovies: [],
  recomendedMovies: [],
  newMovies: [],
  favoritesBadge: 0
};

const movieReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favoritesMovies: [...state.favoritesMovies, action.payload]
      };
    
    case 'SET_RECOMENDED_MOVIES':
      return {
        ...state,
        recomendedMovies: action.payload
      };

    case 'SET_NEW_MOVIES':
      return {
        ...state,
        newMovies: action.payload
      };

    case 'INCREMENT_FAVORITES_BADGE':
      return {
        ...state,
        favoritesBadge: ++state.favoritesBadge
      };

    case 'RESET_FAVORITES_BADGE':
      return {
        ...state,
        favoritesBadge: 0
      };
    default:
    return state;
  }
}
export default movieReducer;