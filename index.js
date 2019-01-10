const constant = require('d3-force/src/constant');

module.exports = function () {
	let nodes;
	let sizes;
	let bounds;
	let sizeFn = constant([0, 0]);

	function force() {
		for (let i = 0; i < nodes.length; i += 1) {
			const node = nodes[i];
			const size = sizes[i];
			const xi = node.x + node.vx;
			const x0 = bounds[0][0] - xi + size[0];
			const x1 = bounds[1][0] - (xi + size[0]);
			const yi = node.y + node.vy;
			const y0 = bounds[0][1] - yi + size[1];
			const y1 = bounds[1][1] - (yi + size[1]);

			if (x0 > 0 || x1 < 0) {
				node.x += node.vx;
				node.vx = -node.vx;
				if (node.vx < x0) {
					node.x += x0 - node.vx;
				}
				if (node.vx > x1) {
					node.x += x1 - node.vx;
				}
			}
			if (y0 > 0 || y1 < 0) {
				node.y += node.vy;
				node.vy = -node.vy;
				if (node.vy < y0) {
					node.vy += y0 - node.vy;
				}
				if (node.vy > y1) {
					node.vy += y1 - node.vy;
				}
			}
		}
	}

	force.initialize = function (_) {
		nodes = _;
		sizes = nodes.map(sizeFn);
	};

	force.bounds = function (_) {
		bounds = _;
		return arguments.length > 0 ? (bounds, force) : bounds;
	};

	force.size = function (_) {
		if (arguments.length > 0) {
			if (typeof _ === 'function') {
				sizeFn = _;
			} else {
				sizeFn = constant(_);
			}

			return force;
		}
		return sizeFn;
	};

	return force;
};
