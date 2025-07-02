document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    const signInBtn = document.getElementById("signInBtn");
    const signOutBtn = document.getElementById("signOutBtn");

    if (isLoggedIn) {
      signInBtn.style.display = "none";
      signOutBtn.style.display = "inline-block";
    } else {
      signInBtn.style.display = "inline-block";
      signOutBtn.style.display = "none";
    }
  });

  function handleSignOut() {
    const user = localStorage.getItem('currentUser');
    alert(`${user.firstName} have successfully logged out`)
    localStorage.clear(); // or localStorage.removeItem("loggedIn");
    window.location.href = "/html/signin.html";
  }
