import { d, months, daysShort } from './date.js';

import { renderCalendarView } from './renderCalendarViewButton.js';

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

const calendarTitle = query('.calendar_title');
const viewsButton = query('.dropdown_views .btn');

export function renderHeading() {
	if (viewsButton.getAttribute('value') == 'day') {
		calendarTitle.innerText = `${
			months[d.getMonth()]
		} ${d.getDate()}, ${d.getFullYear()}`;
	}
	if (viewsButton.getAttribute('value') == 'week') {
		calendarTitle.innerText = `${months[d.getMonth()]} ${d.getFullYear()}`;
	}
	if (viewsButton.getAttribute('value') == 'month') {
		calendarTitle.innerText = `${months[d.getMonth()]} ${d.getFullYear()}`;
	}
}
