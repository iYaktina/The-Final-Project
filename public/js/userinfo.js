document
	.getElementById("personal-info-form")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		const updatedData = {
			username: document.getElementById("name").value,
			email: document.getElementById("username").value,
			birthyear: document.getElementById("birthyear").value,
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
			document.getElementById("name").value = data.username;
			document.getElementById("username").value = data.email;
			document.getElementById("birthyear").value = data.birthyear;
			document.getElementById("street-address").value = data.Address;
			document.getElementById("state").value = data.State;
			document.getElementById("city").value = data.City;
			document.getElementById("zipcode").value = data.ZipCode;

			const existingPaymentMethodInput = document.getElementById(
				"existing-payment-method"
			);
			const expirationDateInput =
				document.getElementById("expiration-date");

			if (data.cardNumber) {
				existingPaymentMethodInput.value = data.cardNumber;
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

fetchUserData();

let currentPage = 1;
const ordersPerPage = 2;

function fetchOrderData(userId, page = 1, limit = 2) {
	fetch(`/user/${userId}?page=${page}&limit=${limit}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			} else {
				return response.json();
			}
		})
		.then((data) => {
			const orderList = document.getElementById("orderList");
			const noOrderText = document.getElementById("noOrderText");
			const currentPageElement = document.getElementById("currentPage");

			orderList.innerHTML = "";

			if (data.orders.length === 0) {
				noOrderText.classList.remove("hidden");
				orderList.classList.add("hidden");
				currentPageElement.textContent = "";
			} else {
				const startIndex = (page - 1) * limit;
				const endIndex = startIndex + limit;
				const displayedOrders = data.orders.slice(startIndex, endIndex);

				displayedOrders.forEach((order) => {
					const listItem = document.createElement("li");
					listItem.innerHTML = `
                        <p>Car: ${order.car}</p>
                        <p>Price: ${order.price}</p>
                        <p>Color: ${order.color}</p>
                        <p>Year: ${order.year}</p>
                        <p>Description: ${order.description}</p>
                        <button class="cancel-order" onclick="cancelOrder('${userId}', '${order._id}')">Cancel</button>
                    `;
					orderList.appendChild(listItem);
				});

				noOrderText.classList.add("hidden");
				orderList.classList.remove("hidden");
				currentPageElement.textContent = page;
			}
		})
		.catch((error) => {
			console.error("Error fetching order data:", error);
			alert(
				"An error occurred while fetching your order information. Please try again later."
			);
		});
}

function goToPreviousPage() {
	if (currentPage > 1) {
		currentPage--;
		fetchOrderData(userId, currentPage, ordersPerPage);
	}
}

function goToNextPage() {
	currentPage++;
	fetchOrderData(userId, currentPage, ordersPerPage);
}

fetchOrderData(userId, currentPage, ordersPerPage);

function cancelOrder(userId, orderId, index) {
	fetch(`/cancel-order/${userId}/${orderId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			alert(data.message);
			const orderList = document.getElementById("orderList");
			orderList.removeChild(orderList.children[index]);
			if (orderList.children.length === 0) {
				document
					.getElementById("noOrderText")
					.classList.remove("hidden");
				orderList.classList.add("hidden");
			}
		})
		.catch((error) => {
			console.error("Error cancelling order:", error);
			alert(
				"An error occurred while cancelling the order. Please try again later."
			);
		});
}

function enableEdit(fieldName) {
	const field = document.getElementById(fieldName);
	field.disabled = !field.disabled;
	field.focus();
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
					document.getElementById("card-number").value = "";
					document.getElementById("cvv").value = "";
					document.getElementById("expiration-date").value = "";
				}
			})
			.catch((error) => {
				console.error("Error saving card info:", error);
				alert(
					"An error occurred while updating your card information."
				);
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
				);
			});
	});
