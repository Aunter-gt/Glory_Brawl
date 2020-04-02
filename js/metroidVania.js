//////////////////////////Creation of the World/////////////////////////////////
brawl.game.prototype.worldCreator = function (levelGenerator) {
    /////////////////////Testing Entirety of Level/////////////////
    // console.log(levelGenerator);
    ////////////////////Adding Player//////////////////////
    this.player = this.game.add.sprite(levelGenerator.playerPosition[this.indexOfPlayerPosition].x, levelGenerator.playerPosition[this.indexOfPlayerPosition].y, 'player');
    this.game.physics.arcade.enable(this.player); //enables physics for player
    this.player.anchor.setTo(.5);
    // this.player.scale.setTo(.6);
    this.player.scale.setTo(1);
    this.player.tint = Phaser.Color.GREEN;
    // this.player.alpha = this.game.rnd.realInRange(.5, 1);
    // this.player.tint = Phaser.Color.getRandomColor(50, 255, 255);
    this.player.body.setSize(34, 55.5, 15, 7);
    // this.player.body.bounce.y = 0;
    this.player.body.mass = 6; //6
    this.player.body.gravity.y = playerGravity;
    //this.player.body.allowDrag = false;
    // this.player.body.collideWorldBounds = true;
    this.player.checkWorldBounds = true;
    this.player.events.onOutOfBounds.add(this.playerOut, this);

    // PLAYER ANIMATIONS
    this.player.animations.add('left', [7, 8, 9], 10, true);
    this.player.animations.add('upsideDownLeft', [4, 5, 6], 10, true);
    this.player.animations.add('right', [13, 14, 15], 10, true);
    this.player.animations.add('upsideDownRight', [10, 11, 12], 10, true);

    //Camera Indicator
    this.cameraImage = this.game.add.image(0, 0, 'camera');
    this.cameraImage.fixedToCamera = true;
    this.cameraImage.cameraOffset.setTo(200, 100);
    this.cameraImage.kill();

    ///////////////////////Slow Motion Indicator////////////////////
    this.slowMotionArray = [];
    for (var i = 0; i < slowMotionLimit; i++) {
        // this.slowMotionFollow = this.imageGroup.create(0, 0, slowMotion);
        // this.slowMotionFollow = this.imageGroup.create(this.player.x + (i * 40), this.player.y - 50, slowMotion);
        this.slowMotionFollow = this.slowMotionGroup.create(i*100+50, 6208, slowMotion);
        this.slowMotionFollow.fixedToCamera = true;
        this.slowMotionFollow.cameraOffset.setTo(i*100+50, 700);
        this.slowMotionFollow.name = slowMotion;
        // this.slowMotionFollow.fixedToCamera = true;
        this.slowMotionArray.push(this.slowMotionFollow);
    }

    //////////////////Adding Weapons////////////////////
    /////////////Pull as Default
    pullBoolean = true;
    //  Creates 30 bullets, using the 'bullet' graphic
    this.weapon1 = this.game.add.weapon(30, 'bulletPull');
    //  The bullet will be automatically killed when it leaves the camera bounds
    this.weapon1.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    //  Because our bullet is drawn facing up, we need to offset its rotation:
    this.weapon1.bulletAngleOffset = 90;
    //  The speed at which the bullet is fired
    this.weapon1.bulletSpeed = weaponBulletSpeed;
    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon1.fireRate = weaponFireRate;
    //Size of Bullet
    // this.weapon1.setBulletBodyOffset(5,2,-20,0); //setSize(32 / Math.abs(this.scale.x), 32 / Math.abs(this.scale.y), 24, 34)
    // Track Player
    this.weapon1.trackSprite(this.player, 0, 0);

    /////////////////PUSH
    //  Creates 30 bullets, using the 'bullet' graphic
    this.weapon2 = this.game.add.weapon(weaponBulletAmount, 'bulletPush');
    //  The bullet will be automatically killed when it leaves the camera bounds
    this.weapon2.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    //  Because our bullet is drawn facing up, we need to offset its rotation:
    this.weapon2.bulletAngleOffset = 90;
    //  The speed at which the bullet is fired
    this.weapon2.bulletSpeed = weaponBulletSpeed;
    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon2.fireRate = weaponFireRate;
    //Match Your Velocity?
    // Track Player
    this.weapon2.trackSprite(this.player, 0, 0);

    /////////////////Stop
    //  Creates 30 bullets, using the 'bullet' graphic
    this.weapon3 = this.game.add.weapon(weaponBulletAmount, 'bulletStop');
    //  The bullet will be automatically killed when it leaves the camera bounds
    this.weapon3.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    //  Because our bullet is drawn facing up, we need to offset its rotation:
    this.weapon3.bulletAngleOffset = 90;
    //  The speed at which the bullet is fired
    this.weapon3.bulletSpeed = weaponBulletSpeed;
    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon3.fireRate = weaponFireRate;
    //Match Your Velocity?
    // Track Player
    this.weapon3.trackSprite(this.player, 0, 0);

    ////////////////Kill
    //  Creates 30 bullets, using the 'bullet' graphic
    this.weapon4 = this.game.add.weapon(weaponBulletAmount, 'bulletKill');
    //  The bullet will be automatically killed when it leaves the camera bounds
    this.weapon4.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    //  Because our bullet is drawn facing up, we need to offset its rotation:
    this.weapon4.bulletAngleOffset = 90;
    //  The speed at which the bullet is fired
    this.weapon4.bulletSpeed = weaponBulletSpeed;
    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon4.fireRate = weaponFireRate;
    // Track Player
    this.weapon4.trackSprite(this.player, 0, 0);

    // - 20 for Tracking//
    ////////////////////////////Image Creation/////////////////////////
    if ('imageSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.imageSpawn.length; i++) {
            if (levelGenerator.imageSpawn[i].trigger) {
                this.imageSpawn(levelGenerator.imageSpawn[i], i);
            }
        }
    }
    ///////////////////////////Sprite Generation in World/////////////////////////////
    // Generating Undeniable Death
    if ('undeniableDeathSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.undeniableDeathSpawn.length; i++) {
            if (levelGenerator.undeniableDeathSpawn[i].trigger) {
                this.undeniableDeathSpawn(levelGenerator.undeniableDeathSpawn[i], i);
            }
        }
    }
    //Generating Immovable Walls
    if ('immovableWallSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.immovableWallSpawn.length; i++) {
            if (levelGenerator.immovableWallSpawn[i].trigger) {
                this.immovableWallSpawn(levelGenerator.immovableWallSpawn[i], i);
            }
        }
    }
    //Generating movable Walls
    if ('wallSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.wallSpawn.length; i++) {
            if (levelGenerator.wallSpawn[i].trigger) {
                this.wallSpawn(levelGenerator.wallSpawn[i], i);
            }
        }
    }
    //Generating Ledges
    if ('ledgeSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.ledgeSpawn.length; i++) {
            if (levelGenerator.ledgeSpawn[i].trigger) {
                this.ledgeSpawn(levelGenerator.ledgeSpawn[i], i);
            }
        }
    }
    //Generating enemies (Tabled For Now)
    if ('enemySpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.enemySpawn.length; i++) {
            if (levelGenerator.enemySpawn[i].trigger) {
                this.enemySpawn(levelGenerator.enemySpawn[i], i);
            }
        }
    }
    //Generating balls ledges
    if ('ballSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.ballSpawn.length; i++) {
            if (levelGenerator.ballSpawn[i].trigger) {
                this.ballSpawn(levelGenerator.ballSpawn[i], i);
            }
        }
    }
    ///////////////////(Falling Spikes)////////////////
    if ('fallingSpikes' in levelGenerator) {
        for (var i = 0; i < levelGenerator.fallingSpikes.length; i++) {
            if (levelGenerator.fallingSpikes[i].trigger) {
                this.game.time.events.loop(Phaser.Timer.SECOND * levelGenerator.fallingSpikes[i].seconds, this.spikeFall, this, levelGenerator.fallingSpikes[i], i);
            }
        }
    }
    // //////////////////(Respawn)Flag//////////////////
    if ('flagSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.flagSpawn.length; i++) {
            if (levelGenerator.flagSpawn[i].trigger) {
                this.flagSpawn(levelGenerator.flagSpawn[i]);
            }
        }

    }
    ////////////////////////Text Generation///////////////////////////
    if ('text' in levelGenerator) {
        for (var i = 0; i < levelGenerator.text.length; i++) {
            if (levelGenerator.text[i].trigger) {
                this.textCreator(levelGenerator.text[i], i);
            }
        }
    }

    ///////////////////Debugging Purposes (Knowing The Placement of Each Sprites)/////////////////////////
    var distanceOfXandY = 200;
    var xIterator = Math.round(levelGenerator.xOfWorld / distanceOfXandY);
    var yIterator = Math.round(levelGenerator.yOfWorld / distanceOfXandY);

    for (var x = 1; x < xIterator; x++) {
        for (var y = 1; y < yIterator; y++) {
            this.text = this.game.add.text(x * distanceOfXandY, y * distanceOfXandY, x * distanceOfXandY + 'X' + y * distanceOfXandY + 'Y', { font: "10px Arial", fill: "#ff0000", align: "center" });
        }
    }

};
//////////////////////////Room Switching (Metroidvania) Events//////////////////////////
brawl.game.prototype.playerOut = function (player) {
    //Up
    if (player.y <= this.metroidvania.roomUpValue) {
        // player.reset(0, player.y)
        // player.body.velocity.x = 400;
        this.game.state.restart(true, false, this.metroidvania.roomUpIndex, 1, worldClassLevels[this.metroidvania.roomUpIndex].metroidvania);
    }
    //Down
    else if (player.y >= this.metroidvania.roomDownValue) {
        // player.reset(1400, player.y)
        // player.body.velocity.x = -400;
        this.game.state.restart(true, false, this.metroidvania.roomDownIndex, 0, worldClassLevels[this.metroidvania.roomDownIndex].metroidvania);
    }
    //Left
    else if (player.x <= this.metroidvania.roomLeftValue) {
        // player.reset(1400, player.y)
        // player.body.velocity.x = -400;
        this.game.state.restart(true, false, this.metroidvania.roomLeftIndex, 3, worldClassLevels[this.metroidvania.roomLeftIndex].metroidvania);
    }
    //Right
    else if (player.x >= this.metroidvania.roomRightValue) {
        // player.reset(1400, player.y)
        // player.body.velocity.x = -400;
        this.game.state.restart(true, false, this.metroidvania.roomRightIndex, 2, worldClassLevels[this.metroidvania.roomRightIndex].metroidvania);
    }

};
///////////////////////////////////////////State Switches////////////////////////////////
//Character Dying From Enemies and Such
brawl.game.prototype.deathState = function (victim, killer) {
    victim.kill();
    this.emitterFunction(victim);
    this.game.time.events.add(1000, this.deathSwitch, this);
};
//Killing Yourself Literally
brawl.game.prototype.killSelf = function () {
    this.player.kill();
    this.emitterFunction(this.player);
    this.game.time.events.add(1000, this.deathSwitch, this);
};
//State Switch
brawl.game.prototype.deathSwitch = function () {
    this.game.state.start('deathState', true, false, respawnHolder.indexOfCurrentWorld, respawnHolder.indexOfPlayerPosition, respawnHolder.metroidvania);
},
    //Character Respawn
    brawl.game.prototype.respawn = function (player, flag) {
        flag.destroy();
        respawnHolder.indexOfCurrentWorld = this.indexOfCurrentWorld;
        respawnHolder.indexOfPlayerPosition = flag.indexOfPlayerPosition;
        respawnHolder.metroidvania = this.metroidvania;
        ///////////////////The Double Loops of Death//////////////////
        if (flag.specialHandler) {
            if ('undeniableDeathInsert' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.undeniableDeathInsert[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].undeniableDeathSpawn[flag.specialHandler.undeniableDeathInsert[i][j]].trigger = true;
                    }
                }
            }
            if ('undeniableDeathRemove' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.undeniableDeathRemove[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].undeniableDeathSpawn[flag.specialHandler.undeniableDeathRemove[i][j]].trigger = false;
                    }
                }
            }
            if ('immovableWallInsert' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.immovableWallInsert[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].immovableWallSpawn[flag.specialHandler.immovableWallInsert[i][j]].trigger = true;
                    }
                }
            }
            if ('immovableWallRemove' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.immovableWallRemove[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].immovableWallSpawn[flag.specialHandler.immovableWallRemove[i][j]].trigger = false;
                    }
                }
            }
            if ('wallInsert' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.wallInsert[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].wallSpawn[flag.specialHandler.wallInsert[i][j]].trigger = true;
                    }
                }
            }
            if ('wallRemove' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.wallRemove[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].wallSpawn[flag.specialHandler.wallRemove[i][j]].trigger = false;
                    }
                }
            }
            if ('ledgeInsert' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.ledgeInsert[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].ledgeSpawn[flag.specialHandler.ledgeInsert[i][j]].trigger = true;
                    }
                }
            }
            if ('ledgeRemove' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.ledgeRemove[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].ledgeSpawn[flag.specialHandler.ledgeRemove[i][j]].trigger = false;
                    }
                }
            }
            if ('ballInsert' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.ballInsert[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].ballSpawn[flag.specialHandler.ballInsert[i][j]].trigger = true;
                    }
                }
            }
            if ('ballRemove' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.ballRemove[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].ballSpawn[flag.specialHandler.ballRemove[i][j]].trigger = false;
                    }
                }
            }
            if ('enemyInsert' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.enemyInsert[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].enemySpawn[flag.specialHandler.enemyInsert[i][j]].trigger = true;
                    }
                }
            }
            if ('enemyRemove' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.enemyRemove[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].enemySpawn[flag.specialHandler.enemyRemove[i][j]].trigger = false;
                    }
                }
            }
            if ('fallingSpikesInsert' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.fallingSpikesInsert[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].fallingSpikes[flag.specialHandler.fallingSpikesInsert[i][j]].trigger = true;
                    }
                }
            }
            if ('fallingSpikesRemove' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.fallingSpikesRemove[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].fallingSpikes[flag.specialHandler.fallingSpikesRemove[i][j]].trigger = false;
                    }
                }
            }
            if ('flagInsert' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.flagInsert[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].flagSpawn[flag.specialHandler.flagInsert[i][j]].trigger = true;
                    }
                }
            }
            if ('flagRemove' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.flagRemove[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].flagSpawn[flag.specialHandler.flagRemove[i][j]].trigger = false;
                    }
                }
            }
            if ('textInsert' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.textInsert[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].text[flag.specialHandler.textInsert[i][j]].trigger = true;
                    }
                }
            }
            if ('textRemove' in flag.specialHandler) {
                for (var i = 0; i < flag.specialHandler.specialWorld.length; i++) {
                    for (var j = 0; j < flag.specialHandler.textRemove[i].length; j++) {
                        worldClassLevels[flag.specialHandler.specialWorld[i]].text[flag.specialHandler.textRemove[i][j]].trigger = false;
                    }
                }
            }
            if ('storyTrigger' in flag.specialHandler) {
                worldClassLevels[flag.specialHandler.storyTrigger.level].backgroundColor = flag.specialHandler.storyTrigger.backgroundColor;
                this.game.state.start('story', true, false, respawnHolder.indexOfCurrentWorld, respawnHolder.indexOfPlayerPosition, respawnHolder.metroidvania, flag.specialHandler.storyTrigger.page, flag.specialHandler.storyTrigger.backgroundColor, flag.specialHandler.storyTrigger.fontColor);
            }
        }
    };