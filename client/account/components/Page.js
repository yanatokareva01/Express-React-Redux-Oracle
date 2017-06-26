import React from 'react'
import Table from '../components/Table';
import { Card } from 'belle';
import Image from '../components/Image';

export default class Page extends React.Component {
	render() {
		const { points, user } = this.props;
		let li = points.map(function (point) {
			return <li>{point}</li>
		});
		return (
			<div className="row">
				<div className="col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-6 col-xs-12">
					<Card>
						<div className="row">
							<div className="col-lg-2 col-md-2 col-xs-12">
								<p>Points now: {points.length}</p>
								<button className="btn btn-primary" onClick={this.props.loadPoints} value="Load!">Load!</button>
							</div>
							<div className="col-lg-10 col-md-9">
								<Image radius={user.radius} points={points} sendPoint={this.props.sendPoint}/>
							</div>
						</div>
					</Card>
					<Card>
						<div className="row">
							<div className="col-lg-12 col-md-12 col-xs-12">
								<Table points={points}/>
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