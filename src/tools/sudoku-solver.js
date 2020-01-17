import { checkAll, checkOne } from "./sudoku-checker";

const SIZE = 9;

const solve = (sudoku, fieldNr = 0, updateOriginal = null, delay = 200) => {
  const row = Math.floor(fieldNr / SIZE);
  const col = fieldNr % SIZE;

  if (fieldNr === SIZE**2) { // Last field
    return checkAll(sudoku);
  }
  if (sudoku[row][col] !== 0) { // Field already has a predefined value
    return solve(sudoku, fieldNr+1, updateOriginal, delay);
  }
  if (!checkOne(sudoku, col, row)) {
    return returnValue(sudoku, row, col, false);
  }

  let found = false;
  for (let val = 1; val <= SIZE && !found; val++) {
    sudoku[row][col] = val;
    if (updateOriginal) {
      updateOriginal(row, col, val);
    }
    found = checkOne(sudoku, col, row) && solve(sudoku, fieldNr+1, updateOriginal, delay);
  }
  return returnValue(sudoku, row, col, found);
};

const returnValue = (sudoku, row, col, valid) => {
  if (!valid) {
    sudoku[row][col] = 0;
  }
  return valid;
}

export default solve;