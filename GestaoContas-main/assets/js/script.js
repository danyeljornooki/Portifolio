// login

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("errorMessage");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = usernameInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim().toLowerCase();

        if (username === "admin" && password === "admin") {
            window.location.href = "home.html";
        } else {
            errorMessage.textContent = "Dados inválidos";
        }
    });
});

// home

