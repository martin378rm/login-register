import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// show all user
const getUsers = async(req,res) => {
    try {
      const users = await User.findAll({
        // data yang ditampilkan
        attributes: ['id', 'name', 'email']
      });
      res.json(users);
    } catch (error) {
      console.log(error);
    }
}

// insert new user
const registerUser = async (req, res) => {
  const { name, email, password, confirmPass } = req.body;
  if (password !== confirmPass) {
    return res.status(400)
      .json({ message: "password tidak sama dengan confirm password" })
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt)

  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword
    });
    res.status(201).json({message : "Registrasi berhasil"});
  } catch (error) {
    console.log(error); 
  }
}


// login user
const userLogin = async (req, res) => {
  try {
    // mencari user berdasarkan email
    const user = await User.findAll({
      where: {
        email: req.body.email
      }
    });

    // membuat variabel untuk mencocokan password yang ada di database dengan yang di input saat login
    const passwordMatcher = await bcrypt.compare(req.body.password, user[0].password);

    // jika password tidak cocok response bad request
    if (!passwordMatcher) {
      return res.status(400).json({message : "password salah 🎈🎈🎈"})
    }

    // jika password cocok lalu membuat variable untuk di isi pada access_token dan refresh token
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;

    // generate web token
    const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '20s'
    });

    // token untuk memperpanjang masa berlaku access token
    const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d'
    });

    // insert refresh token ke database
    await User.update({ refresh_token : refreshToken }, {
      where: {
        id: userId
      }
    });

    // membuat cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });
    console.log("hello world")
    console.log(user[0].refresh_token)
    res.json({ accessToken });
    
  } catch (error) {
      res.status(404).json({message : `email salah`})
  }
}


// logout
const userLogout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(204)
  const user = await User.findAll({
    where: {
      refresh_token: refreshToken
    }
  });
  if (!user[0]) return res.sendStatus(204)
  const userId = user[0].id
  await User.update({ refresh_token: null }, {
    where: {
      id: userId
    }
  });
  res.clearCookie('refreshToken');
  res.sendStatus(200)
  

  if (!user[0]) return res.sendStatus(403)
}


export {
  getUsers,
  registerUser,
  userLogin, 
  userLogout
}


