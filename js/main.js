var game = new Phaser.Game(1400, 800, Phaser.CANVAS);

//////////////////////////////////////////////////Game States//////////////////////////////////////////////
game.state.add('mainMenu', brawl.state1);
game.state.add('deathState', brawl.state2);
game.state.add('ruleSets', brawl.state3);
game.state.add('levelOne', brawl.state4);
game.state.add('levelTwo', brawl.state5);
game.state.add('levelThree', brawl.state6);
game.state.add('levelFour',brawl.state7);
game.state.add('levelFive',brawl.state8);
game.state.add('levelSix',brawl.state9);
game.state.add('levelSeven',brawl.state10);
game.state.add('levelEight',brawl.state11);
//////////////////////////////////////////////////Starting States//////////////////////////////////////////////
//game.state.start('mainMenu');
game.state.start('levelEight');
//////////////////////////////////////////////////Global Variables//////////////////////////////////////////////

// Variables that Hold Cumlative Power-Up Booleans
var runFastX = false; 
var jumpHigherX = false;

// Life Mechanic for Entire Game
var lives = 1000;
// To Allow Re-Use of Death State and Ruleset States.
var ghettoLoopMechanic = 11;

//////////////////////////////////////////////////Main Menu Story//////////////////////////////////////////////
var content = [
  "Version Platformer-31",
  "Welcome to Glory Brawl."
];

var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400;

function nextLine() {

  if (lineIndex === content.length) {
    //  We're finished
    return;
  }

  //  Split the current line on spaces, so one word per array element
  line = content[lineIndex].split(' ');

  //  Reset the word index to zero (the first word in the line)
  wordIndex = 0;

  //  Call the 'nextWord' function once for each word in the line (line.length)
  game.time.events.repeat(wordDelay, line.length, nextWord, this);

  //  Advance to the next line
  lineIndex++;

}

function nextWord() {

  //  Add the next word onto the text string, followed by a space
  text.text = text.text.concat(line[wordIndex] + " ");

  //  Advance the word index to the next word in the line
  wordIndex++;

  //  Last word?
  if (wordIndex === line.length) {
    //  Add a carriage return
    text.text = text.text.concat("\n");

    //  Get the next line after the lineDelay amount of ms has elapsed
    game.time.events.add(lineDelay, nextLine, this);
  }

}

//////////////////////////////////////////////////Power-Ups//////////////////////////////////////////////


function runFaster(player, shield) {
  runFastX = true;
  shield.kill();
}

function jumpHigher(player, wing) {
  jumpHigherX = true;
  wing.kill();
}

//////////////////////////////////////////////////Changing Game States//////////////////////////////////////////////

//Next Level
function nextLevel(player,door) {
  game.state.start('ruleSets');
}

///End Game
function endgame(player, door) {
  location.reload();
}

///Deathgame State
function deathOne(victim, killer) {
  victim.kill();
  game.state.start('deathState');
}

//Sprite vs. Group Specific Deaths
function deathTwo(victim, killer) {
  victim.kill();
}

function deathThree(killer, victim) {
  victim.kill();
}
///////////////////////////////////////////Function Mechanics////////////////////////////////////////////

//Ledge Mechanics

function ledgeNormal (player, ledge) {
  if (ledge.body.touching.up) {
    ledge.body.velocity.y = -300;
  } 
}

function ledgeUpMiddle (player,ledge) {
  if (ledge.body.touching.up) {
    ledge.body.velocity.y = -500;
  }
}

function ledgeUpFast (player,ledge) {
  if (ledge.body.touching.up) {
    ledge.body.velocity.y = -500;
    player.body.velocity.x = ledge.body.velocity.x;
    ledge.body.velocity.x = player.body.velocity.x;
  }
  else if (ledge.body.touching.right) {
    ledge.body.velocity.x = -500;
  }
  else if (ledge.body.touching.left) {
    ledge.body.velocity.x = 500;
  }
  else if (ledge.body.touching.down) {
    ledge.body.velocity.x = 500;
  }
}

