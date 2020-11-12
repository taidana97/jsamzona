import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import data from './data';
import config from './config';
import userRouter from './routers/userRoute';
import orderRouter from './routers/orderRoute';
import productRouter from './routers/productRoute';
import uploadRouter from './routers/uploadRouter';

const app = express();

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((err) => {
    console.log(err.reason);
  });

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter);
app.use('/api/uploads', uploadRouter);

app.get('/api/paypal/clientid', (req, res) => {
  res.send({ clientId: config.PAYPAL_CLIENT_ID });
});

// app.get('/api/products', (req, res) => {
//   res.send(data.products);
// });

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((p) => p._id === req.params.id);

  if (product) res.send(product);
  else res.status(404).send({ message: 'Product Not Found!' });
});

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;

  res.status(status).send({ message: err.message });
});

app.listen(5000, () => {
  console.log('Server at http://localhost:5000');
});
