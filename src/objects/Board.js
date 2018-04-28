import Cell from './Cell.js';

class Board extends Phaser.Group {
  constructor(game, x, y, cellSize) {
    super(game, game.world, name);
    this.game = game;
    this.x = x;
    this.y = y;
    this.cellSize = cellSize;
    this.createBackground();
    this.createCells();
  }
  createCells(){
    this.add(new Cell(this.game,
      this.background.x + this.cellSize,
      this.background.y + this.cellSize,
      this.cellSize))
  }
  createBackground() {
    this.background = new PhaserNineSlice.NineSlice(
      this.game,
      this.game.world.centerX - ((this.x+2) * this.cellSize) / 2,
      this.game.world.centerY - ((this.y+2) * this.cellSize) / 2, 'sprite', 'frame',
      (this.x+2) * this.cellSize,
      (this.y+2) * this.cellSize,
      { top: 38, bottom: 38, left: 38, right: 38 });

    this.add(this.background);
  }
  replaceBackground() {
    this.background.x = this.game.world.centerX - ((this.x+2) * this.cellSize) / 2;
    this.background.y = this.game.world.centerY - ((this.y+2) * this.cellSize) / 2;
  }
  update(){}
}
export default Board;