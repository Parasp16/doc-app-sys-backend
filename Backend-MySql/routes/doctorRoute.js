const express =  require('express')
const { auth, admin } = require('../middleware/auth')
const doctorController = require('../controllers/doctorController')

const router = express.Router()


router.post('/apply', auth, doctorController.applyDoctor)
router.get('/docStatus/:DoctorID', auth, admin, doctorController.docStatus)   
// router.get('/getDocInfo', doctorController.getDoctorInfo)
// router.patch('/update/:ID',doctorController.updateDoctor)
// router.delete('/delete/:ID', doctorController.deleteDoctor)
router.get( '/pending', auth, admin, doctorController.getAllDoctorRequests)
router.get( "/reject/:DoctorID", auth, admin, doctorController.rejectDoctor)





module.exports = router
