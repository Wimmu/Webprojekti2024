document.addEventListener('DOMContentLoaded', function() {
  const loginLink = document.getElementById('login');
  const logoutLink = document.getElementById('logout');
  const profileLink = document.getElementById('profile');
  const shoppingCartLink = document.getElementById('shoppingCart');

  // Check if user is logged in
  const token = localStorage.getItem('token');
  //console.log('token', token);
  if (token) {
    // User is logged in, show profile, logout, and shopping cart links
    loginLink.style.display = 'none'; // Hide login link
    logoutLink.style.display = 'block';
    profileLink.style.display = 'block';
    shoppingCartLink.style.display = 'block';
  } else {
    // User is not logged in, show only login link
    loginLink.style.display = 'block';
    logoutLink.style.display = 'none';
    profileLink.style.display = 'none';
    shoppingCartLink.style.display = 'none';
  }

  // Add event listener to logout link
  logoutLink.addEventListener('click', function(event) {
    event.preventDefault();
    logout();
  });
});

// Logout function
function logout() {
  // Clear the user's session or token
  localStorage.removeItem('token');

  // Redirect the user to the login page or perform any other necessary actions
  window.location.href = 'index.html';
}
