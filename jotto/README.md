# Jotto
### A React / Redux app used to demonstrate testing

## Branches

*  `master`

  This branch represents the project at the end of the instructional videos, without any of the challenges completed.

* `jotto-challenges`

  This branch contains solutions to the challenges.

## Challenges

1. Number of Guesses
  * Add a component that shows total guesses
  * Add “guess number” column to the "guessed words" table
  * The first guess should show 1, second guess 2, etc.
  * _Note_: Try to accomplish this _without_ adding a new piece of state!

2. Reset Game
  * Add a “new word” button
    * Display after successful guess
  * Reset the game with a new word from the server

3. “Give up” Button
  * Create a “Give up” button
    * Display when word has not been guessed correctly
  * Upon click:
    * Show secret word
    * Display failure message
    * Display “new word” button

4. User inputs secret word
  * Add a feature where the user can input the secret word
    * If the user wants to play against a friend
    * In this case, use the user’s secret word, and not a word from the server

5. Can’t guess word twice
  * Add an error if the user guesses same word twice
  * Don’t add the word to `guessedWords` state

6. Random Word Server Error
  * Display an error if:
    * There’s a problem contacting the “random word” server
    * The server responds with status 4xx or 5xx

7. Use Wordnik to get secret word
  * Get a [Wordnik auth token](http://developer.wordnik.com/)
  * Use the [words/randomWord](http://developer.wordnik.com/docs.html) endpoint
 
  * the app shows you the word and displays a failure message
* Add a feature where you can enter your own secret word
  * if you want to play against a friend
* Add a feature where you show an error when a user guesses the same word twice.
  * and **don't** add it to the guessedWords list
* Display an error if there's a problem with response from secret word server
* Use wordnik to get the random word
  * Get an auth token (http://developer.wordnik.com/)
  * use the [`words.json/randomWord`](https://developer.wordnik.com/docs#!/words/getRandomWord) endpoint


## Credits
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
