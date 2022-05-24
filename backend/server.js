const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
require('./database');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

// API
const water_level = require('./api/waterLevel');
const channels = require('./api/channels')

app.use('/api/channels', channels)
app.use('/api/water_level', water_level);

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});