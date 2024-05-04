import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {userByUsername} from '../models/user-model.js';
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
    res.json({message: 'token ok', user: res.locals.user});
  } else {
    res.sendStatus(401);
  }
}


export {postLogin, getMe};
