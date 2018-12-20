// Based on http://phaser.io/examples/v2/games/breakout

preload((game) => {
    game.load.baseURL = "https://examples.phaser.io/assets/";
    game.load.crossOrigin = "anonymous";
    game.load.atlas("breakout", "games/breakout/breakout.png", "games/breakout/breakout.json");
    game.load.audio("sfx", "audio/SoundEffects/fx_mixdown.ogg");
    game.load.bitmapFont("font", "fonts/bitmapFonts/carrier_command.png", "fonts/bitmapFonts/carrier_command.xml");
});

let sfx: Phaser.Sound;
let bricks: Phaser.Group;
let paddle: Phaser.Sprite;
let ball: Phaser.Sprite;
let pointsText: Phaser.BitmapText;
let lifesText: Phaser.BitmapText;
let levelText: Phaser.BitmapText;

let ballOnPaddle = true;
let points = 0;
let lifes = 3;
let level = 1;

create((game) => {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;

    sfx = game.add.audio("sfx");
    sfx.allowMultiple = true;
    sfx.addMarker("ping", 10, 1.0);
    sfx.addMarker("death", 12, 4.2);
    sfx.addMarker("shot", 17, 1.0);

    bricks = game.add.group();
    bricks.enableBody = true;
    bricks.physicsBodyType = Phaser.Physics.ARCADE;

    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 15; x++) {
            const brick = bricks.create(120 + (x * 36), 100 + (y * 52), "breakout", "brick_" + (y + 1) + "_1.png");
            brick.body.bounce.set(1);
            brick.body.immovable = true;
        }
    }

    paddle = game.add.sprite(game.world.centerX, 500, "breakout", "paddle_big.png");
    paddle.anchor.setTo(0.5, 0.5);

    game.physics.enable(paddle, Phaser.Physics.ARCADE);

    paddle.body.collideWorldBounds = true;
    paddle.body.bounce.set(1);
    paddle.body.immovable = true;

    ball = game.add.sprite(game.world.centerX, paddle.y - 16, "breakout", "ball_1.png");
    ball.anchor.set(0.5);
    ball.checkWorldBounds = true;

    game.physics.enable(ball, Phaser.Physics.ARCADE);

    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);

    ball.events.onOutOfBounds.add(ballLost);

    game.input.onDown.add(onClick);

    pointsText = game.add.bitmapText(32, 550, "font", `Points: ${points}`, 16);
    lifesText = game.add.bitmapText(620, 550, "font", `Lifes: ${lifes}`, 16);
    levelText = game.add.bitmapText(340, 550, "font", `Level: ${level}`, 16);
});

update((game) => {
    const x = Math.min(Math.max(game.input.x, 24), game.width - 24);
    paddle.x = x;
    if (ballOnPaddle) {
        ball.x = x;
    } else {
        game.physics.arcade.collide(ball, paddle, ballHitPaddle);
        game.physics.arcade.collide(ball, bricks, ballHitBrick);
    }
});

function onClick() {
    if (ballOnPaddle) {
        ballOnPaddle = false;
        ball.body.velocity.y = -100 * (level + 1);
        ball.body.velocity.x = 50 - Math.random() * 100;
    }
}

function ballLost() {
    lifesText.text = `Lifes: ${--lifes}`;
    if (lifes == 0) {
        sfx.play("death");
        ball.body.velocity.setTo(0, 0);
    } else {
        sfx.play("shot");
        ballOnPaddle = true;
        ball.reset(paddle.body.x + 16, paddle.y - 16);
    }
}

function ballHitPaddle() {
    if (ball.x < paddle.x) {
        // ball is on the left-hand side of the paddle
        const diff = paddle.x - ball.x;
        ball.body.velocity.x = -10 * diff;
    }
    else if (ball.x > paddle.x) {
        // ball is on the right-hand side of the paddle
        const diff = ball.x - paddle.x;
        ball.body.velocity.x = 10 * diff;
    }
}

function ballHitBrick(ball: Phaser.Sprite, brick: Phaser.Sprite) {
    sfx.play("ping");
    brick.kill();
    points += 1;
    if (bricks.countLiving() == 0) {
        points *= 2;
        bricks.callAll("revive", undefined);
        levelText.text = `Level: ${++level}`;
        ballOnPaddle = true;
        ball.reset(paddle.body.x + 16, paddle.y - 16);
    }
    pointsText.text = `Points: ${points}`;
}
