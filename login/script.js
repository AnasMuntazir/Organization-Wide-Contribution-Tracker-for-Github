document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "password123") {
        alert("Login Successful!");
        window.location.href = "home\index.html"; // Redirect to dashboard
    } else {
        alert("Invalid Username or Password. Try again.");
    }
});
