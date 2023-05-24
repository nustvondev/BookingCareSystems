import User from '../models/user.model.js';
import Booking from '../models/booking.model.js';
import dotenv from 'dotenv';
import emailService from '../utils/emailService.js';
import { v4 as uuidv4 } from 'uuid';
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
        // generate token
        const token = uuidv4();
        await emailService.sendSimpleEmail({
          reciverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          reason: data.reason,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });
        const updateUser = {
          lastName: req.body.fullName,
          email: req.body.email,
          gender: req.body.gender,
          roleId: 'R3',
          phonenumber: req.body.phoneNumber,
          address: req.body.address,
        };
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
          token: token,
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
  postVerifyBookAppointment: async (req, res) => {
    let result = {};
    const data = req.body;
    if (!data.token || !data.doctorId) {
      result = { errCode: 1, errMessage: 'Missing parameter' };
    } else {
      try {
        let appointment = await Booking.findOne({
          doctorId: data.doctorId,
          token: data.token,
          statusId: 'S1',
        });
        if (appointment) {
          appointment.statusId = 'S2';
          await appointment.save();
          result = {
            errCode: 0,
            errMessage: 'Update the appointment success',
          };
        } else {
          result = {
            errCode: 2,
            errMessage: 'Appointment has been activated or does not exist',
          };
        }
      } catch (error) {
        console.log(error.message);
        result = { errCode: -1, errMessage: 'Error from the server' };
      }
    }
    return res.status(200).json(result);
  },
};

export default patientController;
