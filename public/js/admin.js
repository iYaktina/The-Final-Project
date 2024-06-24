function showSection(sectionId) {
	const sections = document.querySelectorAll(".admin-container");
	sections.forEach((section) => {
		section.classList.remove("active");
	});
	document.getElementById(sectionId).classList.add("active");
}

function toggleMenu() {
	const menu = document.querySelector(".menu");
	const nav = document.querySelector(".nav");
	menu.classList.toggle("active");
	nav.classList.toggle("active");
}
function updateCarModels() {
	// Logic to dynamically update car models based on selected brand
	// For simplicity, let's keep it as an empty function now
}
document
	.getElementById("addUserForm")
	.addEventListener("submit", async function (event) {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(form);

		const data = {
			username: formData.get("username"),
			email: formData.get("email"),
			password: formData.get("password"),
			passwordConfirm: formData.get("passwordConfirm"),
		};

		try {
			const response = await fetch("/AddUser", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (response.ok) {
				alert(result.message);
				form.reset();
			} else {
				alert(result.message || "Error creating user");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred while creating the user");
		}
	});

async function fetchUsers() {
	try {
		const response = await fetch("/users");
		const users = await response.json();
		const userList = document.getElementById("userList");
		const userList1 = document.getElementById("removeUserList");

		users.forEach((user) => {
			const userItem = document.createElement("div");
			userItem.className = "user-item";
			userItem.innerHTML = `
                    <span>${user.username} (${user.email})</span>
                    <button onclick="selectUserToRemove('${user._id}', '${user.username}', '${user.email}')">Select</button>
                `;
			userList1.appendChild(userItem);
		});

		users.forEach((user) => {
			const userItem = document.createElement("div");
			userItem.className = "user-item";
			userItem.innerHTML = `
                    <span>${user.username} (${user.email})</span>
                    <button onclick="selectUser('${user._id}', '${user.username}', '${user.email}')">Select</button>
                `;
			userList.appendChild(userItem);
		});
	} catch (error) {
		console.error("Error fetching users:", error);
	}
}

function selectUser(id, username, email) {
	document.getElementById("editUserId").value = id;
	document.getElementById("editUsername").value = username;
	document.getElementById("editEmail").value = email;
}

document
	.getElementById("editUserForm")
	.addEventListener("submit", async function (event) {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(form);

		const data = {
			editUserId: formData.get("editUserId"),
			editUsername: formData.get("editUsername"),
			editEmail: formData.get("editEmail"),
			editPassword: formData.get("editPassword"),
		};

		try {
			const response = await fetch("/editUser", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (response.ok) {
				alert(result.message);
				form.reset();
			} else {
				alert(result.message || "Error updating user");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred while updating the user");
		}
	});
function selectUserToRemove(id, username, email) {
	document.getElementById("removeUserId").value = id;
}

document
	.getElementById("removeUserForm")
	.addEventListener("submit", async function (event) {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(form);

		const data = {
			removeUserId: formData.get("removeUserId"),
		};

		try {
			const response = await fetch("/removeUser", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (response.ok) {
				alert(result.message);
				form.reset();
				// Remove the user from the displayed list
				const userList = document.getElementById("removeUserList");
				userList.innerHTML = "";
				fetchUsers();
			} else {
				alert(result.message || "Error removing user");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred while removing the user");
		}
	});
// Fetch and display users on page load
fetchUsers();

async function fetchCars() {
	try {
		const response = await fetch("/cars");
		const cars = await response.json();
		const carList = document.getElementById("carList");
		const carList1 = document.getElementById("carListRemove");
		cars.forEach((car) => {
			const carItem = document.createElement("div");
			carItem.className = "car-item";
			carItem.innerHTML = `
					<h3>${car._id}</h3>
					<h3>${car.carBrand} - ${car.carModel}</h3>
					<p>Manufacturing Year: ${car.manufacturYear}</p>
					<p>Description: ${car.carDescription}</p>
					<p>Price: ${car.carPrice}</p>
					<button onclick="selectCar('${car._id}',  '${car.carModel}', '${car.manufacturYear}', '${car.carDescription}', '${car.carPrice}')">Select</button>
					<hr>
				`;
			carList.appendChild(carItem);
		});

		cars.forEach((car) => {
			const carItem = document.createElement("div");
			carItem.className = "car-item";
			carItem.innerHTML = `
                <h3>${car.carBrand} - ${car.carModel}</h3>
                <p>Manufacturing Year: ${car.manufacturYear}</p>
                <p>Description: ${car.carDescription}</p>
                <p>Price: ${car.carPrice}</p>
                <button onclick="selectCarToRemove('${car._id}')">Select for Removal</button>
                <hr>
            `;
			carList1.appendChild(carItem);
		});
	} catch (error) {
		console.error("Error fetching cars:", error);
	}
}
function selectCarToRemove(id) {
	document.getElementById("carIdRemove").value = id;
}

function selectCar(id, model, manufactur, desc, price) {
	document.getElementById("carModel").value = model;
	document.getElementById("manufacturYear").value = manufactur;
	document.getElementById("carDescription").value = desc;
	document.getElementById("carPrice").value = price;

	// Add hidden field to the form to include car ID
	let carIdInput = document.getElementById("carId");
	if (!carIdInput) {
		carIdInput = document.createElement("input");
		carIdInput.type = "hidden";
		carIdInput.id = "carId";
		carIdInput.name = "carId";
		document.getElementById("editCarForm").appendChild(carIdInput);
	}
	carIdInput.value = id;
}

// Call fetchCars function to populate the car list initially
fetchCars();

document
	.getElementById("editCarForm")
	.addEventListener("submit", async function (event) {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(form);

		const data = {
			carId: formData.get("carId"),
			carBrand: formData.get("carBrand"),
			carModel: formData.get("carModel"),
			manufacturYear: formData.get("manufacturYear"),
			carDescription: formData.get("carDescription"),
			carPrice: formData.get("carPrice"),
		};

		try {
			const response = await fetch("/editCar", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (response.ok) {
				alert(result.message);
				form.reset();
			} else {
				alert(result.message || "Error updating car");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred while updating the car");
		}
	});

document
	.getElementById("removeCarForm")
	.addEventListener("submit", async function (event) {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(form);

		const data = {
			carId: formData.get("carIdRemove"),
		};

		try {
			const response = await fetch("/removeCar", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (response.ok) {
				alert(result.message);
				form.reset();
				document.getElementById("carListRemove").innerHTML = "";
				fetchCars(); // Refresh the car list after removal
			} else {
				alert(result.message || "Error removing car");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred while removing the car");
		}
	});
