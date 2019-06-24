/* eslint-disable global-require */
/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import {createLogger} from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

let middleware = [thunk]; 


if (__DEV__) {
	// const reduxImmutableStateInvariant = require('redux-immutable-state-invariant')();
	const logger = createLogger({ collapsed: true });
	middleware = [...middleware,logger];
} else {
	middleware = [...middleware];
}
 
const persistConfig = {
	key: 'root',
	storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer, applyMiddleware(...middleware));
 
  export const store = createStore(persistedReducer);
	export const persistor = persistStore(store); 
  
 
// export default function configureStore(initialState) {
// 	return createStore(
// 		rootReducer,
// 		initialState,
// 		applyMiddleware(...middleware)
// 	);
// }
