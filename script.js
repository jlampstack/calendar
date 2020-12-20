import {
	d,
	months,
	daysShort,
	getOffsetStart,
	getLastDateOfMonth,
} from './date.js';

import { renderMonth } from './renderMonth.js';
import { renderWeek } from './renderWeek.js';

import { renderCalendarView } from './renderCalendarViewButton.js';
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
const viewsLinkCollection = queryAll('.heading_right .views a');

// Init calendar with month view
renderMonth();

// ==========  FUNCTIONS ========== //

// Scroll to previous month
function prevMonthScroll() {
	let viewsBtnValue = viewsBtn.getAttribute('value');
	switch (viewsBtnValue) {
		case 'week':
			let jay = d;
			console.log(jay);
			d.setDate(jay);
			renderWeek('r');
			break;
		case 'month':
			d.setMonth(d.getMonth() - 1);
			renderMonth('r');
			break;
	}
}

// Scroll to next month
function nextMonthScroll() {
	let viewsBtnValue = viewsBtn.getAttribute('value');
	switch (viewsBtnValue) {
		case 'month':
			d.setMonth(d.getMonth() + 1);
			renderMonth('l');
			break;
	}
}

// ==========  EVENT LISTENERS ========== //

// Previous Month Arrow
prevArrow.addEventListener('click', e => {
	prevMonthScroll();
});

// Next Month Arrow
nextArrow.addEventListener('click', e => {
	nextMonthScroll();
});

// Views Button
viewsBtn.onclick = e => {
	viewsDropdown.style.display = 'flex';
};

// Views Drop Down Menu
viewsDropdown.onclick = e => renderCalendarView(e);

// Window
window.onclick = e => {
	if (!e.target.classList.contains('btn')) {
		viewsDropdown.style.display = 'none';
	}
};

// Wheel Events: Up displays prev month, down displays next month
calendar.addEventListener(
	'wheel',
	e => {
		if (e.deltaY < 0) {
			prevMonthScroll();
		} else if (e.deltaY > 0) {
			nextMonthScroll();
		}
	},
	{ passive: true },
);

// Key Press Events: Up Left = Prev, Down Right = Next
document.addEventListener('keydown', e => {
	let char = e.which || e.keyCode;
	if (char === 37 || char === 38) {
		prevMonthScroll();
	}
	if (char === 39 || char === 40) {
		nextMonthScroll();
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
