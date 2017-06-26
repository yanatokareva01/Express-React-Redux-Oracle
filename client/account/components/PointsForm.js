import React from 'react';

export default class PointsForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { x: "0", y: "0", message: '' };
	}

	onButtonClick() {
		let valid = this.validate(this.state.y);
		if(valid) {
			this.setState({message: ''});
			this.props.sendPoint(this.state.x, this.state.y);
		}
	}

	changeX (e) {
		this.setState({ x: e.target.value});
	}

	changeY (e) {
		this.setState({ y: e.target.value});
	}

	changeR (number) {
		this.props.sendRadius(number)
	}

	validate (value) {
		let errorMessage;

		let y = this.round(value);

		if (isNaN(value) || value == "") {
			errorMessage = "Y is empty";
		}
		if (y < -3 || y > 5) {
			errorMessage = "Y should be between [-3; 3]";
		}

		if (errorMessage) {
			this.setState({message: errorMessage});
			return false;
		}
		return true;
	}

	round (number) {
		if (number.split('.').length == 2) {
			return number.split('.')[0] + '.' + number.split('.')[1].substr(0, 5);
		}

		return number;
	}

	render () {
		return (
			<div>
				<div className={this.state.message ? "alert alert-danger" : ""}>{this.state.message}</div>
				<div className="form-group">
					<label htmlFor="r">R</label>
					<ul id="r">
						{[1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (number, i) {
							return (
								<label key={i}>
									<input name="r" onChange={this.changeR.bind(this, number)} checked={this.props.user.radius == number}
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

				<button type="submit" onClick={this.onButtonClick.bind(this)} style={{width: "100%"}}
				        className="btn btn-success">
					Submit
				</button>
			</div>
		)
	}
}