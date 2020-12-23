import { d, daysShort } from './date.js';

import { renderHeading } from './renderHeading.js';
import { renderTimeSlots } from './renderTimeSlots.js';

import { modalPopup } from './modal.js';

// ==========  GLOBAL ELEMENTS ========== //

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

// Elements
const todayContainer = query('.calendar_dates');

// ==========  FUNCTION SCOPE ========== //

// Renders Current Date, Today
export function renderDay(direction = null) {
	// Heading
	renderHeading();
	// Today's date
	const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());

	let htmlRow = '<div class="row" style="flex-direction:column;">';
	htmlRow += `<div class="date_today"><div class="date-day date_dow-today">${
		daysShort[today.getDay()]
	}<div class="date_num today" data-date="${today}">${today.getDate()}</div></div>`;
	htmlRow += '</div>';
	htmlRow += renderTimeSlots();

	// Markup inside .calendar_dates
	todayContainer.innerHTML = htmlRow;

	// Render Time Slots

	// Query after rendered to dom
	let timeSlotCollection = queryAll('.time-slot');

	// Listen for click on targeted timeslot
	timeSlotCollection.forEach((timeslot, index) => {
		// Add focus to Current Hour
		if (index === d.getHours()) {
			// console.log(index, timeslot);
			timeslot.style.borderBottom = '1px solid red';
		}
		// Listen for click to target hour slot
		timeslot.addEventListener('click', e => {
			console.log(e.target);
			modalPopup();
		});
	});

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
