import authReducer from './auth';
import movieReducer from './movies';

import { combineReducers } from 'redux';

const rootReducers = combineReducers({
    auth: authReducer,
    movies: movieReducer
});

export default rootReducers;