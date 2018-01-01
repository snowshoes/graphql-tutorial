import Mongoose from 'mongoose';

// get mongoose to use the global promise library
Mongoose.Promise = global.Promise;

// set up default mongodb connection
Mongoose.connect('mongodb://localhost/user', {
  useMongoClient: true
});

Mongoose.connection
  .on('error', () => {
    console.error.bind(
      console,
      'Error: Could not connect to MongoDB. Did you forget to run `mongod`?'
        .bold
    );
  })
  .on('open', () => {
    console.log('Connection success with mongoDB!');
  });

export default Mongoose;
