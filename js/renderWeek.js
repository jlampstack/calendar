import {
	d,
	months,
	daysShort,
	getOffsetStart,
	getLastDateOfMonth,
} from './date.js';

import { modalPopup } from './modal.js';

// ==========  GLOBAL ELEMENTS ========== //

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

// Elements
const datesContainer = query('.calendar_dates');
const monthHeading = query('.calendar_month');

// ==========  FUNCTION SCOPE ========== //

// Find offset to push date "Today" under correct day of week
// ADD 7 dates of the week
const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());

// Renders Month
export function renderWeek(direction = null) {
	// Month heading
	monthHeading.innerText = `${months[d.getMonth()]} ${d.getFullYear()}`;

	// Markup inside <div> .calendar_dates
	datesContainer.innerHTML = `<div class="row">`;

	const row = query('.row');

	row.innerHTML = '';

	// ADD OFFSET DATES: Dates before day of week index
	for (let i = today.getDate() - today.getDay(); i < today.getDate(); i++) {
		let date = new Date(d.getDate(), d.getMonth(), i);
		row.innerHTML += `<div class="date"><div class="date_num" data-date="${date}">${date.getDate()}</div></div>`;
	}

	// ADD REMAINING DATES: Today & Remaining dates of the week
	for (let j = today.getDate(); j < 7 - today.getDay() + today.getDate(); j++) {
		let date = new Date(d.getFullYear(), d.getMonth(), j);
		if (date.getDate() === today.getDate()) {
			row.innerHTML += `<div class="date"><div class="date_num today" data-date="${date}">${date.getDate()}</div></div>`;
		} else {
			row.innerHTML += `<div class="date"><div class="date_num" data-date="${date}">${date.getDate()}</div></div>`;
		}
	}

	// Close div .row
	datesContainer.innerHTML += `</div>`;

	const dateCollection = queryAll('.date');

	// ADD day of week as column headers (Sun - Sat)
	// dateCollection.forEach((date, index) => {
	// 	const dow = document.createElement('SPAN');
	// 	dow.classList.add('date_dow');
	// 	dow.innerHTML = `${daysShort[index]}`;
	// 	if (index < 7) {
	// 		date.prepend(dow);
	// 	}
	// });

	// ANIMATE: calendar scroll direction ('left' or 'right')
	if (direction !== null) {
		const slideDirection = `slide-${direction}`;
		row.classList.add(slideDirection);
	}

	// ==========  MODAL TASK ========== //

	// Task Modal Pop Up
	modalPopup();
}