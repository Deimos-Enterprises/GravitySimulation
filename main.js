// import './style.css'
// import Phaser from 'phaser'

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const physicalConstants = {
    earthGravity: 9.81,
    marsGravity: 3.71,
    marsFriction: 0.1
}

const scalingConstants = {
    gravityScale: 15
}


class MarsScene extends Phaser.Scene {
    constructor() {
        super('mars-scene')
    }
    preload() {
        this.load.image('mars-background', 'res/marsbackground.jpg');
        this.load.image('earth-background', 'res/earthbackground.jpg');
        this.load.spritesheet('martian', 'res/martian.png', {frameWidth: 120, frameHeight: 162})
        this.load.image('ruler', 'res/ruler.png');
    }
    create() {
        console.log('Mars Scene')

        this.earthBackground = this.add.image(0.5 * sizes.width, 0.5 * sizes.height, 'earth-background');
        this.earthBackground.setScale(sizes.width / 313, sizes.height / 200);
        this.marsBackground = this.add.image(0.5 * sizes.width, 0.5 * sizes.height, 'mars-background');
        this.marsBackground.setScale(sizes.width / 1744, sizes.height / 980);

        let martianName = 'martian';
        this.martian = this.createInteractable(martianName, 0.5 * sizes.width, 0 * sizes.height, 1);
        // this.martian.anims.create({
        //     key: 'moving',
        //     frames: this.anims.generateFrameNumbers(martianName, {start: 0, end: 26}),
        //     frameRate: 8,
        //     repeat: -1
        // });
        // this.martian.anims.create({
        //     key: 'idle',
        //     frames: this.anims.generateFrameNumbers(martianName, {frames: [1]}),
        //     frameRate: 8,
        //     repeat: -1
        // });

        let x = 0.5 * sizes.width;
        let x2 = (x / sizes.width + 0.02) * sizes.width;
        let y = 0;
        let scale = 0.1 * sizes.height / 32;
        let rulerHeight = 2868;
        this.ruler = this.add.image(x, 0.5 * sizes.height, 'ruler');
        this.ruler.setScale(sizes.height / rulerHeight);
        this.ruler.angle = 90;
        let yDelta = sizes.height / 10.2;
        let yOffset = 0.01 * sizes.height;

        //text
        this.rText50 = this.add.text(x2, y + yOffset, `50m`, { font: 'Press Start 2P', fontSize: '24px', antialias: false, color: '#ffffff'}).setOrigin(0.5).setScale(scale);
        this.rText45 = this.add.text(x2, y + 1 * yDelta, `45m`, { font: 'Press Start 2P', fontSize: '24px', antialias: false, color: '#ffffff'}).setOrigin(0.5).setScale(scale);
        this.rText40 = this.add.text(x2, y + 2 * yDelta, `40m`, { font: 'Press Start 2P', fontSize: '24px', antialias: false, color: '#ffffff'}).setOrigin(0.5).setScale(scale);
        this.rText35 = this.add.text(x2, y + 3 * yDelta, `35m`, { font: 'Press Start 2P', fontSize: '24px', antialias: false, color: '#ffffff'}).setOrigin(0.5).setScale(scale);
        this.rText30 = this.add.text(x2, y + 4 * yDelta, `30m`, { font: 'Press Start 2P', fontSize: '24px', antialias: false, color: '#ffffff'}).setOrigin(0.5).setScale(scale);
        this.rText25 = this.add.text(x2, y + 5 * yDelta, `25m`, { font: 'Press Start 2P', fontSize: '24px', antialias: false, color: '#ffffff'}).setOrigin(0.5).setScale(scale);
        this.rText20 = this.add.text(x2, sizes.height - 4 * yDelta - 2 * yOffset, `20m`, { font: 'Press Start 2P', fontSize: '24px', antialias: false, color: '#ffffff'}).setOrigin(0.5).setScale(scale);
        this.rText15 = this.add.text(x2, sizes.height - 3 * yDelta - 2 * yOffset, `15m`, { font: 'Press Start 2P', fontSize: '24px', antialias: false, color: '#ffffff'}).setOrigin(0.5).setScale(scale);
        this.rText10 = this.add.text(x2, sizes.height - 2 * yDelta - 2 * yOffset, `10m`, { font: 'Press Start 2P', fontSize: '24px', antialias: false, color: '#ffffff'}).setOrigin(0.5).setScale(scale);
        this.rText5 = this.add.text(x2, sizes.height - 1 * yDelta - 2 * yOffset, `5m`, { font: 'Press Start 2P', fontSize: '24px', antialias: false, color: '#ffffff'}).setOrigin(0.5).setScale(scale);
        this.rText0 = this.add.text(x2, sizes.height - 2 * yOffset, `0m`, { font: 'Press Start 2P', fontSize: '24px', antialias: false, color: '#ffffff'}).setOrigin(0.5).setScale(scale);

        this.isEarth = false;
        this.keyE = this.input.keyboard.addKey('E');

        this.timerText = this.add.text(0.01 * sizes.width, sizes.height * 0.01, 'Time Falling(s): 0', { font: 'Press Start 2P', fontSize: '24px', antialias: false, color: '#ffffff'});
        this.timerText.setScale(3, 3); 
        // this.velocityText = this.add.text(0.01 * sizes.width, sizes.height * 0.06, 'Vertical Velocity(m/s): 0', { font: '"Press Start 2P"' });
        // this.velocityText.setScale(3, 3);
        this.lastTime = 0;
    }
    update(time, delta) {
        if(Phaser.Input.Keyboard.JustDown(this.keyE)) {
            this.isEarth = !this.isEarth;
        }

        if(this.isEarth) {
            this.earthBackground.setVisible(false);
            this.marsBackground.setVisible(true);
            this.martian.setGravityY(physicalConstants.marsGravity * scalingConstants.gravityScale);

        } else {
            this.marsBackground.setVisible(false);
            this.earthBackground.setVisible(true);
            this.martian.setGravityY(physicalConstants.earthGravity * scalingConstants.gravityScale);
        }

        if(this.martian.body.velocity.y == 0) {
            this.lastTime = time * 0.001;
            // this.martian.anims.play('idle', true);
        }else {
            // this.martian.anims.play('moving', true);
            this.timerText.text = 'Time Falling(s): ' + this.formatTime(time * 0.001 - this.lastTime);
        }
        // var velocity = Math.round((this.martian.body.velocity.y + Number.EPSILON) * 1000) / 1000;
        // this.velocityText.text = 'Vertical Velocity(m/s): ' + `${velocity}`;
    }

