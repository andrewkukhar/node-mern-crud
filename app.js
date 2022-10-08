const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;
const middleware = require('./middleware/auth.middleware.js');
app.use(middleware.auth);
app.use(cors());
app.use(express.json());
app.use(require('./routes/api'));
const mdb = require('./db/connect');

app.listen(port, () => {
    mdb.connectToServer((err) => {
        if (err) console.log(err)
    });
    console.log(`Server is running on  port:${port}`);
});