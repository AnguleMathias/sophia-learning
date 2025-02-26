// Subscribe Button Event Listener
document.addEventListener("DOMContentLoaded", function () {
  const subscribeBtn = document.getElementById("subscribe-btn");

  if (subscribeBtn) {
    subscribeBtn.addEventListener("click", function () {
      const emailInput = document
        .getElementById("subscribe-email")
        .value.trim();

      // Validate Email
      if (emailInput === "") {
        alert("Please enter your email to subscribe.");
      } else if (!/\S+@\S+\.\S+/.test(emailInput)) {
        alert("Please enter a valid email address.");
      } else {
        alert("Thank you for subscribing!");
        document.getElementById("subscribe-email").value = "";
      }
    });
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartTable = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");

  // Function to update cart in localStorage
  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  // Function to update cart totals
  function updateTotals() {
    let subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${subtotal.toFixed(2)}`;
  }

  // Function to render cart items dynamically
  function renderCart() {
    if (!cartTable) return;
    cartTable.innerHTML = "";

    cart.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>
            <div class="cart-item">
              <img src="images/${item.image}" alt="${item.product}" />
              <span>${item.product}</span>
            </div>
          </td>
          <td>$${item.price.toFixed(2)}</td>
          <td>
            <input type="number" value="${
              item.quantity
            }" min="1" class="quantity-input" data-index="${index}" />
          </td>
          <td>$${(item.price * item.quantity).toFixed(2)}</td>
          <td>
            <button class="remove-btn" data-index="${index}">X</button>
          </td>
        `;
      cartTable.appendChild(row);
    });

    updateTotals();
  }

  // Add to Cart Button Event Listeners
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const product = this.parentElement.querySelector("h3").innerText;
      const price = parseFloat(
        this.parentElement.querySelector("p").innerText.replace("$", "")
      );
      const image = this.parentElement
        .querySelector("img")
        .getAttribute("src")
        .split("/")
        .pop();

      // Check if item already exists in cart
      let existingItem = cart.find((item) => item.product === product);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ product, price, quantity: 1, image });
      }

      updateCart();
      alert(`"${product}" has been added to your cart!`);
    });
  });

  // Remove item from cart
  if (cartTable) {
    cartTable.addEventListener("click", function (e) {
      if (e.target.classList.contains("remove-btn")) {
        const index = e.target.getAttribute("data-index");
        cart.splice(index, 1);
        updateCart();
      }
    });
  }

  // Update quantity
  if (cartTable) {
    cartTable.addEventListener("input", function (e) {
      if (e.target.classList.contains("quantity-input")) {
        const index = e.target.getAttribute("data-index");
        cart[index].quantity = parseInt(e.target.value);
        updateCart();
      }
    });
  }

  // Clear Cart Functionality
  const clearCartBtn = document.getElementById("clear-cart-btn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", function () {
      if (cart.length === 0) {
        alert("No items to clear.");
      } else {
        cart = [];
        updateCart();
        alert("Cart cleared.");
      }
    });
  }

  // Process Order Functionality
  const processOrderBtn = document.getElementById("process-order-btn");
  if (processOrderBtn) {
    processOrderBtn.addEventListener("click", function () {
      if (cart.length === 0) {
        alert("Cart is empty.");
      } else {
        cart = [];
        updateCart();
        alert("Thank you for your order!");
      }
    });
  }

  // Render Cart on Page Load
  renderCart();

  // Contact Form Submission Alert
  const contactForm = document.querySelector(".contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Thank you for your message!");
      contactForm.reset();
    });
  }
});
