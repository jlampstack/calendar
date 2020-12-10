import {
	d,
	months,
	currYear,
	currMonthIndex,
	currMonth,
	currMonthShort,
	currMonthLetter,
	currMonthFirstDate,
	currDayIndex,
	currDay,
	currDayShort,
	currDayLetter,
	currMonthLastDay,
	prevMonthLastDay,
	currMonthOffsetStart,
	currMonthOffsetEnd,
} from './date.js';

// ==========  Elements ========== //

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

// Elements
const datesContainer = query('.calendar_dates');
const monthHeading = query('.calendar_month');
monthHeading.innerText = currMonth;

// Returns 5 or 6 rows depending on month
const numRows = currMonthOffsetStart + currMonthLastDay > 35 ? 6 : 5;
const numDatesTotal = numRows * 7;

// Add appropriate num of rows (5 or 6)
for (let row = 0; row < numRows; row++) {
	datesContainer.innerHTML += `<div class="row"></row>`;
}

// Define after rows are added to the dom
const rowCollection = queryAll('.row');

// Add 7 dates to dach row
rowCollection.forEach(row => {
	for (let i = 0; i < 7; i++) {
		row.innerHTML += `<div class="date">loading...</div>`;
	}
});

// Define after dates are added to the dom
const dateCollection = queryAll('.date');

// Add dates
for (let x = 0; x < numRows * 7; x++) {
	// Starts at the first index
	let date = new Date(
		d.getFullYear(),
		d.getMonth(),
		1 - currMonthOffsetStart + x,
	);

	// If current month add date base class for basic styling
	if (date.getMonth() === d.getMonth()) {
		dateCollection[
			x
		].innerHTML = `<div class="date_num">${date.getDate()}</div>`;
	} else {
		// Add class for special styling to dates not of current month
		dateCollection[
			x
		].innerHTML = `<div class="date_num date_num--blur">${date.getDate()}</div>`;
		dateCollection[x].classList.add('date--blur');
	}
}
