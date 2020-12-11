// Query Alias
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

// Get the modal
let modal = query('#modal');

// Get the button that opens the modal
const btns = queryAll('.date');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
btns.forEach(btn => {
	btn.addEventListener('click', e => {
		modal.style.display = 'block';
		console.log(e.target);
	});
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};

export function modalTask() {
	let del = 'delete this';
}
