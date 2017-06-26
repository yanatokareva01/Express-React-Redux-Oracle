module.exports = {
	check: function (x, y, r) {
		if (x > 0 && y > 0 && x < r && y < r) {
			return true;
		} else if (x < 0 && y > 0 && x*x + y*y < r*r/4) {
			return true;
		} else if (x > 0 && y < 0 && y > x - r / 2) {
			return true;
		} else if (x == 0 && y > -r / 2 && y < r) {
			return true;
		} else if (y == 0 && x > - r / 2 && x < r ) {
			return true;
		}
		return false;
	}
};