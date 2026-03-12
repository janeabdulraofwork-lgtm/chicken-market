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
// Place order button (WhatsApp + SheetDB)
// -----------------------------
document.getElementById("orderBtn").onclick = () => {
  const totalWeight = (chicken * weight).toFixed(2);

  // 1️⃣ Send to WhatsApp
  const message =
    "Hello " + shopName +
    "%0A%0A🛒 داخازی:%0A" +
    "🐔 مرێشک: " + chicken +
    "%0A⚖ وزنا هەر مريشکەکێ: " + weight + " kg" +
    "%0A📦 کۆی گشتی: " + totalWeight + " kg";

  const waUrl = "https://wa.me/" + shopPhone + "?text=" + message;
  window.open(waUrl, "_blank");

  // 2️⃣ Send to SheetDB
  const sheetDBUrl = "https://sheetdb.io/api/v1/kchxrmch1m18c";

  fetch(sheetDBUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        Time: new Date().toLocaleString(),
        Shop: shopName,
        Chickens: chicken,
        "Weight per Chicken": weight,
        "Total Weight": totalWeight
      }
    })
  })
    .then(response => {
      if (!response.ok) throw new Error("SheetDB error: " + response.status);
      alert("✅ Your order has been sent to WhatsApp and saved!");
    })
    .catch(err => {
      console.error(err);
      alert("⚠ Failed to save order to SheetDB");
    });
};
