import React from 'react';

export default class Image extends React.Component {
	onImageClick (event) {
		const r = this.props.radius;

		let offsetX = event.nativeEvent.offsetX;
		let offsetY = event.nativeEvent.offsetY;

		const parent = document.getElementById('image-container');

		const x = r*(offsetX - parent.clientWidth / 2 ) / parent.clientWidth * 2;
		const y = r*(parent.clientHeight / 2 - offsetY) / parent.clientHeight * 2;

		this.props.sendPoint(x, y);
	}

	render () {
		let pointDivs;
		if (document.getElementById("image")) {
			let parent = document.getElementById("image");
			var r = this.props.radius;

			pointDivs = this.props.points.map(function (point, i) {
				const offsetX = point.x / r * parent.clientWidth / 2 + parent.clientWidth / 2;
				const offsetY = -point.y / r * parent.clientHeight / 2 + parent.clientHeight / 2;
				let className = "point " + (point.result == true ? "in" : "out");
				return (
					<div key={i} style={{top: offsetY + "px", left: offsetX + "px"}} className={className}/>
				)
			});
		} else {
			pointDivs = [];
		}
		return (
			<div id="image-container">
				{pointDivs}
				<img id="image" className="image" onClick={this.onImageClick.bind(this)} width="400px" height="400px" src="/assets/area.png" />
			</div>
		)
	}
}