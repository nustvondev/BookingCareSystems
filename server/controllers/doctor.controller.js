import User from '../models/user.model.js';
import Allcode from '../models/allcode.model.js';
import createError from '../utils/createError.js';
import Markdown from '../models/markdown.model.js';
import scheduleModel from '../models/schedule.model.js';
import DoctorInfor from '../models/doctor_infor.model.js';
import dotenv from 'dotenv';
import allcodeModel from '../models/allcode.model.js';
import doctor_inforModel from '../models/doctor_infor.model.js';
dotenv.config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

const doctorController = {
  getTopDoctorHome: async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
      let result = {};
      let positionData = await Allcode.find({ keyMap: 'R2' }).select(
        'valueEn valueVi -_id'
      );
      let response = await User.find({ roleId: 'R2' })
        .limit(+limit)
        .sort({ createdAt: -1 })
        .select('-password')
        .populate('');
      await Promise.all(
        response.map(async (obj) => {
          obj.genderData = await Allcode.find({ keyMap: obj.gender }).select(
            'valueEn valueVi -_id'
          );
          obj.positionData = positionData;
        })
      );
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
      if (
        !inputData.doctorId ||
        !inputData.contentHtml ||
        !inputData.contentMarkdown ||
        !inputData.selectedPrice ||
        !inputData.selectedPayment ||
        !inputData.selectedProvince ||
        !inputData.nameClinic ||
        !inputData.addressClinic
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
          };

          const dataup = await DoctorInfor.findOneAndUpdate(
            query,
            updateDoctorInfor
          );
          infoRes = dataup;
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
      }
      let user = await User.findById(req.query.id).select('-password');
      let markdownId = await Markdown.findOne({ doctorId: req.query.id });
      let positionData = await Allcode.find({ keyMap: 'R2' }).select(
        'valueEn valueVi -_id'
      );
      let doctorInfor = await doctor_inforModel.findOne({ doctorId: req.query.id });
      const userWithMarkdown = {
        ...user._doc,
        Markdown: markdownId,
        positionData: positionData,
        doctorInfor: doctorInfor
      };
      // console.log(userWithMarkdown);
      result = {
        errCode: 0,
        data: userWithMarkdown,
      };
    } catch (error) {
      result = { errCode: 1, errMessage: 'Error sever' };
    }
    return res.status(200).json(result);
  },

  bulkCreateSchedule: async (req, res) => {
    let result = {};
    let inputData = req.body;
    console.log(inputData);
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
      data.forEach((item) => {
        const timeType = item.timeType;
        if (allcodeMap.hasOwnProperty(timeType)) {
          item.timeTypeData = allcodeMap[timeType];
        }
        return item;
      });
      // await Promise.all(
      //   data.map(async (obj) => {
      //     obj.timeTypeData = await Allcode.find({ keyMap: obj.timeType}).select(
      //       'valueEn valueVi'
      //     );
      //   }))
      if (data.length > 0) {
        result = {
          errCode: 0,
          data: data,
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
};

export default doctorController;
