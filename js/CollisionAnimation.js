export class CollisionAnimation{
    constructor(game, x, y){
        this.game = game;
        this.image = document.getElementById('collisionAnimation');
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random() + 0.4;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.maxFrame = 4;
        this.markedForDeletion = false;
        this.fps = Math.random() * 20 + 5;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.soundBoom = new Audio();
        this.soundBoom.src = 'audio/boom.wav'
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    update(deltaTime){
        if (this.frameX === 0) this.soundBoom.play();
        this.x -= this.game.speed;
        if (this.frameTimer > this.frameInterval){
            this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        if (this.frameX > this.maxFrame) this.markedForDeletion = true;
    }
}