    formatTime(seconds){
        // Minutes
        var minutes = Math.floor(seconds/60);
        // Seconds
        var partInSeconds = seconds%60;
        partInSeconds = Math.round((partInSeconds + Number.EPSILON) * 1000) / 1000;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        // Returns formated time
        // return `${minutes}:${partInSeconds}`;
        return `${partInSeconds}`;
    }
    

    switchPlanets() {
        if(this.isEarth) {
            console.log('switch to earth');
            this.background.setTexture('earth-background');
        } else {
            console.log('switch to mars');
            this.background.setTexture('mars-background');
        }
    }

    createInteractable(name, x, y, scale) {
        var temp = this.physics.add.sprite(x, y, name).setScale(scale, scale).setOrigin(0.5);
        temp.setActive(true);
        temp.velocityScaleX = 1;
        temp.velocityScaleYs = 1;

        // Mars physics
        temp.setBounce(0);
        temp.setFriction(0);
        temp.setGravityY(physicalConstants.earthGravity * scalingConstants.gravityScale);
        temp.setCollideWorldBounds(true);

        temp.setInteractive();

        this.input.setDraggable(temp);

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.body.moves = false;
        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.setVelocityX(0);
            gameObject.setVelocityY(0);
        });

        this.input.on('dragend', function (pointer, gameObject) {
            gameObject.body.moves = true;
        });

        return temp;
    } 
}

class EarthScene extends Phaser.Scene {
    constructor() {
        super('earth-scene');
    }
    preload() {}
    create() {}
    update() {}
}

const config = {
    type: Phaser.WEBGL,
    width: sizes.width,
    height: sizes.height,
    canvas: gameCanvas,
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: {y:physicalConstants.earthGravity},
            debug:true
        }
    },
    scene: [MarsScene]
}

const game = new Phaser.Game(config)