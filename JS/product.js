
//-------------------------- Fetch from database ---------------------------------

async function fetchMenuItems() {
    try {
        const response = await fetch('http://localhost:3000/api/v1/items');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching menu items:', error);
    }
}

async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:3000/api/v1/items/category');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

async function fetchAllergens() {
    try {
        const response = await fetch('http://localhost:3000/api/v1/items/allergen');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching allergens:', error);
    }
}

fetchMenuItems().then(data => {
    console.log(data);
});

fetchAllergens().then(data => {
    console.log(data);
} );

//-------------------------- Product List Codes ---------------------------------

createCategoryContainer()
createCategoryCheckboxes()
createAllergenCheckboxes()

async function createCategoryContainer() {
  const productContainer = document.getElementById('productContainer');

  try {
    const newmenu = await fetchMenuItems();

    newmenu.forEach(item => {
      const { category } = item;

      let categoryContainer = document.querySelector(`.categoryContainer[data-category="${category}"]`);

      if (!categoryContainer) {
        categoryContainer = document.createElement('div');
        categoryContainer.classList.add('categoryContainer');
        categoryContainer.dataset.category = category;

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('categoryTitle');
        categoryTitle.innerText = category;

        categoryContainer.appendChild(categoryTitle);
        productContainer.appendChild(categoryContainer);
      }

      const productInfoBox = crateProductInfoBox(item);
      categoryContainer.appendChild(productInfoBox);

    });
  } catch (error) {
    console.error('Error fetching menu items:', error);
  }
}


function crateProductInfoBox(product) {
    const productInfoBox = document.createElement('div');
    productInfoBox.className = 'product';
    productInfoBox.onclick = () => openModal(product);
    productInfoBox.classList.add('productInfoBox');


    productInfoBox.innerHTML = `
        <img src="/uploads/${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="productDisciption">${product.description}</p>
        <p class="allergens" hidden>${product.allergen}</p>
        <div class=button-wrapper">
           <p class="price">${product.price}€</p>
           <button class="addToCart" onclick="openModal(${product.id})">More Info</button>
        </div>
    `;
    return productInfoBox;
}

async function createCategoryCheckboxes() {
  const categories = await fetchCategories();
  const categoryFilterDiv = document.getElementById('categoryFilters');
  const addedCategories = {};

  categories.forEach(category => {
    const categoryName = category.category;
    if (!addedCategories[categoryName]) {
      const container = document.createElement('div');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = categoryName; // Set checkbox value to category name
      checkbox.id = categoryName;
      checkbox.className = 'categoryCheck';
      checkbox.onclick = filterCategory;

      const label = document.createElement('label');
      label.htmlFor = categoryName;
      label.innerText = categoryName;

      container.appendChild(checkbox);
      container.appendChild(label);

      categoryFilterDiv.appendChild(container);

      // Mark the category as added
      addedCategories[categoryName] = true;
    }
  });
}

async function createAllergenCheckboxes() {
  const allergens = await fetchAllergens();
  const allergenFilterDiv = document.getElementById('allergenFilter');

  const addedAllergens = {};

  allergens.forEach(allergen => {
    const allergenNames = allergen.allergen.split(', ');

    allergenNames.forEach(allergenName => {
      if (!addedAllergens[allergenName]) {
        const container = document.createElement('div');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = allergenName; // Set checkbox value to allergen name
        checkbox.id = allergenName;
        checkbox.className = 'allergen-checkbox';
        checkbox.onclick = filterAllergens;

        const label = document.createElement('label');
        label.htmlFor = allergenName;
        label.innerText = allergenName;

        container.appendChild(checkbox);
        container.appendChild(label);

        allergenFilterDiv.appendChild(container);

        addedAllergens[allergenName] = true;
      }
    });
  });
}

//-------------------------- Modal Code ---------------------------------

