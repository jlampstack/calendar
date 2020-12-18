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
const calendar = query('#calendar');
const datesContainer = query('.calendar_dates');
const prevArrow = query('.arrow_prev-month');
const nextArrow = query('.arrow_next-month');
const monthHeading = query('.calendar_month');
const viewsBtn = query('.heading_right .btn');
const viewsDropdown = query('.heading_right .views');

// ==========  FUNCTION SCOPE ========== //

// Renders calendar
function renderCalendar(direction = null) {
	// Month heading
	monthHeading.innerText = `${months[d.getMonth()]} ${d.getFullYear()}`;

	// Returns 5 or 6 rows depending on month
	const numRows = getOffsetStart() + getLastDateOfMonth() > 35 ? 6 : 5;
	const numDatesTotal = numRows * 7;

	// Important: resets html evertime an event is fired
	datesContainer.innerHTML = ``;

	// Add appropriate num of rows (5 or 6)
	for (let row = 0; row < numRows; row++) {
		datesContainer.innerHTML += `<div class="row"></row>`;
	}

	// Define after rows are added to the dom
	const rowCollection = queryAll('.row');

	// Add 7 dates to dach row
	rowCollection.forEach(row => {
		for (let x = 0; x < 7; x++) {
			row.innerHTML += `<div class="date">loading...</div>`;
		}
	});

	// Define after dates are added to the dom
	const dateCollection = queryAll('.date');

	// ADD dates
	for (let i = 0; i < numRows * 7; i++) {
		// Starts at the first index
		const date = new Date(
			d.getFullYear(),
			d.getMonth(),
			1 - getOffsetStart() + i,
		);
		// CURRENT MONTH: add the base date class for basic styling
		if (date.getMonth() === d.getMonth()) {
			// All dates
			dateCollection[
				i
			].innerHTML = `<div class="date_num" data-date="${date}">${date.getDate()}</div>`;
			// TODAY: date only for today
			let today = new Date();
			// Adjust index -1 to get correct date
			if (
				today.getDate() == i - 1 &&
				today.getMonth() == date.getMonth() &&
				today.getFullYear() == date.getFullYear()
			) {
				const dateNumCollection = queryAll('.date_num');
				dateNumCollection[i].classList.add('today');
			}
		} else {
			// PREV & NEXT MONTH: add class for special styling to dates not of current month
			dateCollection[
				i
			].innerHTML = `<div class="date_num date_num--blur" data-date="${date}">${date.getDate()}</div>`;
			dateCollection[i].classList.add('date--blur');
		}
	}

	// ADD day of week as column headers (Sun - Sat)
	dateCollection.forEach((date, index) => {
		const dow = document.createElement('SPAN');
		dow.classList.add('date_dow');
		dow.innerHTML = `${daysShort[index]}`;
		if (index < 7) {
			date.prepend(dow);
		}
	});

	// ANIMATE: calendar scroll direction ('left' or 'right')
	if (direction !== null) {
		const slideDirection = `slide-${direction}`;
		rowCollection.forEach(row => {
			row.classList.add(slideDirection);
		});
	}

	// ==========  MODAL TASK ========== //

	// Task Modal Pop Up
	modalPopup();
}

renderCalendar();

// ==========  EVENT LISTENERS ========== //

prevArrow.addEventListener('click', e => {
	d.setMonth(d.getMonth() - 1);
	renderCalendar('l');
});

nextArrow.addEventListener('click', e => {
	d.setMonth(d.getMonth() + 1);
	renderCalendar('r');
});

viewsBtn.onclick = e => (viewsDropdown.style.display = 'flex');

window.onclick = e => {
	if (!e.target.classList.contains('btn')) {
		viewsDropdown.style.display = 'none';
	}
};

// ==========  MOUSE WHEEL EVENTS ========== //

// Wheel up moves displays prev month, wheel down displays next month
calendar.addEventListener(
	'wheel',
	e => {
		if (e.deltaY < 0) {
			d.setMonth(d.getMonth() - 1);
			renderCalendar('r');
		} else if (e.deltaY > 0) {
			d.setMonth(d.getMonth() + 1);
			renderCalendar('l');
		}
	},
	{ passive: true },
);

// ========== KEY PRESS EVENTS ========== //

// Scroll month prev or next based if arrow key is pressed
document.addEventListener('keydown', e => {
	let char = e.which || e.keyCode;
	if (char === 37 || char === 38) {
		d.setMonth(d.getMonth() - 1);
		renderCalendar('l');
	}
	if (char === 39 || char === 40) {
		d.setMonth(d.getMonth() + 1);
		renderCalendar('r');
	}
});

// ==========  SWIPE TOUCH EVENTS ========== //

/**
 * @see https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
 */

query('#calendar').addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
	return (
		evt.touches || // browser API
		evt.originalEvent.touches
	); // jQuery
}

function handleTouchStart(evt) {
	const firstTouch = getTouches(evt)[0];
	xDown = firstTouch.clientX;
	yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
	if (!xDown || !yDown) {
		return;
	}

	var xUp = evt.touches[0].clientX;
	var yUp = evt.touches[0].clientY;

	var xDiff = xDown - xUp;
	var yDiff = yDown - yUp;

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		/*most significant*/
		if (xDiff > 0) {
			/* Render next month */
			d.setMonth(d.getMonth() + 1);
			renderCalendar('l');
		} else {
			/* Render previous month */
			d.setMonth(d.getMonth() - 1);
			renderCalendar('l');
		}
	}
	/* reset values */
	xDown = null;
	yDown = null;
}
