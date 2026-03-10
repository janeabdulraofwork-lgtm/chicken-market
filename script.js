const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {
  let filter = searchInput.value.toLowerCase();

  let cards = document.querySelectorAll(".shop-card");

  cards.forEach((card) => {
    let name = card.dataset.name;

    card.style.display = name.includes(filter) ? "flex" : "none";
  });
});

function openOrder(name, location, image) {
  localStorage.setItem("shopName", name);
  localStorage.setItem("shopLocation", location);
  localStorage.setItem("shopImage", image);

  window.location = "order.html";
}
function openOrder(name, location, image, phone) {
  localStorage.setItem("shopName", name);
  localStorage.setItem("shopLocation", location);
  localStorage.setItem("shopImage", image);
  localStorage.setItem("shopPhone", phone);

  window.location = "order.html";
}
