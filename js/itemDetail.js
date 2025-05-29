const API_URL = `http://localhost:8080`;

function fetchItem(itemid) {
    fetch(`${API_URL}/location/item/${itemid}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            showItemDetail(data);
            console.log(data)
        })
        .catch(error => {
            console.log(`Error Fetching data : ${error}`);
            console.error("CORS error?", errm)
            document.getElementById('posts').innerHTML = 'Error Loading Single Item Data';
        });
}

function parseItemId() {
    try {
        var url_string = window.location.href.toLowerCase();
        console.log(url_string)
        var url = new URL(url_string);
        var itemid = url.searchParams.get('id');
        return itemid;
    } catch (err) {
        console.log("Issues with Parsing URL Parameter's - " + err);
        return '0';
    }
}


function showItemDetail(post) {
    // the data parameter will be a JS array of JS objects
    // this uses a combination of "HTML building" DOM methods (the document createElements) and
    // simple string interpolation (see the 'a' tag on title)
    // both are valid ways of building the html.
    const ul = document.getElementById('post');
    const detail = document.createDocumentFragment();    

    ul.className = 'container';
    ul.style.width = '500px';
    ul.style.marginTop = '50px';


    console.log('Item:', post);
    let li = document.createElement('div');
    let title = document.getElementById('heading');
    let body = document.createElement('p');
    let barCode = document.createElement('p');
    let location = document.createElement('p');
    let count = document.createElement('p');
    let availableCount = document.createElement('p');
    let img = document.createElement('img');
    body.classList.add('bodyItem')
    barCode.classList.add('bodyItem')
    location.classList.add('bodyItem')
    count.classList.add('bodyItem')
    availableCount.classList.add('bodyItem')
   
    
    title.innerHTML = `${post.type}`;
    body.innerHTML = `<strong>Model:</strong> ${post.model}`;
    barCode.innerHTML = `<strong>Bar Code:</strong> ${post.barCodeNumber}`;
    location.innerHTML = `<strong>Location:</strong> ${post.locationId}`;
    count.innerHTML = `<strong>Count:</strong> ${post.count}`;
    availableCount.innerHTML = `<strong>Current Available:</strong> ${post.countAvailable}`;

   
    img.src = `${post.imageUrl}`;
    img.width = 500;
    img.height = 500;
  
    li.appendChild(img);
    li.appendChild(body);
    li.appendChild(barCode);
    li.appendChild(location);
    li.appendChild(count);
    li.appendChild(availableCount);
    
   
    detail.appendChild(li);
   
    ul.appendChild(detail);
    
}

function handlePage() {
    let itemid = parseItemId();
    console.log('itemId: ', itemid);

    if (itemid != null) {
        console.log('found a itemId');
        fetchItem(itemid);
    }
}

handlePage();