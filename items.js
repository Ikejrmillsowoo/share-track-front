const API_URL = `http://localhost:8080`;


function fetchData() {
  fetch(`${API_URL}/location/item`)
    .then(res => {
      //let resstr = res.json();
      //console.log("res is ", resstr);
      return res.json();
    })
    .then(data => {
        //console.log(data);
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
  // the data parameter will be a JS array of JS objects
  // this uses a combination of "HTML building" DOM methods (the document createElements) and
  // simple string interpolation (see the 'a' tag on title)
  // both are valid ways of building the html.
  const container = document.getElementById('container');
  // const list = document.createDocumentFragment();
  // let title = document.getElementById('title')
  // let img = document.getElementById('img');
  // let model = document.getElementById('model');
  // let barCode = document.getElementById('barCode');
  // let location = document.getElementById('location');
  
  console.log('Data:', data);

  data.map(function (item) {
    console.log('Item:', item);
    // let li = document.createElement('li');
    // let title = document.createElement('h3');
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

    // title.innerHTML = `<a href="./itemDetail.html?id=${item.id}">${item.type}</a>`;
    // model.innerHTML = item.model;
    // barCode.innerHTML = item.barCode;
    // location.innerHTML = item.locationId;
    // img.createElement('img')
    // img.src = item.imageUrl;
    // let body = document.createElement('p');
    // let image = document.createElement('img');
    // let barCode = document.createElement('p');
    // let location = document.createElement('p');
   // title.innerHTML = `<a href="./itemDetail.html?id=${item.id}">${item.type}</a>`;
    // body.innerHTML = `Model Number: ${item.model}`;
    // barCode.innerHTML = `Baer Code: ${item.barCodeNumber}`;
    // location.innerHTML = `Current Location: ${item.locationId}`;
    // image.src = `${item.imageUrl}`;
    // image.width = 300;
    // image.height = 300;


    
    // li.appendChild(image)
    // li.appendChild(title);
    // li.appendChild(body);
    // li.appendChild(barCode);
    // li.appendChild(location);
    // list.appendChild(li);
  });

  // ul.appendChild(list);
  // ul.style.listStyleType = 'none';
}

fetchData();