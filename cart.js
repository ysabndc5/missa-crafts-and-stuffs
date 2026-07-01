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
ADD TO CART
========================= */
function addToCart(name, price) {
  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
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
QUANTITY
========================= */
function increaseQty(index) {
  cart[index].quantity += 1;
  saveCart();
}

function decreaseQty(index) {
  cart[index].quantity -= 1;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
}

/* =========================
REMOVE ITEM
========================= */
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

/* =========================
SUMMARY
========================= */
function updateSummary() {
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
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
  displayCart();
  updateCartCount();
});