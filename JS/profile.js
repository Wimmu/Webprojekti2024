let userId;
let userRole;

// --------------------- API FUNCTIONS ----------------------------- //
async function fetchUsers() {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    const url = 'http://127.0.0.1:3000/api/v1/auth/me'; // Endpoint to get user data
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
    userId = userData.user.user_id; // Assign userId here
    userRole = userData.user.role;
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

async function fetchCurrentUser() {
  try {
    const token = localStorage.getItem('token');

    if(!token) {
      console.error('No token found');
      return;
    }

    const url = `http://127.0.0.1:3000/api/v1/users/${userId}`;
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
    return await response.json()
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}

async function fetchOrders(userId) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${userId}/orders`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}

async function fetchAllOrders() {
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/v1/orders`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}

async function fetchOrderItemsByOrderId(orderId){
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/v1/items/orderItems/${orderId}`);
    const data = await response.json();
    return data.join(', ');
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}

async function fetchMenuItems() {
  try {
    const response = await fetch('http://127.0.0.1:3000/api/v1/items');
    return await response.json()
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}

// --------------------- DROP DOWN FUNCTIONS ------------------------- //
function toggleDropDowns(dropDown, button) {
  if (dropDown.classList.contains('hidden')) {
    dropDown.classList.remove('hidden');
    button.innerText = 'Hide';
  } else {
    dropDown.classList.add('hidden');
    button.innerText = 'Show';
  }
}
function toggleMotd() {
  const dropDown = document.querySelector('.motd-dropdown'); // Corrected
  const button = document.getElementById('motdToggleButton');
  toggleDropDowns(dropDown, button);
}

function toggleOrderHistory() {
  const orderHistory = document.getElementById('order-history');
  const button = document.getElementById('orderToggleButton');
  toggleDropDowns(orderHistory, button);
}

function toggleManagement() {
  const management = document.getElementById('addNewProductSection');
  const button = document.getElementById('openAddItemSectionButton');
  if (management.classList.contains('hidden')) {
    management.classList.remove('hidden');
    button.innerText = 'Add product';
  } else {
    management.classList.add('hidden');
    button.innerText = 'Add product';
  }
}

// --------------------- PROFILE ----------------------------- //
// Fetch user data and place it in the user profile
async function placeProfileData() {
  try {
    const userData = await fetchCurrentUser();

    if (!userData.avatar || userData.avatar === 'null') {
      userData.avatar = 'default.jpg';
    }

    document.getElementById('profilePicture').src = `/uploads/${userData.avatar}`;
    document.getElementById('profile-welcome-text-header').textContent = `Welcome to your profile, ${userData.first_name}!`;
    document.getElementById('users-username').textContent = userData.username;
    document.getElementById('users-firstname').textContent = userData.first_name;
    document.getElementById('users-lastname').textContent = userData.last_name;
    document.getElementById('users-email').textContent = userData.email;
    document.getElementById('users-address').textContent = userData.address;
    document.getElementById('users-phone').textContent = userData.phone;
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Use default avatar in case of an error
    document.getElementById('profilePicture').src = '/uploads/default.jpg';
  }
}


// Toggle the profile edit mode
function toggleProfileEdit() {
  const editButton = document.querySelector(".editAccountDetailsBtn");
  const userDetails = document.getElementById('user-details-div').querySelectorAll('span');
  const uploadImage = document.getElementById('profile-image-upload-btn');

  if (editButton.innerText === "Edit Account Details") {
    editButton.innerText = "Save Account Details";
    uploadImage.style.display = 'block';
    userDetails.forEach(span => {
      const input = document.createElement('input');
      input.type = "text";
      input.value = span.textContent;
      span.textContent = ''; // Clear the span's text content
      span.appendChild(input);
    });
  } else {
    uploadImage.style.display = 'none';
    saveAccountDetails();
  }
}

function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 4000); // Adjust the time (in milliseconds) as per your requirement
}


async function saveAccountDetails() {
  try {
    const userDetails = document.getElementById('user-details-div');
    const username = userDetails.querySelector('p:nth-child(1) input').value;
    const first_name = userDetails.querySelector('p:nth-child(2) input').value;
    const last_name = userDetails.querySelector('p:nth-child(3) input').value;
    const email = userDetails.querySelector('p:nth-child(4) input').value;
    const address = userDetails.querySelector('p:nth-child(6) input').value;
    const phone = userDetails.querySelector('p:nth-child(5) input').value;
    const editButton = document.querySelector(".editAccountDetailsBtn");
    const errorMessage = document.getElementById('edit-account-error-text');

    if (!username || !first_name || !last_name || !email || !address || !phone) {
      errorMessage.innerText = 'All fields are required!';
      return;
    }

    if (!email.includes('@')) {
      const errorMessage = document.getElementById('edit-account-error-text');
      errorMessage.innerText = 'Invalid email address!';
      return;
    }

    const fileInput = document.getElementById('profile-picture-input');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('username', username);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('phone', phone);
    if (file) {
      formData.append('avatar', file);
    }

    const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${userId}`, {
      method: 'PUT',
      body: formData, // Send the form data directly
    });

    if (response.ok) {
      showNotification('Account details saved!');
      placeProfileData(); // Refresh the profile data after saving
      editButton.innerText = "Edit Account Details";
      errorMessage.innerText = '';
    } else {
      console.error('Failed to save account details');
    }
  } catch (error) {
    console.error('Error saving account details:', error);
  }
}


