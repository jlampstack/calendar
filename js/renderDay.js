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
const todayContainer = query('.calendar_dates');
const monthHeading = query('.calendar_month');

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
		let hour = d.getHours(); // current hour

		// Add Timeslots
		for (let i = 0; i < 24; i++) {
			if (i < 13) {
				// Midnight
				if (i == 0) {
					htmlOutput += `<div class="time-slot"><span>12 AM</span></div>`;
				} else {
					htmlOutput += `<div class="time-slot"><span>${i} AM</span></div>`;
				}
			} else {
				htmlOutput += `<div class="time-slot"><span>${i - 12} PM</span></div>`;
			}
		}

		htmlOutput += `</div>`;
		return htmlOutput;
	}

	// Query after rendered to dom
	let timeSlotCollection = queryAll('.time-slot');

	// Listen for click on targeted timeslot
	timeSlotCollection.forEach((timeslot, index) => {
		// Add focus to Current Hour
		if (index === d.getHours()) {
			console.log(index, timeslot);
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
