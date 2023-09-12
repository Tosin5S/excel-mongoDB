const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.post('/upload', upload.single('file'), (req, res) => {
  // Handle the uploaded file here
  const file = req.file;
  // Process the Excel file and update MongoDB
  // ...
  res.send('File uploaded successfully.');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
