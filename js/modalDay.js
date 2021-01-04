import { days, months } from './date.js';

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

export function modalPopup(event) {
	// TARGET ELEMENT: data attribute holds timeslot
	const targetElement = event.target;
	// PARENT OF TARGET: data attribute holds the "date"
	const parent = targetElement.parentElement;
	// Timeslot e.g.) 6:00am
	const timeslot = parseInt(targetElement.getAttribute('data-timeslot'));
	// Init timeblock e.g) 6:00am
	// Parse date from string to Date formate to be able to use date methods
	const parsedDate = new Date(Date.parse(parent.getAttribute('data-timeslot')));

	// DATE also with hour of timeslot, 4th param
	const targetDate = new Date(
		parsedDate.getFullYear(),
		parsedDate.getMonth(),
		parsedDate.getDate(),
		targetElement.getAttribute('data-timeslot'),
	);

	// NEXT DAY is the current targetDate +1
	const targetDateNextDay = new Date(
		parsedDate.getFullYear(),
		parsedDate.getMonth(),
		parsedDate.getDate() + 1,
		targetElement.getAttribute('data-timeslot'),
	);

	// init
	let timeblock;

	// RENDER FORMAT: Currrent Date
	const timeblockDate = `${days[targetDate.getDay()]}, ${
		months[targetDate.getMonth()]
	} ${targetDate.getDate()}`;

	// Next Date
	const timeblockDateNextDay = `${days[targetDateNextDay.getDay()]}, ${
		months[targetDateNextDay.getMonth()]
	} ${targetDateNextDay.getDate()}`;

	// Append date format to time slot
	switch (timeslot) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
		case 10:
			timeblock = `<span class="date-start">${timeblockDate}</span> <span class="timeblock-range">${timeslot}:00am - ${
				timeslot + 1
			}:00am </span>`;
			break;
		case 11:
			timeblock = `<span class="date-start">${timeblockDate}</span> <span class="timeblock-range">${timeslot}:00am - 12:00pm</span>`;
			break;
		case 12:
			timeblock = `<span class="date-start">${timeblockDate}</span> <span class="timeblock-range">${timeslot}:00pm - ${
				timeslot - 11
			}:00pm </span>`;
			break;
		case 13:
		case 14:
		case 15:
		case 16:
		case 17:
		case 18:
		case 19:
		case 20:
		case 21:
		case 22:
			timeblock = `<span class="date-start">${timeblockDate}</span> <span class="timeblock-range">${
				timeslot - 12
			}:00pm - ${timeslot - 11}:00pm </span>`;
			break;
		case 23:
			timeblock = `<span class="date-start">${timeblockDate}</span> <span class="timeblock-range">${
				timeslot - 12
			}:00pm - ${
				timeslot - 11
			}:00am </span><span class="date-end">${timeblockDateNextDay}</span>`;
			break;
		default:
		// code block
	}

	// DISPLAY DATE in modal as title
	const modalDate = `${timeblock}`;

	// GET MODAL
	const modal = query('#modal');
	const modalContent = query('.modal_content');

	// GET <span> element that closes the modal
	var closeModal = query('#modal .close');

	// PART 2: POSITION MODAL

	/**
	 * STEPS TO EXTRACT THE DATA-DATE ATTRIBUTE
	 * 1. Get target element, the element we want to display the modal in relation to
	 * 2. Then get the data-date attribute
	 * 3. Convert the attr to a timestamp
	 * 4. Convert timestamp to date formate, new Date
	 * 5. Use .getDay() to find the column index to disp modal in relation to
	 */

	// GET only the element with class that holds the data-data
	if (event.target.classList.contains('timeslot')) {
		/**
		 * GET  COORDINATES OF TARGETED DATE SQUARE
		 * 1. Modal displays in relation to square coords
		 * 2. Modal displays right of any date with an index of 0 or 1 (Mon - Tue)
		 * 3. Modal displays left of all other dates index 2 - 6 (Tue - Sat)
		 * 4. Modal should display to the side of the date with a little margin
		 */

		query('.modal_date-text').innerHTML = `${modalDate}`;

		// TARGET DATE: Coordinates
		const targetDateRect = targetElement.getBoundingClientRect();
		const targetDateTop = Math.floor(targetDateRect.top); /* y */
		const targetDateLeft = Math.floor(targetDateRect.left); /* x */
		const targetDateWidth = Math.floor(targetDateRect.width);
		const targetDateHeight = Math.floor(targetDateRect.height);
		const targetDateBottom = Math.floor(targetDateTop + targetDateHeight);
		const targetDateRight = Math.floor(targetDateLeft + targetDateWidth);

		modal.style.display = 'flex';
		modal.style.justifyContent = 'center';
		modalContent.style.height = '485px';
		modalContent.style.top = `15vh`;
	}

	const inputTask = query('.add-task');
	const inputFocusDiv = query('.input--focus');

	inputTask.onfocus = e => {
		inputFocusDiv.style.visibility = 'visible';
		inputFocusDiv.style.width = '100%';
	};

	inputTask.onblur = e => {
		inputFocusDiv.style.visibility = 'hidden';
		setTimeout(() => {
			inputFocusDiv.style.width = '0%';
		}, 200);
	};

	// ADD FOCUS ON POPUP: So task automatically receives focus without having to click on it
	inputTask.focus();

	// When the user clicks on <span> (x), close the modal
	closeModal.onclick = function () {
		modal.style.display = 'none';
	};

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = 'none';
		}
	};
}
