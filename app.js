const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const mongoose = require('mongoose');
const upload = multer({ dest: 'uploads/' });

const app = express();

// Define a schema for transactions 
const transactionsSchema = new mongoose.Schema({
    // Define your transaction fields here
})

const Transaction = mongoose.model('Transaction', transactionsSchema);
 


app.post('/upload', upload.single('file'), async (req, res) => {
  // Handle the uploaded file here
  const file = req.file;
  const workbook = xlsx.readFile(file.path);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  // Process the Excel file and update MongoDB
  try {
    // Insert the data into MongoDB
    await Transaction.insertMany(data);
    res.send('File uploaded and data inserted into MongoDB successfully.');
  } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        res.status(500).send('Internal server error');
    }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
