import throttle from 'lodash.throttle';
import Player from '../objects/Player';

export default class Main extends Phaser.State {
  create() {

    this.game.add.tileSprite(-5000, -5000, 10000, 10000, 'bg');

    this.player = new Player({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      key: 'sprite',
      frame: 'cell',
    });


    window.addEventListener('resize', throttle(this.resize.bind(this), 50), false);
  }
  resize() {
    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;

    this.scale.setGameSize(width, height);
  }
  update() {

  }
}
