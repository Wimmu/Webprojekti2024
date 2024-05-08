import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {
  changePassword,
  findUserById,
  userByEmail,
  userByUsername
} from '../models/user-model.js';
import 'dotenv/config';

const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await userByUsername(username);
  if (!user) {
    res.sendStatus(401);
    return;
  }

  if (!bcrypt.compareSync(password, user.password)) {
    res.sendStatus(401);
    return;
  }

  const userWithNoPassword = {
    user_id: user.user_id,
    username: user.username,
    role: user.role,
  };

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  res.json({user: userWithNoPassword, token});
}

const getMe = async (req, res) => {
  if (res.locals.user) {
    console.log('user', res.locals.user);
    res.json({message: 'token ok', user: res.locals.user});
  } else {
    res.sendStatus(401);
  }
}

const initiatePasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await userByEmail(email);
  if (!user) {
    res.sendStatus(404);
    return;
  }

  const secret = process.env.JWT_SECRET + user.password;
  const payload = {
    user_id: user.user_id,
    email: user.email,
  };

  const token = jwt.sign(payload, secret, { expiresIn: '15m' });
  const link = `http://localhost:3000/api/v1/auth/reset-password/${user.user_id}/${token}`;
  console.log('Password reset link:', link);
  res.status(200).json({ resetLink: link });
}

const getResetPassword = async (req, res) => {
  // Reset the user's password (you would implement this logic)
  const { user_Id, token } = req.params;
  console.log('User ID:', user_Id);

  const user = await findUserById(user_Id);
  if (!user) {
    res.sendStatus(404);
    return;
  }

  const secret = process.env.JWT_SECRET + user.password;
  try {
    const payload = jwt.verify(token, secret);
    // Additional logic if needed
  } catch (error) {
    console.error('Error resetting password:', error);
    res.sendStatus(500);
  }
}

const postResetPassword = async (req, res) => {
  // Reset the user's password (you would implement this logic)
  const { user_id, token } = req.params;

  const user = await findUserById(user_id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const secret = process.env.JWT_SECRET + user.password;
  try {
    const payload = jwt.verify(token, secret);
    console.log('Payload:', payload);
    const { newPassword } = req.body;
    console.log('Password:', newPassword);

    if (!newPassword) {
      res.status(400).json({ message: 'Password is required' });
      return;
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await changePassword(user_id, hashedPassword);
    console.log(hashedPassword);
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    console.log('Response:', res);
    res.sendStatus(500);
  }
}




export {postLogin, getMe, getResetPassword, postResetPassword, initiatePasswordReset};
