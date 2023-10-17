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

// Import the Transaction model
const Transaction = require('./models/transactionsSchema');

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
 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
   
app.post('/upload', upload.single('file'), async (req, res) => {
// The uploaded file is stored in req.file
const file = req.file;

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
