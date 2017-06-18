import React from 'react';
import belle from 'belle';

export default class Form extends React.Component {
	render () {
		return (
			<div>
				<form method="post" action="#">
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input type="text" className="form-control" id="username" placeholder="username"/>
					</div>

					<div className="form-group">
						<label htmlFor="activities">Your Activities</label>
						<textarea className="form-control" id="activities" placeholder="activities"/>
					</div>

					<div className="form-group">
						<label htmlFor="about">About you</label>
						<textarea className="form-control" id="about" placeholder="about" rows="3"/>
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input type="password" className="form-control" id="password" placeholder="password"/>
					</div>

					<button type="submit" style={{width: "100%"}} className="btn btn-default">Submit</button>
				</form>
				<br/>
				<form action="#" method="post">
					<button style={{width: "100%"}} className="btn btn-primary" type="submit">Sign up with VK</button>
				</form>

			</div>
		)
	}
}