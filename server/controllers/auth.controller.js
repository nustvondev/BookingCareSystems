import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
export const regiser = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send('tao user thanh cong!');
  } catch (error) {
    res.status(500).send('Loi server!');
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).send('Khong tim thay user');

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return res.status(400).send('user hoac password k dung');

    const { password, ...info } = user;
    res.status(200).send(info);
  } catch (error) {
    console.log(error);
    res.status(500).send('Loi server!');
  }
};
