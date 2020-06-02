# Jotto
### A React app with hooks and contexts used to demonstrate testing

## Solutions

Solutions can be found in the [SOLUTIONS for Jotto Hooks- Context Challenges](https://github.com/flyrightsister/udemy-react-testing-projects/tree/master/SOLUTIONS%20for%20Jotto%20Hooks-Context%20Challenges) folder.

## Challenges

### 1. Number of Guesses
  ![Number of Guesses Wireframe](https://github.com/flyrightsister/udemy-react-testing-projects/blob/master/jotto-redux/readme-images/number-of-guesses_wireframe.png)

  * _Note_: Try to accomplish this _without_ adding a new piece of state!
  * Add “guess number” column to the "guessed words" table
    * The first guess should show 1, second guess 2, etc.
  * Add a component that displays total guesses as shown in wireframe

### 2. Reset Game
  ![Reset Game Wireframe](https://github.com/flyrightsister/udemy-react-testing-projects/blob/master/jotto-redux/readme-images/new-game_wireframe.png)
  * Create a “New word” button component
    * only display after successful guess
  * Upon click, reset the game with a new word from the server
  * _Notes_: This one is going to need access to `setGuessedWords` and `setSuccess` to reset those pieces of state upon click. It can import `getSecretWord` from `actions/hookActions`, but it will need `setSecretWord` from `App.js` to pass as a callback to `getSecretWord`. I recommend passing `setSecretWord` as a prop.

  To test which components show up
  after clicking the New Word Button, try running `mount` on `App` after you've mocked
  `hookActions.getSecretWord` to run the callback function
  argument with the secretWord value (to avoid making a
  network call when `App` mounts). For example: 
  
  ```
  hookActions.getSecretWord = jest.fn(setSecretWord => setSecretWord('party'));
  ```

  Then you can find and click the new word button and test to see the state of various components. You might make a new integration test file for this, or you could keep these tests within NewWordButton.test.js -- your choice.

### 3. “Give up” Button
  ![Give Up Button Wireframe](https://github.com/flyrightsister/udemy-react-testing-projects/blob/master/jotto-redux/readme-images/give-up-button_wireframe.png)
  ![After Give Up Click Wireframe](https://github.com/flyrightsister/udemy-react-testing-projects/blob/master/jotto-redux/readme-images/after-give-up_wireframe.png)  
  
  * Create a “Give up” button
    * only display when word has not been guessed correctly
  * Upon click:
    * Show secret word
    * Display "better luck next time" message
    * Display “new word” button component
    * Set `success` context to `true` (the other components should display as though `success` is true; that is, no Input and show New Word button. The exception is Congrats of course!)
  * _Note_: This one is quite involved! One way to approach it: Update
    the `App` component to have `givenUp` as part of its state,
    and then display components depending on the values of
    `givenUp` and `success`. 
    You will also need to
    update the `NewWordButton` onClick to reset `givenUp`.

    You can use the same method to check on components after click as you did with Challenge #2. 

### 4. User inputs secret word
  ![Enter Secret Word Button Wireframe](https://github.com/flyrightsister/udemy-react-testing-projects/blob/master/jotto-redux/readme-images/enter-secret-word_wireframe.png)  
  ![Secret Word Entry Form Wireframe](https://github.com/flyrightsister/udemy-react-testing-projects/blob/master/jotto-redux/readme-images/secret-word-entry-form_wireframe.png)  

  * Add a button for the user to input the secret word
    * This way, the user can play against a friend
  * After submission, the game should use the user’s secret word, not a word from the server
  * This button should disapppear once the user has nonzero `guessedWords`

  * _Note: The entry form is another chance to practice with a state-controlled field._

### 5. Random Word Server Error
  ![Random Word Server Error Wireframe](https://github.com/flyrightsister/udemy-react-testing-projects/blob/master/jotto-redux/readme-images/random-word-server-error_wireframe.png) 

  * Display an error if:
    * There’s a problem contacting the “random word” server
    * The server responds with status 4xx or 5xx
 
## Credits
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
