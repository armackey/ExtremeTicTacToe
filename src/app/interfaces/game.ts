export interface Game {
  opponent: {
    uid: string,
    username: string
  },
  id: string,
  created_at: string,
  turn: string, // uid
  winner: string, // will be id of winner
  status: "game over" | "waiting",
  moves: Array<any>,
  last_move_date: string,
  key: string,
  letter: string
}
