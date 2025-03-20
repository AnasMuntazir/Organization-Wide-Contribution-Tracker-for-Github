// Toggle Password Visibility
function togglePassword(inputId) {
    let inputField = document.getElementById(inputId);
    if (inputField.type === "password") {
        inputField.type = "text";
    } else {
        inputField.type = "password";
    }
}

// Form Validation
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match! Please try again.");
        return;
    }

    alert(`Welcome, ${fullName}! Your account has been created successfully.`);
    window.location.href = "login\login.html"; // Redirect to login page
});
