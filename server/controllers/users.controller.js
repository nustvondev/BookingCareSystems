import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';

const usersController = {
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
        // return next(createError(401, 'User or Password wrong!'));
        res.send({ errCode: 401, message: 'Wrong password!' });
      }
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_KEY
      );
      const { password, ...info } = user._doc;

      const dataRes = {
        errCode: 200,
        message: 'Login success',
        user: { ...info },
      };
      res
        .cookie('accessToken', token, {
          httpOnly: true,
        })
        .status(200)
        .send(dataRes);
    } catch (error) {
      console.log(error);
      next(createError(500, 'Some thing went wrong!'));
    }
  },

  logout: async (req, res) => {
    res
      .clearCookie('accessToken', {
        sameSite: 'none',
        secure: true,
      })
      .status(200)
      .send('User has been logged out.');
  },
  handleGetAllUsers: async (req, res, next) => {
    let id = req.query.id;
    let users = [];
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing parameter.',
        users,
      });
    }
    try {
      if (id === 'ALL') {
        users = await User.find({}).select('-password');
      }
      if (id && id !== 'ALL') {
        users = await User.findOne({ _id: id }).select('-password');
      }

      return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users,
      });
    } catch (error) {
      next(createError(500, 'Some thing went wrong!'));
    }
    res.send({ status: 200 });
  },

  handleCreateNewUser: async (req, res, next) => {
    if (!req.body) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing parameters!',
      });
    }
    try {
      let checkEmail = await User.find({ email: req.body.email });
      if (checkEmail.length > 0) {
        return res.status(200).json({
          errCode: 1,
          errMessage: 'Email is exit!',
        });
      }
      const hash = bcrypt.hashSync(req.body.password, 5);
      const newUser = new User({
        ...req.body,
        image:req.body.avatar,
        password: hash,
      });
      await newUser.save();
      res.status(201).json({
        errCode: 0,
        errMessage: 'Create user success!',
      });
    } catch (error) {
      next(createError(500, 'Some thing went wrong!'));
    }
  },
  handleEditUser: async (req, res, next) => {
    const data = req.body;
    if (!data.id) {
      return res
        .status(200)
        .json({ errCode: 2, errMessage: 'Missing parameters' });
    }
    try {
      const userUpdate = await User.findById(data.id);
      if (userUpdate) {
        userUpdate.firstName = data.firstName;
        userUpdate.image = data.avatar;
        userUpdate.lastName = data.lastName;
        userUpdate.address = data.address;
        userUpdate.roleId = data.roleId;
        userUpdate.positionId = data.positionId;
        userUpdate.gender = data.gender;
        userUpdate.phonenumber = data.phonenumber;
        // userUpdate.image = data.image;
        await userUpdate.save();
        res.status(200).json({
          errCode: 0,
          message: 'Update the user succeeds!',
        });
      }
    } catch (error) {
      next(createError(500, 'Some thing went wrong!'));
    }
  },
  handleDeleteUser: async (req, res, next) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing parameters!',
      });
    }

    try {
      const userDetect = await User.findByIdAndRemove(req.body.id);
      if (userDetect === null) {
        res.status(200).json({
          errCode: 1,
          message: `The user is not exit!`,
          userDetect,
        });
      }
      res.status(200).json({
        errCode: 0,
        message: `The user is deleted`,
        userDetect,
      });
    } catch (error) {
      console.log(error);
      next(createError(500, 'Some thing went wrong!'));
    }
  },
};

export default usersController;
