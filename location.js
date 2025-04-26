const API_URL = `http://localhost:8080`;

function fetchLocation(locationid) {
    fetch(`${API_URL}/location/${locationid}`)
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
            console.error("CORS error?", errm)
            document.getElementById('posts').innerHTML = 'Error Loading Single Item Data';
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

function showLocationDetail(location) {
    // the data parameter will be a JS array of JS objects
    // this uses a combination of "HTML building" DOM methods (the document createElements) and
    // simple string interpolation (see the 'a' tag on title)
    // both are valid ways of building the html.
    const ul = document.getElementById('location');
    const detail = document.createDocumentFragment();

    console.log('ItemLocation:', location);
    let li = document.createElement('div');
    let title = document.createElement('h3');
    let street = document.createElement('p');
    let city = document.createElement('p');
    let state = document.createElement('p');
    let zip = document.createElement('p');
    //let image = document.createElement('img');
    //let by = document.createElement('p');
    //title.innerHTML = `here = <a href="./location.html?id=${location.id}">${location.name}</a>`;
    title.innerHTML = `Type: ${location.name}`;
    console.log(title)
     street.innerHTML = `Address: ${location.addressStreet}`;
     city.innerHTML = `City: ${location.addressCity}`;
     state.innerHTML = `State: ${location.addressState}`;
     zip.innerHTML = `ZipCode: ${location.addressZip}`;
    //by.innerHTML = `${post.created} - ${post.id}`;
    // http://localhost:8080/api/piros/5/image
    li.appendChild(title);
    li.appendChild(street);
    li.appendChild(city);
    li.appendChild(state);
    li.appendChild(zip);
    
    // li.appendChild(by);
    detail.appendChild(li);

    ul.appendChild(detail);
}

function handlePage() {
    let locationid = parseLocationId();
    console.log('locationid: ', locationid);

    if (locationid != null) {
        console.log('found a locationid');
        fetchLocation(locationid);
    }
}

handlePage();