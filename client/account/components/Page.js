import React from 'react'

export default class Page extends React.Component {
	onClick (e) {
		this.props.setPoints([ {ok: true}, { ok: false} ])
	}

	render() {
		const { points } = this.props;
		return (
			<div>
				<button onClick={this.onClick.bind(this)}>2014</button>
				<p>У тебя { points.length} точек! </p>
			</div>
		)
	}
}

Page.propTypes = {
	points: React.PropTypes.array.isRequired
};