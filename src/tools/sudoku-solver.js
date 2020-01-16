/*
Java Implementation

package ch.fhnw.algd1.sudoku.solver;

import ch.fhnw.algd1.sudoku.framework.SudokuChecker;
import ch.fhnw.algd1.sudoku.framework.SudokuModel;
import ch.fhnw.algd1.sudoku.framework.SudokuSolver;

public final class SudokuSolverImpl implements SudokuSolver {
  private final SudokuChecker checker;
  private int num = 0;

  public SudokuSolverImpl(SudokuChecker checker) {
  this.checker = checker;
}

@Override
public boolean solved(SudokuModel model) {
  return solve(model, 0);
}

private boolean solve(SudokuModel model, int fieldNr) {
  final int i = fieldNr / model.size(), j = fieldNr % model.size();

  if (fieldNr == model.size()*model.size()) { // last field
    return checker.allOK(model);
  }

  if (model.get(i, j) != 0) { // if field is not empty, just skip it
    return solve(model, fieldNr+1);
  }

  if (!checker.oneOK(model, i, j)) {
    return evaluateResponse(model, i, j, false);
  }

  boolean found = false;
  for (int val = 1; val <= model.size() && !found; val++) {
    model.set(i, j, val);
    found = checker.oneOK(model, i, j) && solve(model, fieldNr+1);
  }
  return evaluateResponse(model, i, j, found);
}

boolean evaluateResponse(SudokuModel model, int i, int j, boolean response) {
  if (!response)
    model.clear(i, j);
  return response;
}
@Override
public int nofSolutions(SudokuModel model) {
  // TODO start recursive enumeration of solutions, beginning at square 0 or
  // (0,0) resp.
  return 1;
}

}
 */
