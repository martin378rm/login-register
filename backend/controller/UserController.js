import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getUsers = async(req,res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.log(error);
    }
}


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

    // jika password tidak cocok
    if (!passwordMatcher) {
      return res.status(400).json({message : "password salah 🎈🎈🎈"})
    }

    // jika password cocok lalu membuat variable untuk di isi pada access_token dan refresh token
    const userId = user.id;
    const name = user.name;
    const email = user.email;

    // generate web token
    const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '20s'
    });

    // token untuk memperpanjang masa berlaku access token
    const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d'
    });

    // http only cookie
    await User.update({ refreshToken: refreshToken }, {
      where: {
        id: userId
      }
    });
  } catch (error) {
    console.log(error)
  }
}


export {
  getUsers,
  registerUser
}
