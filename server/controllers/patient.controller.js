import User from '../models/user.model.js';
import Booking from '../models/booking.model.js';
import dotenv from 'dotenv';
import emailService from '../utils/emailService.js';
dotenv.config();
let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

const patientController = {
  postBookAppointment: async (req, res) => {
    try {
      if (
        !req.body.email ||
        !req.body.doctorId ||
        !req.body.timeType ||
        !req.body.date ||
        !req.body.fullName ||
        !req.body.gender ||
        !req.body.address
      ) {
        return res.status(200).json({
          errCode: 1,
          errMessage: 'Missing parameter...',
        });
      } else {
        const data = req.body;
        const dataRes = {
          reciverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: buildUrlEmail(
            data.doctorId,
            '1761761626261726261262612617'
          ),
        };
        await emailService.sendSimpleEmail({
          reciverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          reason: data.reason,
          redirectLink: buildUrlEmail(
            data.doctorId,
            '1761761626261726261262612617'
          ),
        });

        console.log(dataRes);
        const updateUser = {
          email: req.body.email,
          gender: req.body.gender,
          roleId: 'R3',
          phonenumber: req.body.phoneNumber,
          address: req.body.address,
        };
        console.log(updateUser);
        let infor = await User.findOneAndUpdate(
          { email: req.body.email },
          updateUser,
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        const updatePatient = {
          statusId: 'S1',
          doctorId: req.body.doctorId,
          patientId: infor._id,
          date: req.body.date,
          timeType: req.body.timeType,
          doe: req.body.doe,
          content: req.body.reason,
        };

        if (infor) {
          await Booking.findOneAndUpdate(
            { patientId: infor._id, doe: req.body.doe },
            updatePatient,
            { upsert: true, new: true, setDefaultsOnInsert: true }
          );
        }

        return res.status(200).json({
          data: infor,
          errCode: 0,
          errMessage: 'Save info doctor succeed',
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(200).json({
        errCode: -1,
        errMessage: 'Error from the server',
      });
    }
  },
};

export default patientController;
