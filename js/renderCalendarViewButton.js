import { renderDay } from './renderDay.js';
import { renderWeek } from './renderWeek.js';
import { renderMonth } from './renderMonth.js';

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

const viewsButton = query('.dropdown_views .btn');
const dropdownBtnViews = query('.dropdown_views .menu'); // menu

function htmlButton(data) {
	let dropdownContainer = query('.dropdown_views .menu');
}

export function renderCalendarView(event) {
	let targetViewText = event.target.innerText;
	switch (targetViewText) {
		case 'Day':
			viewsButton.innerHTML = `Day <span class="arrow-down"></span>`;
			viewsButton.setAttribute('value', 'day');
			dropdownBtnViews.style.display = 'none';
			htmlButton();
			renderDay();
			break;
		case 'Week':
			viewsButton.innerHTML = `Week <span class="arrow-down"></span>`;
			viewsButton.setAttribute('value', 'week');
			dropdownBtnViews.style.display = 'none';
			htmlButton();
			renderWeek();
			break;
		case 'Month':
			viewsButton.innerHTML = `Month <span class="arrow-down"></span>`;
			viewsButton.setAttribute('value', 'month');
			dropdownBtnViews.style.display = 'none';
			renderMonth();
			break;
		default:
	}
}
