const mongoose = require('mongoose');
const connection = "mongodb+srv://ezemonye:nH9R4oEMsVWRNbCa@cluster0.db3dx.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, console.log(`Database Connected Successfully`))
    .catch(err => console.log(err));