function getUrlParameter(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	var results = regex.exec(location.search);
	return results === null
		? ""
		: decodeURIComponent(results[1].replace(/\+/g, " "));
}

var carName = getUrlParameter("name");
var carImage = getUrlParameter("image");
console.log("Displaying car details for:", carName);

document.getElementById("car-name").innerText = carName;
document.getElementById("car-image").src = carImage;
var customizationApplied = false;
function customizeCar() {
	var urlParams = new URLSearchParams(window.location.search);
	var carName = urlParams.get("name");
	var carPrice = document.getElementById("car-price").innerText;
	var carDescription = document.getElementById("car-description").innerText;
	var carColor = document.getElementById("car-color").value;
	var carYear = document.getElementById("car-year").value;

	// Display car name and price on the payment page
	document.getElementById("car-name").innerText = carName;
	var paymentURL =
		"/payment" +
		"?name=" +
		encodeURIComponent(carName) +
		"&price=" +
		encodeURIComponent(carPrice) +
		"&description=" +
		encodeURIComponent(carDescription) +
		"&color=" +
		encodeURIComponent(carColor) +
		"&year=" +
		encodeURIComponent(carYear);

	// Redirect the user to the payment page
	window.location.href = paymentURL;
}

document.addEventListener("DOMContentLoaded", function () {
	var carYearDropdown = document.getElementById("car-year");
	carYearDropdown.value = "2018";
	// Add event listener to car-year dropdown menu
	displayCarDetails(carName, carYearDropdown.value); // Display car details based on the car name

	carYearDropdown.addEventListener("change", function () {
		var selectedYear = parseInt(carYearDropdown.value); // Parse the selected year as an integer
		console.log("years:: ", selectedYear);
		displayCarDetails(carName, selectedYear); // Update car details based on the selected year
	});
});

function displayCarDetails(carName, currentYear) {
	var carNameElement = document.getElementById("car-name1");
	var carPriceElement = document.getElementById("car-price");
	var carDescriptionElement = document.getElementById("car-description");
	console.log("Displaying car details for:", carName);
	switch (carName) {
		case "PORSCHE 928":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The Porsche 928 is a luxury grand tourer produced by Porsche AG of Germany from 1978 to 1995.";
			break;
		case "PORSCHE 911 GT3 RS":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The Porsche 911 GT3 RS is a high-performance version of the Porsche 911 sports car primarily intended for racing.";
			break;
		case "PORSCHE CAYENNE GTS":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The Porsche Cayenne GTS is a mid-size luxury crossover SUV produced by the German manufacturer Porsche since 2002.";
			break;
		case "PORSCHE BOXSTER 718":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The Porsche Boxster 718 is a mid-engine two-seater sports car manufactured and marketed by German automobile manufacturer Porsche.";
			break;
		case "BMW M5 CS":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The BMW M5 CS is a high-performance version of the BMW 5 Series.";
			break;
		case "BMW M3 CS":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The BMW M3 CS is a high-performance version of the BMW 3 Series.";
			break;
		case "BMW X6":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The BMW X6 is a mid-size luxury crossover by German automaker BMW.";
			break;
		case "BMW XM":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The BMW XM is a high-performance SUV produced by BMW M GmbH.";
			break;
		case "MERCEDES S-CLASS":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The Mercedes-Benz S-Class, formerly known as Sonderklasse (German for 'special class'), is a series of full-sized luxury flagship vehicles produced by the German automaker Mercedes-Benz.";
			break;
		case "MERCEDES G-CLASS":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The Mercedes-Benz G-Class, sometimes called G-Wagen (short for Geländewagen, 'terrain vehicle'), is a mid-size four-wheel drive luxury SUV manufactured by Magna Steyr (formerly Steyr-Daimler-Puch) in Austria and sold by Mercedes-Benz.";
			break;
		case "MERCEDES AMG-GT":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The Mercedes-AMG GT is a high-performance grand tourer manufactured by Mercedes-AMG, the performance arm of Mercedes-Benz.";
			break;
		case "MERCEDES GLS":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The Mercedes-Benz GLS-Class, formerly Mercedes-Benz GL-Class, is a full-size luxury SUV produced by Mercedes-Benz since 2006.";
			break;
		case "RANGE ROVER EVOQUE":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The Range Rover Evoque is a subcompact luxury crossover SUV produced by the British manufacturer Land Rover, a subsidiary of Tata Motors.";
			break;
		case "RANGE ROVER VELAR":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The Range Rover Velar is a mid-size luxury crossover SUV produced by British automotive company Jaguar Land Rover under their Land Rover marque.";
			break;
		case "RANGE ROVER DEFENDER":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The Land Rover Defender is a four-wheel drive off-road utility vehicle from British automaker Land Rover.";
			break;
		case "RANGE ROVER SV":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The Range Rover SV is the top-tier trim level of the Land Rover Range Rover line of SUVs.";
			break;
		case "765LT SPIDER":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The McLaren 765LT Spider is a high-performance convertible produced by McLaren.";
			break;
		case "ARTURA":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The McLaren Artura is a hybrid supercar produced by McLaren.";
			break;
		case "750S":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The McLaren 750s is a high-performance sports car produced by McLaren.";
			break;
		case "765LT":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The McLaren 765LT is a high-performance sports car produced by McLaren.";
			break;
		case "750S SPIDER":
			carNameElement.textContent = carName;
			carPriceElement.textContent = calculatePrice(carName, currentYear);
			carDescriptionElement.textContent =
				"The McLaren 750s Spider is a high-performance convertible produced by McLaren.";
			break;
		default:
			carNameElement.textContent = "Car Not Found";
			carPriceElement.textContent = "N/A";
			carDescriptionElement.textContent = "Description not available";
			break;
	}
}

