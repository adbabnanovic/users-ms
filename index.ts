import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import apiRoutes from './src/routes/api-routes';

const app = express();

const port = process.env.PORT || 8080;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/resthub', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;

app.get('/', (req, res) => res.send('Hello World with Express'));

app.listen(port, () => {
  console.log(`Running Users MS on port ${port}`);
});

app.use('/api', apiRoutes);
