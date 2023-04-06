const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const fs = require('fs');


//This code has to run saperately without connecting to the Client_URI
//As it uses normal mongo local host to host in database

mongoose.connect('mongodb://localhost/mydatabase');

const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;

conn.once('open', function () {
  console.log('MongoDB connected.');

  const gfs = Grid(conn.db);

  const writestream = gfs.createWriteStream({
    filename: 'Chipmunk.mp4'
  });


  fs.createReadStream('./content/Chipmunk.mp4').pipe(writestream);

  writestream.on('close', function (file) {
    console.log(file.filename + ' is saved to GridFS');
  });


  const fetch_file_id = function () {
    gfs.files.findOne({ filename: filename }, function (err, file) {
    if (err) {
      console.log(err);
    } else {
      const videoid = file._id;
      console.log(`Video ID: ${videoid}`);
      return videoid;
    }
  })  
}
});

module.exports = {fetch_file_id};

