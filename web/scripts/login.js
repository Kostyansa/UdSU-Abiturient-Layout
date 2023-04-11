document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const registerButton = document.querySelector(".login-container .register");
    const registerPopup = document.querySelector(".register-popup");
    const registrationFinishedPopup = document.querySelector(".registration-finished-popup");
    const closeButtons = document.querySelectorAll(".popup .close");
    const greyout = document.createElement("div");
    greyout.className = "greyout";
    document.body.appendChild(greyout);
  
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      login();
    });
  
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      register();
    });
  
    registerButton.addEventListener("click", function () {
      showPopup(registerPopup);
    });
  
    closeButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        hidePopup(registerPopup);
        hidePopup(registrationFinishedPopup);
      });
    });
  
    function login() {
      // Add your login request code here
      console.log("Login request");
    }
  
    function register() {
      // Add your registration request code here
      console.log("Registration request");
  
      // Show the registration finished popup
      hidePopup(registerPopup);
      showPopup(registrationFinishedPopup);
    }
  
    function showPopup(popup) {
      greyout.style.display = "block";
      popup.style.display = "block";
    }
  
    function hidePopup(popup) {
      greyout.style.display = "none";
      popup.style.display = "none";
    }
  });
  