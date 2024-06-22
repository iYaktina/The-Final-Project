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
