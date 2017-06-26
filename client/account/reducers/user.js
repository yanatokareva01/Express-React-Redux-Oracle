import { LOAD_CURRENT_USER } from '../constants/User';

const initialState = {
	username: '',
	name: '',
	photo: '',
	about: '',
	activities: '',
	radius: ''
};

export default function user(state = initialState, action) {
	switch (action.type) {
		case LOAD_CURRENT_USER:
			return {...state, ...action.payload };
		default:
			return state;
	}
}