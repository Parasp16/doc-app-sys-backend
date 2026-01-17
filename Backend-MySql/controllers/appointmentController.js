const Appointment = require("../models/appointmentModel");

const User = require('../models/userModel')

/* ================= CREATE APPOINTMENT ================= */
async function createAppointment(req, res) {
  try {
    const { dateTime, doctorId } = req.body;
    const createdBy = req.user.id;

    const newAppointment = await Appointment.create({
      dateTime,
      doctorId,
      createdBy,
    });

    if (!newAppointment) {
      return res
        .status(200)
        .send({ msg: "Appointment not created", success: false });
    }

    res
      .status(200)
      .send({ msg: "Appointment created successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Server Error", success: false });
  }
}

/* ================= UPDATE STATUS BY DOCTOR ================= */
async function statusUpdateByDoctor(req, res) {
  const { ID } = req.params;

  try {
    const updatedAppointment = await Appointment.update(
      {
        status: req.body.status,
        updatedBy: req.user.id,
      },
      {
        where: { id: ID },
      }
    );

    if (updatedAppointment[0] === 0) {
      return res
        .status(200)
        .send({ msg: "Appointment not updated", success: false });
    }

    res.status(200).send({
      msg: "Appointment status updated successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Server Error", success: false });
  }
}

/* ================= UPDATE APPOINTMENT ================= */
async function updateAppointment(req, res) {
  try {
    const { ID } = req.params;
    const { dateTime, doctorId } = req.body;

    const updatedAppointment = await Appointment.update(
      {
        dateTime,
        doctorId,
        updatedBy: req.user.id,
      },
      {
        where: { id: ID },
      }
    );

    if (updatedAppointment[0] === 0) {
      return res
        .status(200)
        .send({ msg: "Appointment not updated", success: false });
    }

    res
      .status(200)
      .send({ msg: "Appointment updated successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Server error", success: false });
  }
}

/* ================= DELETE APPOINTMENT ================= */
async function deleteAppointment(req, res) {
  try {
    const { ID } = req.params;

    const deleted = await Appointment.destroy({
      where: { id: ID },
    });

    if (!deleted) {
      return res
        .status(200)
        .send({ msg: "Appointment not deleted", success: false });
    }

    res
      .status(200)
      .send({ msg: "Appointment deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Server error", success: false });
  }
}

/* ================= GET APPOINTMENTS BY USER ================= */
async function getAppointmentsByUser(req, res) {
  try {
    const appointments = await Appointment.findAll({
      where: { createdBy: req.user.id },
    });

    if (appointments.length === 0) {
      return res
        .status(400)
        .send({ msg: "No appointments yet", success: false });
    }

    res.status(200).send({ appointments, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Server Error", success: false });
  }
}

/* ================= GET APPOINTMENTS OF DOCTOR ================= */
async function showAppointmentsOfDoctor(req, res) {
  try {
    const appointments = await Appointment.findAll({
      where: { doctorId: req.user.id },
    });

    if (appointments.length === 0) {
      return res
        .status(400)
        .send({ msg: "No appointments yet", success: false });
    }

    res.status(200).send({ appointments, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Server Error", success: false });
  }
}


// const getAllAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.findAll({
//       include: [
//         { model: User, as: 'patient', attributes: ['id', 'name', 'email'] },
//         { model: User, as: 'doctor', attributes: ['id', 'name', 'email'] }
//       ]
//     })

//     res.status(200).json({
//       success: true,
//       appointments
//     })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ msg: 'Server Error' })
//   }
// }

const getAllAppointments = async (req, res) => {
  try {
    let whereCondition = {}

    // 👤 NORMAL USER → sirf apni
    if (req.user.role === "User") {
      whereCondition.createdBy = req.user.id
    }

    // 🧑‍⚕️ DOCTOR → sirf apni
    if (req.user.role === "Doctor") {
      whereCondition.doctorId = req.user.id
    }

    // 👨‍💼 ADMIN → sab (no where condition)

    const appointments = await Appointment.findAll({
      where: whereCondition,
      include: [
        { model: User, as: 'patient', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'doctor', attributes: ['id', 'name', 'email'] }
      ]
    })

    res.status(200).json({
      success: true,
      appointments
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Server Error' })
  }
}

module.exports = {
  createAppointment,
  statusUpdateByDoctor,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByUser,
  showAppointmentsOfDoctor,
   getAllAppointments,
};
