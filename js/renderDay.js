import { d, daysShort } from './date.js';

import { renderTimeslots, renderTimeLegend } from './renderTimeslots.js';

import { modalPopup } from './modalDay.js';

// ==========  GLOBAL ELEMENTS ========== //

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

// Elements
const datesContainer = query('.calendar_dates');

// ==========  FUNCTION SCOPE ========== //

// Render Day View
export function renderDay(direction = null) {
	// Parent Row Container
	datesContainer.innerHTML = `<div class="row day">`;
	// GET datesContainer, above
	const row = query('.row.day');

	// ========== HEADING ========== //

	// ROW for headings
	const rowHeadings = document.createElement('DIV');
	rowHeadings.className = 'row heading';
	rowHeadings.innerHTML = `<div class="spacer"></div>`;

	// ADD TODAY
	for (let j = d.getDate(); j < 7 - d.getDay() + d.getDate(); j++) {
		let date = new Date(d.getFullYear(), d.getMonth(), j);

		if (date.getDate() === d.getDate()) {
			rowHeadings.innerHTML += `<div class="col" data-date="${date}">
				<div class="date">
						<div class="dow today">${daysShort[date.getDay()]}</div>
						<div class="num today">${date.getDate()}</div>
				</div>
			</div>`;
		}
	}

	row.appendChild(rowHeadings);

	// ========== TIME SLOTS ========== //

	// ROW for headings
	const rowTimeslots = document.createElement('DIV');
	rowTimeslots.className = 'row timeslots';
	rowTimeslots.innerHTML = `<div class="spacer">${renderTimeLegend()}</div>`;

	// ADD REMAINING DATES OF DAY: Today & After
	for (let j = d.getDate(); j < 7 - d.getDay() + d.getDate(); j++) {
		let date = new Date(d.getFullYear(), d.getMonth(), j);

		if (date.getDate() === d.getDate()) {
			rowTimeslots.innerHTML += renderTimeslots(date);
		}
	}

	row.appendChild(rowTimeslots);

	// ========== ANIMATION ========== //

	const dateCollection = queryAll('.date');

	// ANIMATE: calendar scroll direction ('left' or 'right')
	if (direction !== null) {
		const slideDirection = `slide-${direction}`;
		row.classList.add(slideDirection);
	}

	// ========== MODAL ========== //

	// Timeslot Collection
	const timeslotCollection = queryAll('.timeslot');

	// Loop thru all timeslots and list for click on each timeslot
	timeslotCollection.forEach(timeslot => {
		// Parent Column Element
		let col = timeslot.parentElement;
		let date = new Date(Date.parse(col.getAttribute('data-date')));

		timeslot.addEventListener('click', event => {
			modalPopup(event);
		});
	});
}
