import React from "react";

export default class SignInForm extends React.Component {
	render () {
		return (
			<div>
				<form method="post" action="/users/sign_in_local">
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input required={true} name="username" type="text" className="form-control" id="username" placeholder="username"/>
					</div>


					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input required={true} name="password" type="password" className="form-control" id="password" placeholder="password"/>
					</div>

					<button type="submit" style={{width: "100%"}} className="btn btn-success">Submit</button>
				</form>
				<br/>
				<form action="/users/sign_in" method="post">
					<button style={{width: "100%"}} className="btn btn-primary" type="submit">Sign in with VK</button>
				</form>

			</div>
		)
	}
}