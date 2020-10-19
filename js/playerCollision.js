brawl.game.prototype.playerGround = function (player, ground) {
    // player.body.stop();
    if (ground.name === groundSlippery.name) {
        this.playerSlippery = 200;
    }
    else {
        this.playerSlippery = nenHolder.playerSlippery;
    }
    //Activating groundOneWay
    // if (ground.name === groundOneWayPlayerBlockLeft) {
    //     ground.body.checkCollision.left = false;
    // }
    ///Activating groundActivation(Like a Cloud)
    if (ground.name === groundActivation.name) {
        if (ground.body.touching.up) {
            ground.body.velocity.setTo(0, 200);
        }
        else if (ground.body.touching.down) {
            ground.body.velocity.setTo(0, -200);

        }
        else if (ground.body.touching.left) {
            ground.body.velocity.setTo(200, 0);

        }
        else if (ground.body.touching.right) {
            ground.body.velocity.setTo(-200, 0);
        }
        ground.name = groundRegular;
        // console.log(ground.tint, "1");
        ground.tint = tintWallPlayerFrozen;
        // console.log(ground.tint, "Removed");
        // immovable.alpha = .5;

    }
    ////////////////Player vs. Moving Ground/////////////
    if (ground.name === groundRegularMove.name) {
        ground.groupName = groupGround;
        ground.name = groundRegular.name;
        player.body.stop();
        ground.body.stop();
        // ground.body.moves = false;
        ground.body.immovable = true;
        ground.tint = tintWallPlayerFrozen;
        // ground.alpha = .3;
    }
    ////////////////Player vs. World Activation/////////////
    //Activating immovableWallWorldGravity (World Gravity)
    if (ground.name === groundWorldGravity.name) {
        this.game.physics.arcade.gravity.setTo(0, 500);
        this.emitterFunction(ground, null, 'destroy');
    }
    ////////////////Player vs. Power Ups and Coin/////////////
    if (ground.name === powerJump.name) {
        player.powerJump = true;
        // this.playerJump += -1000;
        this.playerJump = -1000;
        this.emitterFunction(ground, null, 'destroy');
    }
    if (ground.name === coinDefault.name) {
        this.emitterFunction(ground, null, 'destroy');
    }
    return;
};

brawl.game.prototype.playerWall = function (player, wall) {
    //WallRegular?
    wall.phase = false;
    wall.alpha = .4;
    if (wall.name === wallRegular.name) {
        // wall.name = wallPlayerFrozen;
        // wall.body.moves = false;
        // wall.body.immovable = true;
        // player.body.stop();
        // wall.body.stop();
        // wall.tint = tintWallPlayerFrozen;
        player.body.stop();
        wall.body.stop();
    }
    ///////////////////////////////Special Walls///////////////////////////
    if (wall.name === wallCloud.name) {
        // player.body.stop();
        // wall.body.stop();
        // player.alpha = .4;
        if (this.movementUp.isDown) {
            wall.body.velocity.setTo(0, -200);
        }
        else if (this.movementDown.isDown) {
            wall.body.velocity.setTo(0, 200);
        }
        else if (this.movementLeft.isDown) {
            wall.body.velocity.setTo(-200, 0);
        }
        else if (this.movementRight.isDown) {
            wall.body.velocity.setTo(200, 0);
        }
    }
    // if (wall.name === wallGhost.name) {
    //     player.alpha = .4;
    // }
    if (wall.name === wallKiller.name) {
        this.playerDeath(player, wall);
    }

    return;
};

brawl.game.prototype.playerEnemy = function (player, enemy) {
    enemy.phase = false;
    enemy.alpha = .4;
    if (enemy.name === 'enemyWall') {
        player.body.stop();
        enemy.body.stop();
        if (enemy.body.touching.left) {
            enemy.body.velocity.setTo(300,0);
        }
        else if (enemy.body.touching.right) {
            enemy.body.velocity.setTo(-300,0);

        }
    }
    else {
        this.playerDeath(player, enemy);
    }
};

// brawl.game.prototype.playerBall = function (player, ball) {
//     //ballRegular Physics
//     ball.body.stop();
//     if (ball.body.touching.down) {
//         ball.body.velocity.y = -50;
//     }
//     if (ball.body.touching.left) {
//         ball.body.velocity.x = 50;
//     }
//     if (ball.body.touching.right) {
//         ball.body.velocity.x = -50;
//     }
// };

brawl.game.prototype.playerLedge = function (player, ledge) {
    /////////////Collision Turned Off////////////
    ledge.phase = false;
    ledge.alpha = .4;
    //////////Eleveator Ledges/////////
    if (ledge.name === ledgeElevator.name) {
        if (ledge.body.touching.up) {
            ledge.body.stop();
            player.body.velocity.y = -300;
            ledge.body.velocity.y = -300;
        }
        else if (ledge.body.touching.down) {
            ledge.body.stop();
        }
        else if (ledge.body.touching.left) {
            ledge.body.velocity.x = 150;
        }
        else if (ledge.body.touching.right) {
            ledge.body.velocity.x = -150;
        }
        if (!ledge.elevatorActivate) {
            ledge.elevatorActivate = true;
        }
    }
    //////////Super Jump Bounce/////////
    if (ledge.name === ledgeBounce.name) {
        if (ledge.body.touching.up) {
            player.body.velocity.y = -1200;
        }
        if (ledge.generationType === 'timer') {
            this.emitterFunction(ledge, null, 'kill');

        }
        else {
            this.emitterFunction(ledge, null, 'destroy');

        }
    }
    ////////Surfs Up Dude////////
    if (ledge.name === ledgeSurf.name) {
        //Self Destruct
        if (!ledge.surfActivate) {
            ledge.surfActivate = true;
            if (ledge.generationType === 'timer') {
                var killOrDestroy = 'kill'
    
            }
            else {
                var killOrDestroy = 'destroy'
            }
            this.game.time.events.add(3000, this.spriteSelfDestruct, this, ledge, killOrDestroy);
        }
        //Physics
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

///////////Hazama//////////
brawl.game.prototype.playerHazama = function (player, hazama) {
    hazama.lastOverlapped = this.game.time.now + 100;
    if (hazama.name === hazamaFalconia.name) {
        player.body.gravity.y = -200;
    }

};
