import React from 'react';

export default class SignUpButton extends React.Component {
	render() {
		return <form method="post" action="/users/sign_up">
			<input type="submit"/>
		</form>
	}
}