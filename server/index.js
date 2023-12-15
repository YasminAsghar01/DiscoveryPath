const path = require('path');
const express = require("express");
const cors = require('cors');
const db = require('../db/database')

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/build')));


app.get("/project-list", async (req, res) => {
  const [names] = await db.query('SELECT * FROM discoverypath.projects');
  res.json({ message: names.map(n => n.name) });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
