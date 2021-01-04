import { d, daysShort } from './date.js';

import { renderHeading } from './renderHeading.js';

import { renderDayTimeslots, renderTimeLegend } from './renderDay.js';

// ==========  GLOBAL ELEMENTS ========== //

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

// Elements
const datesContainer = query('.calendar_dates');

// ==========  FUNCTION SCOPE ========== //

// Renders Month
export function renderViewDay(direction = null) {
	// Parent Row Container
	datesContainer.innerHTML = `<div class="row day">`;
	// GET datesContainer, above
	const row = query('.row.day');

	// ROW for headings
	const rowHeadings = document.createElement('DIV');
	rowHeadings.className = 'row heading';
	rowHeadings.innerHTML = `<div class="spacer"></div>`;

	// ADD BEFORE DATES OF WEEK: "Before" Today
	for (let i = d.getDate() - d.getDay(); i < d.getDate(); i++) {
		let date = new Date(d.getFullYear(), d.getMonth(), i);

		rowHeadings.innerHTML += `<div class="col" data-date="${date}">
					<div class="date">
							<div class="dow">${daysShort[date.getDay()]}</div>
							<div class="num">${date.getDate()}</div>
					</div>
			</div>`;
	}

	// ADD REMAINING DATES OF WEEK: Today & After
	for (let j = d.getDate(); j < 7 - d.getDay() + d.getDate(); j++) {
		let date = new Date(d.getFullYear(), d.getMonth(), j);

		if (date.getDate() === d.getDate()) {
			rowHeadings.innerHTML += `<div class="col" data-date="${date}">
					<div class="date">
							<div class="dow">${daysShort[date.getDay()]}</div>
							<div class="num">${date.getDate()}</div>
					</div>
			</div>`;
		}
	}

	row.appendChild(rowHeadings);

	const rowTimeslots = document.createElement('DIV');
	rowTimeslots.className = 'row timeslots';
	rowTimeslots.innerHTML = renderTimeLegend();
	for (let j = 0; j < 7; j++) {
		rowTimeslots.innerHTML += renderDayTimeslots();
	}

	row.appendChild(rowTimeslots);

	const dateCollection = queryAll('.date');

	// ANIMATE: calendar scroll direction ('left' or 'right')
	if (direction !== null) {
		const slideDirection = `slide-${direction}`;
		row.classList.add(slideDirection);
	}
}
