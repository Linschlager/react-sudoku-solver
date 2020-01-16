import { checkRow, checkCol, checkSquare, checkOne, checkAll } from '../sudoku-checker';

const createEmptySudoku = (v = 0) => [
  [v, v, v, v, v, v, v, v, v],
  [v, v, v, v, v, v, v, v, v],
  [v, v, v, v, v, v, v, v, v],
  [v, v, v, v, v, v, v, v, v],
  [v, v, v, v, v, v, v, v, v],
  [v, v, v, v, v, v, v, v, v],
  [v, v, v, v, v, v, v, v, v],
  [v, v, v, v, v, v, v, v, v],
  [v, v, v, v, v, v, v, v, v],
];

const setCol = (sudoku, colI, col) => {
  return sudoku.map((row, index) => { row[colI] = col[index]; return row });
};

describe('SudokuChecker tests', () => {
  it('can check rows correctly', () => {
    let sudokuToTest = createEmptySudoku();
    expect(checkRow(sudokuToTest, 0)).toBe(true); // All 0's are valid
    sudokuToTest[0] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(checkRow(sudokuToTest, 0)).toBe(true); // 1-9 are valid
    sudokuToTest[0] = [1, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(checkRow(sudokuToTest, 0)).toBe(true); // just one 1 is valid

    sudokuToTest[0] = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    expect(checkRow(sudokuToTest, 0)).toBe(false); // all 1'a are invalid
    sudokuToTest[0] = [1, 1, 3, 4, 5, 6, 7, 0, 9];
    expect(checkRow(sudokuToTest, 0)).toBe(false); // duplicated 1 is invalid
    sudokuToTest[0] = [1, 0, 0, 0, 0, 0, 0, 0, 1];
    expect(checkRow(sudokuToTest, 0)).toBe(false);
    sudokuToTest[0] = [1, 2, 3, 4, 5, 6, 7, 8, 8];
    expect(checkRow(sudokuToTest, 0)).toBe(false);
    sudokuToTest[0] = [1, 2, 3, 4, 5, 6, 7, 7, 9];
    expect(checkRow(sudokuToTest, 0)).toBe(false);
    sudokuToTest[0] = [1, 2, 3, 4, 5, 6, 6, 8, 9];
    expect(checkRow(sudokuToTest, 0)).toBe(false);
  });
  it('can check cols correctly', () => {
    let sudokuToTest = createEmptySudoku();
    expect(checkCol(sudokuToTest, 0)).toBe(true); // All 0's are valid
    sudokuToTest = setCol(createEmptySudoku(), 0, [1, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(checkCol(sudokuToTest, 0)).toBe(true); // Just a 1 is valid
    sudokuToTest = setCol(createEmptySudoku(), 0, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(checkCol(sudokuToTest, 0)).toBe(true); // Just 1-9 is valid

    sudokuToTest = setCol(createEmptySudoku(), 0, [1, 1, 0, 0, 0, 0, 0, 0, 0]);
    expect(checkCol(sudokuToTest, 0)).toBe(false); // Double 1 is invalid
    sudokuToTest = setCol(createEmptySudoku(), 0, [1, 2, 3, 4, 5, 6, 7, 8, 8]);
    expect(checkCol(sudokuToTest, 0)).toBe(false);
    sudokuToTest = setCol(createEmptySudoku(), 0, [1, 1, 3, 4, 5, 6, 7, 8, 9]);
    expect(checkCol(sudokuToTest, 0)).toBe(false);
  });
  it('can check square correctly', () => {
    let sudokuToTest = createEmptySudoku();
    expect(checkSquare(sudokuToTest, 0, 0)).toBe(true); // All 0's are valid
  });
  it('can check single field correctly', () => {
    let sudokuToTest = createEmptySudoku();
    expect(checkOne(sudokuToTest, 0, 0)).toBe(true); // All 0's are valid
  });
  it('can check complete sudoku correctly', () => {
    let sudokuToTest = createEmptySudoku();
    expect(checkAll(sudokuToTest, 0)).toBe(true); // All 0's are valid

    sudokuToTest = createEmptySudoku(1);
    expect(checkAll(sudokuToTest, 0)).toBe(false); // All 1's are invalid
  });
});
