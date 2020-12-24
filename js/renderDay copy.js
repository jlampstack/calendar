import { d, daysShort } from './date.js';

import { renderHeading } from './renderHeading.js';
import {
	renderTimeSlotBlocks,
	renderTimeSlotsLegend,
} from './renderTimeSlots.js';

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
export function renderDay(direction = null) {
	// Heading
	renderHeading();
	// Markup inside <div> .calendar_dates
	datesContainer.innerHTML = `<div class="row day">`;

	const row = query('.row');

	row.innerHTML += `
		<div class="date" data-date="${today}">
		<div class="date_num today">${today.getDate()}</div>
		${renderTimeSlotBlocks()}
	</div>`;

	// Close div .row
	datesContainer.innerHTML += `</div>`;

	const dateCollection = queryAll('.date');

	// ADD day of week as column headers (Sun - Sat)
	dateCollection.forEach((date, index) => {
		const dow = document.createElement('SPAN');
		dow.classList.add('date_dow');
		dow.innerHTML = `${daysShort[index]}`;
		date.prepend(dow);
	});

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
