class ShoppingCart {
  constructor() {
    // Load items from sessionStorage
    const savedItems = JSON.parse(sessionStorage.getItem('cartItems'));

    if (savedItems) {
      this.items = savedItems;
    } else {
      this.items = [];
    }
  }
  calculateTotal() {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
  saveCart() {
    // Save items to sessionStorage
    sessionStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  addItem(name, price, imageUrl) {
    const item = this.items.find((item) => item.name === name);
    if (item) {
      item.quantity++;
    } else {
      this.items.push({ name, price, imageUrl, quantity: 1 });
    }
    this.displayCart();
    this.saveCart();
  }

  removeItem(name) {
    this.items = this.items.filter((item) => item.name !== name);
    this.displayCart();
    this.saveCart();
  }

  updateQuantity(name, quantity) {
    const item = this.items.find((item) => item.name === name);
    if (item) {
      item.quantity = quantity;
      this.displayCart();
      document.querySelector(
        ".totals"
      ).textContent = `Total: $${this.calculateTotal().toFixed(2)}`;
      this.saveCart();
    }

  }
recalculateCart() {
  let subtotal = 0;

  this.items.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  const totalElement = document.querySelector("#cart-total");
  const checkoutButton = document.querySelector(".checkout");

  if (totalElement) totalElement.textContent = 'Total: ' + subtotal.toFixed(2) + ' €';

  if (checkoutButton) {
    if (subtotal === 0) {
      checkoutButton.style.display = "none";
    } else {
      checkoutButton.style.display = "block";
    }
  }
   this.saveCart();
}

  displayCart() {
    const cartDiv = document.querySelector(".shopping-cart");
    cartDiv.innerHTML = `
  ${this.items
    .map(
      (item) => `
    <div class="product">
      <div class="product-image">
        <img src="${item.imageUrl}">
      </div>
      <div class="product-details">
        <div class="product-title">${item.name}</div>
      </div>
      <div class="product-price">
        <label>Price</label>
        ${item.price} €
      </div>
      <div class="product-quantity">
        <label>Quantity</label>
        <input type="number" value="${item.quantity}" min="1" data-name="${
        item.name
      }">
      </div>
      <div class="product-removal">
        <button class="remove-product" data-name="${item.name}">
          Remove
        </button>
      </div>
      <div class="product-line-price">
        <label>Total</label>
        ${item.price * item.quantity} €
      </div>
    </div>
  `
    )
    .join("")}
  <div class="totals">
    <div id="cart-total"></div>
  </div>
  <button class="checkout">Checkout</button>
`;
document.querySelector('.checkout').addEventListener('click', function() {
  document.getElementById('checkout-form').style.display = 'block';
});
  this.recalculateCart();

    document.querySelectorAll(".remove-product").forEach((button) => {
      button.addEventListener("click", (event) => {
        this.removeItem(event.target.dataset.name);
      });
    });

    document.querySelectorAll(".product-quantity input").forEach((input) => {
      input.addEventListener("input", (event) => {
        const quantity = parseInt(event.target.value);
        if (quantity >= 1) {
          this.updateQuantity(event.target.dataset.name, quantity);
        } else {
          event.target.value = 1;
        }
      });
    });
  }

  updateQuantity(name, quantity) {
    const item = this.items.find((item) => item.name === name);
    if (item) {
      item.quantity = quantity;
      this.displayCart();
      this.recalculateCart();
    }
  }
}


const cart = new ShoppingCart();
document.getElementById('add-item-button').addEventListener('click', function() {
  const cart = new ShoppingCart();
  cart.addItem("Sushi Set 1", 10, "../images/product2.png");
});
//cart.addItem("Sushi Set 1", 10, "../images/product2.png");
//cart.addItem("Sushi Set 2", 15, "../images/product1.jpg");

document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("add")) {
    const name = event.target.dataset.name;
    const item = cart.items.find((item) => item.name === name);
    cart.addItem(item.name, item.price, item.imageUrl);
  }
});

cart.displayCart();

const checkoutForm = document.getElementById('checkout-form');

checkoutForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = {};

  for (let i = 0; i < checkoutForm.elements.length; i++) {
    const element = checkoutForm.elements[i];
    if (element.name) {
      formData[element.name] = element.value;
    }
  }

  try {
    const response = await fetch('//http://127.0.0.1:3000/api/v1/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
});
