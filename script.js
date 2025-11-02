const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.globerise.eu/api/v1/auth/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // ✅ Store token for protected routes
      localStorage.setItem("token", data.token);

      message.style.color = "lime";
      message.textContent = "Login successful!";

      // Redirect after login
      setTimeout(() => {
        window.location.href = "GlobalRise/index.html";
      }, 1000);
    } else {
      message.style.color = "red";
      message.textContent = data.message || "Invalid credentials";
    }
  } catch (error) {
    console.error("Error:", error);
    message.style.color = "red";
    message.textContent = "Something went wrong.";
  }
});


