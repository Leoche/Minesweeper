import Cell from './Cell.js';

class Board extends Phaser.Group {
  constructor(game, x, y, cellSize, numBee) {
    super(game, game.world, name);
    this.inputEnableChildren = true;
    this.game = game;
    this.x = x;
    this.y = y;
    this.numBee = numBee;
    this.cellSize = cellSize;
    this.cellSizeY = cellSize - 2;
    this.cells = [];
    this.createBackground();
    this.createCells();
    this.createBees();
    this.findNeighboors();
    this.onChildInputOver.add(this.inputOver, this);
    this.onChildInputOut.add(this.inputOut, this);
    this.onChildInputDown.add(this.inputDown, this);
    console.log('this.background.events', this.background.events)
  }
  inputOver (sprite) {
    if (sprite.constructor.name === "Cell") sprite.inputOver();
  }
  inputOut (sprite) {
    if (sprite.constructor.name === "Cell") sprite.inputOut();
  }
  inputDown (sprite) {
    if (sprite.constructor.name === "Cell") sprite.reveal();
  }
  findNeighboors(){
    for(var i = 0; i < this.x; i++){
      for(var j = 0; j < this.y; j++){
        let num = 0;
        let cell = this.cells[i][j];
        if (!cell.isBee()) {
          if(i!=0 && this.cells[i-1][j].isBee()) num++;
          if(i!=0 && j!=0 && this.cells[i-1][j-1].isBee()) num++;
          if(j!=0 && this.cells[i][j-1].isBee()) num++;
          if(i!=this.x-1 && this.cells[i+1][j].isBee()) num++;
          if(i!=this.x-1 && j!=0 && this.cells[i+1][j-1].isBee()) num++;
          if(i!=this.x-1 && j!=this.y-1 && this.cells[i+1][j+1].isBee()) num++;
          if(j!=this.y-1 && this.cells[i][j+1].isBee()) num++;
          if(i!=0 && j!=this.y-1 && this.cells[i-1][j+1].isBee()) num++;
          this.cells[i][j].setNeighboors(num);
        }
      }
    }
  }
  createCells(){
    for(var i = 0; i < this.x; i++){
      for(var j = 0; j < this.y; j++){
        if(!this.cells[i]) this.cells[i] = []
        this.cells[i][j] = new Cell(this.game,
          i, j,
          this.background.x + this.cellSize + i * this.cellSize,
          this.background.y + this.cellSizeY + j * this.cellSizeY - 2,
          this.cellSize);
        this.add(this.cells[i][j]);
      }
    }
  }
  createBees(){
    let tmpBees = this.numBee;
    while(tmpBees > 0){
      let i = Math.floor(Math.random()*this.x);
      let j = Math.floor(Math.random()*this.y);
      if(!this.cells[i][j].isBee()){
        this.cells[i][j].setBee();
        tmpBees--;
      }
    }
  }
  createBackground() {
    this.background = new PhaserNineSlice.NineSlice(
      this.game,
      this.game.world.centerX - ((this.x+2) * this.cellSize) / 2,
      this.game.world.centerY - ((this.y+2) * this.cellSizeY) / 2, 'sprite', 'frame',
      (this.x+2) * this.cellSize,
      (this.y+2) * this.cellSizeY,
      { top: 38, bottom: 38, left: 38, right: 38 });

    this.add(this.background);
  }
  replaceBackground() {
    this.background.x = this.game.world.centerX - ((this.x+2) * this.cellSize) / 2;
    this.background.y = this.game.world.centerY - ((this.y+2) * this.cellSizeY) / 2;
    for(var i = 0; i < this.x; i++){
      for(var j = 0; j < this.y; j++){
        this.cells[i][j].x = this.background.x + this.cellSize + i * this.cellSize;
        this.cells[i][j].y = this.background.y + this.cellSizeY + j * this.cellSizeY - 2;
      }
    }
  }
  update(){}
}
export default Board;