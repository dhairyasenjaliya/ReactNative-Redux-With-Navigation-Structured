import { combineReducers } from 'redux';
import homeReducer from './appscreens/homeReducer';
import userReducer from './appscreens/userReducer';

const rootReducer = combineReducers({
	homeReducer,
	userReducer
});

export default rootReducer;
