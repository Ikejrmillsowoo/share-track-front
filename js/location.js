import { addItemToCart } from "./addItemToCart.js";

const API_URL = `http://localhost:8080`;

 function fetchLocation(locationid) {
    fetch(`${API_URL}/location/item/id/${locationid}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            showLocationDetail(data);   
            console.log(data)
        })
        .catch(error => {
            console.log(`Error Fetching data : ${error}`);
            console.error("CORS error?", error)
            document.getElementById('posts').innerHTML = 'Error Loading Items Data';
        });
}
// console.log(localStorage.getItem(user))
 function fetchLocationName(locationid) {
    fetch(`${API_URL}/location/${locationid}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            showLocationName(data);
            console.log(data)
        })
        .catch(error => {
            console.log(`Error Fetching data : ${error}`);
            console.error("CORS error?", error)
            document.getElementById('posts').innerHTML = 'Error Loading Items Data';
        });
}

function parseLocationId() {
    try {
        var url_string = window.location.href.toLowerCase();
        console.log(url_string)
        var url = new URL(url_string);
        console.log(url.searchParams.get('id'))
        var locationid = url.searchParams.get('id');
        console.log(locationid)
        return locationid;
    } catch (err) {
        console.log("Issues with Parsing URL Parameter's - " + err);
        return '0';
    }
}

function showLocationName(data){
    const heading = document.getElementById('heading')

    heading.innerHTML = data.name;
}

function showLocationDetail(data) {
    // the data parameter will be a JS array of JS objects
    
    const container = document.getElementById('container');
  
  
  console.log('Data:', data);

  data.map(function (item) {
    console.log('Item:', item);
  
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

   // Count available text
  const countAvailable = document.createElement('p');
  countAvailable.className = 'card-text';
  countAvailable.innerText = `Count: ${item.countAvailable}`;

   // add to cart
   const addToCart = document.createElement('p');
   addToCart.className = 'btn btn-success add-to-cart';
   addToCart.innerText = `Add To Cart`;

   // Add click even listener
    addToCart.addEventListener('click', function() {
        addItemToCart(item)
        const user = localStorage.getItem('currentUser');
        if (!user) {
            alert('Please log in to add items to the cart.');
            return; 
        }
        //  console.log(`Adding ${item.type} ${user} to cart`);
        //  console.log(`Item: ${item.id}`)
        //  console.log(`ItemCount: 1`)
         // Here you can implement the logic to add the item to the cart
         // For example, you could call a function to handle adding the item
         // addToCartFunction(item.id);
    });

  // Put everything together
  cardBody.appendChild(title);
  cardBody.appendChild(model);
  cardBody.appendChild(barCode);
  cardBody.appendChild(location);
  cardBody.appendChild(countAvailable);
  cardBody.appendChild(addToCart);
  card.appendChild(img);
  card.appendChild(cardBody);
  
  // Add card to container
  container.appendChild(card);
  
  });
}

function handlePage() {
    let locationid = parseLocationId();
    console.log('locationid: ', locationid);

    if (locationid != null) {
        console.log('found a locationid');
        fetchLocation(locationid);
        fetchLocationName(locationid);
    }
}

handlePage();