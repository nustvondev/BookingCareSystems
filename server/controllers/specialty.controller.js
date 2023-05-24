import specialtyModel from '../models/specialty.model.js';

let specialtyController = {
  createSpecialty: async (req, res) => {
    let result = {};
    const data = req.body;
    if (
      !data.name ||
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
        const newSpecialty = await specialtyModel.create({
          name: data.name,
          image: data.image,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        result = {
          errCode: 0,
          data: newSpecialty,
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
  getAllSpecialty: async (req, res, next) => {
    let result = {};
    try {
      const data = await specialtyModel.find({});
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
  getDetailSpecialtyById: async (req, res, next) => {},
};

export default specialtyController;
