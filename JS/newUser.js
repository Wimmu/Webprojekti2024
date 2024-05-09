import { login } from './login.js';

async function fetchUsernames(username) {
  try {
    const response = await fetch(`https://10.120.32.75/app/api/v1/users/${username}`);
    if (response.status === 404) {
      return false; // Username does not exist
    }
    const data = await response.json();
    return !!data; // Return true if user exists, false otherwise
  } catch (error) {
    console.error('Error fetching usernames:', error);
    return false; // Return false in case of an error
  }
}

async function fetchEmails(email) {
  try {
    const response = await fetch(`https://10.120.32.75/app/api/v1/users/${email}`);
    if (response.status === 404) {
      return false; // Email does not exist
    }
    const data = await response.json();
    return !!data; // Return true if email exists, false otherwise
  } catch (error) {
    console.error('Error fetching emails:', error);
    return false; // Return false in case of an error
  }

}

async function postUser(user)  {
  try {
    const response = await fetch('https://10.120.32.75/app/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error posting user:', error);
  }
}

function displayValidationErrors(errors) {
  const errorMessageContainer = document.getElementById('error-message');
  // Clear previous error messages
  errorMessageContainer.innerHTML = '';

  // Loop through errors and display them
  errors.forEach(error => {
    const errorElement = document.createElement('div');
    errorElement.textContent = error.msg;
    errorMessageContainer.appendChild(errorElement);
  });
}

//connect an API from the front end to the back end
async function createUser() {
   const username = document.getElementById('username').value;
   const password = document.getElementById('password').value;
   const confirmPassword = document.getElementById('checkPassword').value;
   const first_name = document.getElementById('firstName').value;
   const last_name = document.getElementById('lastName').value;
   const address = document.getElementById('address').value;
   const email = document.getElementById('email').value;
   const phone = document.getElementById('phone').value;

   if (!username || !password || !confirmPassword || !first_name || !last_name || !address || !email || !phone) {
     alert('Please fill in all fields');
     return;
   }

   if (username.length < 1 || username.includes('@')) {
      alert('Username must be at least 1 character and cannot contain @ symbol ');
      return;
   }

   if (password.length < 6) {
     alert('Password must be at least 6 characters');
     return;
   }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

   if (first_name.length < 2) {
      alert('First name must be at least 2 characters');
      return;
   }

    if (last_name.length < 2) {
      alert('Last name must be at least 2 characters');
      return;
    }

   if (!email.includes('@')) {
      alert('Invalid email');
      return;
   }

  const usernameExists = await fetchUsernames(username);
  if (usernameExists) {
    alert('Username already exists');
    return;
  }

   const emailExists = await fetchEmails(email);
    if (emailExists) {
      alert('Email already exists');
      return;
    }

   const user = {
     username,
     password,
     first_name,
     last_name,
     address,
     email,
     phone
   }

   //console.log(user);

   const newUser = await postUser(user);
   console.log(newUser);

   if (newUser) {
      await login(username, password);
      console.log('User created and logged in');
   }
}


document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('user-form'); // Select the form element

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Call the createUser function when the form is submitted
    createUser();
  });
});
