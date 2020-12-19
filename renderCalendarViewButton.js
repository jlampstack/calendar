import { renderMonth } from './renderMonth.js';
import { renderWeek } from './renderWeek.js';

// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

const btn = query('.calendar_heading .btn');
const dropdownBtnViews = query('.heading_right .views'); // container

function htmlButton(data) {
	let dropdownContainer = query('.calendar_heading .dropdown_views');
}

export function renderCalendarView(event) {
	let targetViewText = event.target.innerText;
	switch (targetViewText) {
		case 'Week':
			btn.innerHTML = `Week <span class="arrow_down"></span>`;
			btn.setAttribute('value', 'week');
			dropdownBtnViews.style.display = 'none';
			htmlButton();
			renderWeek();
			break;
		case 'Month':
			btn.innerHTML = `Month <span class="arrow_down"></span>`;
			btn.setAttribute('value', 'month');
			dropdownBtnViews.style.display = 'none';
			renderMonth();
			break;
		default:
		// console.log('Month');
	}
}