// --------------------- ORDER HISTORY ----------------------------- //
// Fetch order data and place it in the order history
async function placeOrderData() {
  try {
    const orderHistory = document.getElementById('order-history');
    orderHistory.innerHTML = '';

    // Check if the user is an admin
    if (userRole === 'admin') {
      document.getElementById('order-history-header').innerText = 'Customer orders:';
      console.log('Admin user detected');
      // Fetch all orders
      const allOrders = await fetchAllOrders();
      console.log('All orders:', allOrders);
      // Sort orders by date (newest to oldest)
      allOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
      // Display all orders
      for (const order of allOrders) {
        const orderDiv = document.createElement('div');
        orderDiv.classList.add('order');
        const orderTop = document.createElement('div');
        orderTop.classList.add('order-top');
        const orderDate = new Date(order.date).toLocaleDateString('en-GB');
        const orderStatus = order.status.charAt(0).toUpperCase() + order.status.slice(1);
        const orderItems = await fetchOrderItemsByOrderId(order.order_id);
        orderTop.innerHTML = `<h3>${orderDate}</h3><h3>${orderStatus}</h3>`;
        const orderInfo = document.createElement('div');
        orderInfo.innerHTML = `<p>Order ID: ${order.order_id}</p><p>Products: ${orderItems}</p>`;
        orderDiv.appendChild(orderTop);
        orderDiv.appendChild(orderInfo);
        orderHistory.appendChild(orderDiv);
      }
    } else {
      // Fetch orders only for the current user
      const orderData = await fetchOrders(userId);
      // Sort orders by date (newest to oldest)
      orderData.sort((a, b) => new Date(b.date) - new Date(a.date));
      // Display orders for the current user
      if (orderData.length === 0) {
        const noOrdersMessage = document.createElement('p');
        noOrdersMessage.style.textAlign = 'center';
        noOrdersMessage.innerHTML = 'No orders yet, <a href="../HTML/products.html">make your first order here</a>!';
        orderHistory.appendChild(noOrdersMessage);
      } else {
        for (const order of orderData) {
          const orderDiv = document.createElement('div');
          orderDiv.classList.add('order');
          const orderTop = document.createElement('div');
          orderTop.classList.add('order-top');
          const orderDate = new Date(order.date).toLocaleDateString('en-GB');
          const orderStatus = order.status.charAt(0).toUpperCase() + order.status.slice(1);
          const orderItems = await fetchOrderItemsByOrderId(order.order_id);
          orderTop.innerHTML = `<h3>${orderDate}</h3><h3>${orderStatus}</h3>`;
          const orderInfo = document.createElement('div');
          orderInfo.innerHTML = `<p>Order ID: ${order.order_id}</p><p>Products: ${orderItems}</p>`;
          orderDiv.appendChild(orderTop);
          orderDiv.appendChild(orderInfo);
          orderHistory.appendChild(orderDiv);
        }
      }
    }

    orderHistory.classList.remove('hidden');
  } catch (error) {
    console.error('Error fetching order data:', error);
  }
}


