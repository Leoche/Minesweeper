class Cell extends Phaser.Sprite {
  constructor(game, x, y, width) {
    super(game, x, y, "sprite", "cell");
    this.game.add.existing(this);
    this.bee = false;
    this.revealed = false;
    this.anchor.setTo(0);
    this.text = new Phaser.Text(this.game, 10, 6, "", { font: "26px 'Black Han Sans'", fill: "#ff0033", align: "center" });
    this.addChild(this.text);
  }
  setNeighboors(num) {
    this.text.setText(num)
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
    }
    else this.frameName = 'cell_empty';
  }
}
export default Cell;