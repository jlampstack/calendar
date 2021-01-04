import { d, daysShort } from './date.js';

// Renders Timeslots for day, 24 timeslots for 24 hrs in a day
export function renderTimeLegend() {
	// Column
	let htmlTimeslots = ``;
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
// Note: renders only the timeslots and not it's col container which must
export function renderTimeslots(date) {
	// Column
	let htmlTimeslots = `<div class="col" data-date="${date}">`;
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

// If timeslot is clicked bring up modal
