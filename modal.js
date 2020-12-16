import { days, months } from './date.js';

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

export function modalPopup() {
	// Get the modal
	const modal = query('#modal');

	// Get the button that opens the modal
	const dates = queryAll('.date');

	// Get the <span> element that closes the modal
	var closeModal = query('#modal .close');

	// When the user clicks on the button, open the modal
	dates.forEach(date => {
		date.onclick = function (e) {
			let children = e.target.childNodes;

			children.forEach(el => {
				if (el.classList.contains('date_num')) {
					// Get date string parse it to time string
					let dateString = Date.parse(el.getAttribute('data-date'));
					// Convert string to date object
					let dateData = new Date(dateString);
					let month = months[dateData.getMonth()];
					let year = dateData.getFullYear();
					let date = dateData.getDate();
					let day = days[dateData.getDay()];

					let modalDate = `${day}, ${month} ${date}, ${year}`;

					// PART 2: POSITION MODAL

					/**
					 * STEPS TO EXTRACT THE DATA-DATE ATTRIBUTE
					 * 1. Get target element, the element we want to display the modal in relation to
					 * 2. Then get the data-date attribute
					 * 3. Convert the attr to a timestamp
					 * 4. Convert timestamp to date formate, new Date
					 * 5. Use .getDay() to find the column index to disp modal in relation to
					 */

					let targetDate = e.target; /* 1 */
					let targetDateChildren = targetDate.childNodes;

					// GET only the element with class name .date_num
					targetDateChildren.forEach(el => {
						if (el.classList.contains('date_num')) {
							let targetDateAttr = el.getAttribute('data-date'); /* 2 */
							let targetDateTimestamp = Date.parse(targetDateAttr); /* 3 */
							let targetDate = new Date(targetDateTimestamp); /* 4 */
							let targetDateDayIndex = targetDate.getDay(); /* 5 */

							/**
							 * GET  COORDINATES OF TARGETED DATE SQUARE
							 * 1. Modal displays in relation to square coords
							 * 2. Modal displays right of any date with an index of 0 or 1 (Mon - Tue)
							 * 3. Modal displays left of all other dates index 2 - 6 (Tue - Sat)
							 * 4. Modal should display to the side of the date with a little margin
							 */

							query('.modal_date-text').innerHTML = `${modalDate}`;

							// XY coords of "clicked" date square, the parent  container
							const dateRect = el.parentElement.getBoundingClientRect();
							const dateTop = Math.floor(dateRect.top); /* y */
							const dateLeft = Math.floor(dateRect.left); /* x */
							const dateWidth = Math.floor(dateRect.width);
							const dateHeight = Math.floor(dateRect.height);
							const dateBottom = Math.floor(dateTop + dateHeight);
							const dateRight = Math.floor(dateLeft + dateWidth);

							// IF day index is 0 or 1 (Sun - Mon), modal should display to right
							if (targetDateDayIndex === 0 || targetDateDayIndex === 1) {
								modal.style.display = 'block';
								modal.style.left = `${dateRight + 16}px`;
							} else {
								modal.style.display = 'block';
								modal.style.left = `${
									dateLeft - 375 - 16
								}px`; /* 375 modal width */
							}
						}
					});
				}
			});
		};
	});

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

/**
 * GET Coordinates of an element
 *
 * @param   {object}  element - query selector object e.g.) query('#calendar')
 * @return  {[type]}
 */
export function getCoordsXY(element) {
	// Init var to use dynamically below
	let elementRect = element;
	/* Top & Left */
	let elementTop = elementRect + 'Top';
	let elementLeft = elementRect + 'Left';
	/* Width & Height needed to calc Bottom & Right */
	let elementWidth = elementRect + 'Width';
	let elementHeight = elementRect + 'Height';
	/* Bottom & Left */
	let elementBottom = elementTop + elementHeight;
	let elementRight = elementLeft + elementWidth;

	// GET coords
	elementRect = element.getBoundingClientRect();
	elementTop = Math.floor(elementRect.top); /* y */
	elementLeft = Math.floor(elementRect.left); /* x */
	elementWidth = Math.floor(elementRect.width);
	elementHeight = Math.floor(elementRect.height);
	elementBottom = Math.floor(elementTop + elementHeight);
	elementRight = Math.floor(elementLeft + elementWidth);
}
