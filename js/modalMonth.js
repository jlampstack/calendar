import { days, months } from './date.js';

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

export function modalPopup(event) {
	// TARGET ELEMENT: data attribute holds timeslot
	const targetElement = event.target;
	// Init timeblock e.g) 6:00am
	// Parse date from string to Date formate to be able to use date methods
	const parsedDate = new Date(
		Date.parse(targetElement.getAttribute('data-date')),
	);

	// DATE also with hour of timeslot, 4th param
	const targetDate = new Date(
		parsedDate.getFullYear(),
		parsedDate.getMonth(),
		parsedDate.getDate(),
		targetElement.getAttribute('data-timeslot'),
	);

	// RENDER FORMAT: Currrent Date
	const timeblockDate = `${days[targetDate.getDay()]}, ${
		months[targetDate.getMonth()]
	} ${targetDate.getDate()}`;

	const timeblock = `<span class="timeblock-range">${
		days[targetDate.getDay()]
	}, ${months[targetDate.getMonth()]} ${targetDate.getDate()}</span>`;

	console.log(timeblock);

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
	if (event.target.classList.contains('date')) {
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

		modal.style.display = 'block';
		// IF day index is 0 or 1 (Sun - Mon), modal should display to right
		if (
			targetDate.getDay() === 0 ||
			targetDate.getDay() === 1 ||
			targetDate.getDay() === 2
		) {
			modal.style.display = 'block';
			modalContent.style.top = `15vh`;
			modalContent.style.left = `${targetDateRight + 0}px`;
		} else if (targetDate.getDay() === 3) {
			modal.style.display = 'block';
			modalContent.style.top = `15vh`;
			modalContent.style.left = `${targetDateLeft - 200}px`;
		} else {
			modal.style.display = 'block';
			modalContent.style.top = `15vh`;
			modalContent.style.left = `${targetDateLeft - 400}px`;
		}
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
