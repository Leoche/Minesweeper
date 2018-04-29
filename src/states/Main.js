import throttle from 'lodash.throttle';
import Board from '../objects/Board';

export default class Main extends Phaser.State {
  create() {
    this.cellSize = 38;
    this.numBee = 30;
    this.size = {
      x:10,
      y:10
    };
    this.game.add.tileSprite(-5000, -5000, 10000, 10000, 'bg');


    this.board = new Board(game, this.size.x, this.size.y, this.cellSize, this.numBee);


    window.addEventListener('resize', throttle(this.resize.bind(this), 50), false);
  }
  resize() {
    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;
    this.scale.setGameSize(width, height);
    this.board.replaceBackground();
  }
}
