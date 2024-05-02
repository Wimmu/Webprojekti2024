document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('user-form'); // Select the form element

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Call the createUser function when the form is submitted
    createUser();
  });
});

//conect an API from the front end to the back end
async function createUser() {
  try {

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

    if (password !== confirmPassword) {
      alert('Passwords do not match');
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

    console.log(user);

    const response = await fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}
