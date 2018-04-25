const express = require('express');
const fs = require('fs');

const app = express();

// read words from json file
const fileContents = fs.readFileSync('./five-letter-words.json', 'utf-8');
const words = JSON.parse(fileContents);
const { fiveLetterWords } = words;

app.get('/', (req, res) => {
  // select a random word
  const word = fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)]

  // return it as the response
  res.send(word)
})

app.listen(3030, () => console.log('Word server listening on port 3030!'))

module.exports = app;