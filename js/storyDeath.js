//Death State
brawl.state2 = function () { };
brawl.state2.prototype = {
    init: function (indexOfCurrentWorld, indexOfPlayerPosition, metroidvania) {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.world.setBounds(0, 0, 1400, 800);
        //Init To Get to the Next State
        this.indexOfCurrentWorld = indexOfCurrentWorld;
        this.indexOfPlayerPosition = indexOfPlayerPosition;
        this.metroidvania = metroidvania;
    },
    preload: function () {
        this.load.image('background-three', 'assets/trumpFirstBackground.jpg');
    },
    create: function () {

        //Increase Death Total
        ++deaths;

        //Art
        this.trump = this.game.add.sprite(this.game.world.centerX + 300, this.game.world.centerY, 'background-three');
        this.trump.anchor.setTo(.5);
        //this.trump.scale.setTo(.75);

        this.text = this.game.add.text(this.game.world.centerX - 250, 220, "SPACEBAR to Try Again \n Attemps to Be Reborn: " + deaths);
        this.text.anchor.setTo(0.5);
        this.text.align = 'center';

        //	Font style
        this.text.font = 'Arial Black';
        this.text.fontSize = 35;
        this.text.fill = "#ff0000";
        this.text.fontWeight = 'bold';

    },
    update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.state.start('game', true, false, this.indexOfCurrentWorld, this.indexOfPlayerPosition, worldClassLevels[this.indexOfCurrentWorld].metroidvania);

        }

    }
};

//Death State
brawl.story = function () { };
brawl.story.prototype = {
    init: function (indexOfCurrentWorld, indexOfPlayerPosition, metroidvania, page, backgroundColor, fontColor) {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.world.setBounds(0, 0, 1400, 800);
        //Init To Get to the Next State
        this.indexOfCurrentWorld = indexOfCurrentWorld;
        this.indexOfPlayerPosition = indexOfPlayerPosition;
        this.metroidvania = metroidvania;
        this.page = page;
        this.backgroundColor = backgroundColor;
        this.fontColor = fontColor;
    },
    preload: function () {

    },
    create: function () {
        this.game.stage.backgroundColor = this.backgroundColor;
        if (this.page === 0) {
            var newText = new textCreator(null, 550, 200, "The Shadow is Eternal.\n\nI'm burned in your soul.\n\nWe Will Keep Doing This\n\nForever.", 'Courier New', 25, this.fontColor, 'bold');
            this.text1 = this.game.add.text(newText.x, newText.y, newText.textInput);
            this.text1.font = newText.font;
            this.text1.fontSize = newText.fontSize;
            this.text1.fill = newText.fill;
            this.text1.fontWeight = newText.fontWeight;
            this.text1.align = 'center';
        }
        else if (this.page === 1) {
            var newText = new textCreator(null, 100, 200, "It's All A Lie\n\nWe've Never Been Reborn", 'Courier New', 25, this.fontColor, 'bold');
            this.text1 = this.game.add.text(newText.x, newText.y, newText.textInput);
            this.text1.font = newText.font;
            this.text1.fontSize = newText.fontSize;
            this.text1.fill = newText.fill;
            this.text1.fontWeight = newText.fontWeight;
            this.text1.align = 'left';
        }
        var spacebarToPlay = new textCreator(null, 590, 700, "Spacebar to Skip", 'Courier New', 25, this.fontColor, 'bold');
        this.spaceBarPlay = this.game.add.text(spacebarToPlay.x, spacebarToPlay.y, spacebarToPlay.textInput);
        this.spaceBarPlay.font = spacebarToPlay.font;
        this.spaceBarPlay.fontSize = spacebarToPlay.fontSize;
        this.spaceBarPlay.fill = spacebarToPlay.fill;
        this.spaceBarPlay.fontWeight = spacebarToPlay.fontWeight;
    },
    update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.state.start('game', true, false, this.indexOfCurrentWorld, this.indexOfPlayerPosition, worldClassLevels[this.indexOfCurrentWorld].metroidvania);

        }

    }
};
