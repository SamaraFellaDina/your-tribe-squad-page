// Function to show the login/register pop-up
function showPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
}

// Function to close the login/register pop-up
function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

// Event listener for the login/register button
document.getElementById("loginButton").addEventListener("click", showPopup);

// Event listener for the close button in the pop-up
document.getElementById("closeButton").addEventListener("click", closePopup);

// Inside the TODO section of script.js

// Function to handle user login
function loginUser() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Read user data from the JSON file (assuming you're using the File System API)
    fetch('/data/users.json')
        .then(response => response.json())
        .then(data => {
            const users = data.users;
            const user = users.find(u => u.username === username);

            if (user && user.password === password) {
                // Set user as logged in
                setLoggedIn(true);

                // Close the pop-up
                closePopup();
            } else {
                alert("Invalid username or password");
            }
        })
        .catch(error => {
            console.error("Error reading users.json:", error);
        });
}

// Function to handle user registration
function registerUser() {
    const newUsername = document.getElementById("registerUsername").value;
    const newPassword = document.getElementById("registerPassword").value;

    // Read user data from the JSON file (assuming you're using the File System API)
    fetch('/data/users.json')
        .then(response => response.json())
        .then(data => {
            const users = data.users;

            // Check if the username is available
            const existingUser = users.find(u => u.username === newUsername);
            if (!existingUser) {
                // Add the new user to the list
                users.push({ username: newUsername, password: newPassword });

                // Update the JSON file with the new user
                return fetch('/data/users.json', {
                    method: 'PUT', // You may need to use 'POST' or 'PATCH' depending on your setup
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                alert("Username already exists");
            }
        })
        .then(() => {
            // Set user as logged in
            setLoggedIn(true);

            // Close the pop-up
            closePopup();
        })
        .catch(error => {
            console.error("Error reading or updating users.json:", error);
        });
}

// Function to set the user as logged in and update the button text
function setLoggedIn(loggedIn) {
    const loginButton = document.getElementById("loginButton");
    if (loggedIn) {
        loginButton.innerText = "Log Out";
        loginButton.removeEventListener("click", showPopup);
        loginButton.addEventListener("click", logoutUser);
    } else {
        loginButton.innerText = "Login/Register";
        loginButton.removeEventListener("click", logoutUser);
        loginButton.addEventListener("click", showPopup);
    }
}

// Function to handle user logout
function logoutUser() {
    // Set user as logged out
    setLoggedIn(false);
}


function enlargeFrame(button) {
    const frame = button.closest('.frame');
    frame.style.position = 'fixed';
    frame.style.top = '0';
    frame.style.left = '0';
    frame.style.width = '80%';
    frame.style.height = '80%';
    frame.style.zIndex = '100';
    button.style.display = 'none';

    // Add an exit button
    const exitButton = document.createElement('button');
    exitButton.innerText = 'Exit';
    exitButton.className = 'exit-button';
    exitButton.onclick = function () {
        frame.style.position = 'static';
        frame.style.width = '15em';
        frame.style.height = '15em';
        frame.style.zIndex = 'auto';
        button.style.display = 'block';
        exitButton.remove();
    };
    frame.appendChild(exitButton);
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}


// Get all iframe containers and their corresponding overlays
const iframeContainers = document.querySelectorAll('.iframe-container');

// Add event listeners to show the overlay on hover
iframeContainers.forEach(container => {
    const iframe = container.querySelector('iframe');
    const overlay = container.querySelector('.iframe-overlay');

    iframe.addEventListener('mouseenter', () => {
        overlay.style.opacity = 0.5; // Adjust the opacity as needed
    });

    iframe.addEventListener('mouseleave', () => {
        overlay.style.opacity = 0; // Make the overlay invisible again
    });
});



const button = document.getElementById("popup-knop");
const overlay = document.getElementById("overlaag");
const popup = document.getElementById("poppup");

button.addEventListener("click", function () {
  overlay.style.display = "block";
  popup.style.display = "block";
});

overlay.addEventListener("click", function () {
  overlay.style.display = "none";
  popup.style.display = "none";
});




