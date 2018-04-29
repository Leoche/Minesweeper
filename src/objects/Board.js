import Cell from './Cell.js';

class Board extends Phaser.Group {
  constructor(game, x, y, cellSize, numBee) {
    super(game, game.world, name);
    this.inputEnableChildren = true;
    this.game = game;
    this.x = x;
    this.y = y;
    this.numBee = numBee;
    this.remaining = numBee;
    this.cellSize = cellSize;
    this.cellSizeY = cellSize - 2;
    this.cells = [];
    this.offsetY = 100;
    this.flagMode = false;
    this.createBackground();
    this.createCells();
    this.createBees();
    this.findNeighboors();
    this.onChildInputOver.add(this.inputOver, this);
    this.onChildInputOut.add(this.inputOut, this);
    this.onChildInputDown.add(this.inputDown, this);
    this.onChildInputUp.add(this.inputUp, this);
    this.startTimer();
  }
  inputOver (sprite) {
    if (sprite.constructor.name === "Cell") sprite.inputOver();
  }
  inputOut (sprite) {
    if (sprite.constructor.name === "Cell") sprite.inputOut();
  }
  inputDown (sprite) {
    this.flagMode = game.input.activePointer.rightButton.isDown && !game.input.activePointer.leftButton.isDown;
    if (sprite.constructor.name === "Cell") sprite.inputDown();
  }
  startTimer () {
    this.timeStarted = this.game.time.totalElapsedSeconds();
  }
  inputUp (sprite, pointer){
    if (sprite.constructor.name === "Cell"){
      let cell = sprite;
      if(!this.flagMode){
        cell.reveal();
        if(cell.neighboors === 0 && !cell.isBee()){
          for(let i = -1; i<=1; i++){
            for(let j = -1; j<=1; j++){
                if(this.cells[cell.i + i] && this.cells[cell.i + i][cell.j + j] && !this.cells[cell.i + i][cell.j + j].revealed && !this.cells[cell.i + i][cell.j + j].isBee()) {
                  this.inputUp(this.cells[cell.i + i][cell.j + j])
                }
            }
          }
        }
      } else {
        this.remaining += cell.flag();
        this.remainingText.setText("Mines:"+this.remaining);
      }
    }
  }
  findNeighboors(){
    for(var i = 0; i < this.x; i++){
      for(var j = 0; j < this.y; j++){
        let num = 0;
        let cell = this.cells[i][j];
        if (!cell.isBee()) {
          for(let i = -1; i<=1; i++){
            for(let j = -1; j<=1; j++){
              if(this.cells[cell.i + i] && this.cells[cell.i + i][cell.j + j] && this.cells[cell.i + i][cell.j + j].isBee()) {
                num++;
              }
            }
          }
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
          this.background.y + this.cellSizeY + j * this.cellSizeY - 2 + this.offsetY,
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
      this.game.world.centerY - ((this.y+2) * this.cellSizeY) / 2 - this.offsetY, 'sprite', 'frame',
      (this.x+2) * this.cellSize,
      (this.y+2) * this.cellSizeY + this.offsetY,
      { top: 38, bottom: 38, left: 38, right: 38 });

    this.add(this.background);

    this.remainingText = new Phaser.Text(this.game,
      this.game.world.centerX - ((this.x) * (this.cellSize)) / 2,
      this.game.world.centerY - ((this.y+2) * this.cellSizeY) / 2,
      "Mine:" +this.remaining, { font: "20px 'Black Han Sans'", fill: "#444", align: "center" });
    this.add(this.remainingText);

    this.timeText = new Phaser.Text(this.game,
      this.game.world.centerX + ((this.x-5) * (this.cellSize)) / 2,
      this.game.world.centerY - ((this.y+2) * this.cellSizeY) / 2,
      "Time:0", { font: "20px 'Black Han Sans'", fill: "#444", align: "right" });
    this.add(this.timeText);
  }
  replaceBackground() {
    let offsetY = 100;
    this.timeText.x = this.game.world.centerX + ((this.x-5) * (this.cellSize)) / 2;
    this.timeText.y = this.game.world.centerY - ((this.y+2) * this.cellSizeY) / 2;

    this.remainingText.x = this.game.world.centerX - ((this.x) * (this.cellSize)) / 2;
    this.remainingText.y = this.game.world.centerY - ((this.y+2) * this.cellSizeY) / 2;

    this.background.x = this.game.world.centerX - ((this.x+2) * this.cellSize) / 2;
    this.background.y = this.game.world.centerY - ((this.y+2) * this.cellSizeY) / 2 - this.offsetY;

    for(var i = 0; i < this.x; i++){
      for(var j = 0; j < this.y; j++){
        this.cells[i][j].x = this.background.x + this.cellSize + i * this.cellSize;
        this.cells[i][j].y = this.background.y + this.cellSizeY + j * this.cellSizeY - 2 + this.offsetY;
      }
    }
  }
  update(){
    this.timeText.setText("Time:"+Math.floor(this.game.time.totalElapsedSeconds() - this.timeStarted))
  }
}
export default Board;