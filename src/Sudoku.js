import React from 'react';
import './Sudoku.css';

const Sudoku = ({ data: sudoku, selectedField, select }) => {
  if (!sudoku) return "No solution found";
  return (
    <div className="sudoku">
      {sudoku.map((row, rowI) => (
        <div className="row" key={`row-${rowI}`}>
          {row.map((col, colI) => {
            const index = rowI * 9 + colI;
            const selectedClass = selectedField === index ? 'selected' : '';
            return (
              <div
                key={`col-${colI}`}
                className={`col ${selectedClass}`}
                onClick={() => select(index)}
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
  );
};

export default Sudoku;
