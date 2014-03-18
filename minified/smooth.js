/*
 *	smooth is a small javascript-file that enables a smooth scrolling on the most actual webbrowsers.
 *
 *	Copyright © 2014 Martin Hodler <martin.hodler@gmail.com>
 *
 *	GNU GPL v3
 *
 *	This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

var SMOOTH=function(){function k(a){e=window.navigator.userAgent.match(/.NET/i)?!0:!1;f=window.navigator.userAgent.match(/Chrome/i)?!0:!1;e?setTimeout(function(){g(!1)},100):g(!1)}function g(a){a=void 0!==a&&!0===a?!0:!1;f?(b=document.body.scrollTop,a||(c=document.body.scrollTop)):(b=document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop,a||(c=document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop))}function l(a){e&&"CSS1Compat"==document.compatMode&&
g(!0);var b=a.wheelDelta;"undefined"===typeof b&&(b=-40*a.detail);c+=-1*b;0>c&&(c=0);m=(new Date).getTime()+1E3;h||n();a.preventDefault?a.preventDefault():a.returnValue=!1}function n(){h=!0;time=(new Date).getTime();var a=m-time;b+=(c-b)/5E3*a;b=5>b?Math.floor(b):Math.round(b);var d=0;f?(document.body.scrollTop=b,d=document.body.scrollTop):(document.documentElement.scrollTop=b,d=document.documentElement.scrollTop);0<a&&d==b?setTimeout(n,32):(c=b=d,h=!1)}var b=0,c=0,h=!1,m=0,e=!1,f=!1,p=/Firefox/i.test(navigator.userAgent)?
"DOMMouseScroll":"mousewheel";document.addEventListener?(document.addEventListener(p,function(a){l(a)},!1),addEventListener("load",function(a){k(a)},!1)):document.attachEvent&&(document.attachEvent("on"+p,function(a){l(a)}),window.attachEvent("onload",function(a){k(a)}));return{scrollPosition:function(){return b},scrollEnd:function(){return c}}}();