import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../shared/Navbar";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";

ReactDOM.render(
	<div>
		<Navbar/>
		<div className="container starter-template">
			<div className="row">
				<div className="col-lg-6 col-md-6 col-xs-12">
					<div className="row">
						<div className="col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-5 col-xs-12">
							<p className="lead">Sign up</p>
							<SignUpForm/>
						</div>
					</div>
				</div>
				<div className="col-lg-6 col-md-6 col-xs-12">
					<div className="row">
						<div className="col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-5 col-xs-12">
							<p style={{color: "#5cb85c"}} className="lead">Sign in</p>
							<SignInForm/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>,
	document.getElementById("root")
);
