//////////////////////////////////////Physics Handlers Between Objects////////////////////////////
//Dealing With Sprite Specific vs Group Deaths (Objects Kiling Each Other)
brawl.game.prototype.trapProjectiles = function (trapProjectiles, obstacles) {
    trapProjectiles.kill();
    if (obstacles.name === 'immovableWallPhase') {
        this.emitterFunction(obstacles, trapProjectiles, 'destroy');
    }
};

//Immovable Objects vs. Ball and Enemy
brawl.game.prototype.immovableMoveable = function (immovable, obj2) {
    ////////////////////Ball Against Spikes///////////////
    if (immovable.groupName === groupSpikes && obj2.groupName === groupBall) {
        this.emitterFunction(immovable, obj2, 'destroy');
        //Removes Localized Sprites from Regenerating (Spikes)
        if (immovable.specialCondition === 0) {
            //Destruction of Localized Sprite
            worldClassLevels[this.indexOfCurrentWorld].undeniableDeathSpawn[immovable.positionInArray].trigger = false;
        }
        //Removes Sprites from Different Levels (Spikes)
        else if (immovable.specialCondition === 1) {
            worldClassLevels[this.indexOfCurrentWorld].undeniableDeathSpawn[immovable.positionInArray].trigger = false;
            //Destruction of a sprite at a different level
            worldClassLevels[immovable.specialWorld].undeniableDeathSpawn[immovable.specialArray].trigger = false;
        }
        //////////////////////////Creates New Sprites After Spikes Destroyed///////////////////////
        //worldClassLevels[immovable.specialWorld].ledgeGreySpawn[immovable.specialArray].trigger = true;
    }
    //////////////////////////Wall Effects on Objects////////////////////////////
    if (immovable.name === immovableWallPadding) {
        // obj2.body.stop();
        obj2.body.bounce.setTo(1.3)
        obj2.velocityVsWallY = 100;
        obj2.velocityVsWallX = 100;
        // obj2.tint = tintImmovableWallMagnet;
        ////Maybe Kill This Later///
    }
    ///////////////////////Motion to Every Object///////////////////
    if (obj2.body.touching.up) {
        obj2.body.velocity.y = obj2.velocityVsWallY;
    }
    if (obj2.body.touching.down) {
        obj2.body.velocity.y = -obj2.velocityVsWallY;
    }
    if (obj2.body.touching.left) {
        obj2.body.velocity.x = obj2.velocityVsWallX;
    }
    if (obj2.body.touching.right) {
        obj2.body.velocity.x = -obj2.velocityVsWallX;
    }
    return;
};
//Wall Against Immovable Objects
brawl.game.prototype.wallImmovable = function (wall, immovable) {
    /////////////////Make Sure to Code In Objects Interacting With Each Other!!////////////////
    ////////////////Interactions Coded in the Orientation of Immovable Walls//////////////////
    // wall.body.stop();
    if (immovable.name === immovableWallKillWall) {
        this.emitterFunction(wall, null, 'destroy');
    }
    return;
};
//Wall Against Moveable Objects
brawl.game.prototype.wallMoveable = function (wall, objMov) {
    if (wall.name === wallRegularKiller || wall.name === wallSurfKiller || wall.name === wallGhostKiller || wall.name === wallInverseKiller) {
        if (objMov.groupName === groupEnemy) {
            this.emitterFunction(objMov, null, 'destroy');
        }
    }


    /////////////////////////Experimental Two////////////////////
    if (objMov.groupName === groupBall || objMov.groupName === groupLedge) {
        //Build One
        // objMov.body.stop();
        // objMov.body.velocity.x += wall.body.velocity.x/10;
        // objMov.body.velocity.y += wall.body.velocity.y/10;
        // var x = this.game.physics.arcade.computeVelocity(2, objMov.body, 300, 100, 200);
        // objMov.body.velocity.x += x;
    }

    return;
};
brawl.game.prototype.wallImmovableProcessArgument = function (wall, immovable) {
    if (wall.name === wallGhost) {
        return false;
    }
    else {
        true;
    }
};
brawl.game.prototype.playerImmovable = function (player, immovable) {
    // player.body.stop();
    if (immovable.name === immovableWallSlippery) {
        playerSlippery = 150;
    }
    else {
        playerSlippery = -25;
    }
    ///Activating immovableWallActivation(Like a Cloud)
    if (immovable.name === immovableWallActivation) {
        if (immovable.body.touching.up) {
            immovable.body.velocity.y = 200;
        }
        if (immovable.body.touching.down) {
            immovable.body.velocity.y = -200;
        }
        if (immovable.body.touching.left) {
            immovable.body.velocity.x = 200;
        }
        if (immovable.body.touching.up) {
            immovable.body.velocity.x = -200;
        }
        immovable.name = immovableWallRegular;
        immovable.tint = tintRemover;
    }
    //Activating immovableWallWorldGravity (World Gravity)
    if (immovable.name === immovableWallWorldGravity) {
        this.game.physics.arcade.gravity.setTo(0, 500);
        immovable.destroy();
    }
    if (immovable.name === immovableWallMario) {
        if (player.body.touching.up) {
            player.body.gravity.y = 500;
        }
        if (player.body.touching.down) {
            playerDoubleJumps = 4;
        }
        if (player.body.touching.left) {
            playerSpeed = 800;
        }
        if (player.body.touching.right) {
            playerJump = -1000;
        }
        immovable.name = immovableWallRegular;
        immovable.tint = tintRemover;
    }
    // console.log("Yes This is Hitting");
    // return;
};
brawl.game.prototype.playerWall = function (player, wall) {
    //WallRegular?
    if (wall.name === wallRegular) {
        wall.name = wallPlayerFrozen;
        wall.body.moves = false;
        wall.body.immovable = true;
        player.body.stop();
        wall.body.stop();
        wall.tint = tintWallPlayerFrozen;
    }
    //Wall Surf
    if (wall.name === wallSurf) {
        player.body.velocity.y = 0;
        wall.body.velocity.y = 0;
    }
    if (wall.name === wallSurfKiller) {
        player.body.stop();
        wall.body.stop();
        this.game.physics.arcade.moveToPointer(wall, 200);
    }
    //Wall Inverse
    if (wall.name === wallInverse) {
        wall.body.stop();
        player.body.stop();
        player.body.velocity.y = -50;
        if (player.body.touching.down) {
            wall.body.velocity.y = -50;
            if (player.x < wall.x) {
                wall.body.velocity.x = -150;
                // console.log(player.body.touching.up, 'up');
            }
            if (player.x > wall.x) {
                wall.body.velocity.x = 150;
                // console.log(player.body.touching.left, 'left', player.body.touching.right, 'right')
            }
        }
        if (player.body.touching.up) {
            wall.body.stop();
            if (player.x < wall.x) {
                wall.body.velocity.x = -150;
                // console.log(player.body.touching.up, 'up');
            }
            if (player.x > wall.x) {
                wall.body.velocity.x = 150;
                // console.log(player.body.touching.left, 'left', player.body.touching.right, 'right')
            }
        }
        if (player.body.touching.left || player.body.touching.right) {
            wall.body.velocity.y = 150;
        }
    }
    if (wall.name === wallInverseKiller) {
        player.body.velocity.y = -500;
        wall.body.velocity.y = 50;
        if (player.body.touching.up) {
            wall.body.velocity.y = -300;
        }
    }
    ///////////////////////////////Special Walls///////////////////////////
    if (wall.name === wallCloud) {
        //Control
        // wall.body.velocity.x = player.body.velocity.x;
        //Let it Go
        if (wall.key === wallHorizontal) {
            if (player.body.velocity.x < 0) {
                wall.body.velocity.x = -200;
            }
            if (player.body.velocity.x > 0) {
                wall.body.velocity.x = 200;
            }
        }
        else {
            if (this.movementUp.isDown) {
                wall.body.velocity.y = -200;
            }
            if (this.movementDown.isDown) {
                wall.body.velocity.y = 200;
            }
        }
    }

    return;
};
brawl.game.prototype.playerWallProcessArgument = function (player, wall) {
    if (wall.name === wallRegularKiller) {
        return false;
    }
    else {
        return true;
    }
};

