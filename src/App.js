import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import { checkAllFeedback } from "./tools/sudoku-checker";

const emptySudoku = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
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
      console.log(action);
      return {
        ...state,
        sudoku: state.sudoku.map((row, rowI) => row.map((col, colI) => {
          if (rowI === action.payload.row && colI === action.payload.col)
            return action.payload.value;
          return col;
        })),
      };

    default:
      console.error(action);
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, {selected: -1, sudoku: emptySudoku});
  const [invalidFields, setInvalidFields] = useState([]);
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
        console.log(e);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey)
  });
  const validateSudoku = () => {
    setInvalidFields(checkAllFeedback(state.sudoku));
  };
  return (
   <div className="App">
     <div className="sudoku">
       {state.sudoku.map((row, rowI) => (
        <div className="row" key={`row-${rowI}`}>
          {row.map((col, colI) => {
            const index = rowI * 9 + colI;
            const validityClass = invalidFields.includes(index) ? 'invalid' : 'valid';
            const selectedClass = state.selected === index ? 'selected' : '';
            return (
             <div
              key={`col-${colI}`}
              className={`col ${validityClass} ${selectedClass}`}
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
     <button onClick={validateSudoku}>Check Solution</button>
   </div>
  );
};

export default App;
