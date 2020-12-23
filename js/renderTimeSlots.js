import { d } from './date.js';

export function renderTimeSlots() {
	let htmlTimeSlots = `<div class="scroller">`;

	// Add Timeslots
	for (let i = 0; i < 24; i++) {
		if (i < 13) {
			// Midnight
			if (i == 0) {
				htmlTimeSlots += `<div class="time-slot"><span>12 AM</span></div>`;
			} else {
				htmlTimeSlots += `<div class="time-slot"><span>${i} AM</span></div>`;
			}
		} else {
			htmlTimeSlots += `<div class="time-slot"><span>${i - 12} PM</span></div>`;
		}
	}

	htmlTimeSlots += `</div>`;
	return htmlTimeSlots;
}
