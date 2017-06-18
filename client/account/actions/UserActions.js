import { LOAD_CURRENT_USER } from '../constants/User';

export function loadCurrentUser(user) {
	return {
		type: LOAD_CURRENT_USER,
		payload: user
	}
}