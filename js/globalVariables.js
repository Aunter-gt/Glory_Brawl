////////////////////////////////////////////Class Declarations/////////////////////////////////////////////////////
//Creates Each Individual Level
class LevelCreator {
  constructor(worldName, xOfWorld, yOfWorld, metroidvania, backgroundColor) {
    this.worldName = worldName;
    this.xOfWorld = xOfWorld;
    this.yOfWorld = yOfWorld;
    this.metroidvania = metroidvania;
    this.backgroundColor = backgroundColor;
  }
};

///Creates Room Switching
class MetroidvaniaCreator {
  constructor(roomUpIndex, roomUpValue, roomDownIndex, roomDownValue, roomLeftIndex, roomLeftValue, roomRightIndex, roomRightValue) {
    this.roomUpIndex = roomUpIndex;
    this.roomUpValue = roomUpValue
    this.roomDownIndex = roomDownIndex;
    this.roomDownValue = roomDownValue;
    this.roomLeftIndex = roomLeftIndex;
    this.roomLeftValue = roomLeftValue;
    this.roomRightIndex = roomRightIndex;
    this.roomRightValue = roomRightValue;
  }
};

//Creates Player Positioning (Up, Down, Left Right);
class PlayerPositionCreator {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
};

//Creates World Gravity Object
class worldGravityCreator {
  constructor(gravityX, gravityY) {
    this.gravityX = gravityX;
    this.gravityY = gravityY;
  }
};

//Generates All Physics Sprites
class SpriteCreator {
  constructor(trigger, spriteType, art, x, y, widthX, widthY, scale, velocityX, velocityY, gravityX, gravityY, specialCondition, seconds) {
    this.trigger = trigger;
    this.spriteType = spriteType;
    this.art = art;
    this.x = x;
    this.y = y;
    this.widthX = widthX;
    this.widthY = widthY;
    this.scale = scale;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.gravityX = gravityX;
    this.gravityY = gravityY;
    this.specialCondition = specialCondition;
    this.seconds = seconds;
  }
};

//Creating All Properties of Sprites
class spriteType {
  constructor(name, tint, mass, anchor, immovable, maxVelocity, bounce) {
    this.name = name;
    this.tint = tint;
    this.mass = mass;
    this.anchor = anchor;
    this.immovable = immovable;
    this.maxVelocity = maxVelocity;
    this.bounce = bounce;
  }
}

//Creates Images
class imageCreator {
  constructor(trigger, name, art, x, y, scale) {
    this.trigger = trigger;
    this.name = name;
    this.art = art;
    this.x = x;
    this.y = y;
    this.scale = scale;
  }
}

//////////////////Flag Specific Classes/////////
class flagCreator {
  constructor(indexOfPlayerPosition, trigger, name, art, x, y, velocityX, velocityY, sizeX, sizeY, gravityX, gravityY, specialHandler) {
    this.indexOfPlayerPosition = indexOfPlayerPosition;
    this.trigger = trigger;
    this.name = name;
    this.art = art;
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.gravityX = gravityX;
    this.gravityY = gravityY;
    this.specialHandler = specialHandler;
  }
};

//Creating Bitmap Text Class
class textCreator {
  constructor(trigger, x, y, textInput, font, fontSize) {
    this.trigger = trigger;
    this.x = x;
    this.y = y;
    this.textInput = textInput;
    this.font = font;
    this.fontSize = fontSize;
  }
}

