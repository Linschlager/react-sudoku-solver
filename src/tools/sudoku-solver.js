import {checkAll, checkOne} from "./sudoku-checker";

const SIZE = 9;

/**
 *
 * @param sudoku
 * @param fieldNr
 * @returns {boolean|*}
 */
const fnSolve = (sudoku, fieldNr = 0) => {
  const row = Math.floor(fieldNr / SIZE);
  const col = fieldNr % SIZE;

  if (fieldNr === SIZE**2) {
    return checkAll(sudoku) ? sudoku : false; // Returns sudoku or false
  } // It's done
  if (sudoku[row][col] !== 0) return fnSolve(sudoku, fieldNr+1); // Skip filled out fields
  if (!checkOne(sudoku, col, row)) return false; // Check field

  let found = false;
  for (let val = 1; val <= SIZE && !found; val++) {
    const newSudoku = changeValue(sudoku, row, col, val);
    found = checkOne(newSudoku, col, row) && fnSolve(newSudoku, fieldNr+1);
  }
  return found;
};
const changeValue = (sudoku, row, col, val) => {
  return sudoku.map((rowValue, rowIndex) => {
    return rowValue.map((colValue, colIndex) => {
      if (rowIndex === row && colIndex === col) {
        return val;
      }
      return colValue;
    });
  });
};

export default fnSolve;