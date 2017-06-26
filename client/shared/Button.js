import React from "react";

export default class SignUpButton extends React.Component {
	render() {
		return <form method="post" action={this.props.action}>
			<button className="btn btn-lg btn-primary" type="submit">{this.props.value}</button>
		</form>
	}
}