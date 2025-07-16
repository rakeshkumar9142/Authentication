const connect = require('mongoose');


const dbConnect = async() => {
    try{
      console.log('🔌 Trying to connect to:', process.env.CONNECTION_STRING);
      const mongoDbConnection = await mongoose.connect(process.env.CONNECTION_STRING);
      console.log(`✅ Database is Connected: ${mongoDbConnection.connection.host}`);
    }catch(error) {
        console.log('Database Connection failed');
        //process.exit(1);
    }
};

module.exports = dbConnect;