// ========== Date Lists ========== //

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

// ========== Set Date ========== //

export const d = new Date();

// ========== Date Functions ========== //

// Get last date of month, also same as the number of dates a month has
export function getLastDateOfMonth() {
	// First date of next month - 1
	return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

// Get offset for the start of the month
export function getOffsetStart() {
	return new Date(d.getFullYear(), d.getMonth(), 1).getDay();
}

// Get offset for the end of the month
export function getOffsetEnd() {
	let lastDayIndex = new Date(d.getFullYear(), d.getMonth() + 1, 1).getDay();
	return 6 - lastDayIndex + 1;
}

// Get day index (0 - 6) of the first date of the month
export function getFirstDayIndex(year, month) {
	return new Date(year, month).getDay();
}

// Find out if it's a leapyear
export function isLeapYear() {
	return d.getFullYear() % 100 === 0
		? d.getFullYear() % 400 === 0
		: d.getFullYear() % 4 === 0;
}
