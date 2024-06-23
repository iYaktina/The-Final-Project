$(document).ready(function () {
	$("#reset-password-form").submit(function (e) {
		e.preventDefault(); 

		const newPassword = $('input[name="password"]').val();
		const confirmPassword = $('input[name="confirmpassword"]').val();
		const token = window.location.pathname.split("/").pop();

		if (newPassword.length < 8) {
			alert("Password must be at least 8 characters long");
			return;
		}

		if (newPassword !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		$.ajax({
			type: "POST",
			url: `/reset-password/${token}`,
			data: { newPassword: newPassword },
			success: function (_response) {
				alert("Password has been updated successfully");
				window.location.href = "/login";
			},
			error: function (xhr, status, error) {
				alert("Error: " + error);
			},
		});
	});
});
