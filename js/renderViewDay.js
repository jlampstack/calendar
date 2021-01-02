import { d, daysShort } from './date.js';

import { renderHeading } from './renderHeading.js';

import {
	renderDayHeading,
	renderDayTimeslots,
	renderTimeLegend,
} from './renderDay.js';

import { modalPopup } from './modal.js';

// ==========  GLOBAL ELEMENTS ========== //

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

// Elements
const datesContainer = query('.calendar_dates');

// ==========  FUNCTION SCOPE ========== //

// Find offset to push date "Today" under correct day of week
// ADD 7 dates of the week
const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());

// Renders Month
export function renderViewDay(direction = null) {
	// Parent Row
	datesContainer.innerHTML = `<div class="row day">`;

	const row = query('.row.day');

	const rowHeadings = document.createElement('DIV');
	rowHeadings.className = 'row heading';
	rowHeadings.innerHTML = `<div class="spacer"></div>`;
	rowHeadings.innerHTML += renderDayHeading();
	rowHeadings.innerHTML += renderDayHeading();
	rowHeadings.innerHTML += renderDayHeading();
	rowHeadings.innerHTML += renderDayHeading();
	rowHeadings.innerHTML += renderDayHeading();
	rowHeadings.innerHTML += renderDayHeading();
	rowHeadings.innerHTML += renderDayHeading();

	row.appendChild(rowHeadings);

	const rowTimeslots = document.createElement('DIV');
	rowTimeslots.className = 'row timeslots';
	rowTimeslots.innerHTML = renderTimeLegend();
	rowTimeslots.innerHTML += renderDayTimeslots();
	rowTimeslots.innerHTML += renderDayTimeslots();
	rowTimeslots.innerHTML += renderDayTimeslots();
	rowTimeslots.innerHTML += renderDayTimeslots();
	rowTimeslots.innerHTML += renderDayTimeslots();
	rowTimeslots.innerHTML += renderDayTimeslots();
	rowTimeslots.innerHTML += renderDayTimeslots();

	row.appendChild(rowTimeslots);

	const dateCollection = queryAll('.date');

	// ANIMATE: calendar scroll direction ('left' or 'right')
	if (direction !== null) {
		const slideDirection = `slide-${direction}`;
		row.classList.add(slideDirection);
	}

	// ==========  MODAL ========== //

	datesContainer.addEventListener('click', event => {
		if (event.target.classList.contains('date')) {
			// Task Modal Pop Up
			modalPopup(event);
		}
	});
}
