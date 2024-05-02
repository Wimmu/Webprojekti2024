let selectedItems = [];

// Fetches the current week's menu
async function fetchCurrentWeekMenu(currentWeek) {
  const startDate = currentWeek.start;
  const endDate = currentWeek.end;
  const restaurantId = 1;

  try {
    const response = await fetch(`http://127.0.0.1:3000/api/v1/menu?start_date=${startDate}&end_date=${endDate}&restaurant_id=${restaurantId}`);
    const data = await response.json();
    displayMenuForWeek(data);
  } catch (error) {
    console.error("Error fetching menu for the current week:", error);
  }
}

// Displays the menu for the current week
function displayMenuForWeek(menuData) {
  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = ""; // Clear previous content

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const topRowContainer = document.createElement("div");
  topRowContainer.classList.add("top-row-container");
  menuContainer.appendChild(topRowContainer);

  const bottomRowContainer = document.createElement("div");
  bottomRowContainer.classList.add("bottom-row-container");
  menuContainer.appendChild(bottomRowContainer);

  let count = 0;

  days.forEach(day => {
    const dayMenu = menuData.find(menu => getDayText(menu.day) === day);

    const dayContainer = document.createElement("div");
    dayContainer.classList.add("day-container");
    dayContainer.classList.add("daymenu");

    const restaurantHeading = document.createElement("h3");
    restaurantHeading.textContent = day;
    restaurantHeading.id = "restaurant-heading";
    dayContainer.appendChild(restaurantHeading);

    if (dayMenu) {
      const dateHeading = document.createElement("h4");
      dateHeading.textContent = dayMenu.day;
      dayContainer.appendChild(dateHeading);

      const menuList = document.createElement("ul");
      const foodItems = dayMenu.food_items.split(', ');
      foodItems.forEach(item => {
        const menuItem = document.createElement("li");
        menuItem.id = "excisting-menu-item";
        menuItem.textContent = item;
        menuList.appendChild(menuItem);
      });
      dayContainer.appendChild(menuList);
    } else {
      const noMenuText = document.createElement("p");
      noMenuText.textContent = "No lunch for today!";
      dayContainer.appendChild(noMenuText);
    }

    if (count < 4) {
      topRowContainer.appendChild(dayContainer);
    } else {
      bottomRowContainer.appendChild(dayContainer);
    }

    count++;
  });
}

// Converts date string to day text (e.g., "Monday", "Tuesday")
function getDayText(dateString) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(dateString);
  return days[date.getDay()];
}

document.addEventListener("DOMContentLoaded", async () => {
  // DOM elements
  const adminButton = document.getElementById("edit-button");
  const exitButton = document.getElementById("exit-button");
  const adminFormContainer = document.getElementById("edit-menu-container");
  const restaurantSelect = document.getElementById("restaurant");
  const itemsSelect = document.getElementById("items");
  const currentWeek = getCurrentWeek();

  // Event listeners
  adminButton.addEventListener("click", () => {
    adminFormContainer.style.display = "block";
  });

  exitButton.addEventListener("click", () => {
    adminFormContainer.style.display = "none";
  });

  document.getElementById("add-item-button").addEventListener("click", () => {
    addItem();
  });

  restaurantSelect.addEventListener("change", () => {
    const selectedDate = document.getElementById("date").value;
    const restaurantId = restaurantSelect.value;
    fetchMenuForDateAndRestaurant(selectedDate, restaurantId);
  });

  // Fetch initial data
  await fetchCurrentWeekMenu(currentWeek);
  await fetchRestaurants();
  await fetchMenuItems();

  // Fetches the list of restaurants
  async function fetchRestaurants() {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/v1/restaurants");
      const data = await response.json();
      for (const restaurant of data) {
        const option = document.createElement("option");
        option.value = restaurant.restaurant_id;
        option.textContent = restaurant.name;
        restaurantSelect.appendChild(option);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  }

  // Fetches the list of menu items
  async function fetchMenuItems() {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/v1/items");
      const data = await response.json();
      for (const menuItem of data) {
        const option = document.createElement("option");
        option.value = menuItem.id;
        option.textContent = menuItem.name;
        itemsSelect.appendChild(option);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  }

  // Adds the selected item to the new menu box
  function addItem() {
    const items = document.getElementById("items");
    const selectedItemsDiv = document.getElementById("selected-items");

    for (let i = 0; i < items.selectedOptions.length; i++) {
      const selectedItem = items.selectedOptions[i].text;
      if (!selectedItems.includes(selectedItem)) {
        selectedItems.push(selectedItem);
        const newItem = document.createElement("div");
        newItem.id = "newMenuItemsId";
        newItem.classList.add("selected-item");

        const itemName = document.createElement("span");
        itemName.textContent = selectedItem;
        newItem.appendChild(itemName);

        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", () => {
          selectedItems = selectedItems.filter(item => item !== selectedItem);
          selectedItemsDiv.removeChild(newItem);
        });
        newItem.appendChild(removeButton);

        selectedItemsDiv.appendChild(newItem);
      }
    }
  }

  document.getElementById("date").addEventListener("change", (event) => {
    const selectedDate = event.target.value;
    const restaurantId = restaurantSelect.value;
    fetchMenuForDateAndRestaurant(selectedDate, restaurantId);
  });
});

