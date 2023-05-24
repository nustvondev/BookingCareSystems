import User from '../models/user.model.js';
import Allcode from '../models/allcode.model.js';
import createError from '../utils/createError.js';
import Markdown from '../models/markdown.model.js';
import scheduleModel from '../models/schedule.model.js';
import DoctorInfor from '../models/doctor_infor.model.js';
import dotenv from 'dotenv';
import allcodeModel from '../models/allcode.model.js';
import doctor_inforModel from '../models/doctor_infor.model.js';
import doctor_clinic_specialtyModel from '../models/doctor_clinic_specialty.model.js';
import Booking from '../models/booking.model.js';
import userModel from '../models/user.model.js';
import bookingModel from '../models/booking.model.js';
import emailService from '../utils/emailService.js';
dotenv.config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

const doctorController = {
  getTopDoctorHome: async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
      let result = {};
      let positionData = await Allcode.find({ type: 'POSITION' }).select(
        'valueEn valueVi keyMap -_id'
      );
      let positionDataMap = {};
      positionData.forEach((code) => {
        positionDataMap[code.keyMap] = {
          valueEn: code.valueEn,
          valueVi: code.valueVi,
        };
      });

      let response = await User.find({ roleId: 'R2' })
        .limit(+limit)
        .sort({ createdAt: -1 })
        .select('-password');
      let cloneResponse = response;
      response.forEach((item) => {
        const positionType = item.positionId;
        // console.log(positionType)
        if (positionDataMap.hasOwnProperty(positionType)) {
          item.positionData = positionDataMap[positionType];
        } else {
          item.positionData = positionDataMap['P0'];
        }
        return item;
      });

      result.errCode = 0;
      result.data = response;
      return res.status(200).json(result);
    } catch (e) {
      console.log(e);
      return res.status(200).json({
        errCode: -1,
        message: 'Error from server...',
      });
    }
  },
  getAllDoctors: async (req, res, next) => {
    let response = { errCode: 1, data: [] };
    try {
      const doctors = await User.find({ roleId: 'R2' }).select(
        '-password -image'
      );
      response.errCode = 0;
      response.data = doctors;
    } catch (error) {
      next(createError(500, 'server error'));
    }
    return res.status(200).json(response);
  },
  postInforDoctor: async (req, res, next) => {
    let response = { errCode: 1, message: 'Error from server...' };
    let inputData = req.body;
    try {
      let infoRes = {};
      let markdownRes = {};
      const checkInfo = await DoctorInfor.findOne({
        doctorId: inputData.doctorId,
      });
      const checkMarkdown = await Markdown.findOne({
        doctorId: inputData.doctorId,
      });
      const checkSpecialtyClinicDoctor =
        await doctor_clinic_specialtyModel.findOne({
          doctorId: inputData.doctorId,
          clinicId: inputData.clinicId,
          specialtyId: inputData.specialtyId,
        });
      if (
        !inputData.doctorId ||
        !inputData.contentHtml ||
        !inputData.contentMarkdown ||
        !inputData.selectedPrice ||
        !inputData.selectedPayment ||
        !inputData.selectedProvince ||
        !inputData.nameClinic ||
        !inputData.addressClinic ||
        !inputData.specialtyId ||
        !inputData.clinicId
      ) {
        response.errCode = 1;
        response.message = 'Missing parameter';
      } else {
        if (!checkMarkdown) {
          const newMarkdown = new Markdown({
            description: inputData.description,
            doctorId: inputData.doctorId,
            contentHtml: inputData.contentHtml,
            contentMarkdown: inputData.contentMarkdown,
          });
          const datares = await newMarkdown.save();
          markdownRes = datares;
        } else {
          const query = { doctorId: inputData.doctorId };
          const updateMarkdown = {
            description: inputData.description,
            doctorId: inputData.doctorId,
            contentHtml: inputData.contentHtml,
            contentMarkdown: inputData.contentMarkdown,
          };
          const dataup = await Markdown.findOneAndUpdate(query, updateMarkdown);
          markdownRes = dataup;
        }
        if (!checkInfo) {
          const newDoctorInfor = new DoctorInfor({
            doctorId: inputData.doctorId,
            priceId: inputData.selectedPrice,
            paymentId: inputData.selectedPayment,
            provinceId: inputData.selectedProvince,
            nameClinic: inputData.nameClinic,
            addressClinic: inputData.addressClinic,
            note: inputData.note,
            specialtyId: inputData.specialtyId,
            clinicId: inputData.clinicId,
          });
          const datares = await newDoctorInfor.save();
          infoRes = datares;
        } else {
          const query = { doctorId: inputData.doctorId };
          const updateDoctorInfor = {
            doctorId: inputData.doctorId,
            priceId: inputData.selectedPrice,
            paymentId: inputData.selectedPayment,
            provinceId: inputData.selectedProvince,
            nameClinic: inputData.nameClinic,
            addressClinic: inputData.addressClinic,
            note: inputData.note,
            specialtyId: inputData.specialtyId,
            clinicId: inputData.clinicId,
          };

          const dataup = await DoctorInfor.findOneAndUpdate(
            query,
            updateDoctorInfor
          );
          infoRes = dataup;
        }
        if (!checkSpecialtyClinicDoctor) {
          const newSpecialtyClinicDoctor = new doctor_clinic_specialtyModel({
            doctorId: inputData.doctorId,
            clinicId: inputData.clinicId,
            specialtyId: inputData.specialtyId,
          });
          await newSpecialtyClinicDoctor.save();
        } else {
          const query = {
            doctorId: inputData.doctorId,
            clinicId: inputData.clinicId,
            specialtyId: inputData.specialtyId,
          };
          const updateSpecialtyClinicDoctor = {
            doctorId: inputData.doctorId,
            clinicId: inputData.clinicId,
            specialtyId: inputData.specialtyId,
          };
          await doctor_clinic_specialtyModel.findOneAndUpdate(
            query,
            updateSpecialtyClinicDoctor
          );
        }
        response.errCode = 0;
        response.message = 'Create success';
        response.data = { markdownRes, infoRes };
      }
    } catch (error) {
      console.log(error.message);
    }

    return res.status(200).json(response);
  },

  getDetailDoctorById: async (req, res) => {
    let result = {};
    try {
      if (!req.query.id) {
        result = { errCode: 1, errMessage: 'Missing required parameter!' };
      } else {
        let positionData = await Allcode.find({ type: 'POSITION' }).select(
          'valueEn valueVi keyMap -_id'
        );
        let positionDataMap = {};
        positionData.forEach((code) => {
          positionDataMap[code.keyMap] = {
            valueEn: code.valueEn,
            valueVi: code.valueVi,
          };
        });
        let user = await User.findById(req.query.id).select('-password');
        let markdownId = await Markdown.findOne({ doctorId: req.query.id });
        let cloneUser = { ...user._doc };
        if (positionDataMap.hasOwnProperty(cloneUser.positionId)) {
          cloneUser.positionData = positionDataMap[cloneUser.positionId];
        }
        let doctorInfor = await doctor_inforModel.findOne({
          doctorId: req.query.id,
        });

        const userWithMarkdown = {
          ...cloneUser,
          Markdown: markdownId,
          doctorInfor: doctorInfor,
        };
        // console.log(userWithMarkdown);
        result = {
          errCode: 0,
          data: userWithMarkdown,
        };
      }
    } catch (error) {
      result = { errCode: 1, errMessage: 'Error sever' };
    }
    return res.status(200).json(result);
  },

  bulkCreateSchedule: async (req, res) => {
    let result = {};
    let inputData = req.body;
    try {
      if (!inputData.arrSchedule) {
        result = { errCode: 1, errMessage: 'Missing required parameter!' };
      } else {
        inputData.arrSchedule.map((item) => {
          item.maxNumber = MAX_NUMBER_SCHEDULE;
          return item;
        });
        const data = inputData.arrSchedule;
        /**
         * data chứa các bản ghi cần thêm vào cơ sở dữ liệu
         * Đối với mỗi bản ghi, chúng ta tạo một filter dựa trên các trường date, timeType và doctorId
         * những trường dùng để xác định xem bản ghi đã tồn tại trong cơ sở dữ liệu
         * tạo một update object bằng cách sử dụng toàn bộ dữ liệu của bản ghi trong scheduleData
         * sử dụng phương thức findOneAndUpdate() của mô hình ScheduleModel  để tìm kiếm và cập nhật bản
         * ghi dựa trên filter và update. Các tùy chọn upsert và new được đặt thành true. Tùy chọn upsert sẽ
         * tạo một bản ghi mới nếu không tìm thấy bản ghi nào khớp với filter, và tùy chọn new sẽ trả về
         * bản ghi đã được cập nhật
         */

        data.forEach(async (scheduleData) => {
          const filter = {
            date: scheduleData.date,
            timeType: scheduleData.timeType,
            doctorId: scheduleData.doctorId,
          };

          const update = {
            ...scheduleData,
          };

          const options = {
            upsert: true, // Create a new document if it doesn't exist
            new: true, // Return the updated document
          };

          await scheduleModel.findOneAndUpdate(filter, update, options);
        });
        // console.log(inputData);
        // await scheduleModel.insertMany(inputData.arrSchedule);
        result = {
          errCode: 0,
          data: inputData.arrSchedule,
        };
      }
    } catch (error) {
      result = { errCode: 1, errMessage: 'Server error' };
      console.log(error.message);
    }
    return res.status(200).json(result);
  },
  getScheduleByDate: async (req, res) => {
    // console.log(req.query.doctorId);
    // console.log(req.query.date);
    let result = {};

    try {
      /**
       * Todo:
       * - Lấy toàn bộ dữ liệu allcode kiểu TIME
       * - Tạo object allcodekeymap
       * - Thêm trường timeTypeData vào mỗi phần tử của mảng schedule
       * * ví dụ:
       * {
       *     T4: { valueEn: '11:00 AM - 0:00 PM', valueVi: '11:00 - 12:00' },
       *     T2: { valueEn: '9:00 AM - 10:00 AM', valueVi: '9:00 - 10:00' },
       *     T5: { valueEn: '1:00 PM - 2:00 PM', valueVi: '13:00 - 14:00' },
       *     ...
       * }
       * {
       *     _id: new ObjectId("6465d581fe671a8eb29010a3"),
       *     date: 2023-05-20T17:00:00.000Z,
       *     doctorId: '6465cfb1d628bae812ebefcf',
       *     timeTypeData: { valueEn: '2:00 PM - 3:00 PM', valueVi: '14:00 - 15:00' }
       *     ...
       * }
       */

      const timeType = await allcodeModel
        .find({ type: 'TIME' })
        .select('keyMap valueEn valueVi -_id');
      const allcodeMap = {};
      timeType.forEach((code) => {
        allcodeMap[code.keyMap] = {
          valueEn: code.valueEn,
          valueVi: code.valueVi,
        };
      });
      let data = await scheduleModel.find({
        doctorId: req.query.doctorId,
        date: req.query.date,
      });
      let getInfoDoctor = await User.findOne({
        _id: req.query.doctorId,
      }).select('-_id lastName firstName');
      const cloneData = data.map((item) => ({ ...item._doc }));
      cloneData.forEach((item) => {
        const timeType = item.timeType;
        if (allcodeMap.hasOwnProperty(timeType)) {
          item.timeTypeData = allcodeMap[timeType];
          item.doctorData = getInfoDoctor;
        }
        return item;
      });
      // console.log(data);
      // await Promise.all(
      //   data.map(async (obj) => {
      //     obj.timeTypeData = await Allcode.find({ keyMap: obj.timeType}).select(
      //       'valueEn valueVi'
      //     );
      //   }))
      if (data.length > 0) {
        result = {
          errCode: 0,
          data: cloneData,
        };
      } else {
        result = { errCode: 1, errMessage: 'No data' };
      }
    } catch (error) {
      result = { errCode: 1, errMessage: 'Server error' };
      console.log(error.message);
    }
    return res.status(200).json(result);
  },
  getExraInforDoctorById: async (req, res) => {
    let result = {};
    const doctorIdInput = req.query.doctorId;
    if (!doctorIdInput) {
      result = { errCode: 1, errMessage: 'Missing required parameter!' };
    } else {
      try {
        const allcodeType = await Allcode.find({}).select(
          'keyMap valueEn valueVi -_id'
        );

        const allcodeMap = {};
        allcodeType.forEach((code) => {
          allcodeMap[code.keyMap] = {
            valueEn: code.valueEn,
            valueVi: code.valueVi,
          };
        });
        const inforDoctor = await DoctorInfor.findOne({
          doctorId: doctorIdInput,
        });
        let dataRes = { ...inforDoctor._doc };
        if (allcodeMap.hasOwnProperty(dataRes.paymentId)) {
          dataRes.paymentTypeData = allcodeMap[dataRes.paymentId];
        }
        if (allcodeMap.hasOwnProperty(dataRes.provinceId)) {
          dataRes.provinceTypeData = allcodeMap[dataRes.provinceId];
        }
        if (allcodeMap.hasOwnProperty(dataRes.priceId)) {
          dataRes.priceTypeData = allcodeMap[dataRes.priceId];
        }
        result = { errCode: 0, data: dataRes };
      } catch (error) {
        result = { errCode: 1, errMessage: 'Server error' };
        console.log(error.message);
      }
    }
    return res.status(200).json(result);
  },
  getProfileDoctorById: async (req, res) => {
    let result = {};
    const doctorIdInput = req.query.doctorId;
    if (!doctorIdInput) {
      result = { errCode: 1, errMessage: 'Missing required parameter!' };
    } else {
      try {
        let responseData = {};
        /**
         * lay user
         */
        const allcode = await allcodeModel
          .find({})
          .select('keyMap valueEn valueVi');
        let allcodeMap = {};
        allcode.forEach((code) => {
          allcodeMap[code.keyMap] = {
            valueEn: code.valueEn,
            valueVi: code.valueVi,
          };
        });

        const user = await User.findOne({ _id: doctorIdInput }).select(
          '-password -_id'
        );
        let cloneUser = { ...user._doc };
        if (allcodeMap.hasOwnProperty(cloneUser.positionId)) {
          cloneUser.positionData = allcodeMap[cloneUser.positionId];
        }

        const doctor_info = await DoctorInfor.findOne({
          doctorId: doctorIdInput,
        });
        let cloneDoctorInfo = { ...doctor_info._doc };
        if (allcodeMap.hasOwnProperty(cloneDoctorInfo.paymentId)) {
          cloneDoctorInfo.paymentTypeData =
            allcodeMap[cloneDoctorInfo.paymentId];
        }
        if (allcodeMap.hasOwnProperty(cloneDoctorInfo.provinceId)) {
          cloneDoctorInfo.provinceTypeData =
            allcodeMap[cloneDoctorInfo.provinceId];
        }
        if (allcodeMap.hasOwnProperty(cloneDoctorInfo.priceId)) {
          cloneDoctorInfo.priceTypeData = allcodeMap[cloneDoctorInfo.priceId];
        }

        const markdown = await Markdown.findOne({ doctorId: doctorIdInput });
        let cloneMarkdown = { ...markdown._doc };
        responseData = {
          ...cloneUser,
          Doctor_Infor: cloneDoctorInfo,
          Markdown: cloneMarkdown,
        };
        result = { errCode: 0, data: responseData };
      } catch (error) {
        result = { errCode: 1, errMessage: 'Server error' };
        console.log(error.message);
      }
    }

    return res.status(200).json(result);
  },
  getListPatientForDoctor: async (req, res) => {
    let result = {};
    const doctorId = req.query.doctorId;
    const date = req.query.date;

    try {
      const allcode = await allcodeModel
        .find({})
        .select('keyMap valueEn valueVi');
      let allcodeMap = {};
      allcode.forEach((code) => {
        allcodeMap[code.keyMap] = {
          valueEn: code.valueEn,
          valueVi: code.valueVi,
        };
      });
      if (!doctorId || !date) {
        result = {
          errCode: 1,
          errMessage: 'Missing required parameters',
        };
      } else {
        let data = await Booking.find({
          statusId: 'S2',
          doctorId: doctorId,
          doe: date,
        });
        let cloneData = data.map((item) => ({ ...item._doc }));

        // cloneData.forEach(async (item) => {
        //   let clonePatient = {};
        //   let patientData = await userModel
        //     .findOne({ _id: item.patientId })
        //     .select('email firstName address gender');

        //   if (patientData) {
        //     clonePatient = { ...patientData._doc };
        //     if (allcodeMap.hasOwnProperty(clonePatient.gender)) {
        //       clonePatient.genderData = allcodeMap[clonePatient.gender];
        //     }
        //     item.patientData = clonePatient;
        //     if (allcodeMap.hasOwnProperty(item.timeType)) {
        //       item.timeTypeDataPatient = allcodeMap[item.timeType];
        //     }
        //     return item;
        //   }
        // });

        /**
         * forEach không chờ đợi các hàm bất đồng bộ hoàn thành, mà tiếp tục thực
         * hiện các lần lặp tiếp theo ngay sau khi gọi hàm bất đồng bộ, nên cloneData
         * đã được gán giá trị trước khi các hàm bất đồng bộ hoàn thành và trả về kết quả.
         */
        for (let i = 0; i < cloneData.length; i++) {
          let item = cloneData[i];
          let clonePatient = {};
          let patientData = await userModel
            .findOne({ _id: item.patientId })
            .select('email lastName address gender');

          if (patientData) {
            clonePatient = { ...patientData._doc };
            if (allcodeMap.hasOwnProperty(clonePatient.gender)) {
              clonePatient.genderData = allcodeMap[clonePatient.gender];
            }
            item.patientData = clonePatient;
            if (allcodeMap.hasOwnProperty(item.timeType)) {
              item.timeTypeDataPatient = allcodeMap[item.timeType];
            }
          }
        }
        result = {
          errCode: 0,
          data: cloneData,
        };
      }
    } catch (error) {
      result = {
        errCode: -1,
        errMessage: 'Error from the server',
      };
    }
    return res.status(200).json(result);
  },
  sendRemedy: async (req, res) => {
    let result = {};
    let data = req.body;
    if (
      !data.email ||
      !data.doctorId ||
      !data.patientId ||
      !data.timeType ||
      !data.imgBase64
    ) {
      result = {
        errCode: 1,
        errMessage: 'Missing required parameters',
      };
    } else {
      try {
        let appointment = await bookingModel.findOne({
          doctorId: data.doctorId,
          patientId: data.patientId,
          timeType: data.timeType,
          statusId: 'S2',
        });
        if (appointment) {
          appointment.statusId = 'S3';
          await appointment.save();
        }
        await emailService.sendAttachment(data);
        result = {
          errCode: 0,
          data: data,
        };
      } catch (error) {
        result = {
          errCode: -1,
          errMessage: 'Error from the server',
        };
      }
    }
    return res.status(200).json(result);
  },
};

export default doctorController;
