const mongoose = require('mongoose');
const connection = "mongodb+srv://yvette:WeyVVx8lnfQQXqpu@cluster0.anw4fgg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, console.log(`Database Connected Successfully`))
    .catch(err => console.log(err));