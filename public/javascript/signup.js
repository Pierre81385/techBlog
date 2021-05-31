async function signup(event) {
  event.preventDefault();

  const username = document.querySelector("#signupUsername").value;
  const password = document.querySelector("#signupPassword").value;

  console.log("captured " + username + " " + password);

  if (username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      console.log("Signup Failed");
    }
  }
}

document.querySelector("#signupForm").addEventListener("submit", signup);
