import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../shared/Button';
import Navbar from '../shared/Navbar';

ReactDOM.render(
	<div>
		<Navbar/>
		<div className="container starter-template">
			<h1>Hello, world!</h1>
			<div className="row">
				<div className="col-lg-6 col-md-6 col-xs-12">
					<p className="lead">Try with VK</p>
					<Button value="Sign up!" action="/users/sign_up"/>
				</div>
				<div className="col-lg-6 col-md-6 col-xs-12">
					<p className="lead">Go with VK</p>
					<Button value="Sign in!" action="/users/sign_in"/>
				</div>
			</div>
		</div>
	</div>,
	document.getElementById("root")
);
