const loginForm = document.getElementById("loginForm");
const messageDiv = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const loginData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    try {
        const response = await fetch("http://localhost:8080/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const user = await response.json();
            messageDiv.innerHTML = `<div class="alert alert-success">Welcome, ${user.firstName}!</div>`;

            // Store user data if needed
            localStorage.setItem("currentUser", JSON.stringify(user));
            

            //Redirect based on use locationId
            setTimeout(async () => {

                // Redirect to dashboard or homepage
                window.location.href = "locations.html"; // You can change this page
            }, 1000);

        } else {
            const errorText = await response.text();
            messageDiv.innerHTML = `<div class="alert alert-danger">${errorText}</div>`;
        }

    } catch (error) {
        console.error("Login error:", error);
        messageDiv.innerHTML = `<div class="alert alert-danger">Login failed. Please try again.</div>`;
    }
});