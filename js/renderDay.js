import { d, daysShort } from './date.js';

// Forces date back to "today" in case month was changed
const todayDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());

// Renders Day Heading, dow & date for each date e.g.) SUN 21
export function renderDayHeading() {
	let htmlDayHeading = `<div class="col">`;
	htmlDayHeading += `<div class="date">`;
	htmlDayHeading += `<div class="dow">${daysShort[todayDate.getDay()]}</div>`;
	htmlDayHeading += `<div class="num">${todayDate.getDate()}</div></div></div>`;
	return htmlDayHeading;
}

// Renders Timeslots for day, 24 timeslots for 24 hrs in a day
export function renderTimeLegend() {
	// Column
	let htmlTimeslots = `<div class="col legend">`;
	// Add Timeslots
	for (let i = 0; i < 24; i++) {
		if (i < 13) {
			// Midnight
			if (i == 0) {
				htmlTimeslots += `<div class="timeslot_legend" data-timeslot="day"></div>`;
			} else {
				htmlTimeslots += `<div class="timeslot_legend" data-timeslot="${i}">${i}AM</div>`;
			}
		} else {
			htmlTimeslots += `<div class="timeslot_legend" data-timeslot="${i}">${
				i - 12
			}PM</div>`;
		}
	}

	htmlTimeslots += '</div>'; // end of .col

	return htmlTimeslots;
}

// Renders Timeslots for day, 24 timeslots for 24 hrs in a day
export function renderDayTimeslots() {
	// Column
	let htmlTimeslots = `<div class="col">`;
	// Add Timeslots
	for (let i = 0; i < 24; i++) {
		if (i < 13) {
			// Midnight
			if (i == 0) {
				htmlTimeslots += `<div class="timeslot" data-timeslot="day"></div>`;
			} else {
				htmlTimeslots += `<div class="timeslot" data-timeslot="${i}"></div>`;
			}
		} else {
			htmlTimeslots += `<div class="timeslot" data-timeslot="${i}"></div>`;
		}
	}

	htmlTimeslots += '</div>'; // end of .col

	return htmlTimeslots;
}
