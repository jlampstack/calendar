import { d, months, monthsShort, daysShort } from './date.js';

import { renderCalendarView } from './renderCalendarViewButton.js';

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

const calendarTitle = query('.calendar_title');
const viewsButton = query('.dropdown_views .btn');

export function renderHeading() {
	// DAY
	if (viewsButton.getAttribute('value') == 'day') {
		calendarTitle.innerText = `${
			months[d.getMonth()]
		} ${d.getDate()}, ${d.getFullYear()}`;
	}
	// WEEK
	if (viewsButton.getAttribute('value') == 'week') {
		// First date of the week in view
		const today = d;
		const todayIndex = today.getDay();
		const firstDate = new Date(
			d.getFullYear(),
			d.getMonth(),
			d.getDate() - todayIndex,
		);
		const lastDate = new Date(
			d.getFullYear(),
			d.getMonth(),
			d.getDate() + 6 - todayIndex,
		);
		if (firstDate.getMonth() == lastDate.getMonth()) {
			calendarTitle.innerHTML = `${
				months[firstDate.getMonth()]
			} ${firstDate.getFullYear()}`;
		} else {
			calendarTitle.innerHTML = `${
				monthsShort[firstDate.getMonth()]
			} ${firstDate.getFullYear()} - ${
				monthsShort[lastDate.getMonth()]
			} ${lastDate.getFullYear()}`;
		}
	}
	// MONTH
	if (viewsButton.getAttribute('value') == 'month') {
		calendarTitle.innerText = `${months[d.getMonth()]} ${d.getFullYear()}`;
	}
}
