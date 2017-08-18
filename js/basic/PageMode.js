/**
	set current page
*/
export default function PageMode(clb) {
	'use strict';
	let page;
	let path = location.pathname;

	if (path === '/') {
		page = '';
	}
	else {
		let pathArr = path.split('/');
		if (pathArr[1] === 'sity') {
			page = 'sity';
		}
		else if (pathArr[1] === 'list') {
			page = 'list';
		}
		else if (pathArr[1] === 'statistics') {
			page = 'statistics';
		}
		else page = '404';
	}
	clb(page);
}