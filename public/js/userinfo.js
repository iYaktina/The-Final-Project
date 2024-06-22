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
function fetchUserData() {
	fetch(`/user/${userId}`)
		.then((response) => response.json())
		.then((data) => {
			// Populate form fields with fetched data
			document.getElementById("name").value = data.username;
			document.getElementById("username").value = data.email;
			document.getElementById("birthyear").value = data.birthyear;
			// Add other fields as needed
		})
		.catch((error) => console.error("Error fetching user data:", error));
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
