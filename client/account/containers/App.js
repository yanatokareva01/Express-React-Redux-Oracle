import React from 'react';
import Navbar from '../../shared/Navbar';
import User from '../components/User';
import Page from '../components/Page';
import { connect } from 'react-redux';
import * as pageActions from '../actions/PageActions';
import * as userActions from '../actions/UserActions';
import { bindActionCreators } from 'redux';

class App extends React.Component {
	componentDidMount () {
		this.loadCurrentUser();
	}

	render () {
		return (
			<div>
				<Navbar/>
				<div className="container starter-template">
					<User sendPoint={this.sendPoint.bind(this)} user={this.props.user} sendRadius={this.sendRadius.bind(this)} />
					<Page sendPoint={this.sendPoint.bind(this)} user={this.props.user} points={this.props.page.points} loadPoints={this.loadPoints.bind(this)}/>
				</div>
			</div>
		)
	}

	loadCurrentUser () {
		let xhr = new XMLHttpRequest();
		xhr.open("get", "/users/current");
		xhr.send();

		xhr.onload = function () {
			this.props.userActions.loadCurrentUser(JSON.parse(xhr.responseText));
			this.loadPoints();
		}.bind(this);
	}

	sendRadius (radius) {
		let xhr = new XMLHttpRequest();
		let url = "/users/" + this.props.user.username;
		let request = JSON.stringify({ radius: radius});

		xhr.open("post", url);
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.send(request);

		xhr.onload = function () {
			this.loadCurrentUser();
			this.loadPoints();
		}.bind(this);
	}

	sendPoint(x, y) {
		let xhr = new XMLHttpRequest();
		let url ="/users/" + this.props.user.username + "/points";
		xhr.open("post", url, true);
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

		xhr.send(JSON.stringify({
			x: x,
			y: y
		}));

		xhr.onload = function () {
			this.loadPoints();
		}.bind(this);
	}

	loadPoints () {
		var xhr = new XMLHttpRequest();
		let url = "/users/" + this.props.user.username + "/points";
		xhr.open("get", url);

		xhr.send();

		xhr.onload = function () {
			this.props.pageActions.setPoints(JSON.parse(xhr.responseText).map(function (point) {
				return { x: point.x, y: point.y, result: point.result };
			}))
		}.bind(this);
	}
}

function mapStateToProps (state) {
	return {
		user: state.user,
		page: state.page,
	}
}

function mapDispatchToProps (dispatch) {
	return {
		pageActions: bindActionCreators(pageActions, dispatch),
		userActions: bindActionCreators(userActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);