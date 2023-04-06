const express = require('express');
const router = express.Router();
const fs = require('fs')

router.get('/videoplayer', (req, res) => {
    const videoPath = './video_2023-03-31_22-58-44.mp4';
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
  
  module.exports = router;