function spikeLedge (spikes,ledge) {
  if (ledge.body.touching.down) {
    ledge.body.angularVelocity = 200;
  }
}

//Ball Mechanics

function ballMover (player,ball) {
  if (ball.body.touching.left) {
    ball.body.velocity.x = 300;
  }
  else if (ball.body.touching.right) {
    ball.body.velocity.x = -300;
  }
  else if (ball.body.touching.up) {
    ball.body.velocity.y = 300;
  }
  else if (ball.body.touching.down) {
    ball.body.velocity.y = -300;
  }
}

//Wall Mechanics

/*
function wallFalse (player,wall) {
  if (wall.body.touching.up) {
    wall.body.checkCollision.up = false;
    wall.body.checkCollision.down = false;
  }
  else if (wall.body.touching.down) {
    wall.body.checkCollision.up = false;
    wall.body.checkCollision.down = false;
  }
}
*/


///////////////////////////////////////////Back-Up Code////////////////////////////////////////////
/*
this.scale.pageAlignHorizontally = true;
this.scale.pageAlignVertically = true;

function constrainVelocity(sprite, maxVelocity) {  
  var body = sprite.body  
  var angle, currVelocitySqr, vx, vy;  vx = body.data.velocity[0];  vy = body.data.velocity[1];  currVelocitySqr = vx * vx + vy * vy;  if (currVelocitySqr > maxVelocity * maxVelocity) {    angle = Math.atan2(vy, vx);    vx = Math.cos(angle) * maxVelocity;    vy = Math.sin(angle) * maxVelocity;    body.data.velocity[0] = vx;    body.data.velocity[1] = vy;    console.log('limited speed to: '+maxVelocity);  }
}

*/

/*
this.fragmentSrc = [
            "precision mediump float;",
            "uniform vec2      resolution;",
            "uniform float     time;",

            "void main( void )",
            "{",
            "vec2 p = ( gl_FragCoord.xy / resolution.xy ) * 2.0 - 1.0;",

            "vec3 c = vec3( 0.0 );",

            "float amplitude = 0.50;",
            "float glowT = sin(time) * 0.5 + 0.5;",
            "float glowFactor = mix( 0.15, 0.35, glowT );",

            "c += vec3(0.02, 0.03, 0.13) * ( glowFactor * abs( 1.0 / sin(p.x + sin( p.y + time ) * amplitude ) ));",
            "c += vec3(0.02, 0.10, 0.03) * ( glowFactor * abs( 1.0 / sin(p.x + cos( p.y + time+1.00 ) * amplitude+0.1 ) ));",
            "c += vec3(0.15, 0.05, 0.20) * ( glowFactor * abs( 1.0 / sin(p.y + sin( p.x + time+1.30 ) * amplitude+0.15 ) ));",
            "c += vec3(0.20, 0.05, 0.05) * ( glowFactor * abs( 1.0 / sin(p.y + cos( p.x + time+3.00 ) * amplitude+0.3 ) ));",
            "c += vec3(0.17, 0.17, 0.05) * ( glowFactor * abs( 1.0 / sin(p.y + cos( p.x + time+5.00 ) * amplitude+0.2 ) ));",

            "gl_FragColor = vec4( c, 1.0 );",
            "}"
        ];

        this.filter = new Phaser.Filter(this.game, null, this.fragmentSrc);
        this.filter.setResolution(1400, 800);

        this.sprite = this.game.add.sprite();
        this.sprite.width = 1400;
        this.sprite.height = 800;

        this.sprite.filters = [this.filter];

        this.filter.update();
*/

/*
this.player.rotation = this.game.physics.arcade.angleBetween(this.player,this.enemy);
*/

/*
        this.leftArrow.events.onInputOver.add(function () {
            this.player.customParams.leftMovement = true;
            this.leftArrow.alpha = .5;
        }, this);

        this.leftArrow.events.onInputOut.add(function () {
            this.player.customParams.leftMovement = false;
            this.leftArrow.alpha = .05;
        }, this);
*/







