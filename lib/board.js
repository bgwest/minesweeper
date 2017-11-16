'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    /* Note to self:
        this is the first time I have seen a function being called from the same class it is within, 
        without 'this' keyword. I assume it's because it is inside the constructor? 
        A scope definition I may not know yet? */
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
        //return gameOver = true;
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        //return gameOver = false;
      }
      this._numberOfTiles--;
    } // comment out the semicolon? are arrow functions supported in classes??

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      // 8 arrays within an array - a two dimensional array
      // aka the possible positions of a bomb at any given point, some pos's may be
      // null in which no check for a bomb is needed
      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], /*,['0, 0'],*/[0, 1], [1, -1], [1, 0], [1, 1]];

      var numberOfRows = this._bombBoard.length;
      // just needs one of the rows element count, all cols in this example are the
      // same length
      var numberOfColumns = this._bombBoard[0].length;

      var numberOfBombs = 0;

      neighborOffsets.forEach(function (offset) {
        // iterates through each array element referencing each of it's properties,
        // 0,1. +1 to whatever that index happens to be
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          // if the tile is valid aka not "off the board"
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    } // ; commented out the semicolon, are arrow functions supported in classes??

  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      // truthy, implicit return
      return this._numberOfTiles !== this._numberOfBombs;
    }

    /* Iterate through the null values returned with playerBoard or bombBoard, at run time. 
         It is taking the null value and joining it with a |
         e.g. " | " " | " " | ".\n (the escaped n adds a new line at the end of each
       array element, within the nested array */

  }, {
    key: 'print',
    value: function print() {
      //console.log(this._board.map(row => row.join(' | ')).join('\n'));
      //console.log(this._board.playerBoard.map(row => row.join(' | ')).join('\n'));
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }

    // Player board

  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var rowIndex = 0; rowIndex <= numberOfRows - 1; rowIndex++) {
        var row = [];
        for (var colIndex = 0; colIndex <= numberOfColumns - 1; colIndex++) {
          row.push(' ');
        }board.push(row);
      }return board;
    }

    // Bomb board

  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      for (var rowIndex = 0; rowIndex <= numberOfRows - 1; rowIndex++) {
        var row = [];
        for (var colIndex = 0; colIndex <= numberOfColumns - 1; colIndex++) {
          row.push(null);
        }board.push(row);
      }
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColIndex] !== 'B') {
          board[randomRowIndex][randomColIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  }]);

  return Board;
}();