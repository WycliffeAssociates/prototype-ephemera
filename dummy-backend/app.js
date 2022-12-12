const express = require('express');
const request = require('request');
const fs = require('fs');
const {mapTaggedOSISToJSONFile} = require('./convertToOSIS');


const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.get('/', (req, res) => {

  let book = req.query.book;

  const generateBook = async () => {
    let bookData = await mapTaggedOSISToJSONFile(book);
    return bookData;
  }


  const readFile = async () => {
    try {
      const data = await fs.promises.readFile(`./taggedOSIS/${book}.json`, 'utf8');
      return data
    }
    catch(err) {
      return undefined;
    }
  }


  const getBook = async () => {


    let bookData = await readFile();

    if(bookData !== undefined)
    {
      res.json(bookData);
    }
    else
    {
      let bookData = await generateBook();
      
      if(bookData === undefined)
      {
        res.status(404).send(new Error('invalid book name'));
      }
      else
      {
        res.json(bookData);
      }
      
    }
  }

  getBook();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`listening on ${PORT}`));