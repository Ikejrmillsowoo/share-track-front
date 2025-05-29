const API_URL = `http://localhost:8080`;

export function fetchLocation(locationid) {
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

export function fetchLocationName(locationid) {
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

   // add to cart
   const addToCart = document.createElement('p');
   location.className = 'btn btn-success add-to-cart';
   location.innerText = `Add To Cart`;

  // Put everything together
  cardBody.appendChild(title);
  cardBody.appendChild(model);
  cardBody.appendChild(barCode);
  cardBody.appendChild(location);
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