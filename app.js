require('dotenv').config()
const express = require('express');
const port = process.env.PORT || 3000;
var cors = require('cors');
require('./src/db/db');

const app = express();
app.use(cors());
var http = require('http').createServer(app);
app.use(express.json());

app.use((error, request, response, next) => {
    if (error !== null) {
        return response.json({ success: false, message: 'Invalid json' });
    }
    return next();
});

http.listen(port, () => {
    console.log(`Server running on port ${port}`);
})