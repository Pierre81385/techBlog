function signup(event) {
  event.preventDefault();

  const username = document.querySelector("#signupUsername").value;
  const password = document.querySelector("#signupPassword").value;

  console.log("captured " + username + " " + password);
}

document.querySelector("#signupForm").addEventListener("submit", signup);
