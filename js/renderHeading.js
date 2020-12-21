import { d, months, daysShort } from './date.js';

import { renderCalendarView } from './renderCalendarViewButton.js';

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

const monthHeading = query('.calendar_month');
const viewsButton = query('.dropdown_views .btn');

export function renderHeading() {
	if (viewsButton.getAttribute('value') == 'day') {
		monthHeading.innerText = `${
			months[d.getMonth()]
		} ${d.getDate()}, ${d.getFullYear()}`;
	}
	if (viewsButton.getAttribute('value') == 'week') {
		monthHeading.innerText = `${months[d.getMonth()]} ${d.getFullYear()}`;
	}
	if (viewsButton.getAttribute('value') == 'month') {
		monthHeading.innerText = `${months[d.getMonth()]} ${d.getFullYear()}`;
	}
}
