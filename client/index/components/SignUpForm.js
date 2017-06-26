import React from "react";

export default class Form extends React.Component {
	render () {
		return (
			<div>
				<form method="post" action="/users/sign_up_local">
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input required={true} type="text" name="username" className="form-control" id="username" placeholder="username"/>
					</div>

					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input required={true} type="text" name="name" className="form-control" id="name" placeholder="name"/>
					</div>

					<div className="form-group">
						<label htmlFor="activities">Your Activities</label>
						<textarea name="activities" className="form-control" id="activities" placeholder="activities"/>
					</div>

					<div className="form-group">
						<label htmlFor="about">About you</label>
						<textarea name="about" className="form-control" id="about" placeholder="about" rows="3"/>
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input required={true} name="password" type="password" className="form-control" id="password" placeholder="password"/>
					</div>

					<button type="submit" style={{width: "100%"}} className="btn btn-default">Submit</button>
				</form>
				<br/>
				<form action="/users/sign_up" method="post">
					<button style={{width: "100%"}} className="btn btn-primary" type="submit">Sign up with VK</button>
				</form>
			</div>
		)
	}
}