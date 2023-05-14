import User from '../models/user.model.js';
import Allcode from '../models/allcode.model.js'
const doctorController = {
    getTopDoctorHome: async (req, res) => {
        let limit = req.query.limit;
        if (!limit) limit = 10;
        try {
            let positionData = await Allcode.find({keyMap : "R2"}).select('valueEn valueVi -_id')
            let response = await User.find({roleId: 'R2'}).limit(+limit).sort({'createdAt': -1}).select('-password').populate('')
            await Promise.all(response.map(async (obj) => {
                obj.genderData = await Allcode.find({ keyMap: obj.gender }).select('valueEn valueVi -_id');
                obj.positionData = positionData;
            }));
            return res.status(200).json(response);
        } catch (e) {
            console.log(e);
            return res.status(200).json({
                errCode: -1,
                message: 'Error from server...'
            })
        }
    }

}


export default doctorController