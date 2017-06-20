import React from 'react'
import Table from '../components/Table';
import { Card } from 'belle';
import Image from '../components/Image';

export default class Page extends React.Component {
	loadPoints (e) {
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

	render() {
		const { points } = this.props;
		let li = points.map(function (point) {
			return <li>{ point }</li>
		});
		return (
			<div className="row">
				<div className="col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-6 col-xs-12">
					<Card>
						<div className="row">
							<div className="col-lg-2 col-md-2 col-xs-12">
								<p>Points now: { points.length }</p>
								<button className="btn btn-primary" onClick={this.loadPoints.bind(this)} value="Load!">Load!</button>
							</div>
							<div className="col-lg-10 col-md-9">
								<Image points={points} action={"/users/" + this.props.user.username + "/points/"} setPoints={this.props.setPoints}/>
							</div>
						</div>
						<br/><br/>
						<div className="row">
							<div className="col-lg-12 col-md-12 col-xs-12">
								<Card>
								<Table points={points}/>
								</Card>
							</div>
						</div>
					</Card>
				</div>
			</div>
		)
	}
}

Page.propTypes = {
	points: React.PropTypes.array.isRequired
};