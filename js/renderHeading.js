import { d, months, monthsShort, daysShort } from './date.js';

import { renderMonth } from './renderMonth.js';

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

// Elements

// Date passed sets date back to today when view changes, solution
export function renderHeading(date) {
	const today = new Date();
	const calendarTitle = query('.calendar_title');
	const todayButton = query('.btn.today');
	const viewsButton = query('.dropdown_views .btn');

	// DAY
	if (viewsButton.getAttribute('value') == 'day') {
		calendarTitle.innerText = `${
			months[today.getMonth()]
		} ${today.getDate()}, ${today.getFullYear()}`;
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

// ==========  TODAY BUTTON ========== //

export function buttonToday() {}
