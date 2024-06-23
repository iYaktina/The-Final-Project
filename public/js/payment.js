$(document).ready(function () {
	function getUrlParameter(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
		var results = regex.exec(location.search);
		return results === null
			? ""
			: decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	var carName = getUrlParameter("name");
	var carPrice = getUrlParameter("price");
	var carDesc = getUrlParameter("description");
	var carYear = getUrlParameter("year");
	var carColor = getUrlParameter("color");
	$("#carName").text(carName);
	$("#carPrice").text(carPrice);
	$("#carYear").text(carYear);
	$("#carColor").text(carColor);
	$("#carDescription").text(carDesc);
	$("#payButton").click(function () {
		var cardHolder = $(".card_holder").val().trim();
		if (cardHolder === "") {
			alert("Please enter the card holder name.");
			return;
		}

		var cardNumber = $(".card_number").val().replace(/\s/g, "");
		if (!/^\d{16}$/.test(cardNumber)) {
			alert("Please enter a valid 16-digit credit card number.");
			return;
		}

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
	if (typeof inputString !== "string") {
		return "";
	}

	const firstWhitespaceIndex = inputString.indexOf(" ");

	if (firstWhitespaceIndex === -1) {
		return inputString;
	}

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
				); 
			});
	});
