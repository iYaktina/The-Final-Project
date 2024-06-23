$(document).ready(function () {
	// Function to extract parameters from URL
	function getUrlParameter(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
		var results = regex.exec(location.search);
		return results === null
			? ""
			: decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	// Extract car name and price from URL
	var carName = getUrlParameter("name");
	var carPrice = getUrlParameter("price");
	var carDesc = getUrlParameter("description");
	var carYear = getUrlParameter("year");
	var carColor = getUrlParameter("color");
	// Display car name and price on the payment page
	$("#carName").text(carName);
	$("#carPrice").text(carPrice);
	$("#carYear").text(carYear);
	$("#carColor").text(carColor);
	$("#carDescription").text(carDesc);
	$("#payButton").click(function () {
		// Validate card holder
		var cardHolder = $(".card_holder").val().trim();
		if (cardHolder === "") {
			alert("Please enter the card holder name.");
			return;
		}

		// Validate card number
		var cardNumber = $(".card_number").val().replace(/\s/g, "");
		if (!/^\d{16}$/.test(cardNumber)) {
			alert("Please enter a valid 16-digit credit card number.");
			return;
		}

		// Validate expiry date (MM/YY)
		var expiryDate = $(".expiry_date").val().trim();
		var today = new Date();
		var currentMonth = today.getMonth() + 1;
		var currentYear = today.getFullYear() % 100;

		var expiryMonth = parseInt(expiryDate.split("/")[0]);
		var expiryYear = parseInt(expiryDate.split("/")[1]);

		if (
			!/^\d{2}\/\d{2}$/.test(expiryDate) ||
			expiryMonth < 1 ||
			expiryMonth > 12 ||
			expiryYear < currentYear ||
			(expiryYear === currentYear && expiryMonth <= currentMonth + 2)
		) {
			alert(
				"Please enter a valid expiration date in the format MM/YY and ensure it is at least three months ahead of the current date."
			);
			return;
		}

		alert("Payment successful!");
	});
});

function getSubstringUntilFirstWhitespace(inputString) {
	// Check if inputString is defined and is a string
	if (typeof inputString !== "string") {
		return "";
	}

	// Find the index of the first whitespace
	const firstWhitespaceIndex = inputString.indexOf(" ");

	// If no whitespace is found, return the whole string
	if (firstWhitespaceIndex === -1) {
		return inputString;
	}

	// Return the substring from the start to the first whitespace
	return inputString.substring(0, firstWhitespaceIndex);
}

document
	.getElementById("newPaymentForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		const formData = {
			Cardnumber: document.getElementById("cardnum").value.slice(-4),
			carprice: document.getElementById("carPrice").innerText,
			carname: document.getElementById("carName").innerText,
			caryear: document.getElementById("carYear").innerText,
			carbrand: getSubstringUntilFirstWhitespace(
				document.getElementById("carName").innerText
			),
			carcolor: document.getElementById("carColor").innerText,
			cardesc: document.getElementById("carDescription").innerText,
		};

		fetch("/new-Order", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				} else {
					return response.json();
				}
			})
			.then((data) => {
				if (data.error) {
					alert("Error: " + data.error);
				} else {
					alert(data.message);
				}
			})
			.catch((error) => {
				console.error("Error making Order:", error);
				alert(
					"An error occurred while placing your Order information."
				); // General error message for the user
			});
	});
