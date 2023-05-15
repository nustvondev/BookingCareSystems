//const Allcode = require('../models/allcode.model.js');
import Allcode from '../models/allcode.model.js'

export const migration = async () => {
    const allCodes = [
        { type: 'ROLE', keyMap: 'R1', valueEn: 'Admin', valueVi: 'Quản trị viên' },
        { type: 'ROLE', keyMap: 'R2', valueEn: 'Doctor', valueVi: 'Bác sĩ' },
        { type: 'ROLE', keyMap: 'R3', valueEn: 'Patient', valueVi: 'Bệnh nhân' },

        { type: 'STATUS', keyMap: 'S1', valueEn: 'New', valueVi: 'Lịch hẹn mới' },
        { type: 'STATUS', keyMap: 'S2', valueEn: 'Confirmed', valueVi: 'Đã xác nhận' },
        { type: 'STATUS', keyMapMap: 'S3', valueEn: 'Done', valueVi: 'Đã khám xong' },
        { type: 'STATUS', keyMap: 'S4', valueEn: 'Cancel', valueVi: 'Đã hủy' },

        { type: 'TIME', keyMap: 'T1', valueEn: '8:00 AM - 9:00 AM', valueVi: '8:00 - 9:00' },
        { type: 'TIME', keyMap: 'T2', valueEn: '9:00 AM - 10:00 AM', valueVi: '9:00 - 10:00' },
        { type: 'TIME', keyMap: 'T3', valueEn: '10:00 AM - 11:00 AM', valueVi: '10:00 - 11:00' },
        { type: 'TIME', keyMap: 'T4', valueEn: '11:00 AM - 0:00 PM', valueVi: '11:00 - 12:00' },

        { type: 'TIME', keyMap: 'T5', valueEn: '1:00 PM - 2:00 PM', valueVi: '13:00 - 14:00' },
        { type: 'TIME', keyMap: 'T6', valueEn: '2:00 PM - 3:00 PM', valueVi: '14:00 - 15:00' },
        { type: 'TIME', keyMap: 'T7', valueEn: '3:00 PM - 4:00 PM', valueVi: '15:00 - 16:00' },
        { type: 'TIME', keyMap: 'T8', valueEn: '4:00 PM - 5:00 PM', valueVi: '16:00 - 17:00' },

        { type: 'POSITION', keyMap: 'P0', valueEn: 'None', valueVi: 'Bác sĩ' },
        { type: 'POSITION', keyMap: 'P1', valueEn: 'Master', valueVi: 'Thạc sĩ' },
        { type: 'POSITION', keyMap: 'P2', valueEn: 'Doctor', valueVi: 'Tiến sĩ' },
        { type: 'POSITION', keyMap: 'P3', valueEn: 'Associate Professor', valueVi: 'Phó giáo sư' },
        { type: 'POSITION', keyMap: 'P4', valueEn: 'Professor', valueVi: 'Giáo sư' },

        { type: 'GENDER', keyMap: 'M', valueEn: 'Male', valueVi: 'Nam' },
        { type: 'GENDER', keyMap: 'F', valueEn: 'Female', valueVi: 'Nữ' },
        { type: 'GENDER', keyMap: 'O', valueEn: 'Other', valueVi: 'Khác' },
    ];

    const counter = await Allcode.count({})

    if (counter < 23) {
        Allcode.bulkWrite(allCodes.map(user => ({
            insertOne: {
                document: user
            }
        }))
        ).then(function () {
            console.log("Successfully saved defult items to DB");
        })
            .catch(function (err) {
                console.log(err);
            });;
    }
};