async function resetPassword(user_Id, token, newPassword) {
  const response = await fetch(`http://10.120.32.75/app/api/v1/auth/reset-password/${user_Id}/${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ newPassword })
  });
  if (!response.ok) {
    console.error('Failed to reset password:', response);
  }

  const responseData = await response.json();
  console.log('Password reset:', responseData);
}

document.addEventListener('DOMContentLoaded', function() {
  const tokenForm = document.getElementById('newPassword-form');

  tokenForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const urlParams = new URLSearchParams(window.location.search);
    const resetLink = urlParams.get('resetLink');

    // Extracting userId and token from resetLink
    const [userId, token] = resetLink.split('/').slice(-2);

    // Get the new password input value
    const newPasswordInput = document.getElementById('new-password');
    const newPassword = newPasswordInput.value;

    // Get the confirm new password input value
    const confirmPasswordInput = document.getElementById('checkNewPassword');
    const confirmPassword = confirmPasswordInput.value;

    if (newPassword.trim() === '' || confirmPassword.trim() === '') {
      alert('Please enter and confirm your new password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('The new password and confirm new password must match.');
      return;
    }

    const result = resetPassword(userId, token, newPassword);

    //console.log('Password reset result:', result);

    window.location.href = 'login.html';
  });
});
