import React, { useState } from 'react'

type Square = ' ' | '_' | 'F' | '*' | '@' | '1-8'
type Row = [Square, Square, Square, Square, Square, Square, Square, Square]
type Board = [Row, Row, Row, Row, Row, Row, Row, Row]
type Game = {
  board: Board
  id: null | number
  state: null | string
  mines: null | number
}

export function App() {
  const [game, setGame] = useState<Game>({
    board: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
    id: null,
    state: null,
    mines: null,
  })
  async function handleClickCellCheck(row: number, column: number) {
    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/check`
    const body = { row: row, col: column }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (response.ok) {
      const newGameState = await response.json()
      setGame(newGameState)
    }
  }

  async function handleClickCellFlag(row: number, column: number) {
    event?.preventDefault()

    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/flag`
    const body = { row: row, col: column }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (response.ok) {
      const newGameState = await response.json()
      setGame(newGameState)
    }
  }
  async function handleNewGame() {
    const response = await fetch(
      'https://minesweeper-api.herokuapp.com/games',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      }
    )
    if (response.ok) {
      const newGameState = await response.json()
      setGame(newGameState)
    }
  }
  //create header code here to handle won/lost state

  let header
  switch (game.state) {
    case 'won':
      header = 'YOU WON!'
      break
    case 'lost':
      header = 'YOU LOST!'
      break
    default:
      header = 'MINESWEEPER!'
  }

  return (
    <div>
      <h1>{header}</h1>
      <h2>
        <button onClick={handleNewGame}>New game</button>
      </h2>
      <ul>
        {game.board.map((boardRow, rowIndex) => {
          return boardRow.map((cell, columnIndex) => {
            return (
              <li
                key={columnIndex}
                className={cell === ' ' ? undefined : 'taken'}
                onClick={() => handleClickCellCheck(rowIndex, columnIndex)}
                onContextMenu={() => handleClickCellFlag(rowIndex, columnIndex)}
              >
                {cell}
              </li>
            )
          })
        })}
      </ul>
    </div>
  )
}
