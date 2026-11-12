let selectedDrink = "";
let selectedQuantity = 0;

let dispensingTimer;
let readyTimer;
let resetTimer;
let countdownInterval;

let orderConfirmed=false;

let orderNumber = 0;

function selectDrink(drink) {

    selectedDrink = drink;

    document.getElementById("message").innerHTML =
        "You selected " + drink + "!";

    document.getElementById("quantitySection").style.display =
        "block";
}

function selectQuantity(quantity) {

    selectedQuantity = quantity;

    document.getElementById("quantityMessage").innerHTML =
        "Selected Quantity: " + quantity + " ml";

    document.getElementById("orderError").innerHTML = "";

    document.getElementById("orderMessage").style.display = "none";
}

function continueOrder() {

    if (selectedDrink === "") {
        document.getElementById("orderError").innerHTML =
            "Please select a drink first!";
        return;
    }

    if (selectedQuantity === 0) {
        document.getElementById("orderError").innerHTML =
            "Please select a quantity!";
        return;
    }

    document.getElementById("orderError").innerHTML = "";

    document.getElementById("orderMessage").style.display = "block";

    document.getElementById("orderDetails").innerHTML =
        "Drink: " + selectedDrink + "<br>" +
        "Quantity: " + selectedQuantity + " ml";

    document.getElementById("finalMessage").innerHTML = "";
    document.getElementById("dispensingStatus").innerHTML = "";
}


function confirmOrder() {

    if (orderConfirmed) {
        return;
    }

    orderConfirmed = true;

    // Generate Digital Receipt

    orderNumber++;

    let now = new Date();

    document.getElementById("receiptNumber").innerHTML =
        "Order Number: " + String(orderNumber).padStart(3, "0");

    document.getElementById("receiptDrink").innerHTML =
        "Drink: " + selectedDrink;

    document.getElementById("receiptQuantity").innerHTML =
        "Quantity: " + selectedQuantity + " ml";

    document.getElementById("receiptDate").innerHTML =
        "Date: " + now.toLocaleDateString("en-IN");

    document.getElementById("receiptTime").innerHTML =
        "Time: " + now.toLocaleTimeString("en-IN");

    document.getElementById("receiptStatus").innerHTML =
        "Status: CONFIRMED";

    document.getElementById("receiptSection").style.display = "block";


    clearTimeout(dispensingTimer);
    clearTimeout(readyTimer);
    clearTimeout(resetTimer);
    clearInterval(countdownInterval);


    document.getElementById("finalMessage").innerHTML =
        "Your order has been confirmed!";

    document.getElementById("dispensingStatus").innerHTML =
        "Preparing your drink...";


    // LIVE COUNTDOWN

    let remainingTime = 6;

    document.getElementById("countdownTimer").innerHTML =
        "Time Remaining: " + remainingTime + " seconds";

    countdownInterval = setInterval(function() {

        remainingTime--;

        document.getElementById("countdownTimer").innerHTML =
            "Time Remaining: " + remainingTime + " seconds";

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
        }

    }, 1000);


    dispensingTimer = setTimeout(function() {

        document.getElementById("dispensingStatus").innerHTML =
            "Dispensing your drink...";

    }, 3000);


    readyTimer = setTimeout(function() {

        document.getElementById("dispensingStatus").innerHTML =
            "Your drink is ready!";

        document.getElementById("countdownTimer").innerHTML =
            "Preparation Completed!";

        resetTimer = setTimeout(resetForNextCustomer, 3000);

    }, 6000);

}

function resetForNextCustomer() {
    clearInterval(countdownInterval);

document.getElementById("countdownTimer").innerHTML = "";

    selectedDrink = "";
    selectedQuantity = 0;

    orderConfirmed=false;

    document.getElementById("orderMessage").style.display = "none";

    document.getElementById("quantitySection").style.display = "none";

    document.getElementById("message").innerHTML =
        "Please select your drink.";

    document.getElementById("quantityMessage").innerHTML = "";

    document.getElementById("finalMessage").innerHTML = "";

    document.getElementById("orderDetails").innerHTML = "";

    document.getElementById("dispensingStatus").innerHTML = "";

    document.getElementById("receiptSection").style.display = "none";
}


function cancelOrder() {

    clearTimeout(dispensingTimer);
clearTimeout(readyTimer);
clearTimeout(resetTimer);

clearInterval(countdownInterval);

document.getElementById("receiptSection").style.display = "none";

document.getElementById("countdownTimer").innerHTML = "";

document.getElementById("countdownTimer").innerHTML = "";

    selectedDrink = "";
    selectedQuantity = 0;

    orderConfirmed=false;

    document.getElementById("orderMessage").style.display = "none";

    document.getElementById("message").innerHTML =
        "Order cancelled. Please select again.";

    document.getElementById("quantitySection").style.display = "none";

    document.getElementById("quantityMessage").innerHTML = "";

   document.getElementById("dispensingStatus").innerHTML = "";

}