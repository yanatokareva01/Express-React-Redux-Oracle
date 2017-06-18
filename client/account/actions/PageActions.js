import { SET_POINTS } from '../constants/Page';

export function setPoints(points) {
	return {
		type: SET_POINTS,
		payload: points
	}
}