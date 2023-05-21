//const Allcode = require('../models/allcode.model.js');
import Allcode from '../models/allcode.model.js';

export const migration = async () => {
  const allCodes = [
    { type: 'ROLE', keyMap: 'R1', valueEn: 'Admin', valueVi: 'Quản trị viên' },
    { type: 'ROLE', keyMap: 'R2', valueEn: 'Doctor', valueVi: 'Bác sĩ' },
    { type: 'ROLE', keyMap: 'R3', valueEn: 'Patient', valueVi: 'Bệnh nhân' },
    { type: 'STATUS', keyMap: 'S1', valueEn: 'New', valueVi: 'Lịch hẹn mới' },
    {
      type: 'STATUS',
      keyMap: 'S2',
      valueEn: 'Confirmed',
      valueVi: 'Đã xác nhận',
    },
    {
      type: 'STATUS',
      keyMap: 'S3',
      valueEn: 'Done',
      valueVi: 'Đã khám xong',
    },
    { type: 'STATUS', keyMap: 'S4', valueEn: 'Cancel', valueVi: 'Đã hủy' },
    {
      type: 'TIME',
      keyMap: 'T1',
      valueEn: '8:00 AM - 9:00 AM',
      valueVi: '8:00 - 9:00',
    },
    {
      type: 'TIME',
      keyMap: 'T2',
      valueEn: '9:00 AM - 10:00 AM',
      valueVi: '9:00 - 10:00',
    },
    {
      type: 'TIME',
      keyMap: 'T3',
      valueEn: '10:00 AM - 11:00 AM',
      valueVi: '10:00 - 11:00',
    },
    {
      type: 'TIME',
      keyMap: 'T4',
      valueEn: '11:00 AM - 0:00 PM',
      valueVi: '11:00 - 12:00',
    },
    {
      type: 'TIME',
      keyMap: 'T5',
      valueEn: '1:00 PM - 2:00 PM',
      valueVi: '13:00 - 14:00',
    },
    {
      type: 'TIME',
      keyMap: 'T6',
      valueEn: '2:00 PM - 3:00 PM',
      valueVi: '14:00 - 15:00',
    },
    {
      type: 'TIME',
      keyMap: 'T7',
      valueEn: '3:00 PM - 4:00 PM',
      valueVi: '15:00 - 16:00',
    },
    {
      type: 'TIME',
      keyMap: 'T8',
      valueEn: '4:00 PM - 5:00 PM',
      valueVi: '16:00 - 17:00',
    },
    { type: 'POSITION', keyMap: 'P0', valueEn: 'Doctor', valueVi: 'Bác sĩ' },
    { type: 'POSITION', keyMap: 'P1', valueEn: 'Master', valueVi: 'Thạc sĩ' },
    { type: 'POSITION', keyMap: 'P2', valueEn: 'PhD', valueVi: 'Tiến sĩ' },
    {
      type: 'POSITION',
      keyMap: 'P3',
      valueEn: 'Associate Professor',
      valueVi: 'Phó giáo sư',
    },
    {
      type: 'POSITION',
      keyMap: 'P4',
      valueEn: 'Professor',
      valueVi: 'Giáo sư',
    },
    { type: 'GENDER', keyMap: 'M', valueEn: 'Male', valueVi: 'Nam' },
    { type: 'GENDER', keyMap: 'F', valueEn: 'Female', valueVi: 'Nữ' },
    { type: 'GENDER', keyMap: 'O', valueEn: 'Other', valueVi: 'Khác' },
    { type: 'PRICE', keyMap: 'PRI1', valueEn: '10', valueVi: '200000' },
    { type: 'PRICE', keyMap: 'PRI2', valueEn: '15', valueVi: '250000' },
    { type: 'PRICE', keyMap: 'PRI3', valueEn: '20', valueVi: '300000' },
    { type: 'PRICE', keyMap: 'PRI4', valueEn: '25', valueVi: '350000' },
    { type: 'PRICE', keyMap: 'PRI5', valueEn: '30', valueVi: '400000' },
    { type: 'PRICE', keyMap: 'PRI6', valueEn: '35', valueVi: '450000' },
    { type: 'PRICE', keyMap: 'PRI7', valueEn: '40', valueVi: '500000' },
    { type: 'PAYMENT', keyMap: 'PAY1', valueEn: 'Cash', valueVi: 'Tiền mặt' },
    {
      type: 'PAYMENT',
      keyMap: 'PAY2',
      valueEn: 'Credit card',
      valueVi: 'Thẻ ATM',
    },
    {
      type: 'PAYMENT',
      keyMap: 'PAY3',
      valueEn: 'All payment method',
      valueVi: 'Tất cả',
    },
    { type: 'PROVINCE', keyMap: 'PRO1', valueEn: 'Ha Noi', valueVi: 'Hà Nội' },
    {
      type: 'PROVINCE',
      keyMap: 'PRO2',
      valueEn: 'Ho Chi Minh',
      valueVi: 'Hồ Chí Minh',
    },
    {
      type: 'PROVINCE',
      keyMap: 'PRO3',
      valueEn: 'Da Nang',
      valueVi: 'Đà Nẵng',
    },
    {
      type: 'PROVINCE',
      keyMap: 'PRO4',
      valueEn: 'Can Tho',
      valueVi: 'Cần Thơ',
    },
    {
      type: 'PROVINCE',
      keyMap: 'PRO5',
      valueEn: 'Binh Duong',
      valueVi: 'Bình Dương',
    },
    {
      type: 'PROVINCE',
      keyMap: 'PRO6',
      valueEn: 'Dong Nai',
      valueVi: 'Đồng Nai',
    },
    {
      type: 'PROVINCE',
      keyMap: 'PRO7',
      valueEn: 'Quang Ninh',
      valueVi: 'Quảng Ninh',
    },
    {
      type: 'PROVINCE',
      keyMap: 'PRO8',
      valueEn: 'Hue',
      valueVi: 'Thừa Thiên Huế',
    },
    {
      type: 'PROVINCE',
      keyMap: 'PRO9',
      valueEn: 'Quang Binh',
      valueVi: 'Quảng Bình',
    },
    {
      type: 'PROVINCE',
      keyMap: 'PRO10',
      valueEn: 'Khanh Hoa',
      valueVi: 'Khánh Hòa',
    },
  ];

  const counter = await Allcode.count({});

  if (counter < 43) {
    try {
      const removeData = await Allcode.deleteMany({});
      console.log('Xoa data cu: ');
      console.log(removeData);
      try {
        const insertData = await Allcode.insertMany(allCodes);
        console.log('Mifration thanh cong!');
      } catch (error) {
        console.log(error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
};
