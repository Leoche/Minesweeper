class Cell extends Phaser.Sprite {
  constructor(game, i, j, x, y, width) {
    super(game, x, y, "sprite", "cell");
    this.i = i;
    this.j = j;
    this.game.add.existing(this);
    this.bee = false;
    this.revealed = false;
    this.neighboors = 0;
    this.colors = ['#3498db','#3498db','#2ecc71','#e74c3c','#2c3e50','#8e44ad','#f39c12','#1abc9c','#e84393'];
    this.anchor.setTo(0);
    this.text = new Phaser.Text(this.game, 11, 6, "", { font: "26px 'Black Han Sans'", fill: "#ff0033", align: "center" });
    this.addChild(this.text);
  }
  setNeighboors(num) {
    this.neighboors = num;
  }
  isBee() {
    return this.bee;
  }
  setBee() {
    this.bee = true;
  }
  inputOver() {
    if (!this.revealed) this.frameName = 'cell_hover'
  }
  inputOut() {
    if (!this.revealed) this.frameName = 'cell'
  }
  reveal() {
    this.revealed = true;
    if (this.bee) {
      this.frameName = 'cell_empty';
      this.text.setText('x');
    } else {
      this.frameName = 'cell_empty';
      this.text.setStyle({ font: "26px 'Black Han Sans'", fill: this.colors[this.neighboors], align: "center" });
      if(this.neighboors != 0) this.text.setText(this.neighboors);
    }
  }
}
export default Cell;