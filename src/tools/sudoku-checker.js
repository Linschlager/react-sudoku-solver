const check = (sudoku, col, row) => {
  let valid = true;
  const numbers = [];
  for (let i = 0; i < 9 && valid; i++) {
    let value;
    if (row !== null) {
      value = sudoku[row][i];
    } else if (col !== null) {
      value = sudoku[i][col];
    } else {
      throw new Error('Row or Col is required');
    }
    if (value === 0 || !numbers.includes(value)) {
      numbers.push(value)
    } else {
      valid = false;
    }
  }
  return valid;
};

/**
 * Checks given row if all the set fields are valid
 * @param sudoku Complete Sudoku
 * @param row Row to check
 * @returns {boolean} Row is valid
 */
export const checkRow = (sudoku, row) => {
  return check(sudoku, null, row);
};

/**
 * Checks given rol if all the set fields are valid
 * @param sudoku Complete Sudoku
 * @param col Column to check
 * @returns {boolean} Column is valid
 */
export const checkCol = (sudoku, col) => {
  return check(sudoku, col, null);
};

/**
 * Calculated the square to check and checks if all the set fields are valid
 * @param sudoku Complete Sudoku
 * @param col Column of the Square
 * @param row Row of the Square
 * @returns {boolean} Square is valid
 */
export const checkSquare = (sudoku, col, row) => {
  let valid = true;
  const numbers = [];
  const subS = 3;
  // Get the top left item in the square
  col = Math.floor(col / subS) * subS;
  row = Math.floor(row / subS) * subS;
  // Loop through all 3x3 fields of the square until one is invalid (`&& valid`-check)
  for (let i = 0; i < subS && valid; i++) {
    for (let j = 0; j < subS && valid; j++) {
      const value = sudoku[row + i][col + j];
      if (value === 0 || !numbers.includes(value)) {
        numbers.push(value);
      } else {
        valid = false;
      }
    }
  }
  return valid;
};

/**
 * Checks if the value of one single field is possible
 * @param sudoku Sudoku to check
 * @param col Column of field to check
 * @param row Row of field to check
 * @returns {boolean} Is the intersecting field possible in the current state
 */
export const checkOne = (sudoku, col, row) => checkRow(sudoku, row) && checkCol(sudoku, col) && checkSquare(sudoku, col, row);

/**
 * Loops through all 81 fields and calls checkOne
 * @param sudoku
 * @returns {boolean}
 */
export const checkAll = (sudoku) => {
  let valid = true;
  // Loop through all fields until one is invalid (`&& valid`-check)
  for (let i = 0; i < 9 && valid; i++) {
    for (let j = 0; j < 9 && valid; j++) {
      if (!checkOne(sudoku, i, j)) valid = false;
    }
  }
  return valid;
};
