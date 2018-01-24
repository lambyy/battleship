# Battleship

Battleship is a two-player game played in the terminal. Players first take turns setting up their own board with ships of various sizes. After both boards are setup, players take turns to attack squares on their opponents boards. The first player to sink all the ships on the opposing board wins.

## Installation

```
// clone repository
git pull https://github.com/lambyy/battleship.git

// install dependencies
npm install
```

## Jasmine Tests
To run Jasmine test specs

`npm test`

To run a single Jasmine test spec file

`npm test spec/file_name.js`

## Play

Begin a new game of Battleship on 5x5 boards and two ships of length 2.

`npm start`

Initialize Battleship games with different sized boards and ship pieces by changing their values in `index.js`.
