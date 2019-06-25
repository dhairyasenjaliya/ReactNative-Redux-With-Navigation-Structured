import * as types from '../../constants/actionTypes';
import initialState from '../initialState'; 

export default function(state = initialState.userinfo, action) {
	switch (action.type) {
		case types.USER:  
			return { ...state, users: action.payload}; 
		case types.LOGOUT: 
			return { ...state , users : 'Guest' }
		default:
			return state;
	}
}
