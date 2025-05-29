import { fetchLocation } from "./location.js";

document.addEventListener("DOMContentLoaded", () => {
    const locationId = localStorage.getItem("locationId");

    if (!locationId) {
        document.getElementById("location-info").textContent = "No location assigned.";
        return;
    }

    fetchLocation(locationId);
});
