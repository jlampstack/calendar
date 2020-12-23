import { d } from './date.js';

// Loads only the legend & not the actual day
export function renderTimeSlotsLegend() {
	let htmlTimeSlots = `<div class="timeslot_legend>`;

	// Add Timeslots
	for (let i = 0; i < 24; i++) {
		if (i < 13) {
			// Midnight
			if (i == 0) {
				htmlTimeSlots += `<span>12 AM</span>`;
			} else {
				htmlTimeSlots += `<span>${i} AM</span>`;
			}
		} else {
			htmlTimeSlots += `<span>${i - 12} PM</span>`;
		}
	}

	htmlTimeSlots += `</div>`;
	return htmlTimeSlots;
}

// Loads only the lines for each timeslot block, NOT the legend
export function renderTimeSlotBlocks() {
	let htmlTimeSlots = `<div class="scroller">`;

	// Add Timeslots
	for (let i = 0; i < 24; i++) {
		if (i < 13) {
			// Midnight
			if (i == 0) {
				htmlTimeSlots += `<div class="timeslot"></div>`;
			} else {
				htmlTimeSlots += `<div class="timeslot"></div>`;
			}
		} else {
			htmlTimeSlots += `<div class="timeslot"></div>`;
		}
	}

	htmlTimeSlots += `</div>`;
	return htmlTimeSlots;
}
