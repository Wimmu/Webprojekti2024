export async function login(username, password) {
  const response = await fetch('http://localhost:3000/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const { user, token } = await response.json();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    //console.log('user', user);
    //console.log('token', token);
    window.location.href = 'index.html';
  } else {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = 'Incorrect username or password';
  }
}

async function getLoginParams(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username || !password) {
    alert('Please fill in all fields');
    return;
  }

  await login(username, password);
}

function showToast(message) {
  // Create toast element
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = message;

  // Add toast to body
  document.body.appendChild(toast);

  // Show toast
  toast.className = 'show';

  // After 3 seconds, remove the show class from toast
  setTimeout(function(){
    toast.className = toast.className.replace('show', '');
    // After the toast has disappeared, redirect to login page
    setTimeout(function() {
      window.location.href = 'login.html';
    }, 500);
  }, 3000);

  // After the toast has disappeared, remove it from the DOM
  setTimeout(function(){
    document.body.removeChild(toast);
  }, 3500);
}


function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Get the message from the URL
const message = getParameterByName('message');

// Display the message
if (message) {
  showToast(message); // You can use other methods to display the message, such as a modal
}

document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('login-button');
  loginButton.addEventListener('click', getLoginParams);
});
