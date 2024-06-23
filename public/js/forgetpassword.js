$(document).ready(function () {
	$("#forget-password-form").submit(function (e) {
		e.preventDefault(); 

		$.ajax({
			type: "POST",
			url: "/forget-password",
			data: $(this).serialize(),
			success: function (response) {
				alert(response.message); 
				window.location.href = "/"; 
			},
			error: function (error) {
				alert("Error: " + error); 
			},
		});
	});
});
