import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import createError from '../utils/createError.js';

const homeController = {
  getTestapi: (req, res) => {
    return res.render('test/testapi.ejs');
  },
  getTestapi2: (req, res) => {
    const datas = {
      name: 'hoa',
      age: 20,
    };
    return res.status(200).send(datas);
  },
  register: async (req, res, next) => {
    try {
      const hash = bcrypt.hashSync(req.body.password, 5);
      const newUser = new User({
        ...req.body,
        password: hash,
      });
      await newUser.save();
      res.status(201).send('Create user success');
    } catch (error) {
      console.log(error);
      next(createError(500, 'Some thing went wrong!'));
    }
  },
  login: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(createError(404, 'User not found!'));
      }
      const passwordData = user.password;
      const passwordInput = req.body.password;
      const isCorrect = bcrypt.compareSync(passwordInput, passwordData);

      if (!isCorrect) {
        return next(createError(400, 'User or Password wrong!'));
      }

      res.status(200).send(user);

    } catch (error) {
      console.log(error);
      next(createError(500, 'Some thing went wrong!'));
    }
  }
};
export default homeController;