// --------------------- MEAL OF THE DAY ----------------------------- //
// Fetch menu items and place them in the dropdown
async function placeMotdData() {
  try {
    const items = await fetchMenuItems();
    const dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.innerHTML = ''; // Clear previous dropdown content
    items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item');
      itemDiv.onclick = () => placeSelectedItemData(item);
      itemDiv.innerHTML = `
                <img src="/uploads/${item.image}" alt="${item.name}">
                <div class="item-info">
                    <p>${item.name}</p>
                    <p>${item.price}€</p>
                </div>
            `;
      dropdownContent.appendChild(itemDiv);
    });
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}

// Toggle the dropdown menu
function toggleDropdown() {
  const dropdownContent = document.getElementById("dropdownContent");
  dropdownContent.classList.toggle("show");
}

// Select an item from the dropdown and display it
function placeSelectedItemData(item) {
  document.getElementById('currentMealHeader').textContent = 'Selected meal:';
  document.getElementById('selectedMealImage').style.display = 'block';
  document.getElementById('selectedMealImage').setAttribute('src', `/uploads/${item.image}`);
  document.getElementById('selectedMealName').textContent = item.name;
  document.getElementById('selectedPrice').textContent = item.price + '€';
  document.getElementById('selectedDescription').textContent = item.description;
  document.getElementById('selectedAllergen').textContent = 'Allergens: ' + item.allergen;
  document.getElementById('selectedCategory').textContent = 'Category: ' + item.category;

  const editButton = document.querySelector('.editMealButton');
  const deleteButton = document.querySelector('.deleteMealButton');


  editButton.classList.remove('hidden');
  deleteButton.classList.remove('hidden');
}

function resetSelectedMealData() {
  document.getElementById('currentMealHeader').textContent = '';
  document.getElementById('selectedMealImage').style.display = 'none';
  document.getElementById('selectedMealName').textContent = '';
  document.getElementById('selectedPrice').textContent = '';
  document.getElementById('selectedDescription').textContent = '';
  document.getElementById('selectedAllergen').textContent = '';
  document.getElementById('selectedCategory').textContent = '';

  // Disable edit and delete buttons when no item is selected
  const editButton = document.querySelector('.editMealButton');
  const deleteButton = document.querySelector('.deleteMealButton');

  editButton.classList.add('hidden');
  deleteButton.classList.add('hidden');
 }



// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.motd-select-dropdown')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// --------------------- MANAGEMENT ----------------------------- //

// Add a remove product
async function removeMeal() {
  try {
    const mealName = document.getElementById('selectedMealName').textContent;

    const confirmation = confirm(`Are you sure you want to remove ${mealName}?`);

    if (confirmation) {
      const response = await fetch(`http://127.0.0.1:3000/api/v1/items/${mealName}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        resetSelectedMealData(); // Reset selected meal data
        await placeMotdData();
        showNotification('Product deleted!');
      } else {
        console.error('Failed to delete product');
      }
    }
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}



document.getElementById('productImage').addEventListener('change', function() {
  var fileName = this.files[0].name;
  document.getElementById('productImageLabel').innerText = 'Image: ' + fileName;
});


// Save a new product
function saveProduct() {
  const form = document.getElementById('addProductForm');
  const formData = new FormData(form);

  fetch('http://localhost:3000/api/v1/items', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      toggleManagement();
      showNotification('New item added!');
      form.reset();
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('errorMessage').innerText = 'Error: ' + error.message;
    });
}


// --------------------- MAIN ----------------------------- //
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const userData = await fetchUsers();

    // Place profile data
    placeProfileData();

    // Place order data
    placeOrderData();

    // Place MOTD data
    placeMotdData();

    resetSelectedMealData();

    // Hide sections if the user is not an admin
    const motdSection = document.getElementById('motd-section');
    const managementSection = document.getElementById('addNewProductSection');
    if (userData.user.role !== 'admin') {
      motdSection.style.display = 'none';
      managementSection.style.display = 'none';
    }
  } catch (error) {
    console.error('Error loading profile data:', error);
  }
});

document.getElementById('profile-picture-input').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    document.getElementById('profilePicture').src = e.target.result;
  }

  reader.readAsDataURL(file);
});

