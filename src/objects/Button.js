class Button extends Phaser.Sprite {
  constructor(game, x, y, text) {
    super(game, x, y, "sprite", "btn");
    this.game.add.existing(this);
    this.text = new Phaser.Text(this.game, this.width/2, this.height/2 + 2, text, { font: "22px 'Black Han Sans'", fill: "#FEFEFE", align: "center" });
    this.text.anchor.setTo(0.5);
    this.addChild(this.text);
  }
  inputOver() {
    this.frameName = 'btn_hover';
  }
  inputDown() {
    this.text.y = this.text.y + 4;
    this.frameName = 'btn_active';
  }
  inputOut() {
    this.text.y = this.height/2 + 2;
    this.frameName = 'btn';
  }
}
export default Button;