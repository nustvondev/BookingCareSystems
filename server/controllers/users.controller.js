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
                roleId: "2",
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
            const token = jwt.sign(
                {
                    id: user._id,
                },
                process.env.JWT_KEY
            );
            const { password, ...info } = user._doc;
            res
                .cookie('accessToken', token, {
                    httpOnly: true,
                })
                .status(200)
                .send(info);
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
};

export default usersController;