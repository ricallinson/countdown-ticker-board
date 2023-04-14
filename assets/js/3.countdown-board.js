(function () {
	countdown.setLabels(
		' millisecond| second|m|hr|d|w| month| year| decade| century| millennium',
		' milliseconds| seconds|m|hr|d|w| months| years| decades| centuries| millennia',
		' ',
		' ',
		'',
		function(n){ return n.toString(); });
	function count(msg, due, len) {
		var s = countdown(null, Date.parse(due), countdown.WEEKS|countdown.DAYS|countdown.HOURS|countdown.MINUTES).toString();
		var txt = msg + new Array(len + 1).join(' ');
		txt = txt.substring(0, len);
		txt = txt.substring(0, txt.length - s.length);
		return txt + s;
	}
	function getData(id) {
		var ret = [];
		var data = document.getElementById(id);
		for (var i = 0; i < data.children.length; i++) {
			var child = data.children[i];
			ret.push({msg: child.innerText, due: child.dataset.due});
		}
		data.remove();
		return ret;
	}
	function render(d, cols) {
		var screen = [];
		d.forEach(function (item) {
			screen.push(count(item.msg, item.due, cols));
			screen.push('');
		});
		board.updateMessages(screen);
	}
	var id = 'count-down-data';
	var cols = parseInt(document.getElementById(id).dataset.cols, 10);
	var rows = parseInt(document.getElementById(id).dataset.rows, 10);
	var delay = parseInt(document.getElementById(id).dataset.delay, 10);
	var board = new Board('#count-down', {
		theme: 'dark',
		count: rows * 2,
		size: cols
	});
	var data = getData(id);
	var curr = 0;
	// console.log(cols, rows, delay, data);
	render(data.slice(curr, rows), cols);
	setInterval(function () {
		curr += rows;
		if (curr >= data.length) {
			curr = 0;
		}
		render(data.slice(curr, curr+rows), cols);
	}, (cols * 300) + (delay * 1000));
})();
