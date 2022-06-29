require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes');
const PORT = process.env.PORT || 8000;
const DB = require('./database.js')
const cors = require('cors');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
DB();
const corsOption = {
    credentials: true,
    origin:['http://localhost:3000']
};
app.use('/store',express.static('store'))
app.use(cors(corsOption));
app.use(express.json({limit:'8mb'}));
app.use(express.urlencoded({extended:false}));
app.use(router);
app.get('/',(req, res) => {
    res.send('Hello World!');
});

app.listen(PORT,(req, res) => {
    console.log(`Server is running on PORT ${PORT}`);
});