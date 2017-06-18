import React from 'react';
import Navbar from '../../shared/Navbar';
import User from '../components/User';
import Page from '../components/Page';
import { connect } from 'react-redux';
import * as pageActions from '../actions/PageActions';
import { bindActionCreators } from 'redux';

class App extends React.Component {
	render () {
		return (
			<div>
				<Navbar/>
				<div className="container starter-template">
					<User username={this.props.user.username}/>
					<Page points={this.props.page.points} setPoints={this.props.pageActions.setPoints}/>
				</div>
			</div>
		)
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
		pageActions: bindActionCreators(pageActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);