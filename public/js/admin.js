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
