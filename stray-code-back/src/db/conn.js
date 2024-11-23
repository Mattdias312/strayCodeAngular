const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const {MONGO_URI} = process.env

async function main() {
    try {
        mongoose.set("strictQuery", true);
        
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(MONGO_URI);
        console.error('Failed to connect to MongoDB:', err); 
    }

//     mongoose.set("strictQuery", true);
// mongoose.connect('mongodb+srv://StrayCode:gSmpF3gxnOpFQEqn@cluster0.bxrwk.mongodb.net/<database>', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   tlsAllowInvalidCertificates: true,
// });

}

module.exports = main;