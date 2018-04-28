class Cell extends Phaser.Sprite {
  constructor(game, x, y, width) {
    super(game, x, y, "sprite", "cell");
    this.game.add.existing(this);
    this.anchor.setTo(0);
  }
  update () {
    this.angle += 1
  }
}
export default Cell;