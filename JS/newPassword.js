document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('reset-password');
  const resetButton = document.getElementById('reset-button');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve form input values
    const email = document.getElementById('email').value;

    // Validation
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    // Assuming successful validation, send a reset password email
    // Here you can implement your logic to send the reset password email
    sendResetPasswordEmail(email);

    // Optionally, you can display a success message or redirect the user to another page
    alert('Reset password email sent successfully!');
    // Redirect the user to another page if needed
    // window.location.href = 'reset-password-success.html';

    // Optionally, you can reset the form after submission
    form.reset();
  });

  function sendResetPasswordEmail(email) {
    // Here you can implement your logic to send the reset password email
    // This is a placeholder function
    console.log('Sending reset password email to:', email);
  }
});
