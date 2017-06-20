import React from 'react';

export default class Image extends React.Component {
	getRadius () {
		for (let input of document.getElementById("r").children)
			if (input.children[0].checked)
				return input.children[0].value;
	}

	onImageClick (event) {
		const r = this.getRadius();

		let offsetX = event.nativeEvent.offsetX;
		let offsetY = event.nativeEvent.offsetY;

		const parent = document.getElementById('image-container');

		const x = r*(offsetX - parent.clientWidth / 2 ) / parent.clientWidth * 2;
		const y = r*(parent.clientHeight / 2 - offsetY) / parent.clientHeight * 2;

		const xhr = new XMLHttpRequest();

		xhr.open("post", this.props.action);
		xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.onload = function () {
			this.loadPoints();
			//this.drawPoints();
		}.bind(this);

		xhr.send(JSON.stringify({ x: x, y: y }));
	}

	loadPoints (e) {
		var xhr = new XMLHttpRequest();
		let url = this.props.action;
		xhr.open("get", url);

		xhr.send();

		xhr.onreadystatechange = function () {
			if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				this.props.setPoints(JSON.parse(xhr.responseText).map(function (point) {
					return { x: point.x, y: point.y, result: point.result == 1 ? true : false };
				}))
			}
		}.bind(this);
	}

	render () {
		let pointDivs;
		if (document.getElementById("image")) {
			let parent = document.getElementById("image");
			var r = this.getRadius();

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