import React from 'react';

export default class Table extends React.Component {
	render () {
		return (
			<table id="table" className="table table-hover">
				<thead>
				<tr>
					<td>X</td>
					<td>Y</td>
					<td>Result</td>
				</tr>
				</thead>
				<tbody>
				{
					this.props.points.map(function (point, i) {
						return (
							<tr key={i} className={point.result ? "success" : "danger"}>
								<td>{point.x}</td>
								<td>{point.y}</td>
								<td>{String(point.result)}</td>
							</tr>
						)
					})
				}
				</tbody>
			</table>
		)
	}
}