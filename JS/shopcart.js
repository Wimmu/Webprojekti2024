class ShoppingCart {
  constructor() {
    // Load items from sessionStorage
    const savedItems = JSON.parse(sessionStorage.getItem('cartItems'));

    if (savedItems) {
      this.items = savedItems;
    } else {
      this.items = [];
    }

    // Fetch user data and set the user ID
    this.userId = null;
    this.fetchUserId();
  }

  async fetchUserId() {
    try {
      const userData = await this.fetchUsers();
      if (userData && userData.user && userData.user.user_id) {
        this.userId = userData.user.user_id;
      } else {
        console.error('User ID not found in user data:', userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async fetchCurrentUser() {
    try {
      const token = localStorage.getItem('token');

      if (!token || !this.userId) {
        console.error('No token or user ID found');
        return;
      }

      const url = `https://10.120.32.75/app/api/v1/users/${this.userId}`; // Use this.userId here
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, URL: ${response.url}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  }

  async fetchUsers() {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found');
        return;
      }

      const url = 'https://10.120.32.75/app/api/v1/auth/me'; // Endpoint to get user data
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, URL: ${response.url}`);
      }
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }



  clearCart() {
    // Clear items array
    const token = localStorage.getItem('token');

    // Clear the local storage
    localStorage.clear();

    // Set the token back to the local storage
    if (token) {
      localStorage.setItem('token', token);
    }

    // Update the displayed cart
    this.displayCart();
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
    const index = this.items.findIndex(item => item.name === name);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.displayCart();
      this.recalculateCart();
    }
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
      // Convert the price to a number
      let price = parseFloat(item.price);
      // Multiply the price by the quantity and round the result
      subtotal += parseFloat((price * item.quantity).toFixed(2));
      //console.log(subtotal);
    });

    const totalElement = document.querySelector("#cart-total");
    const checkoutButton = document.querySelector(".checkout");

    // Update the total price in the shopping cart
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
          <img src="https://10.120.32.75/app/public/${item.image}" alt="${item.name}">
        </div>
        <div class="product-details">
          <div class="product-title">${item.name}</div>
        </div>
        <div class="product-line-price">
          <label>Total</label>
          ${(item.price * item.quantity).toFixed(2)} €
        </div>
        <div class="product-quantity">
          <label>Quantity</label>
          <input type="number" value="${item.quantity}" min="1" data-name="${item.name}">
        </div>
        <div class="product-removal">
          <button class="remove-product" data-name="${item.name}">
            Remove
          </button>
        </div>
        <div class="product-price">
          <label>Price</label>
          ${item.price} €
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
    this.items.forEach(item => {
      const img = document.createElement('img');
      //img.src = item.imageUrl;
      // Append the image to your cart item display
      const productImageDiv = document.querySelector(`.product-image[data-name="${item.name}"]`);
      if (productImageDiv) {
        productImageDiv.appendChild(img);
      }
    });
  document.querySelectorAll(".product-quantity input").forEach((input) => {
  // When the quantity is changed, save the new quantity in local storage
  input.addEventListener('change', function(event) {
    const quantity = event.target.value;
    localStorage.setItem(event.target.dataset.name, quantity);
  });

  // When the page is loaded, get the quantity from local storage and set it in the cart
  const quantity = localStorage.getItem(input.dataset.name);
  if (quantity) {
    input.value = quantity;
  }
});
document.querySelector('.checkout').addEventListener('click', function() {
  document.getElementById('checkout-form').style.display = 'block';
});
  this.recalculateCart();
  document.body.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-product')) {
    const name = event.target.dataset.name;
    cart.removeItem(name);

    // Store the updated cart items in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cart.items));
  }
});



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
window.onload = async function() {
  try {
    // Create an instance of ShoppingCart
    const cart = new ShoppingCart();

    // Call fetchUsers function
    await cart.fetchUserId();
    const userData = await cart.fetchCurrentUser();


    if (userData) { // Check if userData exists
      document.getElementById('name').value = userData.username || '';
      document.getElementById('email').value = userData.email || '';
      document.getElementById('phone').value = userData.phone || '';
      document.getElementById('address').value = userData.address || '';
    } else {
      console.error('User data not found:', userData);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};


const cart = new ShoppingCart();
// document.getElementById('add-item-button').addEventListener('click', function() {
//   const cart = new ShoppingCart();
//   //cart.addItem("Sushi Set 1", 10, "../images/product2.png");
// });
//cart.addItem("Sushi Set 1", 10, "../images/product2.png");
//cart.addItem("Sushi Set 2", 15, "../images/product1.jpg");



document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("add")) {
    const name = event.target.dataset.name;
    const item = cart.items.find((item) => item.name === name);
    cart.addItem(item.name, item.price, item.imageUrl);

    // Store the cart items in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cart.items));

    // Redirect to the products.html page
    window.location.href = 'products.html';
  }
});

// Retrieve the cart items from localStorage when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
  const storedCartItems = localStorage.getItem('cartItems');
  if (storedCartItems) {
    cart.items = JSON.parse(storedCartItems);
    //console.log(cart.items);
    cart.displayCart();
  }
});

const checkoutForm = document.getElementById('checkout-form');
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  //console.log(`${key}: ${value}`);
}


checkoutForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  // Disable the submit button to prevent multiple submissions
  const submitButton = checkoutForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  const restaurantId = document.getElementById('restaurant').value;
  const formData = {};

  // Populate formData with form data
  formData.restaurantId = restaurantId;

  // Add the user ID to the formData
  formData.userId = cart.userId;

  // Add the total cost to the formData
  formData.totalCost = cart.calculateTotal().toFixed(2);

  formData.status = "pending";

  try {
    // Send the order data to the server to create the order and get the generated order ID
    const response = await fetch("https://10.120.32.75/app/api/v1/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    const orderId = responseData.orderId;

    // Associate the order ID with each order item and send them to the server
    await Promise.all(cart.items.map(async (item) => {
      item.orderId = orderId;
      const itemResponse = await fetch(
        `https://10.120.32.75/app/api/v1/orders/${orderId}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (!itemResponse.ok) {
        throw new Error(`HTTP error! status: ${itemResponse.status}`);
      }
    }));

    // Clear the shopping cart
    cart.clearCart();

    // Show a toast message
    showToast('Order confirmed');

    // After the toast has disappeared, enable the submit button again
    setTimeout(function() {
      submitButton.disabled = false;
    }, 3300); // Same duration as the toast message

    // After a delay, redirect the user to the profile page
    setTimeout(function() {
      window.location.href = '../HTML/profile.html';
    }, 2000); // Adjust the delay as needed (3 seconds in this example)
  } catch (error) {
    console.error('Error:', error);

    // Re-enable the submit button in case of an error
    submitButton.disabled = false;
  }
});




function showToast(message) {
  // Create toast element
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = message;

  // Add toast to body
  document.body.appendChild(toast);

  // Show toast
  toast.className = 'show';

  // After 3 seconds, remove the show class from toast
  setTimeout(function(){ toast.className = toast.className.replace('show', ''); }, 3000);

  // After the toast has disappeared, remove it from the DOM
  setTimeout(function(){ document.body.removeChild(toast); }, 3300);
}

