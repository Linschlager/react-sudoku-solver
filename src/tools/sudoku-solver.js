import { checkAll, checkOne } from "./sudoku-checker";

const SIZE = 9;

const functionalSolve = (givenSudoku, allPossibleSolutions = false) => {
  const possibleSolutions = [];

  const fnSolve = (sudoku, fieldNr = 0) => {
    const row = Math.floor(fieldNr / SIZE);
    const col = fieldNr % SIZE;

    if (fieldNr === SIZE**2) {
      const allOK = checkAll(sudoku);
      if (allOK) possibleSolutions.push(sudoku);
      return allOK;
    } // It's done
    if (sudoku[row][col] !== 0) return fnSolve(sudoku, fieldNr+1); // Skip filled out fields
    if (!checkOne(sudoku, col, row)) return false; // Check field

    let found = false;
    for (let val = 1; val <= SIZE && (allPossibleSolutions || !found); val++) {
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

  fnSolve(givenSudoku);
  return possibleSolutions;
};
export default functionalSolve;