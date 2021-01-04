import { d, daysShort } from './date.js';

import { renderTimeslots, renderTimeLegend } from './renderTimeslots.js';

import { modalPopup } from './modal.js';

// ==========  GLOBAL ELEMENTS ========== //

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

// Elements
const datesContainer = query('.calendar_dates');

// ==========  FUNCTION SCOPE ========== //

// Renders Week View
export function renderWeek(direction = null) {
	// Resets date back to Today, prevents date from changing when month view changes
	const d = new Date();
	// Parent Row Container
	datesContainer.innerHTML = `<div class="row week">`;
	// GET datesContainer, above
	const row = query('.row.week');

	// ========== HEADING ========== //

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
						<div class="dow today">${daysShort[date.getDay()]}</div>
						<div class="num today">${date.getDate()}</div>
				</div>
			</div>`;
		} else {
			rowHeadings.innerHTML += `<div class="col" data-date="${date}">
				<div class="date">
						<div class="dow">${daysShort[date.getDay()]}</div>
						<div class="num">${date.getDate()}</div>
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

	// ADD BEFORE DATES OF WEEK: "Before" Today
	for (let i = d.getDate() - d.getDay(); i < d.getDate(); i++) {
		let date = new Date(d.getFullYear(), d.getMonth(), i);

		rowTimeslots.innerHTML += renderTimeslots(date);
	}

	// ADD REMAINING DATES OF WEEK: Today & After
	for (let j = d.getDate(); j < 7 - d.getDay() + d.getDate(); j++) {
		let date = new Date(d.getFullYear(), d.getMonth(), j);

		if (date.getDate() === d.getDate()) {
			rowTimeslots.innerHTML += renderTimeslots(date);
		} else {
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
