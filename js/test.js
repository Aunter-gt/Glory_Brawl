//////////////////////////////////////////Testing Environment//////////////////////////////////////////
brawl.testing = function () { };
brawl.testing.prototype = {
    init: function (indexOfCurrentWorld, indexOfPlayerPosition, metroidvania) {
        //GENERAL MAP SETTINGS 
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // We're going to be using physics, so enable the Arcade Physics system
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //Scales our Game
        //Reset Enemy Bullet Array
        livingEnemies = [];
        /*
        Essentially the room initializes with the index of the current world, where the player should spawn in the world, and lastly the rooms available to switch to depending on the side.
        */
        // console.log("IndexOfWorld");
        // console.log(indexOfCurrentWorld);
        // console.log("IndexOfPlayer");
        // console.log(indexOfPlayerPosition);
        // console.log("Metroidvania");
        // console.log(metroidvania);
        this.indexOfCurrentWorld = indexOfCurrentWorld;
        this.indexOfPlayerPosition = indexOfPlayerPosition;
        this.metroidvania = metroidvania;
        cameraBoolean = true;
        // console.log(this.metroidvania.roomRightValue);
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
        this.load.image('trueSpikes', 'assets/trueSidewaysSpikes.png');
        this.load.image('sidewaysSpikes', 'assets/sidewaysSpikes.png');
        this.load.image('undeniableDeath', 'assets/undeniableDeath.png');
        this.load.image('fallingSpikes', 'assets/newSpikes.png');
        this.load.image('invertedSpikes', 'assets/invertedSpikesTrue.png')
        this.load.image('joystick', 'assets/joystick.png');
        this.load.image('joystick2', 'assets/joystickR.png');
        this.load.image('action', 'assets/action.png');
        this.load.image('ledgeDown', 'assets/platformX.png');
        this.load.image('ledgeSide', 'assets/platformSide.png');
        this.load.image('bullet3', 'assets/bullet44.png');
        this.load.image('bullet2', 'assets/bullet45.png');
        this.load.image('bullet1', 'assets/bullet46.png');
        this.load.image('bulletEnemy', 'assets/bullet129.png');
        this.load.image('boundary', 'assets/worldBounds.png');
        this.load.image('coin', 'assets/shield2.png');
        this.load.image('flag', 'assets/flag.png');
        this.load.image('door', 'assets/door.png');
        this.load.spritesheet('dude', 'assets/white.png', 87.5, 93.5);
    },
    create: function () {
        //Desired FPS of game and fps and lag debugging
        this.game.time.desiredFps = 60;

        //FPS Debugging

        // this.game.time.advancedTiming = true;

        //Background Color of Game
        this.game.stage.backgroundColor = "#4488AA";
        // this.game.stage.backgroundColor = Phaser.Color.getRandomColor(50, 255, 255);
        // this.game.stage.backgroundColor = "#2F4F4F";

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
        this.game.physics.arcade.OVERLAP_BIAS = 20; //20 is original

        ////////////////////Game World Size//////////////////////
        this.game.world.setBounds(0, 0, worldDesignedLevels[this.indexOfCurrentWorld].xOfWorld, worldDesignedLevels[this.indexOfCurrentWorld].yOfWorld);

        ////////////////////////////////////Keyboard Controls/////////////////////////////////
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
        //Adding Teleportation Doors.
        // this.door = this.game.add.group();
        // this.door.enableBody = true;
        //Adding This Undeniable Death At the Bottom
        this.death = this.game.add.group();
        this.death.enableBody = true;
        //Adding Flag Group
        this.flag = this.game.add.group();
        this.flag.enableBody = true;


        /////////////////////Practice Specific Sprite Groups/////////////////

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
        this.worldCreator(worldDesignedLevels[this.indexOfCurrentWorld]);

        worldName = worldDesignedLevels[this.indexOfCurrentWorld].worldName

        ////////////////////////////////////////////Camera///////////////////////////////////////////////////////////
        // this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
        this.cameraStyle = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        this.cameraStyle.onDown.add(this.cameraChange, this);

        //World
        this.text = this.game.add.text(200, 6208, "World: " + worldName, { font: "20px Arial", fill: "#ffffff", align: "center" });
        this.text.fixedToCamera = true;
        this.text.cameraOffset.setTo(1100, 725);

        //Teleportation
        // this.game.physics.arcade.overlap(this.player, this.door, this.teleportationDoor, null, this);

        //Timer
        //  Create our Timer
        this.timer = this.game.time.create(false);

        //  Set a TimerEvent to occur after 2 seconds
        this.timer.loop(1000, this.updateCounter, this);

        //  Start the timer running - this is important!
        //  It won't start automatically, allowing you to hook it to button events and the like.
        this.timer.start();
    },
    /////////////////Camera////////////////
    cameraChange: function () {
        if (cameraBoolean) {
            cameraBoolean = false;
        }
        else {
            cameraBoolean = true;
        }
        if (cameraBoolean) {
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
        }
        else {
            this.game.camera.unfollow();
        }
    },
    /////////////Timer/////////////
    updateCounter: function () {
        total++
    },
    //////////////////////////Room Switching (Metroidvania) Events//////////////////////////
    playerOut: function (player) {
        //Up
        if (player.y <= this.metroidvania.roomUpValue) {
            // player.reset(0, player.y)
            // player.body.velocity.x = 400;
            this.game.state.restart(true, false, this.metroidvania.roomUpIndex, 1, worldDesignedLevels[this.metroidvania.roomUpIndex].metroidvania);
        }
        //Down
        else if (player.y >= this.metroidvania.roomDownValue) {
            // player.reset(1400, player.y)
            // player.body.velocity.x = -400;
            this.game.state.restart(true, false, this.metroidvania.roomDownIndex, 0, worldDesignedLevels[this.metroidvania.roomDownIndex].metroidvania);
        }
        //Left
        else if (player.x <= this.metroidvania.roomLeftValue) {
            // player.reset(1400, player.y)
            // player.body.velocity.x = -400;
            this.game.state.restart(true, false, this.metroidvania.roomLeftIndex, 3, worldDesignedLevels[this.metroidvania.roomLeftIndex].metroidvania);
        }
        //Right
        else if (player.x >= this.metroidvania.roomRightValue) {
            // player.reset(1400, player.y)
            // player.body.velocity.x = -400;
            this.game.state.restart(true, false, this.metroidvania.roomRightIndex, 2, worldDesignedLevels[this.metroidvania.roomRightIndex].metroidvania);
        }

    },
    ///Creation of Text in Game
    textCreator: function (x, y, textInput, font, fontSize, fill, fontWeight) {
        this.text1 = this.game.add.text(x, y, textInput);
        this.text1.font = font;
        this.text1.fontSize = fontSize;
        this.text1.fill = fill;
        this.text1.fontWeight = fontWeight;
    },
    //Switching to Death State
    deathState: function (victim, killer) {
        // console.log(victim.body.x + ' '+ victim.body.y);
        victim.kill();
        game.state.start('deathState', true, false, respawnHolder.indexOfCurrentWorld, respawnHolder.indexOfPlayerPosition, respawnHolder.metroidvania);
    },
    //Character Respawn
    respawn: function (player, flag) {
        flag.kill();
        respawnHolder.indexOfCurrentWorld = this.indexOfCurrentWorld;
        respawnHolder.indexOfPlayerPosition = flag.indexOfPlayerPosition;
        respawnHolder.metroidvania = this.metroidvania;
        if (flag.specialCondition === 1) {
            ///////////////Why did I make it so that the flag won't respawn Ever? There was a Reason///////////
            // worldDesignedLevels[this.indexOfCurrentWorld].flagSpawn[flag.positionInArray].trigger = false;
            //Destruction of a sprite at a different level
            worldDesignedLevels[flag.specialWorld].immovableWallSpawn[flag.specialArray].trigger = false;
        }
    },
    specialConditionHandler(sprite1, sprite2) {
        sprite2.kill();
        //Removes Localized Sprites from Regenerating (Spikes)
        if (sprite2.specialCondition === 0) {
            //Destruction of Localized Sprite
            worldDesignedLevels[this.indexOfCurrentWorld].spikeSpawn[sprite2.positionInArray].trigger = false;
        }
        //Removes Sprites from Different Levels (Spikes)
        else if (sprite2.specialCondition === 1) {
            worldDesignedLevels[this.indexOfCurrentWorld].spikeSpawn[sprite2.positionInArray].trigger = false;
            //Destruction of a sprite at a different level
            worldDesignedLevels[sprite2.specialWorld].spikeSpawn[sprite2.specialArray].trigger = false;
        }
        //////////////////////////Creates New Sprites After Spikes Destroyed///////////////////////
        //worldDesignedLevels[sprite2.specialWorld].ledgeGreySpawn[sprite2.specialArray].trigger = true;
    },
    //////////////Creation of the World///////////////
    worldCreator: function (levelGenerator) {
        /////////////////////Testing Entirety of Level/////////////////
        // console.log(levelGenerator);
        ////////////////////Adding Player//////////////////////
        this.player = this.game.add.sprite(levelGenerator.playerPosition[this.indexOfPlayerPosition].x, levelGenerator.playerPosition[this.indexOfPlayerPosition].y, 'dude');
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
        // this.player.body.collideWorldBounds = true;
        this.player.checkWorldBounds = true;
        this.player.events.onOutOfBounds.add(this.playerOut, this);

        //Player Upwards Wall
        // this.player.wallUp = 200;

        // PLAYER ANIMATIONS
        this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.player.animations.add('right', [9, 10, 11, 12, 13, 14, 15], 10, true);

        //////////////////Adding Weapons////////////////////
        /////////////Pull as Default
        pullBoolean = true;
        //  Creates 30 bullets, using the 'bullet' graphic
        this.weapon1 = this.game.add.weapon(30, 'bullet1');
        //  The bullet will be automatically killed when it leaves the camera bounds
        this.weapon1.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon1.bulletAngleOffset = 90;
        //  The speed at which the bullet is fired
        this.weapon1.bulletSpeed = 500;
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon1.fireRate = 500;
        //Size of Bullet
        // this.weapon1.setBulletBodyOffset(5,2,-20,0); //setSize(32 / Math.abs(this.scale.x), 32 / Math.abs(this.scale.y), 24, 34)
        // Track Player
        this.weapon1.trackSprite(this.player, 0, 0);

        /////////////////Push
        //  Creates 30 bullets, using the 'bullet' graphic
        this.weapon2 = this.game.add.weapon(30, 'bullet2');
        //  The bullet will be automatically killed when it leaves the camera bounds
        this.weapon2.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon2.bulletAngleOffset = 90;
        //  The speed at which the bullet is fired
        this.weapon2.bulletSpeed = 500;
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon2.fireRate = 500;
        //Match Your Velocity?
        // Track Player
        this.weapon2.trackSprite(this.player, 0, 0);

        ////////////////Stop
        //  Creates 30 bullets, using the 'bullet' graphic
        this.weapon3 = this.game.add.weapon(30, 'bullet3');
        //  The bullet will be automatically killed when it leaves the camera bounds
        this.weapon3.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon3.bulletAngleOffset = 90;
        //  The speed at which the bullet is fired
        this.weapon3.bulletSpeed = 500;
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon3.fireRate = 500;
        // Track Player
        this.weapon3.trackSprite(this.player, 0, 0);

        // - 20 for Tracking//

        ///////////////////////////Sprite Generation in World/////////////////////////////
        // Generating Teleportation Doors
        // if (levelGenerator.doorSpawn[0]) {
        //     for (var i = 1; i < levelGenerator.doorSpawn.length; i++) {
        //         this.doorSpawn(levelGenerator.doorSpawn[i].x, levelGenerator.doorSpawn[i].y, levelGenerator.doorSpawn[i].teleportationX, levelGenerator.doorSpawn[i].teleportationY);
        //     }
        // }
        // Generating Undeniable Death
        if (levelGenerator.undeniableDeathSpawn[0]) {
            for (var i = 1; i < levelGenerator.undeniableDeathSpawn.length; i++) {
                if (levelGenerator.undeniableDeathSpawn[i].trigger) {
                    this.undeniableDeathSpawn(levelGenerator.undeniableDeathSpawn[i].x, levelGenerator.undeniableDeathSpawn[i].y, levelGenerator.undeniableDeathSpawn[i].velocityX, levelGenerator.undeniableDeathSpawn[i].velocityY, levelGenerator.undeniableDeathSpawn[i].sizeX, levelGenerator.undeniableDeathSpawn[i].sizeY, levelGenerator.undeniableDeathSpawn[i].art, levelGenerator.undeniableDeathSpawn[i].specialCondition, levelGenerator.undeniableDeathSpawn[i].specialWorld, levelGenerator.undeniableDeathSpawn[i].specialArray, levelGenerator.undeniableDeathSpawn[i].positionInArray);
                }
            }
        }
        //Generating Immovable Walls
        if (levelGenerator.immovableWallSpawn[0]) {
            for (var i = 1; i < levelGenerator.immovableWallSpawn.length; i++) {
                if (levelGenerator.immovableWallSpawn[i].trigger) {
                    this.immovableSpawn(levelGenerator.immovableWallSpawn[i].x, levelGenerator.immovableWallSpawn[i].y, levelGenerator.immovableWallSpawn[i].velocityX, levelGenerator.immovableWallSpawn[i].velocityY, levelGenerator.immovableWallSpawn[i].sizeX, levelGenerator.immovableWallSpawn[i].sizeY, levelGenerator.immovableWallSpawn[i].art, levelGenerator.immovableWallSpawn[i].phaseWall, levelGenerator.immovableWallSpawn[i].specialCondition, levelGenerator.immovableWallSpawn[i].specialWorld, levelGenerator.immovableWallSpawn[i].specialArray, levelGenerator.immovableWallSpawn[i].positionInArray);
                }
            }
        }
        //Generating movable Walls
        if (levelGenerator.wallSpawn[0]) {
            for (var i = 1; i < levelGenerator.wallSpawn.length; i++) {
                if (levelGenerator.wallSpawn[i].trigger) {
                    this.wallSpawn(levelGenerator.wallSpawn[i].x, levelGenerator.wallSpawn[i].y, levelGenerator.wallSpawn[i].velocityX, levelGenerator.wallSpawn[i].velocityY, levelGenerator.wallSpawn[i].sizeX, levelGenerator.wallSpawn[i].sizeY, levelGenerator.wallSpawn[i].art, levelGenerator.wallSpawn[i].specialCondition, levelGenerator.wallSpawn[i].specialWorld, levelGenerator.wallSpawn[i].specialArray, levelGenerator.wallSpawn[i].positionInArray);
                }
            }
        }
        //Generating spikes
        if (levelGenerator.spikeSpawn[0]) {
            for (var i = 1; i < levelGenerator.spikeSpawn.length; i++) {
                if (levelGenerator.spikeSpawn[i].trigger) {
                    this.spikeSpawn(levelGenerator.spikeSpawn[i].x, levelGenerator.spikeSpawn[i].y, levelGenerator.spikeSpawn[i].velocityX, levelGenerator.spikeSpawn[i].velocityY, levelGenerator.spikeSpawn[i].sizeX, levelGenerator.spikeSpawn[i].sizeY, levelGenerator.spikeSpawn[i].art, levelGenerator.spikeSpawn[i].specialCondition, levelGenerator.spikeSpawn[i].specialWorld, levelGenerator.spikeSpawn[i].specialArray, levelGenerator.spikeSpawn[i].positionInArray);
                }
            }
        }
        //Generating grey ledges
        if (levelGenerator.ledgeGreySpawn[0]) {
            for (var i = 1; i < levelGenerator.ledgeGreySpawn.length; i++) {
                if (levelGenerator.ledgeGreySpawn[i].trigger) {
                    this.ledgeGreySpawn(levelGenerator.ledgeGreySpawn[i].x, levelGenerator.ledgeGreySpawn[i].y, levelGenerator.ledgeGreySpawn[i].velocityX, levelGenerator.ledgeGreySpawn[i].velocityY, levelGenerator.ledgeGreySpawn[i].specialCondition, levelGenerator.ledgeGreySpawn[i].specialWorld, levelGenerator.ledgeGreySpawn[i].specialArray, levelGenerator.ledgeGreySpawn[i].positionInArray);
                }
            }
        }
        //Generating green ledges
        if (levelGenerator.ledgeGreenSpawn[0]) {
            for (var i = 1; i < levelGenerator.ledgeGreenSpawn.length; i++) {
                if (levelGenerator.ledgeGreenSpawn[i].trigger) {
                    this.ledgeGreenSpawn(levelGenerator.ledgeGreenSpawn[i].x, levelGenerator.ledgeGreenSpawn[i].y, levelGenerator.ledgeGreenSpawn[i].velocityX, levelGenerator.ledgeGreenSpawn[i].velocityY, levelGenerator.ledgeGreenSpawn[i].specialCondition, levelGenerator.ledgeGreenSpawn[i].specialWorld, levelGenerator.ledgeGreenSpawn[i].specialArray, levelGenerator.ledgeGreenSpawn[i].positionInArray);
                }
            }
        }
        //Generating blue ledges
        if (levelGenerator.ledgeBlueSpawn[0]) {
            for (var i = 1; i < levelGenerator.ledgeBlueSpawn.length; i++) {
                if (levelGenerator.ledgeBlueSpawn[i].trigger) {
                    this.ledgeBlueSpawn(levelGenerator.ledgeBlueSpawn[i].x, levelGenerator.ledgeBlueSpawn[i].y, levelGenerator.ledgeBlueSpawn[i].velocityX, levelGenerator.ledgeBlueSpawn[i].velocityY, levelGenerator.ledgeBlueSpawn[i].specialCondition, levelGenerator.ledgeBlueSpawn[i].specialWorld, levelGenerator.ledgeBlueSpawn[i].specialArray, levelGenerator.ledgeBlueSpawn[i].positionInArray);
                }
            }
        }
        //Generating enemies (Tabled For Now)
        if (levelGenerator.enemySpawn[0]) {
            for (var i = 1; i < levelGenerator.enemySpawn.length; i++) {
                if (levelGenerator.enemySpawn[i].trigger) {
                    this.enemySpawn(levelGenerator.enemySpawn[i].x, levelGenerator.enemySpawn[i].y, levelGenerator.enemySpawn[i].velocityX, levelGenerator.enemySpawn[i].velocityY, levelGenerator.enemySpawn[i].specialCondition, levelGenerator.enemySpawn[i].specialWorld, levelGenerator.enemySpawn[i].specialArray, levelGenerator.enemySpawn[i].positionInArray);
                }
            }
        }
        //Generating balls ledges
        if (levelGenerator.ballSpawn[0]) {
            for (var i = 1; i < levelGenerator.ballSpawn.length; i++) {
                if (levelGenerator.ballSpawn[i].trigger) {
                    this.ballSpawn(levelGenerator.ballSpawn[i].x, levelGenerator.ballSpawn[i].y, levelGenerator.ballSpawn[i].velocityX, levelGenerator.ballSpawn[i].velocityY, levelGenerator.ballSpawn[i].specialCondition, levelGenerator.ballSpawn[i].specialWorld, levelGenerator.ballSpawn[i].specialArray, levelGenerator.ballSpawn[i].positionInArray);
                }
            }
        }
        ///////////////////(Falling Spikes)////////////////
        if (levelGenerator.fallingSpikes[0]) {
            for (var i = 1; i < levelGenerator.fallingSpikes.length; i++) {
                if (levelGenerator.fallingSpikes[i].trigger) {
                    this.game.time.events.loop(Phaser.Timer.SECOND * levelGenerator.fallingSpikes[i].seconds, this.spikeFall, this, levelGenerator.fallingSpikes[i].x, levelGenerator.fallingSpikes[i].y, levelGenerator.fallingSpikes[i].velocityX, levelGenerator.fallingSpikes[i].velocityY, levelGenerator.fallingSpikes[i].specialCondition, levelGenerator.fallingSpikes[i].specialWorld, levelGenerator.fallingSpikes[i].positionInArray);
                }
            }
        }
        // //////////////////(Respawn)Flag//////////////////
        if (levelGenerator.flagSpawn[0]) {
            for (var i = 1; i < levelGenerator.flagSpawn.length; i++) {
                if (levelGenerator.flagSpawn[i].trigger) {
                    this.flagSpawn(levelGenerator.flagSpawn[i].x, levelGenerator.flagSpawn[i].y, levelGenerator.flagSpawn[i].velocityX, levelGenerator.flagSpawn[i].velocityY, levelGenerator.flagSpawn[i].indexOfPlayerPosition, levelGenerator.flagSpawn[i].art, levelGenerator.flagSpawn[i].specialCondition, levelGenerator.flagSpawn[i].specialWorld, levelGenerator.flagSpawn[i].specialArray, levelGenerator.flagSpawn[i].positionInArray);
                }
            }

        }
        ////////////////////////Text Generation///////////////////////////
        if (levelGenerator.text[0]) {
            for (var i = 1; i < levelGenerator.text.length; i++) {
                this.textCreator(levelGenerator.text[i].x, levelGenerator.text[i].y, levelGenerator.text[i].textInput, levelGenerator.text[i].font, levelGenerator.text[i].fontSize, levelGenerator.text[i].fill, levelGenerator.text[i].fontWeight);
            }
        }

        ///////////////////Debugging Purposes (Knowing The Placement of Each Sprites)/////////////////////////
        // var distanceOfXandY = 200;
        // var xIterator = Math.round(levelGenerator.xOfWorld / distanceOfXandY);
        // var yIterator = Math.round(levelGenerator.yOfWorld / distanceOfXandY);

        // for (var x = 1; x < xIterator; x++) {
        //     for (var y = 1; y < yIterator; y++) {
        //         this.text = this.game.add.text(x*distanceOfXandY, y*distanceOfXandY, x*distanceOfXandY+'X'+y*distanceOfXandY+'Y', { font: "10px Arial", fill: "#ffffff", align: "center" });
        //     }
        // }



    },
    //////////////////////////Creating Game Objects/////////////////////////
    // doorSpawn: function (x, y, teleportX, teleportY) {
    //     this.doorsX = this.door.create(x, y, 'door');
    //     this.doorsX.anchor.setTo(.7);
    //     this.doorsX.scale.setTo(.7);
    //     this.doorsX.body.immovable = true;
    //     this.doorsX.teleportationX = teleportX
    //     this.doorsX.teleportationY = teleportY
    //     console.log(this.doorsX.teleportationX);
    //     ///////////////////////physics properties
    //     // this.doorX.body.mass = 1;
    //     // this.doorX.body.maxVelocity.setTo(1000);
    //     // this.doorX.body.collideWorldBounds = true;
    //     // this.doorX.body.bounce.setTo(1);
    //     // this.doorX.body.velocity.setTo(velocityX, velocityY);
    // },
    //SpikeFall
    spikeFall: function (x, y, velocityX, velocityY, specialCondition, specialWorld, specialArray, positionInArray) {
        this.spikesFall = this.fallingSpikes.getFirstDead(true, x, y, 'fallingSpikes');
        this.spikesFall.specialCondition = specialCondition;
        this.spikesFall.specialWorld = specialWorld;
        this.spikesFall.specialArray = specialArray;
        this.spikesFall.positionInArray = positionInArray;
        this.spikesFall.anchor.setTo(.5);
        this.spikesFall.scale.setTo(.5);
        this.spikesFall.checkWorldBounds = true;
        this.spikesFall.outOfBoundsKill = true;
        this.spikesFall.body.gravity.x = velocityX;
        this.spikesFall.body.gravity.y = velocityY;
    },
    coinSpawn: function (x, y, velocityX, velocityY) {
        this.coinX = this.coin.create(x, y, 'coin');
        this.coinX.anchor.setTo(.7);
        this.coinX.scale.setTo(.7);
        this.coinX.body.mass = 1;
        this.coinX.body.maxVelocity.setTo(1000);
        this.coinX.body.collideWorldBounds = true;
        this.coinX.body.bounce.setTo(1);
        this.coinX.body.velocity.setTo(velocityX, velocityY);
        // this.coinX.alignIn(rect, positionInRectangle);
        // console.log(this.coinX);
    },
    flagSpawn: function (x, y, velocityX, velocityY, indexOfPlayerPosition, art, specialCondition, specialWorld, specialArray, positionInArray) {
        this.flagX = this.flag.create(x, y, art);
        this.flagX.specialCondition = specialCondition;
        this.flagX.specialWorld = specialWorld;
        this.flagX.specialArray = specialArray;
        this.flagX.positionInArray = positionInArray;
        this.flagX.body.mass = 1;
        this.flagX.body.maxVelocity.setTo(1000);
        this.flagX.body.collideWorldBounds = true;
        this.flagX.body.bounce.setTo(1);
        this.flagX.body.velocity.setTo(velocityX, velocityY);
        this.flagX.indexOfPlayerPosition = indexOfPlayerPosition;
    },
    undeniableDeathSpawn: function (x, y, velocityX, velocityY, sizeX, sizeY, art, specialCondition, specialWorld, specialArray, positionInArray) {
        this.deathX = this.death.create(x, y, art);
        this.deathX.specialCondition = specialCondition;
        this.deathX.specialWorld = specialWorld;
        this.deathX.specialArray = specialArray;
        this.deathX.positionInArray = positionInArray;
        this.deathX.scale.setTo(sizeX, sizeY);
        this.deathX.body.immovable = true;
        this.deathX.body.mass = 300;
        this.deathX.body.collideWorldBounds = true;
        this.deathX.body.immovable = true;
        this.deathX.body.bounce.setTo(1);
        this.deathX.body.velocity.setTo(velocityX, velocityY);
    },
    wallSpawn: function (x, y, velocityX, velocityY, sizeX, sizeY, art, specialCondition, specialWorld, specialArray, positionInArray) {
        this.wallX = this.wall.create(x, y, art);
        this.wallX.specialCondition = specialCondition;
        this.wallX.specialWorld = specialWorld;
        this.wallX.specialArray = specialArray;
        this.wallX.positionInArray = positionInArray;
        this.wallX.velocityVsImmovable = 100;
        this.wallX.anchor.setTo(.5);
        this.wallX.scale.setTo(sizeX, sizeY);
        this.wallX.body.immovable = true;
        this.wallX.body.mass = 150;
        this.wallX.body.maxVelocity.setTo(500);
        this.wallX.body.collideWorldBounds = true;
        this.wallX.body.bounce.setTo(1);
        this.wallX.body.velocity.setTo(velocityX, velocityY);
        ///////////Drag Events///////////
        // this.wallX.inputEnabled = true;
        // this.wallX.input.enableDrag();
        // this.wallX.events.onDragStart.add(this.startDrag, this);
        // this.wallX.events.onDragStop.add(this.stopDrag, this);
        // this.wallX.body.moves = false;
    },
    immovableSpawn: function (x, y, velocityX, velocityY, sizeX, sizeY, art, phaseWall, specialCondition, specialWorld, specialArray, positionInArray) {
        this.immovableWallX = this.immovableWall.create(x, y, art);
        // this.immovableWallX.anchor.setTo(.5);
        this.immovableWallX.specialCondition = specialCondition;
        this.immovableWallX.specialWorld = specialWorld;
        this.immovableWallX.specialArray = specialArray;
        this.immovableWallX.positionInArray = positionInArray;
        this.immovableWallX.phaseWall = phaseWall;
        if (phaseWall === 'phase') {
            this.immovableWallX.tint = Phaser.Color.hexToRGB("#6a0dad");
        }
        this.immovableWallX.scale.setTo(sizeX, sizeY);
        this.immovableWallX.body.immovable = true;
        this.immovableWallX.body.mass = 400;
        this.immovableWallX.body.maxVelocity.setTo(1000);
        this.immovableWallX.body.collideWorldBounds = true;
        this.immovableWallX.body.bounce.setTo(1);
        this.immovableWallX.body.velocity.setTo(velocityX, velocityY);
    },
    enemySpawn: function (x, y, velocityX, velocityY, specialCondition, specialWorld, specialArray, positionInArray) {
        this.trumpX = this.enemy.create(x, y, 'enemy');
        this.trumpX.specialCondition = specialCondition;
        this.trumpX.specialWorld = specialWorld;
        this.trumpX.specialArray = specialArray;
        this.trumpX.positionInArray = positionInArray;
        this.trumpX.velocityVsWallX = 50;
        this.trumpX.velocityVsWallY = 50;
        this.trumpX.anchor.setTo(.5);
        this.trumpX.scale.setTo(.6);
        this.trumpX.body.mass = 20;
        this.trumpX.body.maxVelocity.setTo(1000);
        this.trumpX.body.collideWorldBounds = true;
        this.trumpX.body.bounce.setTo(1);
        this.trumpX.body.velocity.setTo(velocityX, velocityY);
    },
    ledgeGreySpawn: function (x, y, velocityX, velocityY, specialCondition, specialWorld, specialArray, positionInArray) {
        this.ledgeGrey = this.ledge.create(x, y, 'ledge');
        this.ledgeGrey.specialCondition = specialCondition;
        this.ledgeGrey.specialWorld = specialWorld;
        this.ledgeGrey.specialArray = specialArray;
        this.ledgeGrey.positionInArray = positionInArray;
        this.ledgeGrey.velocityVsWallX = 100;
        this.ledgeGrey.velocityVsWallY = 100;
        this.ledgeGrey.anchor.setTo(.5);
        this.ledgeGrey.scale.setTo(.4);
        this.ledgeGrey.body.mass = 20;
        this.ledgeGrey.body.maxVelocity.setTo(1000);
        //////////////////////Ledge Out of Bounds/////////////////////
        // this.ledgeGrey.checkWorldBounds = true;
        // this.ledgeGrey.events.onOutOfBounds.add(this.ledgeOut, this);
        this.ledgeGrey.body.collideWorldBounds = true;
        this.ledgeGrey.body.bounce.setTo(1);
        this.ledgeGrey.body.velocity.setTo(velocityX, velocityY);
    },
    ledgeGreenSpawn: function (x, y, velocityX, velocityY, specialCondition, specialWorld, specialArray, positionInArray) {
        this.ledgeGreen = this.ledgeDown.create(x, y, 'ledgeDown');
        this.ledgeGreen.specialCondition = specialCondition;
        this.ledgeGreen.specialWorld = specialWorld;
        this.ledgeGreen.specialArray = specialArray;
        this.ledgeGreen.positionInArray = positionInArray;
        this.ledgeGreen.velocityVsWallX = 150;
        this.ledgeGreen.velocityVsWallY = 150;
        this.ledgeGreen.anchor.setTo(.5);
        this.ledgeGreen.scale.setTo(.4);
        this.ledgeGreen.body.mass = 20;
        this.ledgeGreen.body.maxVelocity.setTo(1000);
        this.ledgeGreen.body.collideWorldBounds = true;
        this.ledgeGreen.body.bounce.setTo(1);
        this.ledgeGreen.body.velocity.setTo(velocityX, velocityY);
    },
    ledgeBlueSpawn: function (x, y, velocityX, velocityY, specialCondition, specialWorld, specialArray, positionInArray) {
        this.ledgeBlue = this.ledgeSide.create(x, y, 'ledgeSide');
        this.ledgeBlue.specialCondition = specialCondition;
        this.ledgeBlue.specialWorld = specialWorld;
        this.ledgeBlue.specialArray = specialArray;
        this.ledgeBlue.positionInArray = positionInArray;
        this.ledgeBlue.velocityVsWallX = 200;
        this.ledgeBlue.velocityVsWallY = 200;
        this.ledgeBlue.anchor.setTo(.5);
        this.ledgeBlue.scale.setTo(.4);
        this.ledgeBlue.body.mass = 20;
        this.ledgeBlue.body.maxVelocity.setTo(1000);
        this.ledgeBlue.body.collideWorldBounds = true;
        this.ledgeBlue.body.bounce.setTo(1);
        this.ledgeBlue.body.velocity.setTo(velocityX, velocityY);
    },
    ballSpawn: function (x, y, velocityX, velocityY, specialCondition, specialWorld, specialArray, positionInArray) {
        //Adding Ball
        this.ballX = this.ball.create(x, y, 'ball');
        this.ballX.specialCondition = specialCondition;
        this.ballX.specialWorld = specialWorld;
        this.ballX.specialArray = specialArray;
        this.ballX.positionInArray = positionInArray;
        this.ballX.velocityVsWallX = 300;
        this.ballX.velocityVsWallY = 300;
        this.ballX.anchor.setTo(.5);
        this.ballX.scale.setTo(.5);
        this.ballX.body.setCircle(50);
        this.ballX.body.mass = 30;
        this.ballX.body.maxVelocity.setTo(1000);
        this.ballX.body.collideWorldBounds = true;
        this.ballX.body.bounce.setTo(1.0);
        this.ballX.body.velocity.setTo(velocityX, velocityY);
    },
    spikeSpawn: function (x, y, velocityX, velocityY, sizeX, sizeY, art, specialCondition, specialWorld, specialArray, positionInArray) {
        // var spikeArray = ['invertedSpikes', 'spikes'];
        // // var spikeLength = [.2, .3, .4, .5];
        // var spikeLength = [.2, .3,];
        this.spikesX = this.spikes.create(x, y, art);
        this.spikesX.specialCondition = specialCondition;
        this.spikesX.specialWorld = specialWorld;
        this.spikesX.specialArray = specialArray;
        this.spikesX.positionInArray = positionInArray;
        this.spikesX.anchor.setTo(.5);
        this.spikesX.scale.setTo(sizeX, sizeY);
        this.spikesX.body.immovable = true;
        this.spikesX.body.mass = 150;
        this.spikesX.body.collideWorldBounds = true;
        this.spikesX.body.bounce.setTo(1.0);
        this.spikesX.body.velocity.setTo(velocityX, velocityY);
        // this.spikesX.alignIn(rect, positionInRectangle);
        // this.spikeFall(this.spikesX);
    },
    //Dragging Motion for Walls
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
    fireEnemyBullet: function () {
        // livingEnemies.length = 0; 
        // this.enemy.forEachAlive(function(enemy){
        //     livingEnemies.push(enemy)
        // });
        // if(this.time.now > enemyBulletTime) { 
        //     enemyBullet = this.enemyBullets.getFirstExists(false); 
        //     if(enemyBullet && livingEnemies.length > 0) {
        //         //enemyShotSound.play();
        //         var random = this.rnd.integerInRange(0, livingEnemies.length - 1);
        //         var shooter = livingEnemies[random];
        //         enemyBullet.reset(shooter.body.x, shooter.body.y + 30);
        //         enemyBulletTime = this.time.now + 100; //500 was the "default value"
        //         // if (game.physics.arcade.distanceBetween(enemyBullet, this.player, false, true) < 500) {
        //         //     this.physics.arcade.moveToObject(enemyBullet,this.player,600);
        //         // }
        //         this.physics.arcade.moveToObject(enemyBullet,this.player,600);
        //     }
        // }
        //Clears Array
        livingEnemies.length = 0;
        this.enemy.forEachAlive(function (enemy) {
            if (this.game.physics.arcade.distanceBetween(enemy, this.player, false, true) < 400) {
                livingEnemies.push(enemy)
            }
        }, this, this.player);
        if (this.time.now > enemyBulletTime) {
            enemyBullet = this.enemyBullets.getFirstExists(false);
            if (enemyBullet && livingEnemies.length > 0) {
                //enemyShotSound.play();
                var random = this.rnd.integerInRange(0, livingEnemies.length - 1);
                var shooter = livingEnemies[random];
                enemyBullet.reset(shooter.body.x, shooter.body.y + 30);
                enemyBulletTime = this.time.now + 500; //500 was the "default value"
                // if (game.physics.arcade.distanceBetween(enemyBullet, this.player, false, true) < 500) {
                //     this.physics.arcade.moveToObject(enemyBullet,this.player,600);
                // }
                this.physics.arcade.moveToObject(enemyBullet, this.player, 440);
            }
        }
    },
    // teleportationDoor: function (player, door) {
    //     player.reset(door.teleportationX, door.teleportationY);
    // },
    //////////////////////////////////////////Localized Win Conditions////////////////////////////////////////////
    coinWin: function () {
        this.game.physics.arcade.overlap(this.player, this.coin, deathThree, null, this);
        //Coin Mechanics
        this.game.physics.arcade.collide(this.coin, [this.ball, this.wall, this.ledge, this.ledgeDown, this.ledgeSide, this.enemy, this.immovableWall], null, null, this);
        if (this.coin.countDead() === this.coinAmount) {
            nextLevel();
        }
    },
    //////////////////////////////Test Functions////////////////////////
    //////////////////////////////Moveable Wall Test///////////////////
    // wallStop: function (wall) {
    //     wall.body.immovable = false;
    //     console.log(wall.body.immovable);
    // },
    // //How Game Updates Real-Time (Actual Controls)
    update: function () {

        ////////////////////////////////////FPS Debugging////////////////////////////////////////
        // console.log(this.game.time.fps);
        // this.wall.forEachAlive(this.wallStop,this);
        ////////////////////////Physics////////////////////////
        //Player Mechanics
        var onImmovable = this.game.physics.arcade.collide(this.player, this.immovableWall, null, null, this);
        var onWall = this.game.physics.arcade.collide(this.player, this.wall, null, null, this);
        var onLedgeGrey = this.game.physics.arcade.collide(this.player, this.ledge, ledgeUp, null, this);
        var onLedgeGreen = this.game.physics.arcade.collide(this.player, this.ledgeDown, ledgeDownS, null, this);
        var onLedgeBlue = this.game.physics.arcade.collide(this.player, this.ledgeSide, ledgeSideX, null, this);
        var onBall = this.game.physics.arcade.collide(this.player, this.ball, ballMover, null, this);

        //Respawn Point Mechanics
        this.game.physics.arcade.overlap(this.player, this.flag, this.respawn, null, this);

        //Weapon Mechanics
        this.game.physics.arcade.collide(this.weapon1.bullets, [this.ball, this.wall, this.ledge, this.ledgeDown, this.ledgeSide, this.enemy, this.coin], pullWeaponHandler, null, this);
        this.game.physics.arcade.overlap(this.weapon1.bullets, [this.immovableWall, this.spikes, this.death], weaponImmovable, null, this);
        this.game.physics.arcade.collide(this.weapon2.bullets, [this.ball, this.wall, this.ledge, this.ledgeDown, this.ledgeSide, this.enemy, this.coin], stopWeaponHandler, null, this);
        this.game.physics.arcade.overlap(this.weapon2.bullets, [this.immovableWall, this.spikes, this.death], weaponImmovable, null, this);
        this.game.physics.arcade.collide(this.weapon3.bullets, [this.ball, this.wall, this.ledge, this.ledgeDown, this.ledgeSide, this.enemy, this.coin], killWeaponHandler, null, this);
        this.game.physics.arcade.overlap(this.weapon3.bullets, [this.immovableWall, this.spikes, this.death], weaponImmovable, null, this);

        //Immovable Wall Mechanics
        // this.game.physics.arcade.collide(this.immovableWall, [this.ball, this.wall, this.ledge, this.ledgeDown, this.ledgeSide, this.enemy], null, null, this);
        this.game.physics.arcade.collide(this.immovableWall, [this.ball, this.ledge, this.ledgeDown, this.ledgeSide, this.enemy], null, null, this);

        //Movable Wall Mechanics
        // this.game.physics.arcade.collide(this.wall, [this.wall, this.immovableWall, this.spikes, this.death], wallStopper, null, this);
        this.game.physics.arcade.collide(this.wall, [this.ledge, this.ledgeSide, this.ledgeDown, this.ball, this.enemy], wallGroupPhysics, null, this);

        //Enemy Bullet Mechanics
        this.game.physics.arcade.overlap(this.enemyBullets, [this.ball, this.wall, this.immovableWall, this.ledge, this.ledgeDown, this.ledgeSide, this.spikes, this.death], deathTwo, null, this);

        //Falling Spikes Mechanics
        this.game.physics.arcade.overlap(this.fallingSpikes, [this.ball, this.wall, this.immovableWall, this.ledge, this.ledgeDown, this.ledgeSide, this.spikes, this.enemy, this.death], deathTwo, null, this);

        // Ball Mechanics
        this.game.physics.arcade.collide(this.ball, [this.ball, this.ledge, this.ledgeDown, this.ledgeSide, this.death], null, null, this);
        // this.game.physics.arcade.overlap(this.ball, [this.enemy, this.spikes], deathThree, null, this);
        this.game.physics.arcade.overlap(this.ball, [this.enemy, this.spikes], this.specialConditionHandler, null, this);

        //Ledge vs. Ledge and Enemy Mechanics
        this.game.physics.arcade.collide([this.ledge, this.ledgeSide, this.ledgeDown], [this.ledge, this.ledgeSide, this.ledgeDown, this.spikes, this.enemy, this.death], null, null, this); //preventPhysicsBug Removed

        //Enemy Mechanics
        this.game.physics.arcade.collide(this.enemy, [this.spikes, this.enemy], null, null, this);

        //Death Mechanics
        this.game.physics.arcade.overlap(this.player, [this.enemy, this.spikes, this.enemyBullets, this.death, this.fallingSpikes], this.deathState, null, this);

        ////////////////////////////////Win Conditions/////////////////////////////////
        //Game Mode 0 Flag
        // if (this.randomGeneratorForGameMode === 0) {
        //     this.flagWin();
        // }
        // //Game Mode 1 Coin
        // else if (this.randomGeneratorForGameMode === 1) {
        //     this.coinWin();
        // }
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
            this.player.body.velocity.y = -500;
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
        //Camera Focused on Player
        if (cameraBoolean) {
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
                    this.player.body.velocity.y = -500; 4
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
                    this.player.body.velocity.y = -500;
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

            //////////Downwards Mechanics////////
            if (this.movementDown.isDown && onUpsideDown) {
                this.player.frame = 13;
                this.player.body.velocity.y = 200;
            }

            //Downward Mechanics
            if (this.movementDown.isDown) {
                this.player.frame = 13;
                this.player.body.velocity.y = 500;
            }
        }
        //Freelook
        else {
            //Original is 8 (Camera Speed)
            if (this.movementLeft.isDown) {
                this.game.camera.x -= 20;
            }
            else if (this.movementRight.isDown) {
                this.game.camera.x += 20;
            }
            if (this.movementUp.isDown) {
                this.game.camera.y -= 20;
                this.player.body.velocity.y = 0;
            }
            else if (this.movementDown.isDown) {
                this.game.camera.y += 20;
            }
            if (onTheRightSide) {
                if (onWall || onImmovable) {
                    this.player.body.velocity.x = 100;
                    this.player.body.velocity.y = 100;
                }
                if (onWall || onLedgeBlue || onLedgeGreen || onLedgeGrey || onImmovable) {
                    this.player.frame = 6;
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
            }
            else if (onUpsideDown) {
                this.player.animations.stop();
                this.player.frame = 8;
                this.player.angle = 180;
                this.player.body.velocity.y = -100;
            }
            else if (onNone) {
                this.player.frame = 10;
            }
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
        ///Enemy Sprites
        this.fireEnemyBullet();
    },
    //How Game Updates Real-Time (God Mode)!
    // update: function () {
    //     this.game.physics.arcade.overlap(this.player, this.door, this.teleportationDoor, null, this);
    //     this.fireEnemyBullet();
    //     ///////////God Mode//////////////
    //     this.player.body.velocity.y = 0;
    //     this.player.body.velocity.x = 0;

    //     if (cameraBoolean) {
    //         if (this.movementLeft.isDown) {
    //             this.player.body.velocity.x = -400;
    //             this.player.animations.play('left');
    //         }
    //         else if (this.movementRight.isDown) {
    //             this.player.body.velocity.x = 400;
    //             this.player.animations.play('right');
    //         }
    //         if (this.movementUp.isDown) {
    //             this.player.frame = 10;
    //             this.player.body.velocity.y = -650;
    //         }
    //         else if (this.movementDown.isDown) {
    //             this.player.frame = 10;
    //             this.player.body.velocity.y = 650;
    //         }
    //     }
    //     else {
    //         if (this.movementLeft.isDown) {
    //            this.game.camera.x -= 10;
    //         }
    //         else if (this.movementRight.isDown) {
    //             this.game.camera.x += 10;
    //         }
    //         if (this.movementUp.isDown) {
    //             this.game.camera.y -= 10;
    //         }
    //         else if (this.movementDown.isDown) {
    //             this.game.camera.y += 10;
    //         }
    //     }
    //     ///////////////////////Weapon Mechanics///////////////
    //     //Shoot from Mouse
    //     if (this.game.input.activePointer.leftButton.isDown || this.shiftFire.isDown) {
    //         if (pullBoolean) {
    //             this.weapon1.fireAtPointer();
    //             this.weapon1.fire();
    //         }
    //         else if (pushBoolean) {
    //             this.weapon2.fireAtPointer();
    //             this.weapon2.fire();
    //         }
    //         else if (stopBoolean) {
    //             this.weapon3.fireAtPointer();
    //             this.weapon3.fire();
    //         }
    //     }
    // }
    /////////////////////////Debugging + Timer///////////////////////////
    // render: function () {
    //     // this.game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);
    //     // this.game.debug.text('Global Timer: ' + total, 32, 32);
    //     // this.game.debug.text('Heat Timer: ' + total, 32, 64);
    //     // this.game.debug.body(this.player);
    //     // this.game.debug.physicsGroup(this.weapon1.bullets, '#ffffff');
    //     //Debugging FPS
    //     // this.game.debug.text(game.time.fps,500,500);
    // },
};