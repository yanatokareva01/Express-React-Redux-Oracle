import { SET_POINTS } from '../constants/Page';

const initialState = {
	points: []
};

export default function page(state = initialState, action) {
	switch (action.type) {
		case SET_POINTS:
			return { ...state, points: action.payload};
		default:
			return state;
	}
}