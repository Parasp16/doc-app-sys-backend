const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");

const applyDoctor = async(req,res)=>{
    try{
        const{Specialist,fees} = req.body
        const createdBy = req.user.id
        console.log(req.body, createdBy,"********")
        const newDoc = await Doctor.create({Specialist,fees,createdBy})
        console.log(newDoc,"&&&&&&&&&&&&&&newDoc")
        if(newDoc){
            res
      .status(200)
      .send({ msg: "doctor applied successfully", success: true });
        }else{
             res
      .status(200)
      .send({ msg: "doctor not applied successfully", success: false });
        }
  } catch (error) {
  console.log("APPLY DOCTOR ERROR 👉", error)
  res.status(500).send({
    msg: "Server Error",
    error: error.message
  })
}

}


const docStatus = async(req,res)=>{
    try{
        //admin req.user.id
        // DoctorID = req.params.DoctorID   Doctor model
    //     Doctor model status ->accepted
    //    if status is accepted -> createdBy  = userID   -> role ->doctor

    const DoctorID = req.params.DoctorID
    console.log(req.user.id,"admin", req.params.DoctorID,"DoctorID")
    const getDoctor = await Doctor.findByPk(DoctorID)
    console.log(getDoctor)
    if(!getDoctor){
        res.status(400).send({msg:"Doctor not found", success:true})
    }else{
         // 2️⃣ Update doctor status
    getDoctor.status = "Accepted";
    await getDoctor.save(); //
        if(getDoctor){
            await User.update({role:"Doctor"},{where:{id:getDoctor.createdBy}} )
        }
         res
      .status(200)
      .send({ msg: "doctor applied successfully", success: true });

    }

  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
}

const getDoctorInfo = (req,res)=>{
    try{
            res
      .status(200)
      .send({ msg: "doctor created successfully", success: true });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
}

const updateDoctor = (req,res)=>{
    try{
            res
      .status(200)
      .send({ msg: "doctor created successfully", success: true });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
}

const deleteDoctor = (req,res)=>{
    try{
            res
      .status(200)
      .send({ msg: "doctor created successfully", success: true });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
}


const getAllDoctorRequests = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      where: { status: 'Pending' },   // sirf pending requests
      include: [
        {
          model: User,
          as: 'user',                  // 👈 yahi relation use ho raha
          attributes: ['id', 'name', 'email']
        }
      ]
    })

    res.status(200).send({
      success: true,
      doctors
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: 'Server Error' })
  }
}

const rejectDoctor = async (req, res) => {
  try {
    const DoctorID = req.params.DoctorID

    const getDoctor = await Doctor.findByPk(DoctorID)

    if (!getDoctor) {
      return res.status(404).send({
        success: false,
        msg: "Doctor request not found"
      })
    }

    getDoctor.status = "Reject"
    await getDoctor.save()

    res.status(200).send({
      success: true,
      msg: "Doctor request rejected"
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: "Server Error" })
  }
}


module.exports = {applyDoctor,docStatus, getDoctorInfo,updateDoctor,deleteDoctor, getAllDoctorRequests, rejectDoctor}