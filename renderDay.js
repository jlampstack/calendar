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
const todayContainer = query('.calendar_dates');
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

	let htmlRow = '<div class="row" style="flex-direction:column;">';
	htmlRow += `<div class="date_today"><div class="date-day date_dow-today">${
		daysShort[today.getDay()]
	}<div class="date_num today" data-date="${today}">${today.getDate()}</div></div>`;
	htmlRow += '</div>';
	htmlRow += timeSlots();

	// Markup inside <> .calendar_dates
	todayContainer.innerHTML = htmlRow;

	function timeSlots() {
		let htmlOutput = `<div class="scroller">`;
		for (let i = 0; i < 24; i++) {
			htmlOutput += `<div class="time-slot"><span>${i + 1} AM</span></div>`;
		}
		htmlOutput += `</div>`;
		return htmlOutput;
	}

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
