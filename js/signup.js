const registerForm = document.getElementById("registerForm");
const messageDiv = document.getElementById("message");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        userRole: document.getElementById("userRole").value,
        locationId: parseInt(document.getElementById("locationId").value)
    };

    try {
        const response = await fetch("http://localhost:8080/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const data = await response.json();
            messageDiv.innerHTML = `<div class="alert alert-success">User ${data.username} registered successfully!</div>`;
            setTimeout(() => {
                window.location.href = "login.html";  // change path if needed
            }, 1000); // 2-second delay for feedback
            registerForm.reset();
        } else {
            const errorText = await response.text();
            messageDiv.innerHTML = `<div class="alert alert-danger">${errorText}</div>`;
        }
    } catch (error) {
        console.error("Error:", error);
        messageDiv.innerHTML = `<div class="alert alert-danger">Registration failed. Try again.</div>`;
    }
});