import {
	d,
	months,
	daysShort,
	getOffsetStart,
	getLastDateOfMonth,
} from './js/date.js';

import { renderDay } from './js/renderDay.js';
import { renderMonth } from './js/renderMonth.js';
import { renderWeek } from './js/renderWeek.js';

import { renderCalendarView } from './js/renderCalendarViewButton.js';
import { modalPopup } from './js/modal.js';

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
const viewsButton = query('.dropdown_views .btn');
const viewsDropdownMenu = query('.dropdown_views .menu');

// Init calendar with month view
// renderDay();
renderWeek();
// renderMonth();

// ==========  FUNCTIONS ========== //

// Scroll to previous month
function prevMonthScroll() {
	let viewsButtonValue = viewsButton.getAttribute('value');
	switch (viewsButtonValue) {
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
	let viewsButtonValue = viewsButton.getAttribute('value');
	switch (viewsButtonValue) {
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
viewsButton.onclick = e => {
	viewsDropdownMenu.style.display = 'flex';
};

// Views Drop Down Menu
viewsDropdownMenu.onclick = e => renderCalendarView(e);

// Window
window.onclick = e => {
	if (!e.target.classList.contains('btn')) {
		viewsDropdownMenu.style.display = 'none';
	}
};

// Wheel Events: Up displays prev month, down displays next month
datesContainer.addEventListener(
	'wheel',
	e => {
		if (viewsButton.getAttribute('value') == 'month') {
			if (e.deltaY < 0) {
				prevMonthScroll();
			} else if (e.deltaY > 0) {
				nextMonthScroll();
			}
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
