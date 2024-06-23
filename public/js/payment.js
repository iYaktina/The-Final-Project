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

	// Display car name and price on the payment page
	$("#carName").text(carName);
	$("#carPrice").text(carPrice);

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
