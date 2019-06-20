import * as types from '../../constants/actionTypes';
import initialState from '../initialState';

export default function(state = initialState.projectData, action) {
	
	switch (action.type) {
		case types.INCREMENT: 
			return { ...state, counter: Number(state.counter) + 1 };
		case types.DECREMENT: 
			return { ...state, counter: Number(state.counter) - 1 };
		case types.UPDATE: 
			return {
				...state,
				counter: action.payload,
			};
		case types.CHECK:
			// console.warn(action.payload)
			return {
				...state,
				check: state.check ? false : true,
			};
		// console.warn(action.payload)
		//  if(state.check === true)
		//  {
		// 			return { ...state, check: false };
		//  }
		//  else{
		// 			return { ...state, check: true };
		//  }
		default:
			return state;
	}
}
