import React from 'react';

export default class User extends React.Component {
	componentDidMount () {
		let xhr = new XMLHttpRequest();
		xhr.open("get", "/users/current");
		xhr.send();

		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;

			if (xhr.status == 200) {
				this.props.loadCurrentUser(JSON.parse(xhr.responseText));
			}
		}.bind(this);
	}

	render() {
		const user = this.props.user;
		return (
			<div className="row">
				<div className="col-lg-4 col-md-4 col-xs-12">
					<img width="100%" height="100%" src={user.photo} />
				</div>
				<div className="col-lg-8 col-md-8 col-xs-12" style={{ textAlign: "left"}}>
					<h1>{ user.username }</h1>
					<h2>Name: { user.name }</h2>
					<h2>About: { user.about }</h2>
					<h2>Activities: { user.activities }</h2>
				</div>
			</div>
		)
	}
}

User.propTypes = {
	user: React.PropTypes.object.isRequired
};