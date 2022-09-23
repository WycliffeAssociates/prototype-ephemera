
const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/greekWord', (req, res) => {

  let strongs = req.query.strongs;
  let range = req.query.range;

  request(
    { url: `https://content.bibletranslationtools.org/WycliffeAssociates/en_gwt/raw/branch/master/${range}/${strongs}.md` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error });
      }
      res.json((body));
    }
  )
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`listening on ${PORT}`));