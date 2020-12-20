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
const calendar = query('#calendar');
const datesContainer = query('.calendar_dates');
const prevArrow = query('.arrow_prev-month');
const nextArrow = query('.arrow_next-month');
const monthHeading = query('.calendar_month');
const viewsBtn = query('.heading_right .btn');
const viewsDropdown = query('.heading_right .views');

// ==========  FUNCTION SCOPE ========== //

// Renders Current Date, Today
export function renderDay(direction = null) {
	// Today's date
	const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());

	// Month heading
	monthHeading.innerText = `${months[d.getMonth()]} ${d.getFullYear()}`;

	let htmlRow = '<div class="row today">';
	htmlRow += `<div class="date_today"><div class="date-day date_dow-today">${
		daysShort[today.getDay()]
	}<div class="date_num today" data-date="${today}">${today.getDate()}</div></div>`;
	htmlRow += '</div>';
	htmlRow += '<div class="time-slots">abc</div>';

	// Markup inside <> .calendar_dates
	datesContainer.innerHTML = htmlRow;

	const dateCollection = queryAll('.date');

	// ANIMATE: calendar scroll direction ('left' or 'right')
	if (direction !== null) {
		const slideDirection = `slide-${direction}`;
		row.classList.add(slideDirection);
	}

	// ==========  MODAL TASK ========== //

	// Task Modal Pop Up
	modalPopup();
}
