function assign(targetAssign) {
  if (targetAssign === undefined || targetAssign === null) {
    throw new Error('Invalid data. Target can not be null or undefined');
  }
  let firstElement = arguments[0];

  for (let i = 1; i < arguments.length; i++) {
    let args = arguments[i];

    if (args !== undefined && args !== null) {
      for (let prop in args) {
        if (args.hasOwnProperty(prop)) {
          firstElement[prop] = args[prop];
        }
      }
    }
  }

  return firstElement;
}

let Bot = function(configs) {
  this.name = configs.name;
  this.speed = configs.speed;
  this.x = configs.x;
  this.y = configs.y;
  this.defaultSpeed = configs.speed;
}

Bot.prototype.getSpeed = function() {
  return this.speed;
}

Bot.prototype.setSpeed = function(newBotSpeed) {
  this.speed = newBotSpeed;
}

Bot.prototype.getDefaultSpeed = function() {
  return this.defaultSpeed;
}

Bot.prototype.getCoordinates = function() {
 return {x: this.x, y: this.y};
}

Bot.prototype.setCoordinates = function(setCoordinates) {
  this.x = setCoordinates.x;
  this.y = setCoordinates.y;
}

Bot.prototype.move = function(moveDirection) {
  if (moveDirection === 'up') {
    this.y += this.speed;
  } else if (moveDirection === 'down') {
    this.y -= this.speed;
  } else if (moveDirection === 'left') {
    this.x -= this.speed;
  } else if (moveDirection === 'right') {
    this.x += this.speed;
  } else {
    console.log('Direction was specify badly, please try again!');
  }
}

Bot.prototype.showPosition = function() {
  console.log(`I am Bot '${this.name}'. I am located at ${this.x}:${this.y}.`);
}

let Racebot = function(configs) {
  Bot.call(this, configs);
}

Racebot.prototype = Object.create(Bot.prototype);
Racebot.prototype.constructor = Racebot;

Racebot.prototype.move = function(moveDirection) {
  if (this.previousMove === moveDirection) {
    this.speed += 1;
  } else {
    this.speed = this.defaultSpeed;
  }

  Bot.prototype.move.call(this, moveDirection);
  this.previousMove = moveDirection;
}

let Speedbot = function(configs) {
  Bot.call(this, configs);
}

Speedbot.prototype = Object.create(Bot.prototype);
Speedbot.prototype.constructor = Speedbot;

Speedbot.prototype.prepareEngine = function() {
  this.speed += 2;
}

Speedbot.prototype.move = function(moveDirection) {

  Bot.prototype.move.call(this, moveDirection);
  if (this.speed !== this.defaultSpeed) {
    this.speed -= 1;
  }
}
