export const addFavorite = (movie) => {
  return {
    type: 'ADD_TO_FAVORITES',
    payload: movie
  }
}

export const setRecomendedMovies = (movies) => {
  return {
    type: 'SET_RECOMENDED_MOVIES',
    payload: movies
  }
}

export const setNewMovies = (movies) => {
  return {
    type: 'SET_NEW_MOVIES',
    payload: movies
  }
}

export const setLoginToken = (token) => {
  return {
    type: 'SET_LOGIN_TOKEN',
    payload: token
  }
}

export const incrementFavoritesBadge = () => {
  return {
    type: 'INCREMENT_FAVORITES_BADGE'
  }
}

export const resetFavoriteBadge = () => {
  return {
    type: 'RESET_FAVORITES_BADGE'
  }
}

export const setRegistered = () => {
  return {
    type: 'REGISTERED'
  }
}