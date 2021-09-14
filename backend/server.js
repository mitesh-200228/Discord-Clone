require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes');
const PORT = process.env.PORT || 8000;
const cors = require('cors')

const corsOption = {
    origin:['http://localhost:3000']
};

app.use(cors(corsOption));
app.use(express.json());
app.use(router);
app.get('/',(req, res) => {
    res.send('Hello World!');
});


app.listen(PORT,(req, res) => {
    console.log(`Server is running on PORT ${PORT}`);
});