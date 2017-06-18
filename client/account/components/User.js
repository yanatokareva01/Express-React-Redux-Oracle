import React from 'react';

export default class User extends React.Component {
	render() {
		const { username } = this.props;
		return <div>
			<p>Привет, { username }!</p>
		</div>
	}
}

User.propTypes = {
	username: React.PropTypes.string.isRequired
};