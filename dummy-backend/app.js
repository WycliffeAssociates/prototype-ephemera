const express = require("express");
const request = require("request");
const fs = require("fs");
const { mapTaggedOSISToJSONFile } = require("./convertToOSIS");
const { newTestamentMetadata } = require("./newTestamentMetadata");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const generateBook = async (book) => {
  // TODO: add a fetch book method.
  let bookData = await mapTaggedOSISToJSONFile(book);
  return bookData;
};

const readFile = async (book) => {
  try {
    const data = await fs.promises.readFile(
      `./taggedOSIS/${book}.json`,
      "utf8"
    );
    return data;
  } catch (err) {
    return undefined;
  }
};

const getBook = async (res, book) => {
  let bookData = await readFile(book);

  // If book is found in local directory, return it
  if (bookData !== undefined) {
    res.json(bookData);
  } // Book must be fetched from repository and converted to OSIS
  else {
    let bookData = await generateBook(book);

    if (bookData === undefined) {
      res.status(404).send(new Error("invalid book name"));
    } else {
      res.json(bookData);
    }
  }
};

app.get("/", (req, res) => {
  let book = req.query.book;
  getBook(res, book);
});

app.get("/generateAllBooks", async (req, res) => {
  // add a loop here that generates all books
  Object.entries(newTestamentMetadata).forEach(async (newTestamentBook) => {
    let bookData = await generateBook(newTestamentBook[1].abbreviatedBook);

    if (bookData === undefined) {
      res.status(404).send(new Error("invalid book name"));
    }
  });
  res.json("generated all books");
  console.log("generated all OSIS compliant XML books");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
