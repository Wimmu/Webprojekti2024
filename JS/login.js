document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const loginButton = document.getElementById('login-button');

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Here you would typically send the username and password to a server for authentication
    // For this example, let's assume a hardcoded username and password for simplicity
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'password';

    if (username === hardcodedUsername && password === hardcodedPassword) {
      // Successful login
      alert('Login successful!');
      // Redirect to another page or perform any other action
    } else {
      // Failed login
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = 'Incorrect username or password';
    }
  });
});
