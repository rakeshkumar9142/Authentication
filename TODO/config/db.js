const mongoose = require('mongoose');


const dbConnect = async() => {
    try{
      console.log('🔌 Trying to connect to:', process.env.a);
      const mongoDbConnection = await mongoose.connect(process.env.a);
      console.log('✅ Database is Connected:');
    }catch(error) {
        console.log('Database Connection failed',error.message);
        process.exit(1);
    }
};

module.exports = dbConnect;