///////////////////////////////////Experimental////////////////////////////////
/////////////////////////////Special Handlers For Changing Conditions of Levels//////////////////
// var experimental_LevelChanger = {
//   storyTrigger: {
//     page: 1,
//     level: 5,
//     backgroundColor: "#00A6CF",
//     fontColor: '#B339CE'
//   },
//   specialWorld: [2, 5],
//   undeniableDeathInsert: [[], [28, 29, 30, 31, 32, 33, 34, 35, 36]],
//   undeniableDeathRemove: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27]],
//   immovableWallInsert: [[], [14, 15, 16, 17, 18]],
//   immovableWallRemove: [[8, 0, 1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]],
//   wallInsert: [[], [4]],
//   wallRemove: [[0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3]],
//   // ledgeInsert: [[], []],
//   ledgeRemove: [[0, 1, 2, 3, 4, 5, 6], [0, 1]],
//   ballInsert: [[], [0]],
//   ballRemove: [[0], []],
//   enemyInsert: [[], [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43]],
//   enemyRemove: [[], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]],
//   fallingSpikesInsert: [[], [6, 7, 8, 9, 10]],
//   fallingSpikesRemove: [[], [0, 1, 2, 3, 4, 5]],
//   // flagInsert: [[],[]],
//   flagRemove: [[0, 2, 3], [0, 1, 2, 3, 4]],
//   textInsert: [[], [17, 18, 19, 20, 21, 22]],
//   textRemove: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]],
// };
//////////////////////////////////////////////////Global Variables//////////////////////////////////////////////
//Weapon Variables to Change Bullet Type
var pullBoolean = false;
var pushBoolean = false;
var stopBoolean = false;
var killBoolean = false;

//Respawn Holder (The Level You Will Respawn In)
var respawnHolder = {
  indexOfCurrentWorld: 2,
  indexOfPlayerPosition: 3,
  metroidvania: null,
}

//Toggling Camera
var cameraBoolean = true;

//Engage Coordinate system
var coordinateSystem = true;
// var coordinateSystem = false;

// Global Timer
var total = 0;

//BMD Text (Toggle On or Off)
// var bitmapBoolean = true;
var bitmapBoolean = false;
//BMD Font
var fontGrind = 'fontGrind';

//Slow Motion
var slowMotionLimit;
var timerEvents;

//Frame Rate 
// var setFps;

// Total Deaths
var deaths = 0;

/////////////////////////Player Attributes/////////////////////////(Can Be Used For Later Things)
//Remember All These Things Are changed in the Init Function of game.js
var playerSpeed;
var playerJump;
var playerGravity;
var playerDoubleJumps;
var playerWallJumpX;
var playerWallJumpY;
var playerWallDisengage;
var playerStickiness;
var playerSlippery;
var playerUpsideDownVelocity;
var playerUpsideDownMovement;
var playerDownwards;

/////////////////////////Weapon Attributes////////////
var weaponFireRate;
var weaponBulletSpeed;
var weaponBulletAmount;


/////////////////////////List of GROUP NAMES of Each Sprite (For Different Special Properties)////////////////
/*
Note: This is an extra name that denotes the entirety of a group. To keep physics consistent throughout.
*/
//Death Group
var groupUndeniableDeath = 'groupUndeniableDeath';
//Immovable Walls
var groupImmovableWall = 'groupImmovableWall';
//Moveable Walls
var groupWall = 'groupWall';
//Ledge
var groupLedge = 'groupLedge';
//Enemy
var groupEnemy = 'groupEnemy';
//Ball
var groupBall = 'groupBall';
//Hazama
var groupHazama = 'groupHazama';
//Falling Spikes
var groupFallingSpikes = 'groupFallingSpikes';
//Flag
var groupFlag = 'groupFlag';


/////////////////////////Global Tints//////////////////////////
var tintRemover = 0xFFFFFF; //wallRegular (Removes Tint)
var tintWallPlayerFrozen = 0x00ffff; //Frozen Wall Tints
var testTint = Math.random() * 0xffffff; // testTint
console.log(testTint);
/////////////////////////List of Names of Each Sprite (For Different Special Properties)////////////////
//Death Names
var undeniableDeathRegular = new spriteType('undeniableDeathRegular', Phaser.Color.RED, 100, 0, true, 1000, 1); //No Special Properties
var undeniableDeathBallKill = new spriteType('undeniableDeathBallKill', Phaser.Color.ORANGE, 100, 0, true, 1000, 1); //Killable By Ball

