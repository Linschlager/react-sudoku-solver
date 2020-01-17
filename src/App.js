import React, {useEffect, useReducer} from 'react';
import uuid  from 'uuid';
import './App.css';
import solve  from "./tools/sudoku-solver";

const getEmptySudoku = () => [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const getDefaultSudoku = () => [
  [8, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 6, 0, 0, 0, 0, 0],
  [0, 7, 0, 0, 9, 0, 2, 0, 0],
  [0, 5, 0, 0, 0, 7, 0, 0, 0],
  [0, 0, 0, 0, 4, 5, 7, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 3, 0],
  [0, 0, 1, 0, 0, 0, 0, 6, 8],
  [0, 0, 8, 5, 0, 0, 0, 1, 0],
  [0, 9, 0, 0, 0, 0, 4, 0, 0],
];

const move = (current, direction) => {
  switch(direction) {
    case 'Up':
      return (current-9) % 81;
    case 'Down':
      return (current+9) % 81;
    case 'Left':
      return (current-1) % 81;
    case 'Right':
      return (current+1) % 81;
    default:
      return current;
  }
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SELECTED':
      return {
        ...state,
        selected: action.payload,
      };
    case 'MOVE_SELECTED':
      return {
        ...state,
        selected: move(state.selected, action.payload)
      };
    case 'UPDATE_FIELD':
      return {
        ...state,
        sudoku: state.sudoku.map((row, rowI) => row.map((col, colI) => {
          if (rowI === action.payload.row && colI === action.payload.col)
            return action.payload.value;
          return col;
        })),
      };
    case 'UPDATE_SUDOKU':
      return {
        ...state,
        sudoku: action.payload,
      };
    case 'REMOVE_QUEUE_ITEM':
      return {
        ...state,
        queue: state.queue.filter(item => item.id !== action.payload),
      };
    case 'QUEUE_UPDATE_FIELD':
      return {
        ...state,
        queue: [
          ...state.queue,
          {
            id: uuid.v4(),
            ...action.payload
          },
        ]
      };
    case 'CLEAR':
      return {
        ...state,
        sudoku: getEmptySudoku(),
        queue: [],
        selected: -1
      };
    default:
      console.error(action);
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, {selected: -1, sudoku: getDefaultSudoku(), queue: []});
  useEffect(() => {
    const onKey = (e) => {
      if (e.code.startsWith('Digit')) {
        dispatch({
          type: 'UPDATE_FIELD',
          payload: {
            row: Math.floor(state.selected / 9),
            col: state.selected % 9,
            value: parseInt(e.key)
          }
        });
      } else if (e.code.startsWith('Arrow')) {
        dispatch({
          type: 'MOVE_SELECTED',
          payload: e.code.substring(5)
        });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey)
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (state.queue.length > 0) {
        const nextAction = state.queue[0];
        dispatch({ type: 'REMOVE_QUEUE_ITEM', payload: nextAction.id });
        dispatch({ type: 'UPDATE_FIELD', payload: nextAction });
      }
    }, 20);
    return () => clearInterval(intervalId);
  }, [state.queue, ]);
  const solveSudoku = () => {
    const possibleSolutions = solve(state.sudoku);
    dispatch({
      type: 'UPDATE_SUDOKU',
      payload: possibleSolutions[0]
    });
  };
  const clearSudoku = () => {
    dispatch({
      type: 'CLEAR',
    });
  };

  return (
    <div className="App">
      <div className="sudoku">
        {state.sudoku.map((row, rowI) => (
          <div className="row" key={`row-${rowI}`}>
            {row.map((col, colI) => {
              const index = rowI * 9 + colI;
              const selectedClass = state.selected === index ? 'selected' : '';
              return (
                <div
                  key={`col-${colI}`}
                  className={`col ${selectedClass}`}
                  onClick={() => dispatch({ type: 'SET_SELECTED', payload: index })}
                >
                  <div className={`field`}>
                    {col > 0 ? col : ''}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button onClick={solveSudoku}>Solve Sudoku</button>
      <button onClick={clearSudoku}>Clear</button>
    </div>
  );
};

export default App;