// brawl.game.prototype.playerLedgeProcessArgument = function (player, ledge) {
//     if (player.body.touching) {
//         return true;
//     }
//     else {
//         return false;
//     }
// };

brawl.game.prototype.playerBall = function (player, ball) {
    /////////////////////GOOOFY///////////////
    // ball.body.stop();
    //75 is Original
    if (ball.body.touching.up) {
        player.body.velocity.y = 100;
        ball.body.velocity.y = 100;
    }
    if (ball.body.touching.down) {
        player.body.velocity.y = 1000;
        ball.body.velocity.y = -100;
        // ball.body.velocity.y = -200;
    }
    if (ball.body.touching.left) {
        ball.body.velocity.x = 100;
    }
    if (ball.body.touching.right) {
        ball.body.velocity.x = -100;
    }
    //   //////////////Control////////////
    //   // if (ball.body.touching.up) {
    //   //   ball.body.velocity.y = player.body.velocity.y;
    //   // }
    //   // if (ball.body.touching.down) {
    //   //   ball.body.velocity.y = player.body.velocity.y;
    //   // }
    //   // if (ball.body.touching.left) {
    //   //   ball.body.velocity.x = player.body.velocity.x;
    //   // }
    //   // if (ball.body.touching.right) {
    //   //   ball.body.velocity.x = player.body.velocity.x;
    //   // }
};
brawl.game.prototype.playerLedge = function (player, ledge) {
    // player.body.velocity.y = 0;
    //////////Eleveator Ledges/////////
    if (ledge.name === elevator) {
        if (ledge.body.touching.up) {
            ledge.body.velocity.y = -400;
        }
    }
    //////////Super Jump Bounce/////////
    if (ledge.name === bounce) {
        if (ledge.body.touching.up) {
            player.body.velocity.y = -1200;
        }
    }
    ////////Surfs Up Dude////////
    if (ledge.name === surf) {
        ledge.body.stop();
        player.body.velocity.y = 100;
        ledge.body.velocity.y = 0;
        if (player.body.touching.up || player.body.touching.down) {
            ledge.body.velocity.x = player.body.velocity.x;
            // console.log(player.body.touching.up, 'up');
        }
        if (ledge.body.touching.left || ledge.body.touching.right) {
            ledge.body.velocity.y = 0;
            ledge.body.velocity.x = 0;
            // console.log(player.body.touching.left, 'left', player.body.touching.right, 'right')
        }
    }
};
