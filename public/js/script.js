function toggleMenu() {
	const menu = document.querySelector(".menu");
	const nav = document.querySelector(".nav");
	menu.classList.toggle("active");
	nav.classList.toggle("active");
}

function changeVideo(name) {
	const bgVideoList = document.querySelectorAll(".bg-video");
	const trailers = document.querySelectorAll(".trailer");
	const models = document.querySelectorAll(".model");

	bgVideoList.forEach((video) => {
		video.classList.remove("active");
		if (video.classList.contains(name)) {
			video.classList.add("active");
		}
	});

	models.forEach((model) => {
		model.classList.remove("active");
		if (model.classList.contains(name)) {
			model.classList.add("active");
		}
	});

	trailers.forEach((video) => {
		video.classList.remove("active");
		if (video.classList.contains(name)) {
			video.classList.add("active");
		}
	});
}

/* el function el gya 34an n3ml change lel button lma ndoos 3leeh */
function toggleplay() {
	const play = document.querySelector(".play");
	const pause = document.querySelector(".pause");
	play.classList.toggle("active");
	pause.classList.toggle("active");
}

/* el function bt3at el pause wel play  */
function pauseVideo() {
	const bgVideoList = document.querySelectorAll(".bg-video");

	bgVideoList.forEach((video) => {
		video.pause();
	});
	toggleplay();
}

function playVideo() {
	const bgVideoList = document.querySelectorAll(".bg-video");

	bgVideoList.forEach((video) => {
		video.play();
	});
	toggleplay();
}

/* function 34an lma ndoos 3la view more details ya5od el brand ely howa wa2ef 3leeha */
function viewdetails() {
	const activeModel = document.querySelector(".model.active");
	if (activeModel) {
		var dataUrl = activeModel.getAttribute("data-url");
		if (dataUrl) {
			// Combine the current URL with the data-url
			var currentUrl = window.location.href;
			var baseUrl = currentUrl.substring(
				0,
				currentUrl.lastIndexOf("/") + 1
			); // Extract base URL
			var fullUrl = baseUrl + dataUrl;
			window.location.href = fullUrl;
		}
	}
}

function openCustomizationPage() {
	const activeModel = document.querySelector(".model.active");
	//const isLoggedIn = req.session.user ? true : flase;
	if (!isLoggedIn) {
		alert("You must be logged in to view more details.");
		// Optionally, redirect to the login page
		window.location.href = "/login";
		return;
	}

	if (activeModel) {
		// Get car details
		var carName = activeModel.innerText;
		var carImage = activeModel.getAttribute("data-image");

		// Encode URL parameters
		var encodedCarName = encodeURIComponent(carName);
		var encodedCarImage = encodeURIComponent(carImage);

		// Construct URL with parameters
		var customizationURL =
			"/customization" +
			"?name=" +
			encodedCarName +
			"&image=" +
			encodedCarImage;

		// Open pop-up window with customization page
		var popupWidth = 800; // Adjust width as needed
		var popupHeight = 600; // Adjust height as needed
		var left = (window.innerWidth - popupWidth) / 2;
		var top = (window.innerHeight - popupHeight) / 2;
		var popupWindow = window.open(
			customizationURL,
			"Customization",
			"width=" +
				popupWidth +
				", height=" +
				popupHeight +
				", top=" +
				top +
				", left=" +
				left
		);

		// Focus the window if it's already open
		if (window.focus) {
			popupWindow.focus();
		}
	}
}

function openCustomizationPagedyn() {
	const activeModel = document.querySelector(".model.active");

	if (!isLoggedIn) {
		alert("You must be logged in to view more details.");
		window.location.href = "/login";
		return;
	}

	if (activeModel) {
		// Get car details
		var carName = activeModel.innerText;
		var carImage = activeModel.getAttribute("data-image");
		var carDescription = activeModel.getAttribute("data-description");
		var carPrice = activeModel.getAttribute("data-price");

		// Encode URL parameters
		var encodedCarName = encodeURIComponent(carName);
		var encodedCarImage = encodeURIComponent(carImage);
		var encodedCarDescription = encodeURIComponent(carDescription);
		var encodedCarPrice = encodeURIComponent(carPrice);

		// Construct URL with parameters
		var customizationURL =
			"/customization" +
			"?name=" +
			encodedCarName +
			"&image=" +
			encodedCarImage +
			"&description=" +
			encodedCarDescription +
			"&price=" +
			encodedCarPrice;

		// Open pop-up window with customization page
		var popupWidth = 800; // Adjust width as needed
		var popupHeight = 600; // Adjust height as needed
		var left = (window.innerWidth - popupWidth) / 2;
		var top = (window.innerHeight - popupHeight) / 2;
		var popupWindow = window.open(
			customizationURL,
			"Customization",
			"width=" +
				popupWidth +
				", height=" +
				popupHeight +
				", top=" +
				top +
				", left=" +
				left
		);

		// Focus the window if it's already open
		if (window.focus) {
			popupWindow.focus();
		}
	}
}

$(document).ready(function () {
	$(".carousel").carousel();
});
