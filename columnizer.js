function Columnizer (container, options) {
	this.container = $(this.getSpecificSelector(container));
	this.options = options;
	this.cols = {count : false, set : []};
	this.init();

}
Columnizer.prototype.init = function() {
	this.outerWidth = this.container.width();
	console.log( this.options );
	if (this.options) {
		this.itemSelector = this.options.itemSelector ? this.options.itemSelector : this.getSpecificSelector($(this.children[0])); //getSpecificSelector($(this.options.itemSelector)) : getSpecificSelector($(this.container.children()[0]));
		this.item = $(this.itemSelector);
		this.columnWidth = this.options.columnWidth ? this.options.columnWidth : this.item.width();
		this.gutter = this.options.gutter ? this.options.gutter : false;
		this.spacing = this.options.spacing ? this.options.spacing : false;
		this.cols.count = this.options.cols ? this.options.cols : false;
		this.bias = this.options.bias ? this.options.bias : 'left';
		this.exception = this.options.exception ? this.options.exception : 0;
	} else {
		this.itemSelector = this.getSpecificSelector($(this.container.children()[0]));
		this.item = $(this.itemSelector);
		this.columnWidth = this.item.width();
		this.cols.count = Math.floor(this.outerWidth / this.columnWidth);
		this.bias = 'left';
	}
	if (this.cols.count == false) this.cols.count = Math.floor(this.outerWidth / this.columnWidth);
	if (!this.gutter) this.gutter = parseInt(this.item.css('margin-right'));
	if (!this.spacing) this.spacing = parseInt(this.item.css('margin-bottom'));
	for (var i = 0; i < this.cols.count; i++) { this.cols.set.push([i,0]); }

	// Setup the container and item properties
	if (this.container.css('position') == 'static') this.container.css('position', 'relative');
	for (var i = 0; i < this.item.length; i++) {
		o = $(this.item[i]);
		css = {
			top: o.position().top + 'px',
			left: o.position().left + 'px',
			transition: 'top 500ms ease-in-out, left 500ms ease-in-out'
		}
		o.css(css);
		//o.addClass('columnizer-item')
	}
	this.item.css('position', 'absolute');

	this.columnize();
}
Columnizer.prototype.columnize = function() {
	for (var i = 0; i < this.item.length; i++) {
		o = $(this.item[i]);
		this.cols.set.sort(function(a,b) { return a[1] - b[1] });
		col = this.cols.set[0];
		this.cols.set.sort(function(a,b) { return a[0] - b[0] });
		if (col[0] > 0) {
			for (j = 0; j < col[0]; j++) {
				if (this.cols.set[j][1] < (col[1] + this.exception)) {
					col = this.cols.set[j];
					break;
				}
			}
		}
		t = col[1];
		theCss = {
			'position': 'absolute',
			'left' : col[0] * (this.columnWidth + this.gutter) + 'px',
			'top' : t + 'px'
		}
		o.css(theCss);
		col[1] += o.height() + this.spacing;
	}

	this.cols.set.sort(function(a,b) { return b[1] - a[1]; });
	this.container.css('height', this.cols.set[0][1] + 'px');
}
Columnizer.prototype.getSpecificSelector = function (el) {
	el = $(el);
	s = el.prop('tagName').toLowerCase() + ( el.prop('className') ? '.' + el.attr('class').replace(' ','.') : '') + ( el.attr('id') ? '#' + el.attr('id') : '');
	while (s.indexOf('..') != -1) { s = s.replace('..','.'); };
	if (s.substr(-1) == '.') { s = s.substr(0, s.length -1); };
	return s;
}
