import { d, months, getOffsetStart, getLastDateOfMonth } from './date.js';

// ==========  GLOBAL ELEMENTS ========== //

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

// Elements
const datesContainer = query('.calendar_dates');
const prevArrow = query('.arrow_prev-month');
const nextArrow = query('.arrow_next-month');
const monthHeading = query('.calendar_month');

// Renders the calendar
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
		let date = new Date(
			d.getFullYear(),
			d.getMonth(),
			1 - getOffsetStart() + i,
		);
		// CURRENT MONTH: add the base date class for basic styling
		if (date.getMonth() === d.getMonth()) {
			dateCollection[
				i
			].innerHTML = `<div class="date_num" data-date="${date}">${date.getDate()}</div>`;
		} else {
			// PREV & NEXT MONTH: add class for special styling to dates not of current month
			dateCollection[
				i
			].innerHTML = `<div class="date_num date_num--blur" data-date="${date}">${date.getDate()}</div>`;
			dateCollection[i].classList.add('date--blur');
		}
	}

	// ANIMATE: calendar scroll direction ('left' or 'right')
	if (direction !== null) {
		const slideDirection = `slide-${direction}`;
		rowCollection.forEach(row => {
			row.classList.add(slideDirection);
		});
	}
}

renderCalendar();

// TODAY: Add class "today" if the date is today
// NOTE: Must be in global scope to prevent each month from having this class
queryAll('.date_num').forEach(date => {
	let dataDate = Date.parse(date.getAttribute('data-date'));
	let parsedDate = new Date(dataDate).toDateString();
	let today = new Date(
		d.getFullYear(),
		d.getMonth(),
		d.getDate(),
	).toDateString();
	if (parsedDate === today) {
		console.log(date);
		console.log(parsedDate);
		console.log(today);
		date.classList.add('today');
	}
});

// ==========  EVENT LISTENERS ========== //

prevArrow.addEventListener('click', e => {
	d.setMonth(d.getMonth() - 1);
	renderCalendar('l');
});

nextArrow.addEventListener('click', e => {
	d.setMonth(d.getMonth() + 1);
	renderCalendar('r');
});

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

// x === new Date().getDate() &&
// d.getMonth() === new Date().getMonth() &&
// d.getFullYear() === new Date().getFullYear()
