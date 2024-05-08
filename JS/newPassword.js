
async function initializePasswordReset(email) {
  const response = await fetch('http://10.120.32.75/app/api/v1/auth/forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });
  if (!response.ok) {
    console.error('Failed to initialize password reset:', response);
  }

  const responseData = await response.json();
  const resetLink = responseData.resetLink;

console.log('Password reset link:', resetLink);

  // Redirect the user to the password reset page
  window.location.href = `resetPassword.html?resetLink=${resetLink}`;
}

document.addEventListener('DOMContentLoaded', function() {
  const resetForm = document.getElementById('reset-password');

  resetForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the email input value
    const emailInput = document.getElementById('email');
    const email = emailInput.value;

    // Validate the email format (you can add more sophisticated validation if needed)
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    //console.log('Reset email:', email);
    // Initialize the password reset process
    initializePasswordReset(email);

  });
});


function isValidEmail(email) {
  // Regular expression for basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

