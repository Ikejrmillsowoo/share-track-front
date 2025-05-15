const API_URL = `http://localhost:8080`;


function fetchData() {
  fetch(`${API_URL}/location/item`)
    .then(res => {
      return res.json();
    })
    .then(data => {
            show(data);
    })
    .catch(error => {
      errm = `Error Fetching data : ${error}`
      console.log(errm);
      console.error("CORS error?", errm)
      document.getElementById('posts').innerHTML = errm;
    });
}


function show(data) {
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

  // Put everything together
  cardBody.appendChild(title);
  cardBody.appendChild(model);
  cardBody.appendChild(barCode);
  cardBody.appendChild(location);
  card.appendChild(img);
  card.appendChild(cardBody);
  
  // Add card to container
  container.appendChild(card);

  });

 
}

fetchData();