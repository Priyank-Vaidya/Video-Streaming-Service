
# Video Streaming Application

This is the Video Streming application on Express, Configured to run on the server with basic streaming features



## API Reference

#### Content Stream

```http
  GET /api/videoplayground
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `video/mp4` | `byte` | **Required**: For Streaming on same network|



```http
  GET /api/download
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Content-Deposition` | `Attachment` | Attachment File Name/FileID |


## Optimizations in Future

When integrated with No-SQL or SQL databases in form of Grid-multer System or Blobs, streaming globally can be achieved. Building the DB File Systems to save and preview the byte content

---
## Implementation
1. Use of Node File System (fs)
2. Grid fs stream for streaming in mongodb
3. using Grid Bucker for storing the mp4 file in server


## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/priyank-vaidya/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/priyank_vaidya)

