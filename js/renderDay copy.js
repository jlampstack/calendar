import { d, daysShort } from './date.js';

// ========== RENDER DAY ========== //

// Renders date heading (dow & date) for each date e.g.) SUN 21
export function renderDayHeadings() {
	// Column for Heading
	let htmlHeading = `<div class="col heading">
		<div class="date">
				<div class="dow">${daysShort[d.getDay()]}</div>
				<div class="num">${d.getDate()}</div>
		</div>`;
	return htmlHeading;
}

// Renders Day With 24 Time Blocks, 24 hrs in a day
export function renderDayTimeslots() {
	// Column for Day
	let htmlTimeslots = `<div class="col timeslot">`;
	// Add Timeslots
	for (let i = 0; i < 24; i++) {
		if (i < 13) {
			// Midnight
			if (i == 0) {
				htmlTimeslots += `<div class="timeslot" data-timeslot="0">12</div>`;
			} else {
				htmlTimeslots += `<div class="timeslot" data-timeslot="${i}">${i}</div>`;
			}
		} else {
			htmlTimeslots += `<div class="timeslot" data-timeslot="${i}">${
				i - 12
			}</div>`;
		}
	}

	htmlTimeslots += '</div>'; // end of .col

	return htmlTimeslots;
}