function calculatePrice(carName, currentYear) {
	var basePrices = {
		"PORSCHE 928": 38023,
		"PORSCHE 911 GT3 RS": 223800,
		"PORSCHE CAYENNE GTS": 78881,
		"PORSCHE BOXSTER 718": 97702,
		"BMW M5 CS": 141224,
		"BMW M3 CS": 119695,
		"BMW X6": 75675,
		"BMW XM": 185995,
		"MERCEDES S-CLASS": 117700,
		"MERCEDES G-CLASS": 143000,
		"MERCEDES AMG-GT": 177050,
		"MERCEDES GLS": 87000,
		"RANGE ROVER EVOQUE": 49900,
		"RANGE ROVER VELAR": 61500,
		"RANGE ROVER DEFENDER": 83907,
		"RANGE ROVER SV": 209000,
		"765LT SPIDER": 360000,
		ARTURA: 225000,
		"750S": 300000,
		"765LT": 400000,
		"750S SPIDER": 310000,
	};

	var basePrice = basePrices[carName];

	var yearsDifference = 2024 - parseInt(currentYear);

	var price = basePrice - basePrice * (yearsDifference * 0.05);
	var priceIncrease = 0;
	var bodyKitRadios = document.querySelectorAll('input[name="body-kit"]');
	bodyKitRadios.forEach(function (radio) {
		radio.addEventListener("click", function () {
			var selectedBodyKit = document.querySelector(
				'input[name="body-kit"]:checked'
			);
			if (selectedBodyKit) {
				switch (selectedBodyKit.value) {
					case "kit1":
						updatePrice(price + 10000); // Add $10,000 for Kit 1
						break;
					case "kit2":
						updatePrice(price + 25000); // Add $25,000 for Kit 2
						break;
					default:
						updatePrice(price);
						break;
				}
			}
		});
	});

	// Add event listener to tuning company radio buttons
	var tuningCompanyRadios = document.querySelectorAll(
		'input[name="tuning-company"]'
	);
	tuningCompanyRadios.forEach(function (radio) {
		radio.addEventListener("click", function () {
			var selectedTuningCompany = document.querySelector(
				'input[name="tuning-company"]:checked'
			);
			if (selectedTuningCompany) {
				switch (selectedTuningCompany.value) {
					case "company1":
						updatePrice(price + 70000); // Add $70,000 for BRABUS 1
						break;
					case "company2":
						updatePrice(price + 100000); // Add $100,000 for LEVI 2
						break;
					default:
						updatePrice(price);
						break;
				}
			}
		});
	});

	console.log("Calculated price:", price);
	return `$${price.toFixed(2)}`;
}

function updatePrice(price) {
	// Update the displayed price
	var carPriceElement = document.getElementById("car-price");
	carPriceElement.textContent = `$${price.toFixed(2)}`;
}
