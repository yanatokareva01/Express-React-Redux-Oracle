import React from 'react';
import Navbar from '../../shared/Navbar';
import User from '../components/User';
import Page from '../components/Page';
import { connect } from 'react-redux';
import * as pageActions from '../actions/PageActions';
import * as userActions from '../actions/UserActions';
import { bindActionCreators } from 'redux';

class App extends React.Component {
	render () {
		return (
			<div>
				<Navbar/>
				<div className="container starter-template">
					<User user={this.props.user} setPoints={this.props.pageActions.setPoints} loadCurrentUser={this.props.userActions.loadCurrentUser} />
					<Page user={this.props.user} points={this.props.page.points} setPoints={this.props.pageActions.setPoints}/>
				</div>
			</div>
		)
	}

	loadPoints () {
		var xhr = new XMLHttpRequest();
		let url = '/users/' + this.props.user.username + '/points';
		xhr.open("get", url);

		xhr.send();

		xhr.onload = function () {
			this.props.setPoints(JSON.parse(xhr.responseText).map(function (point) {
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