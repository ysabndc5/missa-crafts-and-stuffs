document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;

  const name = form.customer_name.value;
  const phone = form.contact_number.value;
  const category = form.order_type.value;
  const quantity = parseInt(form.quantity.value);
  const address = form.address.value;
  const description = form.description.value;
  const estimatedPrice = form.estimated_price.value || 0;
  const timestamp = form.timestamp.value;

  // 💰 PRICE LIST (OPTIONAL — can still be used later in admin)
  const categoryBasePrice = {
    bouquets: 300,
    keychains: 50,
    cardholders: 40
  };

  const basePrice = categoryBasePrice[category] || 0;
  const totalPrice = basePrice * quantity;

  // 📦 ORDER OBJECT
  const order = {
    id: "ORD-" + Date.now(),
    type: "custom",
    name,
    phone,
    category,
    quantity,
    estimated_price: estimatedPrice,
    base_price: basePrice,
    total_price: totalPrice,
    address,
    description,
    timestamp: timestamp || new Date().toLocaleString()
  };

  // 💾 SAVE TO LOCALSTORAGE
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Order placed successfully!");

  form.reset();
  window.location.href = "index.html";
});