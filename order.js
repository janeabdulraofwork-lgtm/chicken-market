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
fetch("https://script.google.com/macros/s/AKfycbzjkYumVhsDiaMq7BMHCVYJj9hh1YC0_E0G1xSiYvTA4F-mt-1_GgRu9Cxs0iiz0nWC6w/exec", {
  method: "POST",
  mode: "no-cors",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    shop: shopName,
    chicken: chicken,
    weight: weight,
    totalWeight: totalWeight
  })
});
  // Optional confirmation alert
  alert("✅ Your order has been sent to WhatsApp and saved in the sheet!");
};






