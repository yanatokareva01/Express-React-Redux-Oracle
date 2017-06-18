import React from 'react';

export default class SignInComponent {
	render () {
		return (
			<div>
				<form method="post" action="#">
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input type="text" className="form-control" id="username" placeholder="username"/>
					</div>


					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input type="password" className="form-control" id="password" placeholder="password"/>
					</div>

					<button type="submit" style={{width: "100%"}} className="btn btn-default">Submit</button>
				</form>
				<br/>
				<form action="#" method="post">
					<button style={{width: "100%"}} className="btn btn-primary" type="submit">Sign in with VK</button>
				</form>

			</div>
		)
	}
}