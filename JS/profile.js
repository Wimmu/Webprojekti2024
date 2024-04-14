/* PROFILE SECTION */
function toggleEdit() {
    var userDetails = document.getElementById("userDetails");
    var editButton = document.querySelector(".edit-details-btn");

    // Toggle the edit mode
    if (editButton.innerText === "Edit Account Details") {
        // Enable input fields for editing
        userDetails.querySelectorAll("input").forEach(function(input) {
            input.removeAttribute("disabled");
        });

        editButton.innerText = "Save Changes";
    } else {
        // Disable input fields and revert to original values
        userDetails.querySelectorAll("input").forEach(function(input) {
            input.setAttribute("disabled", true);
        });

        editButton.innerText = "Edit Account Details";
        // Here you can add code to save the changes to the server/database
    }
}

/* ORDER HISTORY SECTION */
function toggleOrderHistory() {
    const orderHistory = document.getElementById('order-history');
    const button = document.getElementById('orderToggleButton');

    if (orderHistory.classList.contains('hidden')) {
        orderHistory.classList.remove('hidden');
        button.innerText = 'Hide Orders';
    } else {
        orderHistory.classList.add('hidden');
        button.innerText = 'Show Orders';
    }
}

document.addEventListener("click", function(event) {
    var dropdownContent = document.getElementById("dropdownContent");
    var dropbtn = document.querySelector(".dropbtn");

    // If the clicked element is not the dropdown button or dropdown content, close the dropdown
    if (event.target !== dropbtn && !dropdownContent.contains(event.target)) {
        dropdownContent.classList.remove("show");
    }
});

/* MEAL OF THE DAY*/
function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.classList.toggle("show");
}

function toggleMotd() {
    const dropDown = document.querySelector('.motd-dropdown'); // Corrected
    const button = document.getElementById('motdToggleButton');

    if (dropDown.classList.contains('hidden')) {
        dropDown.classList.remove('hidden');
        button.innerText = 'Hide';
    } else {
        dropDown.classList.add('hidden');
        button.innerText = 'Show';
    }
}

function toggleManagement() {
    const dropDown = document.querySelector('.management'); // Corrected
    const button = document.getElementById('managementToggleButton');

    if (dropDown.classList.contains('hidden')) {
        dropDown.classList.remove('hidden');
        button.innerText = 'Hide';
    } else {
        dropDown.classList.add('hidden');
        button.innerText = 'Show';
    }
}

/* MANAGEMENT SECTION */
function openTab(tabId) {
    // Hide all product tabs
    var tabs = document.querySelectorAll('.product-tab');
    tabs.forEach(function(tab) {
        tab.classList.add('hidden');
    });

    // Show the selected tab
    var selectedTab = document.getElementById(tabId);
    selectedTab.classList.remove('hidden');
}

function removeProduct() {
    var productDropdown = document.getElementById('productDropdown');
    var selectedProduct = productDropdown.value;

    // Remove the selected product from the dropdown or perform deletion operation
    console.log('Deleting product:', selectedProduct);
}

function saveProduct() {
    var productName = document.getElementById('productName').value;
    var productDescription = document.getElementById('productDescription').value;
    var productPrice = document.getElementById('productPrice').value;
    var productAllergens = document.getElementById('productAllergens').value;
    var productImage = document.getElementById('productImage').files[0];

    console.log('Saving product:', productName, productDescription, productPrice, productAllergens, productImage);
}

function populateAllergensDropdown() {
    // Sample data for demonstration
    var allergens = ['Gluten', 'Dairy', 'Nuts', 'Soy', 'Shellfish'];

    var allergensDropdown = document.getElementById('productAllergens');

    allergens.forEach(function(allergen) {
        var option = document.createElement('option');
        option.text = allergen;
        option.value = allergen;
        allergensDropdown.add(option);
    });
}

populateAllergensDropdown();

