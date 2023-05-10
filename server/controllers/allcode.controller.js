import createError from '../utils/createError.js';
import Allcode from '../models/allcode.model.js';

let allCodeController = {
  getAllCode: async (req, res, next) => {
    try {
      let data = {};
      if (!req.query.type) {
        data.errCode = 1;
        data.errMessage = 'Missing required parameters !';
        return res.status(200).json(data);
      }
      let response = await Allcode.find({ type: req.query.type });
      if (response <= 0) {
        data.errCode = 1;
        data.errMessage = 'Null';
        return res.status(200).json(data);
      }
      data.errCode = 0;
      data.errMessage = 'OK';
      data.data = response;
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(createError(500, 'Some thing went wrong!'));
      return res.status(200).json({
        errCode: -1,
        errMessage: 'Error from server',
      });
    }
  },
};

export default allCodeController;
