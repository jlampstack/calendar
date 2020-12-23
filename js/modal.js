import { days, months } from './date.js';

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

export function modalPopup(event) {
	// Target Element
	const targetElement = event.target;
	// GET Target Date
	const targetDate = new Date(
		Date.parse(event.target.getAttribute('data-date')),
	);
	const targetDateMonth = months[targetDate.getMonth()];
	const targetDateYear = targetDate.getFullYear();
	const targetDateDate = targetDate.getDate();
	const targetDateDay = days[targetDate.getDay()];
	const targetDateDayIndex = targetDate.getDay(); /* 5 */

	const modalDate = `${targetDateDay}, ${targetDateMonth} ${targetDateDate}, ${targetDateYear}`;

	// Get the modal
	const modal = query('#modal');
	const modalContent = query('.modal_content');

	// Get the <span> element that closes the modal
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

	// GET only the element with class name .date_num
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

		console.log(targetDateDayIndex, query('.modal_content'));

		modal.style.display = 'block';
		// IF day index is 0 or 1 (Sun - Mon), modal should display to right
		if (
			targetDateDayIndex === 0 ||
			targetDateDayIndex === 1 ||
			targetDateDayIndex === 2
		) {
			modal.style.display = 'block';
			modalContent.style.top = `10vh`;
			modalContent.style.left = `${targetDateRight + 0}px`;
		} else if (targetDateDayIndex === 3) {
			modal.style.display = 'block';
			modalContent.style.top = `10vh`;
			modalContent.style.left = `${targetDateLeft - 200}px`;
		} else {
			modal.style.display = 'block';
			modalContent.style.top = `10vh`;
			modalContent.style.left = `${targetDateLeft - 400}px`;
		}
	}

	const inputTask = query('.add-task');
	const inputFocusDiv = query('.input--focus');

	inputTask.onfocus = e => {
		inputFocusDiv.style.visibility = 'visible';
		inputFocusDiv.style.width = '80%';
	};

	inputTask.onblur = e => {
		inputFocusDiv.style.visibility = 'hidden';
		setTimeout(() => {
			inputFocusDiv.style.width = '0%';
		}, 200);
	};

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
