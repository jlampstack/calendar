import {
	d,
	months,
	daysShort,
	getOffsetStart,
	getLastDateOfMonth,
} from './date.js.js';

import { modalPopup } from './modal.js.js';

// ==========  GLOBAL ELEMENTS ========== //

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

// Elements
const calendar = query('#calendar');
const datesContainer = query('.calendar_dates');
const prevArrow = query('.arrow_prev-month');
const nextArrow = query('.arrow_next-month');
const calendarTitle = query('.calendar_title');
const viewsBtn = query('.heading_right .btn');
const viewsDropdown = query('.heading_right .views');

// ==========  FUNCTION SCOPE ========== //

// Find offset to push date "Today" under correct day of week
// ADD 7 dates of the week
const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());

// Renders Month
export function renderWeek(direction = null) {
	// Month heading
	calendarTitle.innerText = `${months[d.getMonth()]} ${d.getFullYear()}`;

	// Markup inside <div> .calendar_dates
	datesContainer.innerHTML = `<div class="row">`;

	// ADD OFFSET DATES: Dates before day of week index
	for (let i = today.getDate() - today.getDay(); i < today.getDate(); i++) {
		let date = new Date(d.getDate(), d.getMonth(), i);
		datesContainer.innerHTML += `<div class="date"><div class="date_num" data-date="${date}">${date.getDate()}</div></div>`;
	}

	// ADD REMAINING DATES: Today & Remaining dates of the week
	for (let j = today.getDate(); j < 7 - today.getDay() + today.getDate(); j++) {
		let date = new Date(d.getFullYear(), d.getMonth(), j);
		if (date.getDate() === today.getDate()) {
			datesContainer.innerHTML += `<div class="date"><div class="date_num today" data-date="${date}">${date.getDate()}</div></div>`;
		} else {
			datesContainer.innerHTML += `<div class="date"><div class="date_num" data-date="${date}">${date.getDate()}</div></div>`;
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
		const row = query('.row');
		const slideDirection = `slide-${direction}`;
		row.classList.add(slideDirection);
	}

	// if (direction !== null) {
	// 	const slideDirection = `slide-${direction}`;
	// 	rowCollection.forEach(row => {
	// 		row.classList.add(slideDirection);
	// 	});
	// }

	// ==========  MODAL TASK ========== //

	// Task Modal Pop Up
	modalPopup();
}
