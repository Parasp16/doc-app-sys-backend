const User = require('./userModel')
const Appointment = require('./appointmentModel')
const Doctor = require('./doctorModel') 

User.hasMany(Appointment, { foreignKey: 'createdBy' })
Appointment.belongsTo(User, { foreignKey: 'createdBy', as: 'patient' })

User.hasMany(Appointment, { foreignKey: 'doctorId' })
Appointment.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor' })

Appointment.belongsTo(User, { foreignKey: 'updatedBy', as: 'updatedByUser' })

User.hasOne(Doctor, { foreignKey: 'createdBy' })

Doctor.belongsTo(User, { foreignKey: 'createdBy', as: 'user' })
