FROM node:14-alpine
#chuẩn bị môi trường node.js, version node14/alpine

WORKDIR /bookingcare/backend
#tạo thư mục backend

COPY package*.json ./
#copy file package.json và package-lock.json

RUN npm install
#tiến hành cài thư viện cho dự án

COPY . .
#di chuyển toàn bộ file vào thư mục backend

CMD [ "npm","run", "build" ]
#khởi động ứng dụng
