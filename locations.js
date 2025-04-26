const API_URL = `http://localhost:8080`;


function fetchData() {
  fetch(`${API_URL}/location`)
    .then(res => {
      //let resstr = res.json();
      //console.log("res is ", resstr);
      return res.json();
    })
    .then(data => {
        console.log(data);
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
  const ul = document.getElementById('items');
  const list = document.createDocumentFragment();
  //console.log('Data:', data);

  data.map(function (location) {
    console.log('Locations:', location);
    let li = document.createElement('li');
    let title = document.createElement('h3');
    let street = document.createElement('p');
    let city = document.createElement('p');
    let state = document.createElement('p');
    let zip = document.createElement('p');
    //let image = document.createElement('img');
    //let by = document.createElement('p');
    title.innerHTML = `<a href="./location.html?id=${location.id}">${location.name}</a>`;
     street.innerHTML = `Address: ${location.addressStreet}`;
     city.innerHTML = `City: ${location.addressCity}`;
     state.innerHTML = `State: ${location.addressState}`;
     zip.innerHTML = `ZipCode: ${location.addressZip}`;
    //  by.innerHTML = `${item.barCodeNumber} - ${item.locationId}`;
    //  image.innerHTML = `${item.imageUrl}`

    li.appendChild(title);
    li.appendChild(street);
    li.appendChild(city);
    li.appendChild(state);
    li.appendChild(zip);
    //li.appendChild(by);
    //li.appendChild(image)
    list.appendChild(li);
  });

  ul.appendChild(list);
  ul.style.listStyleType = 'none';
}

fetchData();