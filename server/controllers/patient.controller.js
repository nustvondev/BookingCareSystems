import User from '../models/user.model.js';
import Booking from '../models/booking.model.js';
import dotenv from 'dotenv';
dotenv.config();

const patientController = {
    postBookAppointment: async (req, res) => {
        try {
            if(!req.body.email || !req.body.doctorId || !req.body.timeType || !req.body.date){
                return res.status(200).json(
                    {
                        errCode: 1,
                        errMessage:"Missing parameter..."
                    }
                )  
            } else {

                const updateUser = {
                    email: req.body.email,
                    roleId: 'R3'
                  };
                  
                let infor = await User.findOneAndUpdate({ email: req.body.email}, {$setOnInsert: updateUser}, { upsert: true, new: true, runValidators: true });

                console.log(infor._id)

                const updatePatient = {
                    statusId: 'S1',
                    doctorId: req.body.doctorId,
                    patientId: infor._id,
                    date: req.body.date,
                    timeType: req.body.timeType
                  };
                  
                if(infor){
                    await Booking.findOneAndUpdate({patientId: infor._id},{$setOnInsert: updatePatient}, { upsert: true, new: true, runValidators: true })
                }

                return res.status(200).json({
                    data: infor,
                    errCode: 0,
                    errMessage: "Save info doctor succeed"
                }
                )    
            }
            
        } catch (e) {
            console.log(e);
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    }
}


export default patientController;