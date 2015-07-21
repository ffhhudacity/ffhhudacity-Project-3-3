
// Define levels
var LEVEL = 1; // Start at level 1
var MINSPEED = 0.8; // minimum bug speed; increases every level
var MAXSPEED = 3.0; // maximum bug speed; increases every level

// Enemies: the ones our player must avoid//
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
rowArray = [50, 140, 240]; // array of y values for each row of bugs

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += 220 * this.speed * dt;
    if (this.x > 505) { // bug goes off of canvas
      this.x = -101; // start at a neg value so that the bug does not pop onto the map.
      var row = rowArray[Math.floor(Math.random() * rowArray.length)];
      this.y = row;
      this.speed = (Math.random() * (MAXSPEED - MINSPEED) + MINSPEED);
    }
// reset the game if player hits a bug's proximity by 30px//
// Changed this.reset to player.reset below to relfect on reviewer's suggestion for 4th submission.//
    if(player.x >= this.x - 30 && player.x <= this.x + 30) {
      if(player.y >= this.y - 30 && player.y <= this.y + 30) {
        player.reset();
      }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* PLAYER FUNCTIONS */
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// follow the enemy's format above to define who the player is below//
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function() {
    if (this.ctlKey === 'left' && this.x > 0){
        this.x = this.x - 100;
    } else if (this.ctlKey === 'right' && this.x != 400){
        this.x = this.x + 100;
    } else if (this.ctlKey === 'up'){
        this.y = this.y - 82;
    } else if (this.ctlKey === 'down' && this.y != 400){
        this.y = this.y + 82;
    }
    this.ctlKey = null;
    if (this.y < 60){
        this.reset();
    }
};
//Render method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(characterImages[characterIndex]), this.x,this.y);
};
//handleInput method
Player.prototype.handleInput = function(key) {
  this.ctlKey = key;
};
//Reset player method//
// Changed the object to player below to relfect on reviewer's suggestion for 4th submission.//
Player.prototype.reset = function() {
  player.x = 200;
  player.y = 400;
};


/// Have the enemy on the screen just as enemies//
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

/* Instantiate enemy objects at random x values
   Speed is initially set to 1, but is changed every time the bug crosses the screen
 */
allEnemies = [];
var enemy = new Enemy();
allEnemies.push(enemy);
enemy.x = -50;
enemy.y = rowArray[0];
enemy.speed = 1;
var enemy2 = new Enemy();
allEnemies.push(enemy2);
enemy2.x = 250;
enemy2.y = rowArray[1];
enemy2.speed = 1;
var enemy3 = new Enemy();
allEnemies.push(enemy3);
enemy3.x = -150;
enemy3.y = rowArray[2];
enemy3.speed = 1;


/* Instantiate player objects */
var player = new Player();
player.x = (ctx.canvas.width / 2) - (101/2);
player.y = 400;
player.lives = 3; // players has 3 lives


// This is a simple function that gets a random column number
var getRandomColumn = function(numCols) {
  return Math.floor(Math.random() * (numCols - 1));
};



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

    var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);

});
