const API_URL = `http://localhost:8080`;

const type = document.getElementById("type");
const model = document.getElementById("model");
const barCodeNumber = document.getElementById("barCodeNumber");
const imageUrl = document.getElementById("imageUrl");
const count = document.getElementById("count");
const countAvailable = document.getElementById("countAvailable");
const image = document.getElementById("file");
const locationId = localStorage.getItem("locationId")
console.log(localStorage.getItem("locationId"))


document.getElementById('itemForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const form = e.target;

    const formData = new FormData(form);
    formData.append("locationId", locationId)
  console.log(formData);
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
    })
    .catch(error => {
      console.error("Error posting data:", error);
    });
  });
  
