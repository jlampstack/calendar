///////////////////
// - DATE LISTS
//////////////////

// Feb is only month that changes in number of days
export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const monthsShort = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

export const monthsLetter = [
	'J',
	'F',
	'M',
	'A',
	'M',
	'J',
	'J',
	'A',
	'S',
	'O',
	'N',
	'D',
];

export const days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

export const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const daysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

//////////////////////
// - CURRENT DATES
/////////////////////

// SET current date
export const d = new Date();
// Current Year
export const currYear = d.getFullYear();
// Current Month
export const currMonthIndex = d.getMonth();
export const currMonth = months[d.getMonth()];
export const currMonthShort = monthsShort[d.getMonth()];
export const currMonthLetter = monthsLetter[d.getMonth()];
export const currMonthFirstDate = new Date(d.getFullYear(), d.getMonth(), 1);
export const currMonthLastDay = new Date(
	d.getFullYear(),
	d.getMonth() + 1,
	0,
).getDate();
export const currMonthOffsetStart = getOffsetStart(
	d.getFullYear(),
	d.getMonth(),
);
export const currMonthOffsetEnd = getOffsetEnd(d.getFullYear(), d.getMonth());
// Previous Month
export const prevMonthLastDay = new Date(
	d.getFullYear(),
	d.getMonth(),
	0,
).getDate();
// Day
export const currDayIndex = d.getDay();
export const currDay = days[d.getDay()];
export const currDayShort = daysShort[d.getDay()];
export const currDayLetter = daysLetter[d.getDay()];

///////////////////////
// - DATE FUNCTIONS
//////////////////////

/**
 * Get number of days in a month
 *
 * @param   {number}  year - target year
 * @param   {number}  month - target month 0 to 11 (Jan - Dec)
 *
 * @return  {number}  last day of  targeted month = num days in month
 */
export function getNumDaysInMonth(year, month) {
	// First date of next month - 1
	return new Date(year, month + 1, 0).getDate();
}

/**
 * GET offset for the start of the month.
 *
 * Number of indexes to add to the start of the calendar month.
 * Represents dates from the previous month to make the row even.

 *
 * @return  {number}
 */
export function getOffsetStart(year, month) {
	return new Date(year, month, 1).getDay();
}

/**
 * GET offset for the end of the month.
 *
 * Number of indexes to add to the end of the calendar month.
 * Represents dates from the next month to make the row even.
 *
 * @return  {number}
 */
export function getOffsetEnd() {
	let lastDayIndex = new Date(d.getFullYear(), d.getMonth() + 1, 1).getDay();
	return 6 - lastDayIndex + 1;
}

/**
 * Get the index of the first day of the month
 *
 * @param   {number}  year - target year
 * @param   {number}  month - target month 0 to 11 (Jan - Dec)
 * @return  {number}  first day index of month
 */
export function getFirstDayIndex(year, month) {
	return new Date(year, month).getDay();
}

/**
 * Find out if it's a leapyear
 *
 * @param   {number}  year  - target year
 *
 * @return  {bool}
 */
export function isLeapYear(year) {
	return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}
