//////////////////////////////////////////Rogue Main Game//////////////////////////////////////////
brawl.rogue = function () { };
brawl.rogue.prototype = {
    init: function () {
        //GENERAL MAP SETTINGS 
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // We're going to be using physics, so enable the Arcade Physics system
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //Scales our Game
        //Reset Enemy Bullet Array
        livingEnemies = [];
    },
    preload: function () {
        // this.game.forceSingleUpdate = true;
        this.load.image('wall', 'assets/wall.png');
        this.load.image('immovableVerticalWall', 'assets/immovableVerticalWall.png');
        this.load.image('immovableRotatedWall', 'assets/immovableRotatedWall.png');
        this.load.image('ball', 'assets/ball.png')
        this.load.image('rotatedWall', 'assets/rotatedWall.png');
        this.load.image('fallingSpikes', 'assets/newSpikes.png');
        this.load.image('win', 'assets/finishLine.png');
        this.load.image('enemy', 'assets/trumpface.png');
        this.load.image('brownPlatform', 'assets/platform2.png');
        this.load.image('ledge', 'assets/platformY.png');
        this.load.image('spikes', 'assets/invisibleFloorSpikes.png');
        this.load.image('fallingSpikes', 'assets/newSpikes.png');
        this.load.image('invertedSpikes', 'assets/invertedSpikesTrue.png')
        this.load.image('joystick', 'assets/joystick.png');
        this.load.image('joystick2', 'assets/joystickR.png');
        this.load.image('action', 'assets/action.png');
        this.load.image('ledgeDown', 'assets/platformX.png');
        this.load.image('ledgeSide', 'assets/platformSide.png');
        this.load.image('bullet3', 'assets/bullet23.png');
        this.load.image('bullet2', 'assets/bullet24.png');
        this.load.image('bullet1', 'assets/bullet25.png');
        this.load.image('bulletEnemy', 'assets/bullet177.png');
        this.load.image('boundary', 'assets/worldBounds.png');
        this.load.image('coin', 'assets/shield2.png');
        this.load.image('flag', 'assets/flag.png');
        this.load.spritesheet('dude', 'assets/white.png', 87.5, 93.5);
    },
    create: function () {

        console.log(livingEnemies + "living Enemies in Create Function");
        //Desired FPS of game and fps and lag debugging
        this.game.time.desiredFps = 60;
        this.game.time.advancedTiming = true;

        //Background color of game
        // this.game.stage.backgroundColor = "#4488AA";
        this.game.stage.backgroundColor = Phaser.Color.getRandomColor(50, 255, 255);

        //Sort Direction

        this.game.physics.arcade.sortDirection = Phaser.Physics.Arcade.SORT_NONE;

        // Stretch to fill (Full Screen Mode)
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        this.fullSize = this.game.input.keyboard.addKey(Phaser.Keyboard.F);

        this.fullSize.onDown.add(this.gofull, this);

        //Pause Menu (Freeze TIME LOL)
        this.pause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);

        this.pause.onDown.add(this.goPause, this);

        //Overlap Bias to Prevent Sprite Tunneling
        this.game.physics.arcade.OVERLAP_BIAS = 12;

        //Initializes all the Randomness
        var randomGeneratorForWorld = this.game.rnd.integerInRange(0, 4);

        ////////////////////Game World Size//////////////////////
        this.game.world.setBounds(0, 0, worldGenerator[randomGeneratorForWorld].xOfWorld, worldGenerator[randomGeneratorForWorld].yOfWorld);

        ////////////Generator for Game Mode//////////////
        var randomGeneratorForGameMode = this.game.rnd.integerInRange(0, 1);
        var gameModeName;
        if (randomGeneratorForGameMode === 0) {
            gameModeName = "Collect the Coins";
        }
        else {
            gameModeName = "Capture the Flag";
        }
        //Keyboard Controls
        this.cursors = this.game.input.keyboard.createCursorKeys();

        /////////////////Adding Sprite Groups//////////////
        //Adding the Wall
        this.wall = this.game.add.group();
        this.wall.enableBody = true; //enables physics for wall
        //Adding Immovable Walls
        this.immovableWall = this.game.add.group();
        this.immovableWall.enableBody = true;
        //Adding Upwards Ledge
        this.ledge = this.game.add.group();
        this.ledge.enableBody = true;
        //Adding Downward Ledge
        this.ledgeDown = this.game.add.group();
        this.ledgeDown.enableBody = true;
        //Adding Sidewards Ledge
        this.ledgeSide = this.game.add.group();
        this.ledgeSide.enableBody = true;
        //Adding Enemies
        this.enemy = this.game.add.group();
        this.enemy.enableBody = true;
        //Adding Balls
        this.ball = this.game.add.group();
        this.ball.enableBody = true;
        //Adding Spikes
        this.spikes = this.game.add.group();
        this.spikes.enableBody = true;
        //Falling Spikes
        this.fallingSpikes = this.game.add.group();
        this.fallingSpikes.enableBody = true;
        //Adding Coins (Win Game)
        this.coin = this.game.add.group();
        this.coin.enableBody = true;
        //Adding This Undeniable Death At the Bottom
        this.death = this.game.add.group();
        this.death.enableBody = true;

        /////////////////////Enemy Bullets///////////////
        // creates enemy bullets
        this.enemyBullets = this.game.add.group();
        this.enemyBullets.enableBody = true;
        this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemyBullets.createMultiple(30, 'bulletEnemy');
        this.enemyBullets.setAll('anchor.x', 0.5);
        this.enemyBullets.setAll('anchor.y', 1);
        this.enemyBullets.setAll('outOfBoundsKill', true);
        this.enemyBullets.setAll('checkWorldBounds', true);

        ////////////////////////////////Key Control Movements/////////////////////////
        //Player Movement (WASD);
        this.movementUp = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.movementDown = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.movementLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.movementRight = this.game.input.keyboard.addKey(Phaser.Keyboard.D)

        //Change Weapon Fire Type
        this.pullBullet = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        this.pushBullet = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        this.killBullet = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);

        //Booleans to Trigger Different Weapon Types
        this.pullBullet.onDown.add(this.goPull, this);
        this.pushBullet.onDown.add(this.goPush, this);
        this.killBullet.onDown.add(this.goKill, this);

        //Fire from Keyboard
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SHIFT]);
        this.shiftFire = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

        /////////////////////////World Creation Initialization Grid///////////////////////
        var worldName;
        this.worldCreator(worldGenerator[randomGeneratorForWorld], randomGeneratorForGameMode);

        worldName = worldGenerator[randomGeneratorForWorld].worldName

        ////////////////////////////////////////////Camera///////////////////////////////////////////////////////////
        // this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);

        //Streak
        this.text = this.game.add.text(200, 6208, "Streak: " + streak, { font: "32px Arial", fill: "#ffffff", align: "center" });
        this.text.fixedToCamera = true;
        this.text.cameraOffset.setTo(100, 750);

        //World
        this.text = this.game.add.text(200, 6208, "World: " + worldName + "\n Game Mode: " + gameModeName, { font: "20px Arial", fill: "#ffffff", align: "center" });
        this.text.fixedToCamera = true;
        this.text.cameraOffset.setTo(1100, 725);

    },
    // ////////////////////////Out of Bounds Events//////////////////////////
    // playerOut: function (player) {
    //     if (player.x >= 1400) {
    //         player.reset(0, player.y)
    //         player.body.velocity.x = 400;
    //     }
    //     else if (0 >= player.x) {
    //         player.reset(1400, player.y)
    //         player.body.velocity.x = -400;
    //     }

    // },
    // // ledgeOut: function (ledge) {
    // //     if (ledge.x >= 1400) {
    // //         ledge.reset(0, ledge.y)
    // //         ledge.body.velocity.x = 400;
    // //     }
    // //     else if (0 >= ledge.x) {
    // //         ledge.reset(1400, ledge.y)
    // //         ledge.body.velocity.x = -400;
    // //     }
    // //     // console.log(this.ledgeX.x + ' ' + this.ledgeX.y);

    // // },
    //////////////Creation of the World///////////////
    worldCreator: function (thisWorldGenerator, gameMode) {
        //Entire Object Fed to Integrate World Generator
        // console.log(thisWorldGenerator);

        //////////////////Shuffling Positions of Player and BaseCamp////////////////
        shuffle(thisWorldGenerator.baseCamp);
        // console.log(thisWorldGenerator.baseCamp);

        ////////////////////Adding Player//////////////////////
        this.player = this.game.add.sprite(thisWorldGenerator.baseCamp[0].playerXBaseCamp, thisWorldGenerator.baseCamp[0].playerYBaseCamp, 'dude');
        this.game.physics.arcade.enable(this.player); //enables physics for player
        this.player.anchor.setTo(.5);
        // this.player.scale.setTo(.6);
        this.player.scale.setTo(.35);
        // this.player.alpha = this.game.rnd.realInRange(.5, 1);
        // this.player.tint = Phaser.Color.getRandomColor(50, 255, 255);
        this.player.body.setSize(63, 84, 5, 6);
        // this.player.body.bounce.y = 0;
        this.player.body.mass = 6;
        this.player.body.gravity.y = 1500;
        //this.player.body.allowDrag = false;
        this.player.body.collideWorldBounds = true;
        // this.player.checkWorldBounds = true;
        // this.player.events.onOutOfBounds.add(this.playerOut, this);

        // PLAYER ANIMATIONS
        this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.player.animations.add('right', [9, 10, 11, 12, 13, 14, 15], 10, true);

        //////////////////Adding Weapons////////////////////
        /////////////Pull as Default
        pullBoolean = true;
        //  Creates 30 bullets, using the 'bullet' graphic
        this.weapon1 = this.game.add.weapon(60, 'bullet1');
        //  The bullet will be automatically killed when it leaves the camera bounds
        this.weapon1.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon1.bulletAngleOffset = 90;
        //  The speed at which the bullet is fired
        this.weapon1.bulletSpeed = 700;
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon1.fireRate = 120;
        // Track Player
        this.weapon1.trackSprite(this.player, 10, -30);

        /////////////////Push
        //  Creates 30 bullets, using the 'bullet' graphic
        this.weapon2 = this.game.add.weapon(60, 'bullet2');
        //  The bullet will be automatically killed when it leaves the camera bounds
        this.weapon2.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon2.bulletAngleOffset = 90;
        //  The speed at which the bullet is fired
        this.weapon2.bulletSpeed = 700;
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon2.fireRate = 120;
        //Match Your Velocity?
        // Track Player
        this.weapon2.trackSprite(this.player, 10, -30);

        ////////////////Stop
        //  Creates 30 bullets, using the 'bullet' graphic
        this.weapon3 = this.game.add.weapon(60, 'bullet3');
        //  The bullet will be automatically killed when it leaves the camera bounds
        this.weapon3.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon3.bulletAngleOffset = 90;
        //  The speed at which the bullet is fired
        this.weapon3.bulletSpeed = 700;
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon2.fireRate = 120;
        // Track Player
        this.weapon3.trackSprite(this.player, 10, -30);

        // - 20 for Tracking//

        //Adding Undeniable Death
        for (var i = 0; i < thisWorldGenerator.world.deathIterator; i++) {
            this.deathX = this.death.create(i * thisWorldGenerator.world.deathX, thisWorldGenerator.world.deathY, 'spikes');
            this.deathX.scale.setTo(1);
            this.deathX.body.immovable = true;
        }

        //Block Debugging
        for (var x = 0; x < thisWorldGenerator.world.iteratorX; x++) {
            for (var y = 0; y < thisWorldGenerator.world.iteratorY; y++) {
                ////////Creation of Rectangle////////////;
                var rect = new Phaser.Rectangle(x * thisWorldGenerator.world.xRectangleF, y * thisWorldGenerator.world.yRectangleF, thisWorldGenerator.world.xBlockSizeF, thisWorldGenerator.world.yBlockSizeF);
                var xOfSprite = rect.x
                var yOfSprite = rect.y
                rect.offset(20, 20);

                //Debugging Purposes
                // this.text = this.game.add.text(rect.x + 100, rect.y + 100, "Rectangle " + x + " x " + y + " y ", { font: "32px Arial", fill: "#ffffff", align: "center" });

                ////////////Random Array to Scramble Positions Within Rectangle//////////
                // var positionArray = [topCenter, topLeft, topRight, center, centerLeft, centerRight, bottomCenter, bottomLeft, bottomRight];
                if (x === thisWorldGenerator.baseCamp[0].iteratorXBaseCamp && y === thisWorldGenerator.baseCamp[0].iteratorYBaseCamp) {
                    this.baseCamp(xOfSprite, yOfSprite, rect, bottomCenter, bottomLeft, bottomRight, centerLeft, centerRight, topLeft, topRight);
                }
                else {
                    shuffle(positionArray);
                    // console.log("x" + "y" + x + y + " " + positionArray)
                    //////Sprites//////
                    for (var i = 0; i < thisWorldGenerator.world.amountOfSpritesInGrid; i++) {
                        this.gridSystem(xOfSprite, yOfSprite, rect, positionArray[i]);
                    }
                    if (gameMode === 0) {
                        this.coinSpawn(xOfSprite, yOfSprite, rect, positionArray[thisWorldGenerator.world.amountOfSpritesInGrid])
                        // console.log("coin initiated");
                    }
                    else if (gameMode === 1) {
                        if (x === thisWorldGenerator.baseCamp[1].iteratorXBaseCamp && y === thisWorldGenerator.baseCamp[1].iteratorYBaseCamp) {
                            this.finish = this.game.add.sprite(xOfSprite, yOfSprite, 'flag');
                            this.game.physics.arcade.enable(this.finish);
                            this.finish.alignIn(rect, positionArray[i + 1]);
                            // console.log("Flag Initiated");
                        }
                    }
                }
            }
        }
    },
    /////////////////////////Randomness of the Map///////////////////////////
    gridSystem: function (x, y, rect, positionInRectangle) {
        //Create Randomness in Each Grid
        var gridSystemGenesis = this.game.rnd.integerInRange(0, 100);
        //Create Random Pattern Within Each Grid
        if (gridSystemGenesis >= 0 && gridSystemGenesis <= 12) {
            this.immovableSpawn(x, y, rect, positionInRectangle);
        }
        else if (gridSystemGenesis >= 13 && gridSystemGenesis <= 33) {
            this.wallSpawn(x, y, rect, positionInRectangle);
        }
        else if (gridSystemGenesis >= 34 && gridSystemGenesis <= 48) {
            this.enemySpawn(x, y, rect, positionInRectangle);
        }
        else if (gridSystemGenesis >= 49 && gridSystemGenesis <= 61) {
            this.ledgeSpawn(x, y, rect, positionInRectangle);
        }
        else if (gridSystemGenesis >= 62 && gridSystemGenesis <= 69) {
            this.ledgeDownSpawn(x, y, rect, positionInRectangle);
        }
        else if (gridSystemGenesis >= 70 && gridSystemGenesis <= 74) {
            this.ballSpawn(x, y, rect, positionInRectangle);
        }
        else if (gridSystemGenesis >= 75 && gridSystemGenesis <= 84) {
            this.ledgeSideSpawn(x, y, rect, positionInRectangle);
        }
        else if (gridSystemGenesis >= 85 && gridSystemGenesis <= 100) {
            this.spikeSpawn(x, y, rect, positionInRectangle);
        }
    },
    //////////////////////////////////////Starting Position of Player//////////////////////////////
    baseCamp: function (x, y, rect, positionInRectangle1, positionInRectangle2, positionInRectangle3, positionInRectangle4, positionInRectangle5, positionInRectangle6, positionInRectangle7) {

        /////////////////////////////////Starting Point of The Map////////////////////////////////

        // console.log("-----------------------------------");
        // console.log("BaseCamp");
        //create wall
        this.immovableWallX = this.immovableWall.create(x, y, 'immovableRotatedWall');
        this.immovableWallX.anchor.setTo(.5);
        this.immovableWallX.scale.setTo(.4);
        this.immovableWallX.alignIn(rect, positionInRectangle1);
        this.immovableWallX.body.immovable = true;
        this.immovableWallX.body.moves = false;
        this.wallSpawn(x, y, rect, positionInRectangle6);
        this.wallSpawn(x, y, rect, positionInRectangle7);
        this.ledgeSpawn(x, y, rect, positionInRectangle2);
        this.ledgeSpawn(x, y, rect, positionInRectangle3);
        this.ballSpawn(x, y, rect, positionInRectangle4);
        this.ballSpawn(x, y, rect, positionInRectangle5);
        // console.log("-----------------------------------");

    },
    //////////////////////////Creating Game Objects/////////////////////////
    coinSpawn: function (x, y, rect, positionInRectangle) {
        this.coinX = this.coin.create(x, y, 'coin');
        this.coinX.anchor.setTo(.7);
        this.coinX.scale.setTo(.7);
        this.coinX.alignIn(rect, positionInRectangle);
    },
    wallSpawn: function (x, y, rect, positionInRectangle) {
        this.wallX = this.wall.create(x, y, wallArray[Math.floor(Math.random() * wallArray.length)]);
        this.wallX.anchor.setTo(.5);
        // this.wallX.scale.setTo(.5);
        this.wallX.scale.setTo(wallLength[Math.floor(Math.random() * wallLength.length)]);
        this.wallX.alignIn(rect, positionInRectangle)
        this.wallX.body.maxVelocity.setTo(200);
        // this.wallX.body.immovable = true;
        this.wallX.body.collideWorldBounds = true;
        this.wallX.body.bounce.setTo(1);
        this.wallX.body.mass = 200;
        this.wallX.body.velocity.setTo(this.game.rnd.integerInRange(-50, 50), this.game.rnd.integerInRange(-50, 50));
        ///////////Drag Events///////////
        // this.wallX.inputEnabled = true;
        // this.wallX.input.enableDrag();
        // this.wallX.events.onDragStart.add(this.startDrag, this);
        // this.wallX.events.onDragStop.add(this.stopDrag, this);
        // this.wallX.body.moves = false;
    },
    immovableSpawn: function (x, y, rect, positionInRectangle) {
        this.immovableWallX = this.immovableWall.create(x, y, immovableWallArray[Math.floor(Math.random() * immovableWallArray.length)]);
        this.immovableWallX.anchor.setTo(.5);
        // this.immovableWallX.scale.setTo(.5);
        this.immovableWallX.scale.setTo(immovableWallLength[Math.floor(Math.random() * immovableWallLength.length)]);
        this.immovableWallX.body.immovable = true;
        this.immovableWallX.body.collideWorldBounds = true;
        this.immovableWallX.body.bounce.setTo(1);
        this.immovableWallX.body.mass = 400;
        this.immovableWallX.alignIn(rect, positionInRectangle)
        if (immovableWallVelocity[Math.floor(Math.random() * immovableWallVelocity.length)] === 0) {
            this.immovableWallX.body.velocity.setTo(this.game.rnd.integerInRange(-50, 50), this.game.rnd.integerInRange(-50, 50));
        }
        // this.immovableWallX.body.mass = 200;
        //this.immovableWallX.body.velocity.setTo(this.game.rnd.integerInRange(-50, 50), this.game.rnd.integerInRange(-50, 50));
        // this.wallX.body.moves = false;
    },
    enemySpawn: function (x, y, rect, positionInRectangle) {
        this.trumpX = this.enemy.create(x, y, 'enemy');
        this.trumpX.body.velocity.x = this.game.rnd.realInRange(-400, 400);
        // this.trumpX.body.gravity.y = 10;
        this.trumpX.body.moves = false;
        this.trumpX.anchor.setTo(.5);
        this.trumpX.scale.setTo(.6);
        this.trumpX.body.mass = 20;
        this.trumpX.body.maxVelocity.setTo(400);
        this.trumpX.body.bounce.setTo(1);
        this.trumpX.body.collideWorldBounds = true;
        this.trumpX.alignIn(rect, positionInRectangle);
    },
    ledgeSpawn: function (x, y, rect, positionInRectangle) {
        this.ledgeX = this.ledge.create(x, y, 'ledge');
        this.ledgeX.anchor.setTo(.5);
        // this.ledgeX.scale.setTo(.5);
        this.ledgeX.scale.setTo(.4);
        this.ledgeX.body.mass = 20;
        this.ledgeX.body.maxVelocity.setTo(300);
        //////////////////////Ledge Out of Bounds/////////////////////
        // this.ledgeX.checkWorldBounds = true;
        // this.ledgeX.events.onOutOfBounds.add(this.ledgeOut, this);
        this.ledgeX.body.bounce.setTo(1);
        this.ledgeX.body.collideWorldBounds = true;
        this.ledgeX.alignIn(rect, positionInRectangle);
    },
    ledgeDownSpawn: function (x, y, rect, positionInRectangle) {
        this.ledgeY = this.ledgeDown.create(x, y, 'ledgeDown');
        // this.ledgeY.body.maxVelocity.setTo(400);
        this.ledgeY.anchor.setTo(.5);
        // this.ledgeY.scale.setTo(.5);
        this.ledgeY.scale.setTo(.4);
        this.ledgeY.body.mass = 20;
        this.ledgeY.body.maxVelocity.setTo(300);
        this.ledgeY.body.collideWorldBounds = true;
        // this.ledgeY.body.immovable = true;
        this.ledgeY.body.bounce.setTo(1);
        this.ledgeY.body.mass = 200;
        this.ledgeY.alignIn(rect, positionInRectangle);
    },
    ledgeSideSpawn: function (x, y, rect, positionInRectangle) {
        this.ledgeSideways = this.ledgeSide.create(x, y, 'ledgeSide');
        this.ledgeSideways.anchor.setTo(.5);
        // this.ledgeSideways.scale.setTo(.5);
        this.ledgeSideways.scale.setTo(.4);
        this.ledgeSideways.body.mass = 20;
        this.ledgeSideways.body.maxVelocity.setTo(300);
        this.ledgeSideways.body.velocity.x = this.game.rnd.realInRange(-300, 300);
        this.ledgeSideways.body.collideWorldBounds = true;
        this.ledgeSideways.body.bounce.setTo(1);
        this.ledgeSideways.alignIn(rect, positionInRectangle);
        // this.ledgeSideways.body.immovable = true;
    },
    ballSpawn: function (x, y, rect, positionInRectangle) {
        //Adding Ball
        this.ballX = this.ball.create(x, y, 'ball');
        this.ballX.anchor.setTo(.5);
        // this.ballX.scale.setTo(.5);
        this.ballX.scale.setTo(.5);
        this.ballX.body.mass = 30;
        this.ballX.body.maxVelocity.setTo(500);
        this.ballX.body.velocity.x = this.game.rnd.realInRange(-100, 100)
        this.ballX.body.collideWorldBounds = true;
        this.ballX.body.bounce.setTo(1.0);
        this.ballX.alignIn(rect, positionInRectangle);
        // this.ballX.body.setCircle(50);
        // this.ballX.body.mass = 5;
    },
    spikeSpawn: function (x, y, rect, positionInRectangle) {
        // var spikeArray = ['invertedSpikes', 'spikes'];
        // // var spikeLength = [.2, .3, .4, .5];
        // var spikeLength = [.2, .3,];
        this.spikesX = this.spikes.create(x, y, spikeArray[Math.floor(Math.random() * spikeArray.length)]);
        this.spikesX.anchor.setTo(.5);
        this.spikesX.scale.setTo(spikeLength[Math.floor(Math.random() * spikeLength.length)]);
        this.spikesX.body.immovable = true;
        this.spikesX.body.mass = 150;
        this.spikesX.alignIn(rect, positionInRectangle);
        // this.spikeFall(this.spikesX);
    },
    //SpikeFall
    // spikeFall: function (spikesX) {
    //     function spikeTimerFall (){
    //         this.spikesFall = this.fallingSpikes.getFirstDead(true, spikesX.x, spikesX.y, 'fallingSpikes');
    //         this.spikesFall.anchor.setTo(.5);
    //         this.spikesFall.scale.setTo(.5);
    //         this.spikesFall.alignIn(spikesX, positionArray[1]);
    //         this.spikesFall.checkWorldBounds = true;
    //         this.spikesFall.outOfBoundsKill = true;
    //         this.spikesFall.body.velocity.y = 300;
    //     }
    //     // this.spikeTimerFall(this.spikeFall);
    //     this.game.time.events.loop(Phaser.Timer.SECOND * this.game.rnd.integerInRange(3, 7), spikeTimerFall, this);
    // },
    //Dragging Motino for Walls
    // startDrag: function () {
    //     this.wallX.body.moves = false;
    // },
    // stopDrag: function () {
    //     this.wallX.body.moves = true;
    // },
    //Put the Game on Full Screen Mode
    gofull: function () {
        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        }
        else {
            this.game.scale.startFullScreen(false);
        }
    },
    //Pausing the Game
    goPause: function () {
        if (this.game.paused) {
            this.game.paused = false;
        }
        else {
            this.game.paused = true;
            //Streak
            // this.pauseText = this.game.add.text(this.player.x, this.player.y, "PAUSE", { font: "32px Arial", fill: "#ffffff", align: "center" });
            // this.pauseText.fixedToCamera = true;
            // this.pauseText.cameraOffset.setTo(1200, 750);
        }
    },
    ///////////////////////Handling Jump Events (Double-Jump)//////////////////
    upInputReleased: function () {
        var released = false;

        released = this.input.keyboard.upDuration(Phaser.Keyboard.W);
        released |= this.input.keyboard.upDuration(Phaser.Keyboard.SPACEBAR);

        return released;
    },
    upInputIsActive: function (duration) {
        var isActive = false;

        isActive = this.input.keyboard.downDuration(Phaser.Keyboard.W, duration);
        isActive |= this.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, duration);

        return isActive;
    },
    ///////////////////////////Weapon Functionality/////////////////
    goPull: function () {
        // console.log("1");
        pullBoolean = true;
        pushBoolean = false;
        stopBoolean = false;
        // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
    },
    goPush: function () {
        // console.log("2");
        pullBoolean = false;
        pushBoolean = true;
        stopBoolean = false;
        // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
    },
    goKill: function () {
        // console.log("3");
        pullBoolean = false;
        pushBoolean = false;
        stopBoolean = true;
        // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
    },
    ////////////////////////////////////////Localized Physics Functions//////////////////////////////////////
    //Enemy BUllets
    fireEnemyBullet: function() {
        livingEnemies.length = 0; 
        this.enemy.forEachAlive(function(enemy){
            livingEnemies.push(enemy)
        });
        if(this.time.now > enemyBulletTime) { 
            enemyBullet = this.enemyBullets.getFirstExists(false); 
            if(enemyBullet && livingEnemies.length > 0) {
                //enemyShotSound.play();
                var random = this.rnd.integerInRange(0, livingEnemies.length - 1);
                var shooter = livingEnemies[random];
                enemyBullet.reset(shooter.body.x, shooter.body.y + 30);
                enemyBulletTime = this.time.now + 500;
                this.physics.arcade.moveToObject(enemyBullet,this.player,600);
            }
        }
    },
    //How Game Updates Real-Time
    update: function () {

        console.log(this.game.time.fps);
        ////////////////////////Physics////////////////////////
        //Player Mechanics
        var onWall = this.game.physics.arcade.collide(this.player, this.wall, null, null, this);
        var onLedgeGrey = this.game.physics.arcade.collide(this.player, this.ledge, ledgeUp, null, this);
        var onLedgeGreen = this.game.physics.arcade.collide(this.player, this.ledgeDown, ledgeDownS, null, this);
        var onLedgeBlue = this.game.physics.arcade.collide(this.player, this.ledgeSide, ledgeSideX, null, this);
        var onBall = this.game.physics.arcade.collide(this.player, this.ball, ballMover, null, this);
        var onImmovable = this.game.physics.arcade.collide(this.player, this.immovableWall, null, null, this);

        //Weapon Mechanics
        this.game.physics.arcade.collide([this.weapon1.bullets, this.weapon2.bullets, this.weapon3.bullets], [this.ball, this.wall, this.ledge, this.ledgeDown, this.ledgeSide, this.enemy, this.coin], weaponHandler, null, this);
        this.game.physics.arcade.overlap([this.weapon1.bullets, this.weapon2.bullets, this.weapon3.bullets], [this.immovableWall, this.spikes], weaponImmovable, null, this);

        //Immovable Wall Mechanics
        this.game.physics.arcade.collide(this.immovableWall, [this.ball, this.wall, this.ledge, this.ledgeDown, this.ledgeSide, this.enemy], null, null, this);

        //Movable Wall Mechanics
        this.game.physics.arcade.collide(this.wall, this.wall);
        this.game.physics.arcade.collide(this.wall, this.spikes);

        // Ball Mechanics
        this.game.physics.arcade.collide(this.ball, [this.ball, this.wall, this.ledge, this.ledgeDown, this.ledgeSide], null, null, this);
        this.game.physics.arcade.overlap(this.ball, [this.enemy, this.spikes], deathThree, null, this);

        //Ledge vs. Ledge Mechanics
        this.game.physics.arcade.collide([this.ledge, this.ledgeSide, this.ledgeDown], [this.ledge, this.ledgeSide, this.ledgeDown, this.wall, this.spikes, this.enemy], null, null, this); //preventPhysicsBug Removed

        //Enemy Mechanics
        this.game.physics.arcade.collide(this.enemy, [this.spikes, this.wall, this.enemy], testFunctionX, null, this);

        //Coin Mechanics
        this.game.physics.arcade.collide(this.coin, [this.ball, this.wall, this.ledge, this.ledgeDown, this.ledgeSide, this.enemy, this.immovableWall], null, null, this);

        // //Flag Moving Mechanics
        // this.game.physics.arcade.collide(this.finish, this.wall);
        // this.game.physics.arcade.collide(this.finish, this.enemy);
        // this.game.physics.arcade.collide(this.finish, this.ledge);
        // this.game.physics.arcade.collide(this.finish, this.ledgeDown);
        // this.game.physics.arcade.collide(this.finish, this.ledgeSide);
        // this.game.physics.arcade.collide(this.finish, this.spikes);
        // this.game.physics.arcade.collide(this.finish, this.ball);


        //Death Mechanics
        this.game.physics.arcade.overlap(this.player, [this.enemy, this.spikes, this.death], deathOne, null, this);

        ////////////////////////////////Win Conditions/////////////////////////////////
        //Game Mode 1 Flag
        this.game.physics.arcade.overlap(this.player, this.finish, nextLevel, null, this);
        ////////////////////////////////Actual Controls////////////////////////////////

        //Jump Mechanics
        // Set a variable that is true when the player is a surface the ground (or different sides) or not a surface
        var onTheGround = this.player.body.touching.down;
        var onTheRightSide = this.player.body.touching.right;
        var onTheLeftSide = this.player.body.touching.left;
        var onUpsideDown = this.player.body.touching.up;
        var onNone = this.player.body.touching.none;

        // If the player is touching a surface, let him have 2 jumps
        if (onTheGround || onTheLeftSide || onTheRightSide || onUpsideDown) {
            this.jumps = 2;
            this.jumping = false;
        }

        //////////////////////////Double Jump Only from the ground/////////////////
        // if (onTheGround) {
        //     this.jumps = 2;
        //     this.jumping = false;
        // }

        // if (onTheLeftSide || onTheRightSide || onUpsideDown) {
        //     this.jumps = 0;
        //     this.jumping = false;
        // }

        // Jump!
        if (this.jumps > 0 && this.upInputIsActive(5)) {
            this.player.body.velocity.y = -400;
            this.jumping = true;
        }

        // Reduce the number of available jumps if the jump input is released
        if (this.jumping && this.upInputReleased()) {
            this.jumps--;
            this.jumping = false;
        }

        //Player Standing Still
        this.player.body.velocity.x = 0;

        //Player Angle Still
        this.player.angle = 0;

        //////////////////////////////////////////WASD Controls and Player Touch Mechanics//////////////////////////////////////////////
        if (onTheGround) {
            if (this.movementLeft.isDown && !this.movementRight.isDown) {
                this.player.body.velocity.x = -350;
                this.player.animations.play('left');
            }
            else if (this.movementRight.isDown && !this.movementLeft.isDown) {
                this.player.body.velocity.x = 350;
                this.player.animations.play('right');
            }
            else {
                this.player.animations.stop();
                this.player.frame = 8;
            }
        }
        else if (onTheRightSide) {
            if (onWall || onImmovable) {
                this.player.body.velocity.x = 100;
                this.player.body.velocity.y = 100;
            }
            if (onWall || onLedgeBlue || onLedgeGreen || onLedgeGrey || onImmovable) {
                this.player.frame = 6;
            }
            if (this.movementLeft.isDown) {
                this.player.body.velocity.y = -1000;
                this.player.body.velocity.x = -1000;
            }
        }
        else if (onTheLeftSide) {
            if (onWall || onImmovable) {
                this.player.body.velocity.x = -100;
                this.player.body.velocity.y = 100;
            }
            if (onWall || onLedgeBlue || onLedgeGreen || onLedgeGrey || onImmovable) {
                this.player.frame = 12;
            }
            if (this.movementRight.isDown) {
                this.player.body.velocity.y = -1000;
                this.player.body.velocity.x = 1000;
            }
        }
        else if (onUpsideDown) {
            this.player.animations.stop();
            this.player.frame = 8;
            this.player.angle = 180;
            this.player.body.velocity.y = -100;
            if (this.movementLeft.isDown) {
                this.player.body.velocity.x = -400;
                this.player.animations.play('left');
            }
            else if (this.movementRight.isDown) {
                this.player.body.velocity.x = 400;
                this.player.animations.play('right');
            }

        }
        else if (onNone) {
            this.player.frame = 10;
            if (this.movementLeft.isDown && !this.movementRight.isDown) {
                this.player.body.velocity.x = -400;
            }
            else if (this.movementRight.isDown && !this.movementLeft.isDown) {
                this.player.body.velocity.x = 400;
            }
            else if (this.movementLeft.isDown && this.movementRight.isDown) {
                this.player.body.velocity.x = 0;
            }
        }

        //////////Downwards Mechanics
        if (this.movementDown.isDown && onUpsideDown) {
            this.player.frame = 13;
            this.player.body.velocity.y = 200;
        }

        //Downward Mechanics
        if (this.movementDown.isDown) {
            this.player.frame = 13;
            this.player.body.velocity.y = 500;
        }

        ///////////////////////Weapon Mechanics///////////////

        //Shoot from Mouse
        if (this.game.input.activePointer.leftButton.isDown || this.shiftFire.isDown) {
            if (pullBoolean) {
                this.weapon1.fireAtPointer();
                this.weapon1.fire();
            }
            else if (pushBoolean) {
                this.weapon2.fireAtPointer();
                this.weapon2.fire();
            }
            else if (stopBoolean) {
                this.weapon3.fireAtPointer();
                this.weapon3.fire();
            }
        }
        // console.log(this.crosshair.x + ' ' + this.crosshair.y);

        //Moving Coins
        // this.coin.forEachAlive(moveTowardsPlayer, this, this.player);
        ///Enemy Sprites
        this.fireEnemyBullet();
    }
    // render: function () {
    //     this.game.debug.physicsGroup(this.wall);
    //     this.game.debug.physicsGroup(this.weapon);
    // }
};