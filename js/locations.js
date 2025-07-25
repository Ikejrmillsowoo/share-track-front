const API_URL = `http://localhost:8080`;
const userLoginDisplay = document.getElementById("userLoginDisplay")
const userStr = localStorage.getItem("currentUser")
if (userStr) {
  const user = JSON.parse(userStr);
  console.log(user); // should show the user object
  userLoginDisplay.innerText = `${user.firstName}`;
  userLoginDisplay.style.textTransform = "capitalize"
} else {
  userLoginDisplay.innerText = "";
}

function fetchData() {
  fetch(`${API_URL}/location`)
    .then(res => {
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
  const container = document.getElementById('container');
  
  //console.log('Data:', data);

  data.map(function (location) {
    console.log('Location:', location);
  

    const card = document.createElement('div')
    card.className = 'card m-3 bg-light'
    card.style.width = '18rem';

    const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
    //create location title
  const title = document.createElement('h5');
  title.className = 'card-title';
  title.innerHTML = `<a href="./location.html?id=${location.id}" class="text-decoration-none">${location.name}</a>`;

 // create body for addressess
 const street = document.createElement('p');
 street.className = 'card-text';
 street.innerText = `Address: ${location.addressStreet}`;

  const city = document.createElement('p');
  city.className = 'card-text';
  city.innerText = `City: ${location.addressCity}`;

  const state = document.createElement('p');
  state.className = 'card-text';
  state.innerText = `State: ${location.addressState}`;

  const zip = document.createElement('p');
  zip.className = 'card-text';
  zip.innerText = `ZipCode: ${location.addressZip}`;

  
    cardBody.appendChild(title);
    cardBody.appendChild(street);
    cardBody.appendChild(city);
    cardBody.appendChild(state);
    cardBody.appendChild(zip);
    card.appendChild(cardBody);
    container.appendChild(card);
  });


}

fetchData();