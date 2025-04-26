const API_URL = `http://localhost:8080`;

function fetchItem(itemid) {
    fetch(`${API_URL}/location/item/${itemid}`)
        .then(res => {
            //console.log("res is ", Object.prototype.toString.call(res));
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
// takes a UNIX integer date, and produces a prettier human string
// function dateOf(date) {
//     const milliseconds = date * 1000; // 1575909015000
//     const dateObject = new Date(milliseconds);
//     const humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
//     return humanDateFormat;
// }

function showItemDetail(post) {
    // the data parameter will be a JS array of JS objects
    // this uses a combination of "HTML building" DOM methods (the document createElements) and
    // simple string interpolation (see the 'a' tag on title)
    // both are valid ways of building the html.
    const ul = document.getElementById('post');
    const detail = document.createDocumentFragment();

    console.log('Item:', post);
    let li = document.createElement('div');
    let title = document.createElement('h2');
    let body = document.createElement('p');
    let barCode = document.createElement('p');
    let location = document.createElement('p');
    let img = document.createElement('img');
    title.innerHTML = `Type: ${post.type}`;
    // title.body.style.display = 'flex';
    // title.body.style.justifyContent = 'center';
    // title.body.style.alignItems = 'center';
    body.innerHTML = `Model: ${post.model}`;
    barCode.innerHTML = `BarCode: ${post.barCodeNumber}`;
    location.innerHTML = `Locaton: ${post.locationId}`;

   
    //img.innerHTML = `<img src="http://localhost:8080/location/1/item/${image.id}" alt="image" width="300" height="300">`;
    img.src = `${post.imageUrl}`;
    img.width = 300;
    img.height = 300;
    //by.innerHTML = `${post.created} - ${post.id}`;
    // http://localhost:8080/api/piros/5/image
    li.appendChild(title);
    li.appendChild(img);
    li.appendChild(body);
    li.appendChild(barCode);
    li.appendChild(location);
    
    // li.appendChild(by);
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