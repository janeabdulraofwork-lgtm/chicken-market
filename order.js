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
// Place order button (WhatsApp + Google Sheets)
// -----------------------------
document.getElementById("orderBtn").onclick = () => {
  const totalWeight = (chicken * weight).toFixed(2);

  // 1️⃣ Send to WhatsApp
  const message =
    "Hello " + shopName +
    "%0A%0A🛒 Order:%0A" +
    "🐔 Chickens: " + chicken +
    "%0A⚖ Weight per chicken: " + weight + " kg" +
    "%0A📦 Total weight: " + totalWeight + " kg";

  const waUrl = "https://wa.me/" + shopPhone + "?text=" + message;
  window.open(waUrl, "_blank");

  // 2️⃣ Send to Google Sheets
  const data = {
    shop: shopName,
    chicken: chicken,
    weight: weight,
    totalWeight: totalWeight
  };

  // Use your Apps Script Web App URL here
  fetch("https://script.google.com/macros/s/AKfycbxjazR1C79DyIGhKUBlhtfv1Y9ppvn8VGC3n2Iym2kJTR3ehntA2pK57rR2gtyuXY_u-A/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => {
    if (!res.ok) throw new Error("Network response not OK: " + res.status);
    return res.json();
  })
  .then(res => {
    console.log("Order saved to Google Sheet:", res);
  })
  .catch(err => {
    console.error("Failed to save order to Google Sheet:", err);
  });

  // Optional alert
  alert("✅ Your order has been sent to WhatsApp and saved!");
};