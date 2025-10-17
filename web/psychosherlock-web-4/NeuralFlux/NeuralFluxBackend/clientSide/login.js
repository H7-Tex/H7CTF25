// Admin Login Functionality
const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");
const loginError = document.getElementById("loginError");
const loginSuccess = document.getElementById("loginSuccess");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Required header for API calls
const REQUIRED_HEADER_KEY = "X-NEURALEND-KEY";
const REQUIRED_HEADER_VALUE = "97b213d150a41128ae4123500d506d6422613feef8";

// API endpoint
const API_URL =
  "/NeuralFluxCorpAdministrationProtectedEndpoint/api/admin/login";

// Show error message
function showError(message) {
  loginError.textContent = message;
  loginError.classList.add("show");
  loginSuccess.classList.remove("show");

  setTimeout(() => {
    loginError.classList.remove("show");
  }, 5000);
}

// Show success message
function showSuccess(message) {
  loginSuccess.textContent = message;
  loginSuccess.classList.add("show");
  loginError.classList.remove("show");
}

// Handle login form submission
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form data
  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  // Validate inputs
  if (!username || !password) {
    showError("Please enter both username and password");
    return;
  }

  // Disable button during request
  loginButton.disabled = true;
  loginButton.textContent = "Signing in...";

  try {
    // Make API request
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [REQUIRED_HEADER_KEY]: REQUIRED_HEADER_VALUE,
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Login successful
      showSuccess("Login successful! Redirecting...");

      // Store token in localStorage
      localStorage.setItem("adminToken", data.token);

      // Redirect to admin dashboard after 1.5 seconds
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    } else {
      // Login failed
      if (response.status === 429) {
        // Account locked
        const retryAfter = data.retry_after_seconds || 60;
        showError(`Account locked. Please try again in ${retryAfter} seconds.`);
      } else if (response.status === 401) {
        // Invalid credentials
        const attemptsRemaining =
          data.attempts_remaining !== undefined
            ? data.attempts_remaining
            : "unknown";
        if (attemptsRemaining === 0) {
          showError(
            data.error || "Account locked due to multiple failed attempts."
          );
        } else {
          showError(
            `Invalid credentials. ${attemptsRemaining} attempts remaining.`
          );
        }
      } else {
        // Other error
        showError(data.error || "Login failed. Please try again.");
      }
    }
  } catch (error) {
    console.error("Login error:", error);
    showError("Network error. Please check your connection and try again.");
  } finally {
    // Re-enable button
    loginButton.disabled = false;
    loginButton.textContent = "Sign In";
  }
});

// Check if user is already logged in
function checkLoginStatus() {
  const token = localStorage.getItem("adminToken");

  if (token) {
    // You can verify the token here if needed
    // For now, just redirect to dashboard
    // window.location.href = 'admin-dashboard.html';
  }
}

// Run on page load
checkLoginStatus();