//Immovable Wall Names
var immovableWallRegular = new spriteType('immovableWallRegular', tintRemover, 100, 0, true, 1000, 1); //No Special Properties
var immovableWallKillWall = new spriteType('immovableWallKillWall', 7019278.306799905, 100, 0, true, 1000, 1); //Kills Walls(Will Be Everything)
var immovableWallPhase = new spriteType('immovableWallPhase', 15631118.030252509, 100, 0, true, 1000, 1); //Killed By Enemy BULLETS
var immovableWallActivation = new spriteType('immovableWallActivation', 0xffff00, 100, 0, true, 1000, 1); //Triggers Movement in a Wall
var immovableWallWorldGravity = new spriteType('immovableWallWorldGravity', 8314793.039214706, 100, 0, true, 1000, 1); //Triggers World Gravity
var immovableWallOneWayObject = new spriteType('immovableWallOneWayObject', 2499878.036284214, 100, 0, true, 1000, 1); //One Way (Objects Only)
var immovableWallOneWayPlayer = new spriteType('immovableWallOneWayPlayer', 241917.63554178402, 100, 0, true, 1000, 1); //One Way (Players Only)
var immovableWallSlippery = new spriteType('immovableWallSlippery', 766012.4141677661, 100, 0, true, 1000, 1); //Makes you SLIPPERY!
var immovableWallOneWayPlayerBlockLeft = new spriteType('immovableWallOneWayPlayerBlockLeft', 3588771.242333334, 100, 0, true, 1000, 1); //One way player only from the left

//Moveable Wall Names
var wallRegular = new spriteType('wallRegular', tintRemover, 200, .5, false, 1000, 1);
var wallSurf = new spriteType('wallSurf', 10409939.733364154, 200, .5, false, 1000, 1);
var wallInverse = new spriteType('wallInverse', 1181911.9307258818, 200, .5, false, 1000, 1); //First Turn (Leaners Walls From Ledge)
var wallGhost = new spriteType('wallGhost', 16771007.229130682, 200, .5, true, 1000, 1); //Immovable Wall That Let's You Get Through Objects
var wallCloud = new spriteType('wallCloud', 9583870.358153213, 200, .5, false, 1000, 1); //Stationary Shooting Platform Cloud

//Ledge Names
var ledgeElevator = new spriteType('ledgeElevator', Phaser.Color.YELLOW, 20, .5, false, 1000, .5);
var ledgeBounce = new spriteType('ledgeBounce', Phaser.Color.GREEN, 20, .5, false, 1000, .5);
var ledgeSurf = new spriteType('ledgeSurf', Phaser.Color.AQUA, 20, .5, false, 1000, .5);

//Enemy Names
var enemyShooter = new spriteType('enemyShooter', 12758247.409111453, 20, .5, false, 1000, 1);
var enemyDaakath = new spriteType('enemyDaakath', 15269906.933038201, 20, .5, false, 1000, 1);
var enemyAccelerate = new spriteType('enemyAccelerate', 2885804.4944837275, 20, .5, false, 1000, 1);

//Ball Names
var ballRegular = new spriteType('ballRegular', Phaser.Color.BLUE, 20, .5, false, 1000, .5);

//Power-Ups
var powerUpFalconia = new spriteType('powerUpFalconia', testTint, 1, 0, false, 200, 1); //SUPER JUMPING ABILITY

///////////////////////Special Types of Sprites//////////////////
//Falling Spikes
var fallingSpikesRegular = 'fallingSpikesRegular';
//Flag Names
var flagRegular = 'flagRegular';
var flagSpecial = 'flagSpecial';

/////////////////////////List of Art or Image Keys of Each Sprite/////////////////
//Death
var deathTile = 'deathTile';

//Immovable Wall
var immovableWallTile = 'immovableWallTile';

//Moveable Wall
var wallTile50 = 'wallTile50';
var wallTile25 = 'wallTile25';

//Ledge
var ledge = 'ledge';

//enemy
var enemyOne = 'enemyOne'

//Ball
var ball = 'ball';

//Falling Spikes
var fallingSpikesOne = 'fallingSpikesOne';

//Flag
var flag = 'flag';

//Power Ups
var powerUpJar = 'powerUpJar';

//Slow Motion
var slowMotion = 'slowMotion';

