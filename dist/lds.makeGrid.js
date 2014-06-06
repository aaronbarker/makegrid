/*!
* makeGrid
* @description	Dynamically creates rows/cols for grids of images/blocks responsively
* @version		1.3.0 - 2014/06/06
* @author		Aaron Barker
* @requires	ui.widget.js
* @copyright	Copyright Intellectual Reserve Inc. All rights reserved.
*/
(function($) {
	"use strict";
	$.widget("lds.makeGrid", {
		options: {
			firstClass:"first",
			lastClass:"last",
			selectorExclude:false, // sometimes there are elements you don't want included (cms added things, positioned elements, etc)
			setupResize:function(event,self){ // declared as an option so other resize solutions can be used, such as a throttle
				$(window).on("resize orientationchange",function(){
					self.fit();
				});
			}
		},
		_create: function() { // things that should only happen one time.
			// console.debug("method: _create");
			var self = this;
			if (document.all && document.documentMode && 8 === document.documentMode) {
				self.options.isIE8 = true;
			}
			self._trigger("setupResize", 0, self);

			self.fit();
		},
		fit:function(){
			// console.debug("method: fit");
			var opts = this.options,  elem = this.element,
				kids = elem.children().not(opts.selectorExclude),
				firstClass = opts.firstClass,
				lastClass = opts.lastClass,
				maxCols = elem.data("cols")||opts.maxCols,
				elemWidth = elem.width(),
				firstKid = kids.eq(0),
				marginRight = parseInt(firstKid.css("margin-right"),10),
				minColWidth = parseInt(firstKid.css("min-width"),10)||elem.data("width")||150,
				numCols = Math.floor(elemWidth/(minColWidth+marginRight)),
				wrapperRightX = elem.offset().left + elem.width(),
				totalMargin,elemRemainder,colWidthPX,colWidth,lastOfRow;

			// make sure a few required things are available
			if(firstKid.css("float") === "none"){
				// if the kids aren't floated things go bad. So make sure they are
				console.debug("MakeGrid: kids aren't floated");
				return;
			}
			if(!firstKid.outerHeight(true)){
				// if the kids don't have a height (due to absolutely positioning sub-elements, or images not loaded yet) things go bad. So make sure we have some kind of height
				console.debug("MakeGrid: kids don't have height");
				return;
			}
			kids.removeClass(firstClass+" "+lastClass);

			if(numCols > maxCols) {
				numCols = maxCols;
			}
			if(elem.data("fill") && numCols > kids.length){
				numCols = kids.length;
			}
			totalMargin = marginRight * (numCols - 1); // minus one for last getting margin 0
			elemRemainder = elemWidth - totalMargin;
			colWidthPX = Math.floor(elemRemainder/numCols);
			colWidth = Math.floor((colWidthPX/elemWidth)*10000000000)/100000000;

			if(numCols === "1"){
				colWidth = "100%";
			}
			kids.css("width",colWidth+"%");

			// run any logic for making rows fit
			if(numCols > 1){
				// nth-child wouldn't work when the selectorExclude was being used
				kids.each(function(index){
					if(index%numCols === 0){
						$(this).addClass(firstClass);
					}
					if(index%numCols === numCols-1){
						$(this).addClass(lastClass);
					}
				});
			} else {
				// even if there is only one column, the first/last clases are beneficial to othe plugins
				kids.addClass(firstClass+" "+lastClass);
			}

			// occasionally with a decimal margin, things don't add up. Make sure they do
			lastOfRow = kids.eq(numCols-1);
			// console.debug(lastOfRow,wrapperRightX,lastOfRow.offset().left + lastOfRow.outerWidth(true));
			if(!opts.isIE8){ // ie8 siezes up on this loop, so don't do it in ie8
				var x = 0;
				while(lastOfRow.length && (wrapperRightX - (lastOfRow.offset().left + lastOfRow.outerWidth(true)) > 10)){
					/*  Nice round numbers like 0.1 cause interesting floating
						point rounding errors because they cannot be accuratly 
						represented in binary. Using numbers that can (ie 0.015625)
						eliminates the floating point error in this *one case*,
						and speeds up the loop considerably.
					*/
					colWidth = colWidth - 0.015625;

					// last column is the same as first colum, there is a width issue
					kids.css("width",colWidth+"%");
					// in rare circumstances this goes into an endless loop. the following is a safety valve
					if(x > 10){
						return;
					}
					x++;
				}
			}
		}
	});
	$.extend($.lds.makeGrid, {
		version: "1.3.0"
	});
})(jQuery);