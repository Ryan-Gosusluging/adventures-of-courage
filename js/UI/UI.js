export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
        this.livesImages = document.getElementById('lives');
    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;

        // Счёт
        context.fillText('Счёт: ' + this.game.score, 20, 50);

        // Время
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Время: ' + (this.game.time * 0.001).toFixed(1), 20, 80);

        // Энергия
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Энергия: ' + this.game.energy, 20, 110);

        // Жизни
        for (let i = 0; i < this.game.lives; i++){
            context.drawImage(this.livesImages, 30 * i + 25, 125, 25, 25);
        }

        // Окончание игры
        if (this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if (this.game.score > this.game.winningScore && this.game.lives > 0){
                context.fillText('Ура, вы победили!', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('Вы не дали пёсику Куражу пострадать от лесных существ. Вы молодец!', this.game.width * 0.5, this.game.height * 0.5 + 20);
                context.fillText('Нажмите Пробел, чтобы вернуться в главное меню', this.game.width * 0.5, this.game.height * 0.5 + 40);
            } else {
                context.fillText('К сожалению, вы проиграли!', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('Не расстраивайтесь, в следующий раз вам точно повезёт!', this.game.width * 0.5, this.game.height * 0.5 + 20);
                context.fillText('Нажмите R, чтобы перезапустить игру и попробовать ещё разок', this.game.width * 0.5, this.game.height * 0.5 + 40);
            }
        }
        
        // Пауза
        if (this.game.pause){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillText('Кураж попал в беду!', this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
            context.fillText('Цель: набрать 40 или более очков и продержаться 2 минуты для победы', this.game.width * 0.5, this.game.height * 0.5 + 20);
            context.fillText('Нажмите ESC, чтобы продолжить игру', this.game.width * 0.5, this.game.height * 0.5 + 40);
        }
        context.restore();
    }
}