import React from 'react';
import PointsForm from '../components/PointsForm';
import { Card } from 'belle';

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
				<div className="col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-6 col-xs-12">
					<Card>
						<div className="row">
							<div className="col-lg-4 col-md-4 col-xs-12">
								<img width="95%" height="95%" src={user.photo} />
							</div>
							<div className="col-lg-8 col-md-8 col-xs-12" style={{ textAlign: "left"}}>
								<p className="lead">{ user.username }</p>
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
								<PointsForm user={user} setPoints={this.props.setPoints} action={"/users/" + user.username + "/points"}/>
							</div>
						</div>
					</Card>
				</div>
			</div>
		)
	}
}

User.propTypes = {
	user: React.PropTypes.object.isRequired
};