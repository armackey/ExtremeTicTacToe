var boards = {};

interface UserSelected {
  square: number,
  board: number
};

export function findAvailableBoards(): Array<any> {
  // first check what keys/boards exist
  return [0, 1, 2, 3, 4, 5, 6, 7, 8]
    .filter(b => {
      return boards[b].length !== 9 || !boards[b];
    });
}

export function isBoardFull(data: UserSelected): boolean {
  let bs = boards[data.square.toString()];
  if (bs && bs.length === 9) return true;
  return false;
}

export function isMoveAllowed(data: UserSelected, previous_board: number): boolean {
  let bs = boards[data.board.toString()];
  if (previous_board === data.square && !bs) return false;
  if (previous_board === data.square && bs.length !== 8) return false;
  return true;
}

export function addToTurnsList(data: UserSelected, turn: string) {

  if (!boards[data.board]) boards[data.board.toString()] = [];

  boards[data.board].push(
    Object.assign({}, {square: data.square}, {conquered: turn})
  );

}

export function hasWonBoard(data: UserSelected, turn): boolean {
  let b = boards[data.board.toString()];
  let obj = {};
  if (b['won'])
    return false;

  b.filter(cell => {
    return cell.conquered === turn;
  })
  .map(c => {
    obj[c.square] = c.conquered;
  });

  return hasWonHelper(obj, turn, 'board') ? b['won'] = turn : false;
}

export function hasWonGame(turn): boolean {
  return hasWonHelper(boards, turn, 'game');
}

function hasWonHelper(obj, turn, type) {

  if (type === 'board' && obj[0] && obj[1] && obj[2] || type === 'game' && obj[0] && obj[0].won === turn && obj[1] && obj[1].won === turn && obj[2] && obj[2].won === turn)
    return true;

  if (type === 'board' && obj[0] && obj[4] && obj[8] || type === 'game' && obj[0] && obj[0].won === turn && obj[4] && obj[4].won === turn && obj[8] && obj[8].won === turn)
    return true;

  if (type === 'board' && obj[0] && obj[3] && obj[6] || type === 'game' && obj[0] && obj[0].won === turn && obj[3] && obj[3].won === turn && obj[6] && obj[6].won === turn)
    return true;

  if (type === 'board' && obj[1] && obj[4] && obj[7] || type === 'game' && obj[1] && obj[1].won === turn && obj[4] && obj[4].won === turn && obj[7] && obj[7].won === turn)
    return true;

  if (type === 'board' && obj[2] && obj[5] && obj[8] || type === 'game' && obj[2] && obj[2].won === turn && obj[5] && obj[5].won === turn && obj[8] && obj[8].won === turn)
    return true;

  if (type === 'board' && obj[3] && obj[4] && obj[5] || type === 'game' && obj[3] && obj[3].won === turn && obj[4] && obj[4].won === turn && obj[5] && obj[5].won === turn)
    return true;

  if (type === 'board' && obj[6] && obj[7] && obj[8] || type === 'game' && obj[6] && obj[6].won === turn && obj[7] && obj[7].won === turn && obj[8] && obj[8].won === turn)
    return true;

  if (type === 'board' && obj[2] && obj[4] && obj[6] || type === 'game' && obj[2] && obj[2].won === turn && obj[4] && obj[4].won === turn && obj[6] && obj[6].won === turn)
    return true;

  return false;
}
