import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
const dbo = require("./db/conn");

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

require('dotenv').config({
    path: './config.env'
});

app.listen(PORT, () => {
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
});