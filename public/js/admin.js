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