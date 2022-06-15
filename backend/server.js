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
const yves = require('./api/yves');
const olas = require('./api/olas')

app.use('/api/yves', yves)
app.use('/api/olas', olas);

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});