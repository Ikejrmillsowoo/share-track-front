const API_URL = `http://localhost:8080`;

function fetchLocation(locationid) {
    fetch(`${API_URL}/location/item/id/${locationid}`)
        .then(res => {
            //console.log("res is ", Object.prototype.toString.call(res));
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

function fetchLocationName(locationid) {
    fetch(`${API_URL}/location/${locationid}`)
        .then(res => {
            //console.log("res is ", Object.prototype.toString.call(res));
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
// takes a UNIX integer date, and produces a prettier human string
// function dateOf(date) {
//     const milliseconds = date * 1000; // 1575909015000
//     const dateObject = new Date(milliseconds);
//     const humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
//     return humanDateFormat;
// }
function showLocationName(data){
    const heading = document.getElementById('heading')

    heading.innerHTML = data.name;
}

function showLocationDetail(data) {
    // the data parameter will be a JS array of JS objects
    // this uses a combination of "HTML building" DOM methods (the document createElements) and
    // simple string interpolation (see the 'a' tag on title)
    // both are valid ways of building the html.
    // const ul = document.getElementById('location');
    // const detail = document.createDocumentFragment();
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


    // console.log('ItemLocation:', location);
    // let li = document.createElement('div');
    // let title = document.createElement('h3');
    // let street = document.createElement('p');
    // let city = document.createElement('p');
    // let state = document.createElement('p');
    // let zip = document.createElement('p');
    //let image = document.createElement('img');
    //let by = document.createElement('p');
    //title.innerHTML = `here = <a href="./location.html?id=${location.id}">${location.name}</a>`;
    // title.innerHTML = `Type: ${location.name}`;
    // console.log(title)
    //  street.innerHTML = `Address: ${location.addressStreet}`;
    //  city.innerHTML = `City: ${location.addressCity}`;
    //  state.innerHTML = `State: ${location.addressState}`;
    //  zip.innerHTML = `ZipCode: ${location.addressZip}`;
    //by.innerHTML = `${post.created} - ${post.id}`;
    // http://localhost:8080/api/piros/5/image
    // li.appendChild(title);
    // li.appendChild(street);
    // li.appendChild(city);
    // li.appendChild(state);
    // li.appendChild(zip);
    
    // li.appendChild(by);
    // detail.appendChild(li);

    // ul.appendChild(detail);
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