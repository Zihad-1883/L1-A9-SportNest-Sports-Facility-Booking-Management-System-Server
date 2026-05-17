const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

app.get('/' , async (req , res) => {
    res.send('server is running fine');
})

app.listen(port , () => {
    console.log(`Server is running on port ${port}`)
})