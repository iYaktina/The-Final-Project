document
	.getElementById("personal-info-form")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		const updatedData = {
			username: document.getElementById("name").value,
			email: document.getElementById("username").value,
			birthyear: document.getElementById("birthyear").value,
			// Add other fields as needed
		};
		console.log(`Sending update request for user ID: ${userId}`);
		console.log("Updated data:", updatedData);
		fetch(`/user/${userId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		})
			.then((response) => {
				if (response.ok) {
					console.log("Changes saved successfully");
				} else {
					console.error("Failed to save changes");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	});

// Function to fetch user data and populate form
// // function fetchUserData() {
// // 	fetch(`/user/${userId}`)
// // 		.then((response) => response.json())
// // 		.then((data) => {
// // 			// Populate form fields with fetched data
// // 			document.getElementById("name").value = data.username;
// // 			document.getElementById("username").value = data.email;
// // 			document.getElementById("birthyear").value = data.birthyear;
// // 			// Add other fields as needed
// // 		})
// // 		.catch((error) => console.error("Error fetching user data:", error));
// }
function fetchUserData() {
	fetch(`/user/${userId}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			} else {
				return response.json();
			}
		})
		.then((data) => {
			// Populate general user information
			document.getElementById("name").value = data.username;
			document.getElementById("username").value = data.email;
			document.getElementById("birthyear").value = data.birthyear;
			// ... other fields ...
			document.getElementById("street-address").value = data.Address;
			document.getElementById("state").value = data.State;
			document.getElementById("city").value = data.City;
			document.getElementById("zipcode").value = data.ZipCode;

			// Populate payment method information
			const existingPaymentMethodInput = document.getElementById(
				"existing-payment-method"
			);
			const expirationDateInput =
				document.getElementById("expiration-date");

			if (data.cardNumber) {
				// Check if cardDetails and cardNumber exist
				existingPaymentMethodInput.value = data.cardNumber;
				// Update with masked card number
				expirationDateInput.value = data.expiryDate;
			} else {
				existingPaymentMethodInput.value = "No payment method on file";
				document
					.getElementById("payment-method")
					.classList.add("hidden");
			}
		})
		.catch((error) => {
			console.error("Error fetching user data:", error);
			alert(
				"An error occurred while fetching your information. Please try again later."
			);
		});
}

fetchUserData(); // Call fetchUserData function on page load

// Enable edit mode for input fields
function enableEdit(fieldName) {
	const field = document.getElementById(fieldName);
	field.disabled = !field.disabled; // Toggle disabled attribute
	field.focus(); // Focus on the field
}

function toggleMenu() {
	const menu = document.querySelector(".menu");
	const nav = document.querySelector(".nav");
	menu.classList.toggle("active");
	nav.classList.toggle("active");
}

function toggleSection(sectionId) {
	const sections = document.querySelectorAll(".section, .header");
	sections.forEach((section) => {
		if (section.id === sectionId) {
			section.classList.toggle("hidden");
		} else {
			section.classList.add("hidden");
		}
	});
}

function previewImage(event) {
	const reader = new FileReader();
	reader.onload = function () {
		const output = document.getElementById("profileImage");
		output.src = reader.result;
		output.style.display = "block";
		output.nextElementSibling.style.display = "none";
	};
	reader.readAsDataURL(event.target.files[0]);
}

function cancelOrder(orderIndex) {
	const orderList = document.getElementById("orderList");
	const orderItems = orderList.getElementsByTagName("li");
	orderItems[orderIndex].remove();
	if (orderList.children.length === 0) {
		document.getElementById("noOrderText").classList.remove("hidden");
	}
}

function updateEmailDisplay(email) {
	const emailDisplay = document.getElementById("emailDisplay");
	if (emailDisplay) {
		emailDisplay.textContent = email;
	}
}

document
	.getElementById("paymentForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();

		const cardNumber = document
			.getElementById("card-number")
			.value.replace(/\s/g, "");
		const cvv = document.getElementById("cvv").value;
		const expirationDate = document.getElementById("expiration-date").value;

		fetch("/update-card-info", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				cardNumber,
				cvv,
				expiryDate: expirationDate,
			}),
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
					document.getElementById("existing-payment-method").value =
						"**** **** **** " + cardNumber.slice(-4);
					alert(data.message);
					// Consider clearing input fields after successful update
					document.getElementById("card-number").value = "";
					document.getElementById("cvv").value = "";
					document.getElementById("expiration-date").value = "";
				}
			})
			.catch((error) => {
				console.error("Error saving card info:", error);
				alert(
					"An error occurred while updating your card information."
				); // General error message for the user
			});
	});

document
	.getElementById("addressform")
	.addEventListener("submit", function (event) {
		event.preventDefault();

		const Streetadd = document.getElementById("street-address").value;
		const City = document.getElementById("city").value;
		const State = document.getElementById("state").value;
		const Zipcode = document.getElementById("zipcode").value;

		fetch("/update-add-info", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				Streetadd,
				City,
				State,
				Zipcode,
			}),
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
				console.error("Error saving Address info:", error);
				alert(
					"An error occurred while updating your Address information."
				); // General error message for the user
			});
	});
