import React from 'react';

export default class PointsForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { x: "0", y: "0", r: "4" };
	}

	loadPoints () {
		var xhr = new XMLHttpRequest();
		let url = '/users/' + this.props.user.username + '/points';
		xhr.open("get", url);

		xhr.send();

		xhr.onload = function () {
			this.props.setPoints(JSON.parse(xhr.responseText).map(function (point) {
				return { x: point.x, y: point.y, result: point.result };
			}))
		}.bind(this);
	}

	sendPoint() {
		let xhr = new XMLHttpRequest();
		xhr.open("post", this.props.action, true);
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

		xhr.send(JSON.stringify({
			x: this.state.x,
			y: this.state.y
		}));

		xhr.onload = function () {
			console.log('ok');
		};
	}

	changeX (e) {
		this.setState({ x: e.target.value});
	}

	changeY (e) {
		this.setState({ y: e.target.value});
	}

	changeR (e) {
		this.setState({ r: e.target.value});
	}

	render () {
		return (
			<div>
				<div className="form-group">
					<label htmlFor="r">R</label>
					<ul id="r">
						{[1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (number, i) {
							return (
								<label key={i}>
									<input name="r" onChange={this.changeR.bind(this)} checked={this.state.r == number}
									       style={{margin: "5px", width: "15px", height: "15px"}}
									       className="form-control"
									       type="checkbox" value={number}/>
									{number}
								</label>
							)
						}.bind(this))}
					</ul>
				</div>

				<div className="form-group">
					<label htmlFor="x">X</label>
					<ul>
						{[-4, -3, -2, -1, 0, 1, 2, 3, 4].map(function (number, i) {
							return (
								<label key={i}>
									<input id="x" name="x" onChange={this.changeX.bind(this)}
									       checked={this.state.x == number}
									       style={{margin: "5px", width: "15px", height: "15px"}}
									       className="form-control"
									       type="checkbox" value={number}/>
									{number}
								</label>
							)
						}.bind(this))}
					</ul>
				</div>

				<div className="form-group">
					<label htmlFor="y">Y</label>
					<input className="form-control" onChange={this.changeY.bind(this)} id="y" name="y" type="number"
					       min="-3" max="5"/>
				</div>

				<button type="submit" onClick={this.sendPoint.bind(this)} style={{width: "100%"}}
				        className="btn btn-success">Submit
				</button>
			</div>
		)
	}
}