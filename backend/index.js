const dotenv = require('dotenv');
dotenv.config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/authRoute');
const categoryRoute = require('./routes/categoryRoute');
const supplierRoute = require('./routes/supplierRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');
const addressRoute = require('./routes/addressRoute');


const app = express();

mongoose.connect(process.env.MONGODB_URL) 
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware header
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});


app.use(cors({
  origin: [
    "http://localhost:5173",
  ],
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoute);
app.use('/category', categoryRoute);
app.use('/cart', cartRoute);
app.use('/supplier', supplierRoute);
app.use('/product', productRoute);
app.use('/user', userRoute);
app.use('/order', orderRoute);
app.use('/address', addressRoute);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});