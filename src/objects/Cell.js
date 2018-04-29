class Cell extends Phaser.Sprite {
  constructor(game, i, j, x, y, width) {
    super(game, x, y, "sprite", "cell_empty");
    this.i = i;
    this.j = j;
    this.game.add.existing(this);
    this.bee = false;
    this.revealed = false;
    this.flagged = false;
    this.neighboors = 0;
    this.colors = ['#3498db','#3498db','#2ecc71','#e74c3c','#2c3e50','#8e44ad','#f39c12','#1abc9c','#e84393'];
    this.anchor.setTo(0);
    this.text = new Phaser.Text(this.game, 11, 6, "", { font: "26px 'Black Han Sans'", fill: "#ff0033", align: "center" });
    this.disabled = true;
    this.addChild(this.text);
  }
  enable(){
    this.disabled = false;
    this.frameName = 'cell';
  }
  disable(){
    this.disabled = true;
    this.frameName = 'cell_empty';
    this.text.setText("");
    this.revealed = false;
    this.flagged = false;
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
    if (!this.disabled && !this.revealed && !this.flagged) this.frameName = 'cell_hover'
  }
  inputOut() {
    if (!this.disabled && !this.revealed && !this.flagged) this.frameName = 'cell'
  }
  inputDown() {
    if (!this.disabled && !this.revealed && !this.flagged) this.frameName = 'cell_active'
  }
  flag() {
    if (this.disabled) return;
    this.flagged = !this.flagged;
    if (this.flagged) this.frameName = 'cell_flag';
    else this.frameName = 'cell';
    return !this.flagged ? 1 : -1;
  }
  reveal() {
    if (this.disabled || this.flagged) return;
    this.revealed = true;
    if (this.bee) {
      this.frameName = 'cell_mine'
    } else {
      this.frameName = 'cell_empty';
      this.text.setStyle({ font: "26px 'Black Han Sans'", fill: this.colors[this.neighboors], align: "center" });
      if(this.neighboors != 0) this.text.setText(this.neighboors);
    }
  }
}
export default Cell;