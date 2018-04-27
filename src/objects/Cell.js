export default class Cell extends Phaser.Sprite {
  constructor({game, x, y, key, frame}) {
    super(game, x, y, key, frame);
    this.game.add.existing(this);
    this.anchor.setTo(0.5);
  }
}
