const API_URL = `http://localhost:8080`;
const userId = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")).id : null;

document.addEventListener("DOMContentLoaded", function () {
  fetchCartWithItems();
});


async function fetchCartWithItems() {
    console.log("Fetching carts for user ID:", userId);
  try {
    const response = await fetch(`${API_URL}/cart/user/${userId}`); // Adjust endpoint as needed
    if (!response.ok) {
      throw new Error('Failed to fetch carts');
    }
    const cart = await response.json();
    // carts should be an array of cart objects, each with an 'items' property
    showCartItems(cart.cartItems); // Assuming cartItems is the property containing the items
    console.log(cart.cartItems);
  } catch (error) {
    console.error('Error fetching carts:', error);
    return [];
  }
}

function showCartItems(data) {
  const cartContainer = document.getElementById('cartContainer');
  
  
  console.log('Data:', data);

  data.map(function (itemData) {
    console.log('ItemData:', itemData.item);
    const item = itemData.item; // Assuming itemData has an 'item' property containing the item details
  
    //create a card div
    const card = document.createElement('div')
    card.className = 'card m-3 bg-light'
    card.style.width = '18rem'; //can change this it optional

    // Create image
    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = item.imageUrl;
    img.alt = item.type;
    
   // Create card body
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  
  // Title with link
  const title = document.createElement('h5');
  title.className = 'card-title';
  title.innerHTML = `<a href="./itemDetail.html?id=${item.id}" class="text-decoration-none">${item.type}</a>`;

  // Model text
  const model = document.createElement('p');
  model.className = 'card-text';
  model.innerText = `Model: ${item.model}`;
  
  // Barcode text
  const barCode = document.createElement('p');
  barCode.className = 'card-text';
  barCode.innerText = `Barcode: ${item.barCodeNumber}`;
  
  // Location text
  const location = document.createElement('p');
  location.className = 'card-text';
  location.innerText = `Location ID: ${item.locationId}`;

  // Location text
  const homeLocationId = document.createElement('p');
  homeLocationId.className = 'card-text';
  homeLocationId.innerText = `Current Location ID: ${item.homeLocationId}`;

  // Put everything together
  cardBody.appendChild(title);
  cardBody.appendChild(model);
  cardBody.appendChild(barCode);
  cardBody.appendChild(location);
  cardBody.appendChild(homeLocationId);
  cardBody.appendChild(homeLocationId);
  cardBody.appendChild(homeLocationId);
  cardBody.appendChild(homeLocationId);
  cardBody.appendChild(homeLocationId);
  cardBody.appendChild(homeLocationId);
  cardBody.appendChild(homeLocationId);
  cardBody.appendChild(homeLocationId);
  cardBody.appendChild(homeLocationId);
  cardBody.appendChild(homeLocationId);
  cardBody.appendChild(homeLocationId);
  cardBody.appendChild(homeLocationId);
  card.appendChild(img);
  card.appendChild(cardBody);
  
  // Add card to container
  cartContainer.appendChild(card);

  });

 
}

