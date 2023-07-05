// Essentials
import React from 'react';

// Components
import RequestListPage from './list/RequestListPage';
import RequestDetailsPage from './details/RequestDetailsPage';

const sampleData = {
  address: "227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh",
  created_time: "2023-05-23 14:13:24",
  id: 89,
  products: [
      {
          category_name: "Đông lạnh",
          expired_time: "2023-06-23 00:00:00",
          image_filename: "product_image_487849f0ad47f36af0ab",
          name: "Thịt bò tươi",
          quantity: 2,
          unit: "kg"
      }
  ],
  status: "shipping",
  volunteer: {
      address: "280 Đ. An D. Vương, Phường 4, Quận 5, Thành phố Hồ Chí Minh",
      avatar: "akafatana@gmail.com_avatar",
      email: "akafatana@gmail.com",
      name: "Duy",
      phone: "0919127311",
      username: "akafatana"
  },
  user: {
      address: "227 Nguyễn Văn Cừ",
      avatar: "doneetung006@yopmail.com_avatar",
      email: "doneetung006@yopmail.com",
      name: "Trần Thanh Tùng",
      phone: "0919127311",
      user_type: "donee"
  }
};

const RequestPage = () => {
  return (
    <>
      <RequestDetailsPage request={sampleData} />
    </>
  );
};

export default RequestPage;
