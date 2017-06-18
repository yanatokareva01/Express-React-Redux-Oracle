let React = require('react');

export default class Navbar extends React.Component {
	render () {
		return <nav className="navbar navbar-inverse navbar-fixed-top">
			<div className="container">
				<div className="navbar-header">
					<a className="navbar-brand" href="/">Lab 9</a>
				</div>
			</div>
		</nav>
	}
}