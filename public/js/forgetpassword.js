$(document).ready(function () {
	$("#forget-password-form").submit(function (e) {
		e.preventDefault(); // Prevent the form from submitting via the browser

		$.ajax({
			type: "POST",
			url: "/forget-password",
			data: $(this).serialize(),
			success: function (response) {
				alert(response.message); // Show an alert
				window.location.href = "/"; // Redirect to main page
			},
			error: function (error) {
				alert("Error: " + error); // Show an alert on error
			},
		});
	});
});
