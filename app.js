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

  // Read Excel and convert to MongoData
  mongoXlsx.xlsx2MongoData(file.path, null, async function (err, mongoData) {
    if (err) {
      console.error('Error converting Excel to MongoData:', err);
      res.status(500).send('Internal server error');
    } else {
      try {
        // Insert the data into MongoDB using await
        await Transaction.insertMany(mongoData);
        res.send('File uploaded and data inserted into MongoDB successfully');
      } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        res.status(500).send('Internal server error');
      }
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
