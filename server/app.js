require('dotenv').config();
const express = require('express');
const path = require('path');
const router = require('./routes/index.js');

const PORT = 8000;
const DIST_DIR = path.resolve(__dirname, '..', 'client/dist');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));

router(app);

// set a route with /* so that react router will handldle any of those paths
app.get('/*', (req, res) => {

  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'), (err) => {
    if(err){
      res.sendStatus(500);
    }
  })

})

app.listen(PORT, () => {
  console.log(`Server is listening at: http://localhost:${PORT}`);
});
