const express = require('express');
const router = express.Router();
const fs = require('fs')
// const {db, bucket} = require('./db/handleDB');
// const {fetch_file_id} = require('./db/uploadDB');

// -----------------------------------------------------------------------------------------------------------
// Code Implemented Streaming from Local System

//API Endpoint for streaming the content
router.get('/videoplayer', (req, res) => {
    const videoPath = './content/Chipmunk.mp4';
    const videoSize = fs.statSync(videoPath).size;
    const chunkSize = 1 * 1e6;
    const headers = {
      "Accept-Ranges": "bytes",
      "Content-Type": "video/mp4"
    };
    
    const range = req.headers.range;
    //In certain cases ranges are undefined
    //So implementing with creatingReadStream pipe works better
    if (!range) {
      headers['Content-Length'] = videoSize;
      res.writeHead(200, headers);
      fs.createReadStream(videoPath).pipe(res);
    } 
    //If the range gets defined, the streaming happens with chunks
    //Chunks image gets streamed

    else {
    
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + chunkSize, videoSize - 1);
      const contentLength = end - start + 1;
      headers["Content-Range"] = `bytes ${start}-${end}/${videoSize}`;
      headers["Content-Length"] = contentLength;
      res.writeHead(206, headers);
      fs.createReadStream(videoPath, { start, end }).pipe(res);
    }
  });

  //API Endpoint for Downloading the content
  router.get('/download', (req, res)=>{
    const videoPath = './video_2023-03-31_22-58-44.mp4';
    const headers = {
        "Content-Deposition": "attachment; filename=content/Chipmunk.mp4"
    }
    res.download(videoPath, ()=>{
        res.status(400).send("Error Occured while downloading")
    });

  res.writeHead(200, headers);
  fs.createReadStream(videoPath).pipe(res);
  })

  
  module.exports = router;


// --------------------------------------------------------------------------------------------------------------
// Code Implemented for Streaming Directly from MongoDB Server
//  
//   //While Implementing with streaming from Database;
//   router.get('/videoplayer', (req, res) => {
//     const videoId = fetch_file_id;

  
//     // Get the video file from MongoDB using GridFS
//     const stream = bucket.openDownloadStream(videoId);
  
//     // Set headers for the response
//     res.set('Content-Type', 'video/mp4');
//     res.set('Content-Disposition', 'inline');
  
//     // Pipe the stream to the response
//     stream.pipe(res);
//   });

//   router.get('/download', (req, res) => {
//     const videoId = fetch_file_id;
  
//     // Get the video file from MongoDB using GridFS
//     const stream = bucket.openDownloadStream(videoId);
  
//     // Set headers for the response
//     res.set('Content-Type', 'application/octet-stream');
//     res.set('Content-Disposition', 'attachment; filename=video.mp4');
  
//     // Pipe the stream to the response
//     stream.pipe(res);
//   });