// Fetches the menu for a specific date and restaurant
async function fetchMenuForDateAndRestaurant(date, restaurantId) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/v1/menu?start_date=${date}&end_date=${date}&restaurant_id=${restaurantId}`);
    const data = await response.json();

    displayMenuForDate(data);
  } catch (error) {
    console.error("Error fetching menu for date:", error);
  }
}

// Displays the menu for a specific date on the current menu box
function displayMenuForDate(menuData) {
  const menuContainer = document.getElementById("menu-for-date");
  menuContainer.innerHTML = ""; // Clear previous content

  const innerMenuContainer = document.createElement("div");
  innerMenuContainer.innerHTML = "";
  innerMenuContainer.id = "inner-menu-container";
  menuContainer.appendChild(innerMenuContainer);

  if (menuData.length === 0) {
    innerMenuContainer.textContent = "No menu for the selected date.";
    return;
  }

  menuData.forEach(menu => {
    const restaurantHeading = document.createElement("h3");
    restaurantHeading.textContent = 'Current menu:';
    restaurantHeading.id = "restaurant-heading";
    innerMenuContainer.appendChild(restaurantHeading);

    const dateHeading = document.createElement("h4");
    dateHeading.textContent = menu.day;
    innerMenuContainer.appendChild(dateHeading);

    const menuList = document.createElement("ul");
    const foodItems = menu.food_items.split(', ');
    foodItems.forEach(item => {
      const menuItem = document.createElement("li");
      menuItem.id = "excisting-menu-item";
      menuItem.textContent = item;
      menuList.appendChild(menuItem);
    });
    innerMenuContainer.appendChild(menuList);
  });
}

// Returns the current week's start and end dates
function getCurrentWeek() {
  const today = new Date();
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Adjusted
  const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7)); // Adjusted
  return {
    start: firstDayOfWeek.toISOString().split('T')[0],
    end: lastDayOfWeek.toISOString().split('T')[0]
  };
}

// Adds a new lunch menu to the database
function addMenu() {
  const restaurant = document.getElementById('restaurant');
  const restaurantId = restaurant.value;

  const date = document.getElementById('date').value;
  const foodItems = selectedItems.join(', ');

  const data = {
    day: date,
    restaurant_id: restaurantId,
    food_items: foodItems
  };

  fetch('http://localhost:3000/api/v1/menu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      fetchMenuForDateAndRestaurant(date, restaurantId);
      selectedItems = [];
      const selectedItemsDiv = document.getElementById("selected-items");
      selectedItemsDiv.innerHTML = "";
      const header = document.createElement("h3");
      header.textContent = "New menu:";
      selectedItemsDiv.appendChild(header);
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('errorMessage').innerText = 'Error: ' + error.message;
    });
}
