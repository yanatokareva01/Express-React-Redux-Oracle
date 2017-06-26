import React from 'react';
import PointsForm from '../components/PointsForm';
import { Card } from 'belle';

export default class User extends React.Component {
	render() {
		const user = this.props.user;
		return (
			<div className="row">
				<div className="col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-6 col-xs-12">
					<Card>
						<div className="row">
							<div className="col-lg-4 col-md-4 col-xs-12">
								<img style={{marginTop: "10px"}} width="95%" height="95%" src={user.photo} />
							</div>
							<div className="col-lg-8 col-md-8 col-xs-12" style={{ textAlign: "left"}}>
								<h5 >{ user.username }</h5>
								<table className="table table-striped">
									<tbody>
									<tr>
										<td>Name</td>
										<td>{ user.name }</td>
									</tr>
									<tr>
										<td>About</td>
										<td>{ user.about }</td>
									</tr>
									<tr>
										<td>Activities</td>
										<td>{ user.activities }</td>
									</tr>
									</tbody>
								</table>
								<PointsForm sendRadius={this.props.sendRadius} sendPoint={this.props.sendPoint} user={user}/>
							</div>
						</div>
					</Card>
				</div>
				<div className="col-md-2">
					<Card>
						<form method="get" action="/users/sign_out">
							<button className="btn btn-primary">Sign out</button>
						</form>
						<br/>
					</Card>
				</div>
			</div>
		)
	}
}

User.propTypes = {
	user: React.PropTypes.object.isRequired
};