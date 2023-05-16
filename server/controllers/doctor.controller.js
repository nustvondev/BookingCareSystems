import User from '../models/user.model.js';
import Allcode from '../models/allcode.model.js';
import createError from '../utils/createError.js';
import Markdown from '../models/markdown.model.js';
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
    // console.log(inputData);
    try {
      //   console.log(inputData.doctorId);
      //   console.log(inputData.contentHtml);
      //   console.log(inputData.contentMarkdown);
      if (
        !inputData.doctorId ||
        !inputData.contentHtml ||
        !inputData.contentMarkdown
      ) {
        response.errCode = 1;
        response.message = 'Missing paramester';
      } else {
        const newMarkdown = new Markdown({ ...inputData });
        await newMarkdown.save();
        response.errCode = 0;
        response.message = 'Create success';
        response.data = newMarkdown;
      }
    } catch (error) {
      next(createError(500, 'server error'));
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
      const userWithMarkdown = {
        ...user._doc,
        Markdown: markdownId,
        positionData: positionData,
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
};

export default doctorController;
