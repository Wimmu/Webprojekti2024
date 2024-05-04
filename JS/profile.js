
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

function toggleManagement() {
  const dropDown = document.querySelector('.management'); // Corrected
  const button = document.getElementById('managementToggleButton');
  toggleDropDowns(dropDown, button);
}

function toggleOrderHistory() {
  const orderHistory = document.getElementById('order-history');
  const button = document.getElementById('orderToggleButton');
  toggleDropDowns(orderHistory, button);
}

// --------------------- PROFILE ----------------------------- //
// Fetch user data and place it in the user profile
async function placeProfileData() {
  try {
    const rawUserData = await fetchUsers();
    const userId = rawUserData.user.user_id;
    const userData = await fetchCurrentUser();
    document.getElementById('welcomeText').textContent = `Welcome to your profile, ${userData.first_name}!`;
    document.getElementById('userUsername').textContent = userData.username;
    document.getElementById('firstName').textContent = userData.first_name;
    document.getElementById('lastName').textContent = userData.last_name;
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('userAddress').textContent = userData.address;
    document.getElementById('userPhone').textContent = userData.phone;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

// Toggle the profile edit mode
function toggleProfileEdit() {
  const editButton = document.querySelector(".edit-details-btn");
  const userDetails = document.getElementById('userDetails').querySelectorAll('span');

  if (editButton.innerText === "Edit Account Details") {
    editButton.innerText = "Save Account Details";
    userDetails.forEach(span => {
      const input = document.createElement('input');
      input.type = "text";
      input.value = span.textContent;
      span.textContent = ''; // Clear the span's text content
      span.appendChild(input);
    });
  } else {
    editButton.innerText = "Edit Account Details";
    console.log('Saving account details...');
    saveAccountDetails();
  }
}

async function saveAccountDetails() {
  try {
    const userDetails = document.getElementById('userDetails');
    const username = userDetails.querySelector('p:nth-child(1) input').value;
    const first_name = userDetails.querySelector('p:nth-child(2) input').value;
    const last_name = userDetails.querySelector('p:nth-child(3) input').value;
    const email = userDetails.querySelector('p:nth-child(4) input').value;
    const address = userDetails.querySelector('p:nth-child(5) input').value;
    const phone = userDetails.querySelector('p:nth-child(6) input').value;

    const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, first_name, last_name, email, address, phone}),
    });

    if (response.ok) {
      console.log('Account details saved successfully');
      placeProfileData(); // Refresh the profile data after saving
    } else {
      console.error('Failed to save account details');
    }
  } catch (error) {
    console.error('Error saving account details:', error);
  }
}


// --------------------- ORDER HISTORY ----------------------------- //
// Fetch order data and place it in the order history
// --------------------- ORDER HISTORY ----------------------------- //
// Fetch order data and place it in the order history
async function placeOrderData() {
  try {
    const orderData = await fetchOrders(userId);

    // Sort orders by date (most recent first)
    orderData.sort((a, b) => new Date(b.date) - new Date(a.date));

    const orderHistory = document.getElementById('order-history');
    orderHistory.innerHTML = '';

    if (orderData.length === 0) {
      const noOrdersMessage = document.createElement('p');
      noOrdersMessage.textContent = 'No orders yet';
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
      itemDiv.onclick = () => selectItem(item.name, item.price, item.description, item.image);
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
function selectItem(name, price, description, image) {
  console.log('Selected item:', name, price, description, image);
  document.getElementById('selectedMealImage').setAttribute('src', `/uploads/${image}`);
  document.getElementById('selectedMeal').textContent = name;
  document.getElementById('selectedPrice').textContent = price + '€';
  document.getElementById('selectedDescription').textContent = description;
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
// Open the selected tab
function openTab(tabId) {
  var tabs = document.querySelectorAll('.product-tab');
  tabs.forEach(function(tab) {
    tab.classList.add('hidden');
  });

  var selectedTab = document.getElementById(tabId);
  selectedTab.classList.remove('hidden');
}

// Fetch menu items and place them in the dropdown
async function placeRemoveDropdownData() {
  try {
    const items = await fetchMenuItems();
    const productDropdown = document.getElementById('productDropdown');
    items.forEach(item => {
      const option = document.createElement('option');
      option.value = item.name;
      option.text = `${item.name} - ${item.price}€`;
      productDropdown.appendChild(option);
    });
  } catch (error) {
    console.error('Error populating dropdown:', error);
  }
}

// Add a remove product
async function removeProduct() {
  try {
    const productDropdown = document.getElementById('productDropdown');
    const productName = productDropdown.value;

    const confirmation = confirm(`Are you sure you want to remove ${productName}?`);

    if (confirmation) {
      const response = await fetch(`http://127.0.0.1:3000/api/v1/items/${productName}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        console.log('Product deleted successfully');
        productDropdown.innerHTML = ''; // Clear dropdown after deletion
        await placeMotdData();
        await placeRemoveDropdownData(); // Refresh dropdown after deletion
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
      // Handle success
      console.log('Success:', data);
      // Redirect to profile.html or do whatever you want
      window.location.href = 'http://localhost:63342/Webprojektiiii2024/HTML/profile.html';
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
      document.getElementById('errorMessage').innerText = 'Error: ' + error.message;
    });
}

// --------------------- MAIN ----------------------------- //
document.addEventListener("DOMContentLoaded", () => {
  placeProfileData();
  placeOrderData();
  placeMotdData();
  placeRemoveDropdownData();

  const motdSection = document.getElementById('motd-section');
  const managementSection = document.getElementById('managementSection');
  if (userRole !== 'admin') {
    motdSection.style.display = 'none';
    managementSection.style.display = 'none';
  }
});
