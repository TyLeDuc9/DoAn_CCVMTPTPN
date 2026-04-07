FROM node:20-alpine

# Cài đặt thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn backend
COPY . .

# Expose port (Cloud Run thường cung cấp PORT qua biến môi trường)
EXPOSE 8000

# Chạy ứng dụng
CMD ["npm", "start"]
