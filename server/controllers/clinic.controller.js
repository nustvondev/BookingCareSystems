import clinicModel from '../models/clinic.model.js';

let clinicController = {
  createClinic: async (req, res) => {
    let result = {};
    const data = req.body;
    if (
      !data.name ||
      !data.address ||
      !data.image ||
      !data.descriptionHTML ||
      !data.descriptionMarkdown
    ) {
      result = {
        errCode: 1,
        errMessage: 'Missing parameter',
      };
    } else {
      try {
        await clinicModel.create({
          name: data.name,
          address: data.address,
          image: data.image,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        result = {
          errCode: 0,
          errMessage: 'ok',
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
  getAllClinic: async (req, res, next) => {
    let result = {};
    try {
      const data = await clinicModel.find({});
      result = {
        errMessage: 'ok',
        errCode: 0,
        data,
      };
    } catch (error) {
      result = {
        errCode: -1,
        errMessage: 'Error from the server',
      };
    }
    return res.status(200).json(result);
  },
  getDetailClinicById: async (req, res, next) => {},
};

export default clinicController;
