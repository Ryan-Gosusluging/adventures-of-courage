import { GameUI } from './UI/GameUI.js';
import { Player } from './Player.js';
import {InputHandler} from './Input.js';
import { Background } from './Background.js';
import { FlyingEnemy } from './enemies/FlyingEnemy.js';
import { GroundEnemy } from './enemies/GroundEnemy.js';
import { ClimbingEnemy } from './enemies/ClimbingEnemy.js';
import { UI } from './UI/UI.js';

const gameUI = new GameUI();

// Функция воспроизведения музыки
function soundPlay(){
    const audio = document.getElementById('backgroundMusic');
    audio.play();
}

window.start = function() {
    gameUI.start(startGame, soundPlay);
};

window.showControls = function(){
    gameUI.showControls();
};

window.showAuthor = function(){
    gameUI.showAuthor();
};

window.goBack = function(){
    gameUI.goBack();
};

// Функция начала игры с отображением элемента Canvas и класса Game
function startGame(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 500;

    // Самый главный класс Game, благодаря которому строится вся игровая логика
    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.maxParticles = 150;
            this.enemyTimer = 0;
            this.enemyInterval = 700;
            this.debug = false;
            this.score = 0;
            this.winningScore = 40;
            this.energy = 50;
            this.maxEnergy = 50;
            this.energyTimer = 0;
            this.energyInterval = 1000;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 120000;
            this.gameOver = false;
            this.pause = true;
            this.lives = 3;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }

        update(deltaTime){
            if (this.pause) return;
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            // Добавление противников
            if (this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            });
            // Обработка сообщений при уничтожении врагов
            this.floatingMessages.forEach(message => {
                message.update();
            });
            // Обработка эффекторв огня, пыли
            this.particles.forEach((particle, index) => {
                particle.update();
            });
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }
            // Обработка эффекта коллизии (столкновение с врагом)
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);
            // Энергия
            if (this.energyTimer > this.energyInterval && this.energy < this.maxEnergy) {
                let energyToAdd = 1;
                this.energy += energyToAdd;
                if(this.energy > this.maxEnergy){
                    this.energy = this.maxEnergy
                }
                  this.energyTimer = 0;
             } else {
                this.energyTimer += deltaTime;
             }
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particles.forEach(particle => {
                particle.draw(context);
            });
            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.floatingMessages.forEach(message => {
                message.draw(context);
            });
            this.UI.draw(context);
        }
        addEnemy(){
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
}