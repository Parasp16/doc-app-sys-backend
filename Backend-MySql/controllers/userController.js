const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


// ================= REGISTER =================
const register = async (req, res) => {
  try {
    const { name, email, password, contactNumber, address } = req.body

    if (!name || !email || !password) {
      return res.status(400).send({ msg: "All fields required" })
    }

    if (password.length < 6) {
      return res.status(400).send({ msg: "Password must be at least 6 characters" })
    }

    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email)) {
      return res.status(400).send({ msg: "Invalid email format" })
    }

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(409).send({ msg: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      name,
      email,
      password: hashedPassword,
      contactNumber,
      address
    })

    res.status(201).send({ success: true, msg: "Register successfully" })

  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: "Server Error" })
  }
}

// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(404).send({ msg: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).send({ msg: "Password incorrect" })
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    )

    res.status(200).send({
      success: true,
      msg: "Login successful",
      token
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: "Server Error" })
  }
}

// ================= GET USER INFO =================
const getUserInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
       attributes: ["id", "name", "email", "address", "role", "image"]
    })

    if (!user) {
      return res.status(404).send({ msg: "User not found" })
    }

    res.status(200).send({ success: true, user })

  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: "Server Error" })
  }
}

// ================= DOCTOR LIST (ADDED) =================
const doctorList = async (req, res) => {
  try {
    const doctors = await User.findAll({
      where: { role: 'doctor' },
      attributes: ["id", "name", "email"]
    })

    res.status(200).send({
      success: true,
      doctors
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: "Server Error" })
  }
}


const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'address']
    })

    res.status(200).json({
      success: true,
      users
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Server Error' })
  }
}

module.exports = {
  register,
  login,
  getUserInfo,
  doctorList,
   getAllUsers 
}
