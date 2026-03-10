// -----------------------------
// ORDER PAGE SCRIPT
// -----------------------------

let chicken = 1;
let weight = 1;

// HTML elements
const chickenDisplay = document.getElementById("chickenCount");
const weightDisplay = document.getElementById("weightCount");

// Shop info from localStorage
const shopName = localStorage.getItem("shopName");
const shopLocation = localStorage.getItem("shopLocation");
const shopPhone = localStorage.getItem("shopPhone"); // WhatsApp number
const shopImage = localStorage.getItem("shopImage");

// Display shop info
document.getElementById("shopName").innerText = shopName;
document.getElementById("shopLocation").innerText = shopLocation;
document.getElementById("shopImage").src = shopImage;

// -----------------------------
// Chicken buttons
// -----------------------------
document.getElementById("plusChicken").onclick = () => {
  chicken++;
  chickenDisplay.innerText = chicken;
};

document.getElementById("minusChicken").onclick = () => {
  if (chicken > 1) {
    chicken--;
    chickenDisplay.innerText = chicken;
  }
};

// -----------------------------
// Weight buttons
// -----------------------------
document.getElementById("plusWeight").onclick = () => {
  weight += 0.5;
  weightDisplay.innerText = weight;
};

document.getElementById("minusWeight").onclick = () => {
  if (weight > 0.5) {
    weight -= 0.5;
    weightDisplay.innerText = weight;
  }
};

// -----------------------------
// Place order button (WhatsApp + auto Google Form submit)
// -----------------------------
document.getElementById("orderBtn").onclick = () => {
  const totalWeight = (chicken * weight).toFixed(2);

  // 1️⃣ WhatsApp message
const message =
    "Hello " +
    shopName +
    "%0A%0A🛒 داخازی:%0A" +   // <-- fixed here
    "🐔 مرێشک: " +
    chicken +
    "%0A⚖ وزنا هەر مريشکەکێ: " +
    weight +
    " kg" +
    "%0A📦 کۆی گشتی: " +
    totalWeight +
    " kg";

  const waUrl = "https://wa.me/" + shopPhone + "?text=" + message;
  window.open(waUrl, "_blank");

  // 2️⃣ Google Form auto-submit
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf_9RaSeapHj5Z9X2Qe8_eqhVQ82maYybXdkwWzn1SKAYpfnw/viewform?usp=pp_url&entry.1939324443=h&entry.1308740507=1&entry.220789197=3&entry.167630465=5";

  // Map your Google Form entry IDs to values
  const formData = new FormData();
  formData.append("entry.1939324443", shopName);
  formData.append("entry.1308740507", chicken);
  formData.append("entry.220789197", weight);
  formData.append("entry.167630465", totalWeight);

  // Send form without user interaction
  fetch(formUrl, {
    method: "POST",
    mode: "no-cors",
    body: formData
  });

  // Optional confirmation alert
  alert("✅ Your order has been sent to WhatsApp and saved in the sheet!");
};



