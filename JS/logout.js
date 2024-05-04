// Logout
function logout() {
  // Clear the user's session or token
  req.clearCookie('token');
  res.json({
    message: 'logout ok'
  });
}


