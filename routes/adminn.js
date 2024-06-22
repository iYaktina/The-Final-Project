function showSection(sectionId) {
    const sections = document.querySelectorAll('.admin-container');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}