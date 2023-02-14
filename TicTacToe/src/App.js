import { useState } from 'react'
import React from "react";

// Declare a component "Square" which returns a button.
// This component should pass down a function as a prop (onSquareClick) to its element attribute "onClick"
// This will further be responsible to trigger the "handleClick()" function declared in the main function.
// This is necessary so that we give the main function the control of the state variables.
// The state variables keeps track of the player's turn and the state of the board.
function Square({ value, onSquareClick }) {
    return <button className="square" onClick={onSquareClick}>{value}</button>;
}

export default function Board() {
    // Declare state variable to keep track of which player's turn, starts with "X" so let's called it "xIsNext"
    const [xIsNext, setXIsNext] = useState(true);
    // Declare another state variable to keep track of the current state of the game board.
    const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick(i) {
        // Does nothing if:
        // 1. Square clicked already contains a value.
        // 2. calculateWinner function declares a winner.
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        // Create a new copy of squares array
        const nextSquares = squares.slice();
        // Set a value in the new squares copy, using the indice passed by handleClick.
        // Swap between values 'X' or 'O' depending on if xIsNext state variable is set to true or false.
        if (xIsNext) {
            nextSquares[i] = "X";
        }
        else {
            nextSquares[i] = "O";
        }
        // Sets state of the squares (board) to the new array copy (nextSquares).
        setSquares(nextSquares);
        // Flip xIsNext for the next time a square is clicked.
        setXIsNext(!xIsNext);
    }

    // Declare variable that will hold the returned winner by the calculateWinner function
    const winner = calculateWinner(squares);
    // Declare a status variable to indicate the current status of the game after each turn.
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    }
    else {
        status = `Next player: ${xIsNext ? "X" : "O"}`;
    }

    return (
        // Return the elements to render the page.
        <div>

            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>

            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>

            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div >

        </div >
    );
}

function calculateWinner(squares) {
    // Create array that contains other arrays with possible combination of indices that makes a winner.
    const lines = [
        [0, 1, 2], // 1st row
        [3, 4, 5], // 2nd row
        [6, 7, 8], // 3rd row
        [0, 3, 6], // 1st column
        [1, 4, 7], // 2nd column
        [2, 5, 8], // 3rd column
        [0, 4, 8], // Right direction diagonal
        [2, 4, 6], // Left direction diagonal
    ];
    // Iterate through each array contained in lines array.
    for (let i = 0; i < lines.length; i++) {
        // Foreach array, extract the first, second and third indices into variables 'a', 'b' and 'c'.
        const [a, b, c] = lines[i];
        // Now first check if squares is not null and then use the indices ('a', 'b' and 'c') in the squares array to figure out if squares has a winning combination.
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}