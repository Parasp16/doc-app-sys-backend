const express = require('express')
const userController = require('../controllers/userController')
const { auth } = require('../middleware/auth')
const upload = require('../middleware/upload') 
const router = express.Router()
const User = require('../models/userModel')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/getUserInfo', auth, userController.getUserInfo)
router.get('/doctorList', userController.doctorList)
router.get('/allUsers', userController.getAllUsers)

router.post(
  '/uploadProfile',
  auth,
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' })
      }

      // ✅ DB UPDATE
      await User.update(
        { image: req.file.filename },
        { where: { id: req.user.id } }
      )

      res.status(200).json({
        success: true,
        file: req.file.filename
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({ msg: 'Upload failed' })
    }
  }
)

module.exports = router
