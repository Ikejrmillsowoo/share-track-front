const API_URL = `http://localhost:8080`;

const type = document.getElementById("type");
const model = document.getElementById("model");
const barCodeNumber = document.getElementById("barCodeNumber");
const imageUrl = document.getElementById("imageUrl");
const count = document.getElementById("count");
const countAvailable = document.getElementById("countAvailable");


document.getElementById('itemForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
  
    fetch(`${API_URL}/location/item/add`, {
      method: 'POST',
      body: formData
    })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log("Success:", data);
      show(data); // Optional: show data on page
    })
    .catch(error => {
      console.error("Error posting data:", error);
      document.getElementById('posts').innerText = `Error: ${error.message}`;
    });
  });
  
// function fetchData() {
//     const postData = {
//         // Replace with your actual data structure
//         type: `${type}`,
//         model: `${model}`,
//         barCodeNumber: `${barCodeNumber}`,
//         locationId: 1
//     };

//     fetch(`${API_URL}/location/item/add`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(postData)
//     })
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error(`HTTP error! status: ${res.status}`);
//             }
//             return res.json();
//         })
//         .then(data => {
//             console.log("Success:", data);
//             show(data); // Assuming you have a `show()` function
//         })
//         .catch(error => {
//             const errm = `Error posting data: ${error}`;
//             console.error("CORS or server error?", errm);
//             document.getElementById('posts').innerHTML = errm;
//         });
// }
