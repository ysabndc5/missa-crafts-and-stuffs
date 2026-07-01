let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
SAVE CART
========================= */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
  updateSummary();
}

/* =========================
SYNC CART (IMPORTANT FIX)
========================= */
function syncCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

/* =========================
ADD TO CART
========================= */
function addToCart(name, price) {
  syncCart();

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({
      name: name,
      product: name,
      price: Number(price),
      quantity: 1
    });
  }

  saveCart();
}

/* =========================
CART COUNT
========================= */
function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (!count) return;

  const totalItems = cart.reduce((sum, item) => {
    return sum + (item.quantity || 1);
  }, 0);

  count.textContent = totalItems;
}

/* =========================
DISPLAY CART
========================= */
function displayCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  container.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    const qty = item.quantity || 1;
    const subtotal = item.price * qty;
    total += subtotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p>₱${item.price}</p>
      </div>

      <div class="qty">
        <button onclick="decreaseQty(${index})">-</button>
        <span>${qty}</span>
        <button onclick="increaseQty(${index})">+</button>
      </div>

      <div>₱${subtotal}</div>

      <button onclick="removeItem(${index})">🗑</button>
    `;

    container.appendChild(div);
  });

  updateSummary();
  updateCartCount();
}

/* =========================
QUANTITY CONTROLS (SAFE)
========================= */
function increaseQty(index) {
  if (!cart[index]) return;

  cart[index].quantity = (cart[index].quantity || 1) + 1;
  saveCart();
}

function decreaseQty(index) {
  if (!cart[index]) return;

  cart[index].quantity = (cart[index].quantity || 1) - 1;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
}

/* =========================
REMOVE ITEM
========================= */
function removeItem(index) {
  if (!cart[index]) return;

  cart.splice(index, 1);
  saveCart();
}

/* =========================
SUMMARY
========================= */
function updateSummary() {
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * (item.quantity || 1);
  });

  const shipping = 50;
  const total = subtotal + shipping;

  if (document.getElementById("subtotal")) {
    document.getElementById("subtotal").textContent = "₱" + subtotal;
  }

  if (document.getElementById("grand-total")) {
    document.getElementById("grand-total").textContent = "₱" + total;
  }
}

/* =========================
INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  syncCart();
  displayCart();
  updateCartCount();
});

/* =========================
EXPORT TO HTML
========================= */
window.addToCart = addToCart;
window.increaseQty = increaseQty;
window.decreaseQty = decreaseQty;
window.removeItem = removeItem;
window.displayCart = displayCart;