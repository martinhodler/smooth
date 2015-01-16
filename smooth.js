/*
 *	smooth is a small javascript-file that enables a smooth scrolling on the most actual webbrowsers.
 *
 *	Copyright © 2014 Martin Hodler <martin.hodler@gmail.com>
 *
 *	GNU GPL v3
 *
 *	This program is free software: you can redistribute it and/or modify
 *	it under the terms of the GNU General Public License as published by
 *	the Free Software Foundation, either version 3 of the License, or
 *	(at your option) any later version.
 *
 *	This program is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *	GNU General Public License for more details.
 *
 *	You should have received a copy of the GNU General Public License
 *	along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

var SMOOTH = function () {
	var scrollPos = 0;
	var scrollEnd = 0;
	var isAnimating = false;
	var endTime = 0;
	var isIE = false;
	var isChrome = false;

	function init(e) {
		isIE = window.navigator.userAgent.match(/.NET/i) ? true : false;
		isChrome = window.navigator.userAgent.match(/Chrome/i) ? true : false;
		
		if (isIE)
			setTimeout(function() { calculate(false); }, 100);
		else
			calculate(false);
	}

	function resize(e) {
		calculate(false);
	}

	function calculate(posOnly) {
		posOnly = (posOnly !== undefined && posOnly === true) ? true : false;

		if (isChrome) {
			scrollPos = document.body.scrollTop;
			if (!posOnly)
				scrollEnd = document.body.scrollTop;
		} else {
			scrollPos = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
			if (!posOnly) {
				scrollEnd = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
			}
		}
	}

	function scroll(e) {		
		if (isIE) {
			if (document.compatMode == "CSS1Compat")
				calculate(true);
		}
		
		var delta = e.wheelDelta;
		if (typeof delta === "undefined")
			delta = e.detail * -40;
		
		delta = delta * -1;
		
		scrollEnd += delta;
		
		if (scrollEnd < 0)
			scrollEnd = 0;
		if (scrollEnd > (document.clientHeight - window.innerHeight) + 3)
			scrollEnd = (document.clientHeight - window.innerHeight) + 3;
		
		endTime = new Date().getTime() + 1000;
		
		if (!isAnimating)
			scrollStep();
			
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}		
	}

	function scrollStep() {
		isAnimating = true;
		time = new Date().getTime();
		
		var delta = endTime - time;
		scrollPos += (scrollEnd - scrollPos) / 5000 * delta;
		
		if (scrollPos < 5)
			scrollPos = Math.floor(scrollPos);
		else
			scrollPos = Math.round(scrollPos);
		
		if (scrollPos > (document.body.clientHeight - window.innerHeight) - 5)
			scrollPos = Math.floor(scrollPos);
		else
			scrollPos = Math.round(scrollPos);
		
		
		var top = 0;
		
		if (isChrome) {
			document.body.scrollTop = scrollPos;
			top = document.body.scrollTop;
		} else {
			document.documentElement.scrollTop = scrollPos;
			top = document.documentElement.scrollTop;
		}
		
		if (delta > 0 && top == scrollPos) {
			setTimeout(scrollStep, 32);
		} else {
			scrollPos = top;
			scrollEnd = top;
			isAnimating = false;
		}
	}



	var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";
	 
	if (document.addEventListener) { 
		document.addEventListener(mousewheelevt, function(e){ scroll(e); }, false);
		addEventListener("load", function(e){ init(e); }, false);
	} else if (document.attachEvent) { 
		document.attachEvent("on"+mousewheelevt, function(e){ scroll(e); } ); 
		window.attachEvent("onload", function(e){ init(e); } );
	}
	
	function getScrollPosition() {
		return scrollPos;
	}
	
	function getScrollEnd() {
		return scrollEnd;
	}
	
	return {
		scrollPosition : getScrollPosition,
		scrollEnd : getScrollEnd
	};
}();
