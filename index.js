const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const app = express();

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 413 && 'body' in err) {
    res.status(413).json({ error: 'Payload size limit exceeded' });
  } else {
    next(err);
  }
});

app.use(morgan("tiny"));


const connectDB = require("./server/database/connection");
const route_Books = require("./server/routes/books.routes");
const route_users = require("./server/routes/users.routes");
const route_Categories = require("./server/routes/categories.routes");





app.use("/api/v1/books/",route_Books );
app.use("/api/v1/users/",route_users );
app.use("/api/v1/categories/",route_Categories );

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`server is running at http://localhost:${process.env.PORT}`);
});
