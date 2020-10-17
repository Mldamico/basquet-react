import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducer/authReducer';
import { playReducer } from './reducer/playReducer';

const reducers = combineReducers({
  auth: authReducer,
  play: playReducer,
});

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const userInfoFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const isLogged = userInfoFromStorage ? true : false;

const initialState = {
  auth: { user: userInfoFromStorage, isLogged },
};

export const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
