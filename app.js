const express = require('express');
const multer = require('multer');
const mongoXlsx = require('mongo-xlsx');
const mongoose = require('mongoose');
const upload = multer({ dest: 'uploads/' });
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// DB Config
const dbConfig =require("./config/keys").mongoURI;

// Define the initial function
function initial() {
  // Your initialization code here
  console.log("Initialization code executed");
}

// Connect to MongoDB
mongoose
   .connect(
      dbConfig,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
   )
   .then(() => {
      console.log("MongoDB successfully connected");
      initial();
   })
   .catch(err => {
      console.error("connection error", err);
      process.exit();
   });
   
// Define a schema for transactions 
const transactionsSchema = new mongoose.Schema({
    // Define your transaction fields here
})

const Transaction = mongoose.model('Transaction', transactionsSchema);
 


app.post('/upload', upload.single('file'), async (req, res) => {
  // Handle the uploaded file here
//  const file = req.file;
//  const workbook = xlsx.readFile(file.path);
//  const sheetName = workbook.SheetNames[0];
//  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  // Process the Excel file and update MongoDB
//  try {
    // Insert the data into MongoDB
//    await Transaction.insertMany(data);
//    res.send('File uploaded and data inserted into MongoDB successfully.');
//  } catch (error) {
//        console.error('Error inserting data into MongoDB:', error);
//        res.status(500).send('Internal server error');
//    }
// });

// Use mongo-xlsx to parse the Excel file
const model = mongoXlsx.xlsxToModel(file.path);

// Extract the data frome the model
const data = model[0].data;

// Insert the data into MongoDB
Transaction.insertMany(data, (err) => {
  if (err) {
    console.error('Error inserting data into MongoDB:', err);
    res.status(500).send('Internal server error');
  } else {
    res.send('File uploaded and data inserted into MongoDB successfully');
  }
});
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