function openModal(product) {

    // Display the modal
    document.getElementById('myModal').style.display = 'block';

    // Simulate loading content from the database based on boxId
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `

            <div class="grid-container">
                <div class="grid-cell">
                    <img src="/uploads/${product.image}" alt="${product.name}">
                </div>
                <div class="grid-cell">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>${product.allergen} </p>

                    <div class="button">
                        <p>${product.price}€</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
}

function closeModal() {
    // Close the modal
    document.getElementById('myModal').style.display = 'none';
}

window.addEventListener('click', function (event) {
    // Close the modal if the user clicks outside of the modal
    if (event.target === document.getElementById('myModal')) {
        closeModal();
    }
});


//-------------------------- Search Code ---------------------------------

function search() {
    let input = document.getElementById('search').value.trim().toLowerCase();
    let products = document.getElementsByClassName('product');

    for (let i = 0; i < products.length; i++) {
        let productName = products[i].querySelector('h3').innerText.toLowerCase();
        if (!productName.includes(input)) {
            products[i].style.display = "none";
        } else {
            products[i].style.display = "flex";
        }
    }
}

//-------------------------- Filter Code ---------------------------------

function filterCategory() {
    const categoryCheckboxes = document.querySelectorAll('.categoryCheck:checked');
    const selectedCategories = Array.from(categoryCheckboxes).map(checkbox => checkbox.value);
    const products = document.getElementsByClassName('product');

    if (selectedCategories.length === 0) {
        for (let i = 0; i < products.length; i++) {
            products[i].style.display = "flex";
        }
        return;
    }

    for (let i = 0; i < products.length; i++) {
        let productCategory = products[i].parentNode.querySelector('.categoryTitle').innerText;
        if (selectedCategories.includes(productCategory)) {
            products[i].style.display = "flex";
        } else {
            products[i].style.display = "none";
        }
    }
}

function filterAllergens() {
    const allergenCheckboxes = document.querySelectorAll('.allergen-checkbox:checked');
    const selectedAllergens = Array.from(allergenCheckboxes).map(checkbox => checkbox.value);
    const products = document.getElementsByClassName('product');

    if (selectedAllergens.length === 0) {
        for (let i = 0; i < products.length; i++) {
            products[i].style.display = "flex";
        }
        return;
    }

  for (let i = 0; i < products.length; i++) {
    let productAllergensElement = products[i].querySelector('.allergens');

    // Check if the product has an allergens element
    if (productAllergensElement) {
      let productAllergens = productAllergensElement.innerText;
      let productAllergensArray = productAllergens.split(", ");

      // Check if the product contains any of the selected allergens
      let hasAllergen = selectedAllergens.some(allergen => productAllergensArray.includes(allergen));

      if (hasAllergen) {
        products[i].style.display = "none";
      } else {
        products[i].style.display = "flex";
      }
    } else {
      // If the product doesn't have an allergens element, display it
      products[i].style.display = "flex";
    }
  }
}

function filterPrice() {
  const priceSelector = document.getElementById('priceSelector');
  const selectedPrice = priceSelector.options[priceSelector.selectedIndex].value;

  const productsContainer = document.getElementById('productContainer');
  const products = document.getElementsByClassName('product');

  switch (selectedPrice) {
    case 'lowToHigh':
      const sortedProducts = Array.from(products).sort((a, b) => {
        let priceA = parseFloat(a.querySelector('.price').innerText);
        let priceB = parseFloat(b.querySelector('.price').innerText);
        return priceA - priceB;
      });

      const sortedProductsContainer = document.createElement('div');
      sortedProductsContainer.classList.add('productItemsContainer');
      sortedProducts.forEach(product => {
        sortedProductsContainer.appendChild(product);
      });

      // Clear container before appending sorted products container
      productsContainer.innerHTML = '';
      productsContainer.appendChild(sortedProductsContainer);
      break;

    case 'highToLow':
      const sortedProducts2 = Array.from(products).sort((a, b) => {
        let priceA = parseFloat(a.querySelector('.price').innerText);
        let priceB = parseFloat(b.querySelector('.price').innerText);
        return priceB - priceA;
      });

      const sortedProductsContainer2 = document.createElement('div');
      sortedProductsContainer2.classList.add('productItemsContainer');
      sortedProducts2.forEach(product => {
        sortedProductsContainer2.appendChild(product);
      });

      // Clear container before appending sorted products container
      productsContainer.innerHTML = '';
      productsContainer.appendChild(sortedProductsContainer2);
      break;

    default:
      productsContainer.innerHTML = '';
      createCategoryContainer()
      break;
  }
}

