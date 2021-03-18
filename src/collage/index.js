
const {
  Application,
  Container,
  loader,
  Graphics,
  Sprite,
  Text,
  TextStyle,
  utils
} = PIXI;

const { resources } = loader;
const { TextureCache } = utils;
PIXI.settings.SORTABLE_CHILDREN = true;

export const data = [{
  url: 'images/assets/C1.png',
  x: 400,
  y: 50,
  zIndex: 1,
  scale: 0.03,
}, {
  url: 'images/assets/C2.png',
  x: 0,
  y: 50,
  zIndex: 2,
  scale: 0.1,
}, {
  url: 'images/assets/C3.png',
  x: 180,
  y: 180,
  scale: 0.1,
  zIndex: 8,
}, {
  url: 'images/assets/C4.png',
  x: 50,
  y: 200,
  scale: 0.3,
  zIndex: 4,
}, {
  url: 'images/assets/C5.png',
  x: 300,
  y: 100,
  scale: 0.1,
  zIndex: 7,
}, {
  url: 'images/assets/C6.png',
  x: 250,
  y: 50,
  scale: 0.1,
  zIndex: 3,
}, {
  url: 'images/assets/C7.png',
  x: 100,
  y: 60,
  scale: 0.1,
  zIndex: 6,
}, {
  url: 'images/assets/C8.png',
  x: 350,
  y: 350,
  scale: 0.1,
  zIndex: 5,
},];

export default class Collage {
  constructor(props) {
    const { width, height } = props;
    this.app = new Application({
      width,
      height,
      antialiasing: true,
      transparent: false,
      backgroundColor: 0x000000,
      resolution: 1
    });
    this.container = new Container();
    // this.container.sortableChildren = true;
    // loader.reset();
  }
  init() {
    const self = this;
    data.forEach(item => {
      self.addFurniture(item);
    });
    this.container.sortableChildren = true
    this.app.stage.addChild(this.container);
    document.getElementById("collage-container").appendChild(this.app.view);
  }

  addFurniture(item) {
    const texture = resources[item.url].texture;
    const sprite = new Sprite(texture);
    sprite.name = item.url;
    sprite.x = item.x;
    sprite.y = item.y;
    sprite.scale.x = item.scale;
    sprite.scale.y = item.scale;
    sprite.zIndex = item.zIndex;
    sprite.visible = false;
    this.container.addChild(sprite);
  }

  toggleVisible(name) {
    const destSprite = this.container.children.find(item => item.name === name);
    const destItem = data.find(item => item.url === name);
    if (destSprite && destItem) {
      gsap.fromTo(destSprite, { pixi: { scaleX: 1, scaleY: 1, x: 250, y: 250, rotation: 0, alpha: 0, } }, { pixi: { scaleX: destItem.scale, alpha: 1, scaleY: destItem.scale, rotation: 360 * 2, x: destItem.x, y: destItem.y }, duration: 1 });
      destSprite.visible = true;
    }
    this.container.children.sort((itemA, itemB) => itemA.zIndex - itemB.zIndex);
  }
}


export const collage = new Collage({
  width: 500,
  height: 500
});